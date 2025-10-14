import type { RSSItem, RSSData } from '../types/rss';

// Date formatting utilities
export const formatRSSDate = (dateString: string | Date | undefined): string => {
  if (!dateString) return 'Unknown date';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatRelativeTime = (dateString: string | Date | undefined): string => {
  if (!dateString) return 'Unknown time';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else {
    return formatRSSDate(dateString);
  }
};

// Text processing utilities
export const truncateText = (text: string | undefined, maxLength: number = 150): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const cleanHtml = (html: string | undefined): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

export const extractImageFromContent = (content: string | undefined): string | null => {
  if (!content) return null;
  
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
};

export const sanitizeTitle = (title: string | undefined): string => {
  if (!title) return 'Untitled';
  return title.replace(/[\[\]]/g, '').trim();
};

// Search and filtering utilities
export const searchRSSItems = (
  items: RSSItem[], 
  searchTerm: string,
  searchFields: Array<keyof RSSItem> = ['title', 'summary', 'feedTitle', 'author']
): RSSItem[] => {
  if (!searchTerm.trim()) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item => 
    searchFields.some(field => {
      const value = item[field];
      return typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm);
    })
  );
};

export const filterRSSItemsByCategory = (
  items: RSSItem[], 
  category: string
): RSSItem[] => {
  if (!category || category === 'all') return items;
  return items.filter(item => item.category === category);
};

export const filterRSSItemsByDateRange = (
  items: RSSItem[], 
  startDate: Date, 
  endDate: Date
): RSSItem[] => {
  return items.filter(item => {
    const itemDate = new Date(item.publishedDate || item.pubDate || 0);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

export const filterRSSItemsByFeed = (
  items: RSSItem[], 
  feedKeys: string[]
): RSSItem[] => {
  if (feedKeys.length === 0) return items;
  return items.filter(item => feedKeys.includes(item.feedKey || ''));
};

// Sorting utilities
export const sortRSSItemsByDate = (
  items: RSSItem[], 
  direction: 'asc' | 'desc' = 'desc'
): RSSItem[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.publishedDate || a.pubDate || 0);
    const dateB = new Date(b.publishedDate || b.pubDate || 0);
    
    return direction === 'desc' 
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });
};

export const sortRSSItemsByTitle = (
  items: RSSItem[], 
  direction: 'asc' | 'desc' = 'asc'
): RSSItem[] => {
  return [...items].sort((a, b) => {
    const titleA = (a.cleanTitle || a.title || '').toLowerCase();
    const titleB = (b.cleanTitle || b.title || '').toLowerCase();
    
    return direction === 'asc' 
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });
};

export const sortRSSItemsByFeed = (
  items: RSSItem[], 
  direction: 'asc' | 'desc' = 'asc'
): RSSItem[] => {
  return [...items].sort((a, b) => {
    const feedA = (a.feedTitle || '').toLowerCase();
    const feedB = (b.feedTitle || '').toLowerCase();
    
    return direction === 'asc' 
      ? feedA.localeCompare(feedB)
      : feedB.localeCompare(feedA);
  });
};

// Analytics utilities
export const calculateRSSStats = (data: RSSData) => {
  const totalItems = data.allItems.length;
  const successfulFeeds = data.stats.successfulFeeds;
  const failedFeeds = data.stats.failedFeeds;
  
  const averageItemsPerFeed = successfulFeeds > 0 
    ? Math.round(totalItems / successfulFeeds) 
    : 0;
  
  const feedHealthPercentage = data.stats.totalFeeds > 0 
    ? Math.round((successfulFeeds / data.stats.totalFeeds) * 100)
    : 0;
  
  const categoryStats = Object.entries(data.stats.categoryCounts)
    .map(([category, count]) => ({
      category,
      count,
      percentage: totalItems > 0 ? Math.round((count / totalItems) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);
  
  return {
    totalItems,
    successfulFeeds,
    failedFeeds,
    averageItemsPerFeed,
    feedHealthPercentage,
    categoryStats
  };
};

export const getMostActiveFeeds = (data: RSSData, limit: number = 5) => {
  return Object.entries(data.feeds)
    .filter(([_, feed]) => feed.status === 'success')
    .map(([key, feed]) => ({
      key,
      title: feed.title,
      itemCount: feed.itemCount,
      category: feed.category
    }))
    .sort((a, b) => b.itemCount - a.itemCount)
    .slice(0, limit);
};

export const getRecentActivity = (items: RSSItem[]) => {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return {
    last24Hours: items.filter(item => {
      const itemDate = new Date(item.publishedDate || item.pubDate || 0);
      return itemDate >= oneDayAgo;
    }).length,
    last7Days: items.filter(item => {
      const itemDate = new Date(item.publishedDate || item.pubDate || 0);
      return itemDate >= oneWeekAgo;
    }).length,
    last30Days: items.filter(item => {
      const itemDate = new Date(item.publishedDate || item.pubDate || 0);
      return itemDate >= oneMonthAgo;
    }).length
  };
};

// URL and validation utilities
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidRSSUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  
  const urlObj = new URL(url);
  const validExtensions = ['.xml', '.rss', '.atom'];
  const validPaths = ['/feed', '/rss', '/atom'];
  
  return validExtensions.some(ext => urlObj.pathname.endsWith(ext)) ||
         validPaths.some(path => urlObj.pathname.includes(path)) ||
         urlObj.pathname.includes('feed') ||
         urlObj.pathname.includes('rss') ||
         urlObj.pathname.includes('atom');
};

export const normalizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    return url;
  }
};

// Export utilities
export const exportRSSData = (data: RSSData, format: 'json' | 'csv' = 'json'): string => {
  if (format === 'json') {
    return JSON.stringify(data, null, 2);
  }
  
  // CSV export
  const headers = ['Title', 'Feed', 'Category', 'Author', 'Date', 'URL'];
  const rows = data.allItems.map(item => [
    `"${(item.cleanTitle || item.title || '').replace(/"/g, '""')}"`,
    `"${(item.feedTitle || '').replace(/"/g, '""')}"`,
    `"${(item.category || '').replace(/"/g, '""')}"`,
    `"${(item.author || '').replace(/"/g, '""')}"`,
    `"${formatRSSDate(item.publishedDate || item.pubDate)}"`,
    `"${(item.link || '').replace(/"/g, '""')}"`
  ]);
  
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
};

// Debounce utility for search inputs
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Local storage utilities (for client-side preferences)
export const saveUserPreferences = (preferences: Record<string, any>): void => {
  try {
    localStorage.setItem('rss-plugin-preferences', JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save RSS plugin preferences:', error);
  }
};

export const loadUserPreferences = (): Record<string, any> => {
  try {
    const stored = localStorage.getItem('rss-plugin-preferences');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to load RSS plugin preferences:', error);
    return {};
  }
};

// Theme detection utility
export const getTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const htmlElement = document.documentElement;
    return htmlElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  return 'light';
};

// Performance utilities
export const measurePerformance = <T>(
  operation: () => T,
  operationName: string
): T => {
  const start = performance.now();
  const result = operation();
  const end = performance.now();
  
  console.log(`RSS Plugin - ${operationName} took ${end - start} milliseconds`);
  return result;
};

// Error handling utilities
export const createRSSError = (
  message: string, 
  feedKey?: string, 
  originalError?: Error
): Error => {
  const error = new Error(feedKey ? `[${feedKey}] ${message}` : message);
  error.name = 'RSSPluginError';
  
  if (originalError) {
    error.stack = originalError.stack;
  }
  
  return error;
};

export const logRSSError = (
  error: Error, 
  context: string, 
  feedKey?: string
): void => {
  const prefix = feedKey ? `[RSS Plugin - ${feedKey}]` : '[RSS Plugin]';
  console.error(`${prefix} ${context}:`, error);
};
