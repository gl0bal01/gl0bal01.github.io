// Multi-RSS Plugin - Main Export Index
// This file provides convenient access to all plugin components, hooks, and utilities

// Main Components
export { default as RSSDashboard } from './components/RSSDashboard';
export { default as PaginatedRSSFeed } from './components/PaginatedRSSFeed';

// Utility Components
export {
  LatestRSSItems,
  CategoryRSSFeed,
  SingleRSSFeed,
  RSSFeedStatus,
  formatRSSDate,
  truncateRSSText
} from './components/RSSUtilities';

// Custom Hooks
export {
  useRSSData,
  useLatestRSSItems,
  useRSSFeed,
  useRSSCategory,
  useRSSSearch,
  useRSSStats,
  useRSSHealth,
  usePaginatedRSSItems,
  useRSSAnalytics
} from './hooks/useRSS';

// Utility Functions
export {
  formatRSSDate as formatDate,
  formatRelativeTime,
  truncateText,
  cleanHtml,
  extractImageFromContent,
  sanitizeTitle,
  searchRSSItems,
  filterRSSItemsByCategory,
  filterRSSItemsByDateRange,
  filterRSSItemsByFeed,
  sortRSSItemsByDate,
  sortRSSItemsByTitle,
  sortRSSItemsByFeed,
  calculateRSSStats,
  getMostActiveFeeds,
  getRecentActivity,
  isValidUrl,
  isValidRSSUrl,
  normalizeUrl,
  exportRSSData,
  debounce,
  saveUserPreferences,
  loadUserPreferences,
  getTheme,
  measurePerformance,
  createRSSError,
  logRSSError
} from './utils/rssUtils';

// Type Definitions
export type {
  RSSItem,
  RSSFeed,
  ProcessedFeed,
  FeedConfig,
  PluginOptions,
  RSSData,
  CategoryData,
  RSSDashboardProps,
  LatestRSSItemsProps,
  CategoryRSSFeedProps,
  SingleRSSFeedProps,
  RSSFeedStatusProps,
  RSSError,
  FeedProcessingResult,
  PluginContent
} from './types/rss';

// Plugin
export { default as multiRSSPlugin } from '../plugins/multi-rss-plugin';

// Constants
export const RSS_PLUGIN_VERSION = '1.0.0';
export const RSS_PLUGIN_NAME = 'docusaurus-multi-rss-plugin';

// Default configurations
export const DEFAULT_PLUGIN_OPTIONS: Partial<PluginOptions> = {
  maxItemsPerFeed: 20,
  concurrency: 5,
  enableSeparateFiles: true,
  timeout: 10000
};

export const DEFAULT_CATEGORIES = [
  'general',
  'tech',
  'development',
  'design',
  'javascript',
  'news'
];

// Helper function to create plugin configuration
export const createRSSPluginConfig = (
  feeds: Record<string, string | FeedConfig>,
  options?: Partial<PluginOptions>
): [string, PluginOptions] => {
  return [
    './plugins/multi-rss-plugin.ts',
    {
      ...DEFAULT_PLUGIN_OPTIONS,
      ...options,
      feeds
    } as PluginOptions
  ];
};

// Quick setup helper for common RSS sources
export const createCommonRSSFeeds = () => ({
  // Tech News
  'techcrunch': {
    url: 'https://feeds.feedburner.com/TechCrunch',
    category: 'tech',
    title: 'TechCrunch'
  },
  'ars-technica': {
    url: 'http://feeds.arstechnica.com/arstechnica/index',
    category: 'tech',
    title: 'Ars Technica'
  },
  'the-verge': {
    url: 'https://www.theverge.com/rss/index.xml',
    category: 'tech',
    title: 'The Verge'
  },
  
  // Development
  'dev-to': {
    url: 'https://dev.to/feed',
    category: 'development',
    title: 'DEV Community'
  },
  'css-tricks': {
    url: 'https://css-tricks.com/feed/',
    category: 'development',
    title: 'CSS-Tricks'
  },
  'smashing-magazine': {
    url: 'https://www.smashingmagazine.com/feed/',
    category: 'development',
    title: 'Smashing Magazine'
  },
  
  // JavaScript
  'javascript-weekly': {
    url: 'https://javascriptweekly.com/rss/',
    category: 'javascript',
    title: 'JavaScript Weekly'
  },
  
  // Design
  'design-milk': {
    url: 'https://design-milk.com/feed/',
    category: 'design',
    title: 'Design Milk'
  },
  
  // General News
  'bbc-tech': {
    url: 'http://feeds.bbci.co.uk/news/technology/rss.xml',
    category: 'news',
    title: 'BBC Technology'
  }
});

// Debug helpers
export const debugRSSPlugin = () => {
  if (typeof window !== 'undefined') {
    console.group('🔍 RSS Plugin Debug Info');
    
    try {
      const rssData = require('@site/.docusaurus/multi-rss-plugin/default/rss-data.json');
      console.log('✅ RSS Data loaded successfully');
      console.log('📊 Stats:', rssData.stats);
      console.log('📁 Categories:', Object.keys(rssData.categories));
      console.log('📰 Total items:', rssData.allItems.length);
      console.log('🕒 Last updated:', rssData.lastUpdated);
    } catch (error) {
      console.error('❌ RSS Data not available:', error);
    }
    
    console.groupEnd();
  }
};

// Version check helper
export const checkRSSPluginVersion = () => {
  const currentVersion = RSS_PLUGIN_VERSION;
  console.log(`📦 Multi-RSS Plugin v${currentVersion}`);
  
  // Check if newer version is available (this would need to be implemented)
  // For now, just log current version
  return currentVersion;
};

// Export everything as default object for convenience
const MultiRSSPlugin = {
  // Components
  RSSDashboard,
  PaginatedRSSFeed,
  LatestRSSItems,
  CategoryRSSFeed,
  SingleRSSFeed,
  RSSFeedStatus,
  
  // Hooks
  useRSSData,
  useLatestRSSItems,
  useRSSFeed,
  useRSSCategory,
  useRSSSearch,
  useRSSStats,
  useRSSHealth,
  usePaginatedRSSItems,
  useRSSAnalytics,
  
  // Utils
  formatRSSDate,
  formatRelativeTime,
  truncateText,
  searchRSSItems,
  filterRSSItemsByCategory,
  sortRSSItemsByDate,
  exportRSSData,
  
  // Helpers
  createRSSPluginConfig,
  createCommonRSSFeeds,
  debugRSSPlugin,
  checkRSSPluginVersion,
  
  // Constants
  VERSION: RSS_PLUGIN_VERSION,
  NAME: RSS_PLUGIN_NAME
};

export default MultiRSSPlugin;
