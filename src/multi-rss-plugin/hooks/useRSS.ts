import { useState, useEffect, useMemo } from 'react';
import type { 
  RSSData, 
  RSSItem, 
  ProcessedFeed, 
  CategoryData 
} from '../types/rss';

// Hook to get all RSS data
export function useRSSData(): {
  data: RSSData | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<RSSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rssData = require('@site/.docusaurus/multi-rss-plugin/default/rss-data.json');
      setData(rssData);
      setError(null);
    } catch (err) {
      setError('RSS data not available. Make sure the plugin is configured correctly.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}

// Hook to get latest RSS items with filtering
export function useLatestRSSItems(
  maxItems: number = 10,
  category?: string
): {
  items: RSSItem[];
  loading: boolean;
  error: string | null;
} {
  const { data, loading, error } = useRSSData();

  const items = useMemo(() => {
    if (!data) return [];
    
    let sourceItems = category && data.categories[category] 
      ? data.categories[category] 
      : data.allItems;
    
    return sourceItems.slice(0, maxItems);
  }, [data, maxItems, category]);

  return { items, loading, error };
}

// Hook to get a specific RSS feed
export function useRSSFeed(feedKey: string): {
  feed: ProcessedFeed | null;
  loading: boolean;
  error: string | null;
} {
  const [feed, setFeed] = useState<ProcessedFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const feedData = require(`@site/.docusaurus/multi-rss-plugin/default/feed-${feedKey}.json`);
      setFeed(feedData);
      setError(null);
    } catch (err) {
      setError(`Feed "${feedKey}" not found.`);
      setFeed(null);
    } finally {
      setLoading(false);
    }
  }, [feedKey]);

  return { feed, loading, error };
}

// Hook to get a specific category
export function useRSSCategory(category: string): {
  categoryData: CategoryData | null;
  loading: boolean;
  error: string | null;
} {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = require(`@site/.docusaurus/multi-rss-plugin/default/category-${category}.json`);
      setCategoryData(data);
      setError(null);
    } catch (err) {
      setError(`Category "${category}" not found.`);
      setCategoryData(null);
    } finally {
      setLoading(false);
    }
  }, [category]);

  return { categoryData, loading, error };
}

// Hook for RSS search functionality
export function useRSSSearch(searchTerm: string, category?: string): {
  results: RSSItem[];
  loading: boolean;
  error: string | null;
  totalResults: number;
} {
  const { data, loading, error } = useRSSData();

  const results = useMemo(() => {
    if (!data || !searchTerm.trim()) return [];

    let sourceItems = category && data.categories[category] 
      ? data.categories[category] 
      : data.allItems;

    return sourceItems.filter((item: RSSItem) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm, category]);

  return { 
    results, 
    loading, 
    error, 
    totalResults: results.length 
  };
}

// Hook for RSS statistics
export function useRSSStats(): {
  stats: RSSData['stats'] | null;
  loading: boolean;
  error: string | null;
} {
  const { data, loading, error } = useRSSData();

  return {
    stats: data?.stats || null,
    loading,
    error
  };
}

// Hook for RSS feed health monitoring
export function useRSSHealth(): {
  health: {
    totalFeeds: number;
    healthyFeeds: number;
    failedFeeds: number;
    healthPercentage: number;
    failedFeedsList: Array<{ key: string; title: string; error: string }>;
  } | null;
  loading: boolean;
  error: string | null;
} {
  const { data, loading, error } = useRSSData();

  const health = useMemo(() => {
    if (!data) return null;

    const failedFeedsList = Object.entries(data.feeds)
      .filter(([_, feed]) => feed.status === 'error')
      .map(([key, feed]) => ({
        key,
        title: feed.title,
        error: feed.error || 'Unknown error'
      }));

    const healthPercentage = data.stats.totalFeeds > 0 
      ? Math.round((data.stats.successfulFeeds / data.stats.totalFeeds) * 100)
      : 0;

    return {
      totalFeeds: data.stats.totalFeeds,
      healthyFeeds: data.stats.successfulFeeds,
      failedFeeds: data.stats.failedFeeds,
      healthPercentage,
      failedFeedsList
    };
  }, [data]);

  return { health, loading, error };
}

// Hook for paginated RSS items
export function usePaginatedRSSItems(
  itemsPerPage: number = 10,
  category?: string
): {
  items: RSSItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  loading: boolean;
  error: string | null;
} {
  const { data, loading, error } = useRSSData();
  const [currentPage, setCurrentPage] = useState(1);

  const { items, totalItems, totalPages } = useMemo(() => {
    if (!data) return { items: [], totalItems: 0, totalPages: 0 };

    const sourceItems = category && data.categories[category] 
      ? data.categories[category] 
      : data.allItems;

    const totalItems = sourceItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const items = sourceItems.slice(startIndex, startIndex + itemsPerPage);

    return { items, totalItems, totalPages };
  }, [data, currentPage, itemsPerPage, category]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  return {
    items,
    currentPage,
    totalPages,
    totalItems,
    nextPage,
    prevPage,
    goToPage,
    loading,
    error
  };
}

// Hook for RSS item analytics
export function useRSSAnalytics() {
  const { data } = useRSSData();

  const analytics = useMemo(() => {
    if (!data) return null;

    // Calculate category distribution
    const categoryDistribution = Object.entries(data.stats.categoryCounts)
      .map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / data.stats.totalItems) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    // Calculate feed productivity (items per feed)
    const feedProductivity = Object.entries(data.feeds)
      .filter(([_, feed]) => feed.status === 'success')
      .map(([key, feed]) => ({
        feedKey: key,
        title: feed.title,
        itemCount: feed.itemCount,
        category: feed.category
      }))
      .sort((a, b) => b.itemCount - a.itemCount);

    // Calculate recent activity (last 24 hours, 7 days, 30 days)
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const recentActivity = {
      last24Hours: data.allItems.filter(item => {
        const itemDate = new Date(item.publishedDate || item.pubDate || 0);
        return itemDate >= oneDayAgo;
      }).length,
      last7Days: data.allItems.filter(item => {
        const itemDate = new Date(item.publishedDate || item.pubDate || 0);
        return itemDate >= oneWeekAgo;
      }).length,
      last30Days: data.allItems.filter(item => {
        const itemDate = new Date(item.publishedDate || item.pubDate || 0);
        return itemDate >= oneMonthAgo;
      }).length
    };

    return {
      categoryDistribution,
      feedProductivity,
      recentActivity,
      averageItemsPerFeed: data.stats.successfulFeeds > 0 
        ? Math.round(data.stats.totalItems / data.stats.successfulFeeds)
        : 0
    };
  }, [data]);

  return analytics;
}
