// RSS Type Definitions for Docusaurus Multi-RSS Plugin

export interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  creator?: string;
  'dc:creator'?: string;
  contentSnippet?: string;
  content?: string;
  'content:encoded'?: string;
  description?: string;
  guid?: string;
  categories?: string[];
  enclosure?: {
    url: string;
    length?: string;
    type?: string;
  };
  // Enhanced properties added by our plugin
  feedKey?: string;
  feedTitle?: string;
  category?: string;
  cleanTitle?: string;
  publishedDate?: Date;
  author?: string;
  summary?: string;
}

export interface RSSFeed {
  title?: string;
  description?: string;
  link?: string;
  language?: string;
  copyright?: string;
  managingEditor?: string;
  lastBuildDate?: string;
  items: RSSItem[];
}

export interface ProcessedFeed {
  title: string;
  description?: string;
  link?: string;
  category: string;
  lastBuildDate?: string;
  items: RSSItem[];
  itemCount: number;
  status: 'success' | 'error';
  error?: string;
}

export interface FeedConfig {
  url: string;
  category?: string;
  title?: string;
}

export interface PluginOptions {
  feeds: Record<string, string | FeedConfig>;
  maxItemsPerFeed?: number;
  concurrency?: number;
  enableSeparateFiles?: boolean;
  timeout?: number;
  categories?: Record<string, string>;
}

export interface RSSData {
  feeds: Record<string, ProcessedFeed>;
  categories: Record<string, RSSItem[]>;
  allItems: RSSItem[];
  lastUpdated: string;
  stats: {
    totalFeeds: number;
    successfulFeeds: number;
    failedFeeds: number;
    totalItems: number;
    categoryCounts: Record<string, number>;
  };
}

export interface CategoryData {
  category: string;
  items: RSSItem[];
  count: number;
}

// Component Props Types
export interface RSSDashboardProps {
  maxItems?: number;
  showStats?: boolean;
  enableFiltering?: boolean;
  defaultCategory?: string;
}

export interface LatestRSSItemsProps {
  maxItems?: number;
  showFeedName?: boolean;
}

export interface CategoryRSSFeedProps {
  category: string;
  maxItems?: number;
  showDescription?: boolean;
}

export interface SingleRSSFeedProps {
  feedKey: string;
  maxItems?: number;
  layout?: 'list' | 'cards';
}

export interface RSSFeedStatusProps {
  // No props for status component
}

// Error handling
export interface RSSError {
  feedKey: string;
  error: string;
  timestamp: string;
}

// Plugin internal types
export interface FeedProcessingResult {
  feedKey: string;
  success: boolean;
  data?: ProcessedFeed;
  error?: string;
}

export interface PluginContent {
  rssData: RSSData;
}
