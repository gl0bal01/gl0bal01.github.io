// Multi-RSS Plugin - Main Export Index
// Convenient access to all plugin components, hooks, and utilities.
//
// Names referenced locally (the `MultiRSSPlugin` aggregate object and the typed
// signatures below) are imported, then re-exported. Names that are only part of
// the public API are re-exported directly with `export … from`.

// --- Locally-used imports (needed by the default aggregate object / signatures) ---
import RSSDashboard from './components/RSSDashboard';
import PaginatedRSSFeed from './components/PaginatedRSSFeed';
import {
  LatestRSSItems,
  CategoryRSSFeed,
  SingleRSSFeed,
  RSSFeedStatus,
  formatRSSDate,
} from './components/RSSUtilities';
import {
  useRSSData,
  useLatestRSSItems,
  useRSSFeed,
  useRSSCategory,
  useRSSSearch,
  useRSSStats,
  useRSSHealth,
  usePaginatedRSSItems,
  useRSSAnalytics,
} from './hooks/useRSS';
import {
  formatRelativeTime,
  truncateText,
  searchRSSItems,
  filterRSSItemsByCategory,
  sortRSSItemsByDate,
  exportRSSData,
} from './utils/rssUtils';
import type { FeedConfig, PluginOptions } from './types/rss';

// Re-export the locally-imported names
export {
  RSSDashboard,
  PaginatedRSSFeed,
  LatestRSSItems,
  CategoryRSSFeed,
  SingleRSSFeed,
  RSSFeedStatus,
  formatRSSDate,
  useRSSData,
  useLatestRSSItems,
  useRSSFeed,
  useRSSCategory,
  useRSSSearch,
  useRSSStats,
  useRSSHealth,
  usePaginatedRSSItems,
  useRSSAnalytics,
  formatRelativeTime,
  truncateText,
  searchRSSItems,
  filterRSSItemsByCategory,
  sortRSSItemsByDate,
  exportRSSData,
};
export type { FeedConfig, PluginOptions };

// Pure re-exports (not referenced locally)
export { truncateRSSText } from './components/RSSUtilities';
export {
  formatRSSDate as formatDate,
  cleanHtml,
  extractImageFromContent,
  sanitizeTitle,
  filterRSSItemsByDateRange,
  filterRSSItemsByFeed,
  sortRSSItemsByTitle,
  sortRSSItemsByFeed,
  calculateRSSStats,
  getMostActiveFeeds,
  getRecentActivity,
  isValidUrl,
  isValidRSSUrl,
  normalizeUrl,
  debounce,
  saveUserPreferences,
  loadUserPreferences,
  getTheme,
  measurePerformance,
  createRSSError,
  logRSSError,
} from './utils/rssUtils';
export type {
  RSSItem,
  RSSFeed,
  ProcessedFeed,
  RSSData,
  CategoryData,
  RSSDashboardProps,
  LatestRSSItemsProps,
  CategoryRSSFeedProps,
  SingleRSSFeedProps,
  RSSFeedStatusProps,
  RSSError,
  FeedProcessingResult,
  PluginContent,
} from './types/rss';

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
