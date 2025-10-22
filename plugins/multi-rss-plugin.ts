// Multi-RSS Plugin for Docusaurus with TypeScript Support
import type { LoadContext, Plugin } from '@docusaurus/types';
import Parser from 'rss-parser';
import path from 'path';
import * as fs from 'fs';
import type {
  PluginOptions,
  RSSData,
  ProcessedFeed,
  RSSItem,
  FeedConfig,
  FeedProcessingResult
} from '../src/multi-rss-plugin/types/rss';

type RSSParser = Parser<any, any>;

/**
 * Sanitize URLs to prevent XSS attacks
 * Only allows http, https, mailto, and ftp protocols
 * Strips dangerous protocols like javascript:, data:, vbscript:, etc.
 */
function sanitizeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  const trimmedUrl = url.trim();
  if (!trimmedUrl) return undefined;

  // Check for dangerous protocols
  const dangerousProtocols = /^(\s)*(javascript|data|vbscript|file|about):/i;
  if (dangerousProtocols.test(trimmedUrl)) {
    console.warn(`[Multi-RSS] Blocked potentially dangerous URL: ${trimmedUrl.substring(0, 50)}...`);
    return undefined;
  }

  // Only allow safe protocols
  const safeProtocols = /^(https?|mailto|ftp):/i;

  // If it has a protocol, check if it's safe
  if (trimmedUrl.includes(':')) {
    if (!safeProtocols.test(trimmedUrl)) {
      console.warn(`[Multi-RSS] Blocked URL with unsafe protocol: ${trimmedUrl.substring(0, 50)}...`);
      return undefined;
    }
  }

  return trimmedUrl;
}

export default function multiRSSPlugin(
  context: LoadContext,
  options: PluginOptions
): Plugin<RSSData> {
  return {
    name: 'docusaurus-plugin-multi-rss',

    async loadContent(): Promise<RSSData> {
      // Skip RSS fetching in development mode (use cached data)
      const isDev = process.env.NODE_ENV === 'development';
      const skipFetch = isDev && process.env.SKIP_RSS_FETCH !== 'false';
      const cacheFile = path.join(context.siteDir, '.docusaurus', 'rss-cache.json');

      // Try to load cached data in dev mode
      if (skipFetch && fs.existsSync(cacheFile)) {
        console.log('[Multi-RSS] Development mode: Using cached RSS data');
        console.log('[Multi-RSS] To fetch fresh data, run: SKIP_RSS_FETCH=false npm start');
        try {
          const cachedData = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
          return cachedData;
        } catch (error) {
          console.warn('[Multi-RSS] Failed to load cache, fetching fresh data...');
        }
      }
      const parser: RSSParser = new Parser({
        timeout: options.timeout || 10000,
        customFields: {
          feed: ['language', 'copyright', 'managingEditor'],
          item: ['description', 'content:encoded', 'dc:creator', 'media:content']
        }
      });
      
      const rssData: RSSData = {
        feeds: {},
        categories: {},
        allItems: [],
        lastUpdated: new Date().toISOString(),
        stats: {
          totalFeeds: 0,
          successfulFeeds: 0,
          failedFeeds: 0,
          totalItems: 0,
          categoryCounts: {}
        }
      };
      
      const { 
        feeds = {}, 
        categories = {}, 
        maxItemsPerFeed = 20, 
        concurrency = 5 
      } = options;
      
      // Process feeds in batches to avoid overwhelming servers
      const feedEntries = Object.entries(feeds);
      const batchSize = concurrency;
      
      rssData.stats.totalFeeds = feedEntries.length;
      
      console.log(`[Multi-RSS] Starting to process ${feedEntries.length} feeds...`);
      
      for (let i = 0; i < feedEntries.length; i += batchSize) {
        const batch = feedEntries.slice(i, i + batchSize);
        
        const batchPromises = batch.map(async ([feedKey, feedConfig]): Promise<FeedProcessingResult> => {
          try {
            console.log(`[Multi-RSS] Fetching RSS feed: ${feedKey}`);
            
            const feedUrl = typeof feedConfig === 'string' ? feedConfig : feedConfig.url;
            const category = typeof feedConfig === 'object' ? feedConfig.category || 'general' : 'general';
            const customTitle = typeof feedConfig === 'object' ? feedConfig.title : null;
            
            const feed = await parser.parseURL(feedUrl);
            
            const processedItems: RSSItem[] = feed.items
              .slice(0, maxItemsPerFeed)
              .map((item: any) => ({
                ...item,
                feedKey,
                feedTitle: customTitle || feed.title,
                category,
                cleanTitle: item.title?.replace(/[\[\]]/g, '').trim(),
                publishedDate: new Date(item.pubDate || item.isoDate),
                author: item.creator || item['dc:creator'] || feed.managingEditor || 'Unknown',
                summary: item.contentSnippet ||
                        (item.description?.replace(/<[^>]*>/g, '') || '').substring(0, 200) + '...',
                // Sanitize URLs to prevent XSS attacks
                link: sanitizeUrl(item.link),
                enclosure: item.enclosure ? {
                  ...item.enclosure,
                  url: sanitizeUrl(item.enclosure.url) || item.enclosure.url
                } : undefined
              }));
            
            const processedFeed: ProcessedFeed = {
              title: customTitle || feed.title,
              description: feed.description,
              link: sanitizeUrl(feed.link),
              category,
              lastBuildDate: feed.lastBuildDate,
              items: processedItems,
              itemCount: processedItems.length,
              status: 'success'
            };
            
            return {
              feedKey,
              success: true,
              data: processedFeed
            };
            
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`[Multi-RSS] Failed to fetch RSS feed ${feedKey}:`, errorMessage);
            
            return {
              feedKey,
              success: false,
              error: errorMessage
            };
          }
        });
        
        const batchResults = await Promise.allSettled(batchPromises);
        
        batchResults.forEach((result) => {
          if (result.status === 'fulfilled') {
            const { feedKey, success, data, error } = result.value;
            
            if (success && data) {
              rssData.feeds[feedKey] = data;
              rssData.stats.successfulFeeds++;
              
              // Add items to category grouping
              if (!rssData.categories[data.category]) {
                rssData.categories[data.category] = [];
              }
              rssData.categories[data.category].push(...data.items);
              
              // Add to all items array
              rssData.allItems.push(...data.items);
              
            } else {
              rssData.feeds[feedKey] = {
                title: feedKey,
                category: 'general',
                items: [],
                itemCount: 0,
                status: 'error',
                error: error || 'Unknown error'
              };
              rssData.stats.failedFeeds++;
            }
          } else {
            console.error(`[Multi-RSS] Batch processing failed:`, result.reason);
          }
        });
        
        // Small delay between batches to be respectful to servers
        if (i + batchSize < feedEntries.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Sort all items by publication date (newest first)
      rssData.allItems.sort((a, b) => {
        const dateA = new Date(a.publishedDate || a.pubDate || 0);
        const dateB = new Date(b.publishedDate || b.pubDate || 0);
        return dateB.getTime() - dateA.getTime();
      });
      
      // Sort items in each category
      Object.keys(rssData.categories).forEach(category => {
        rssData.categories[category].sort((a, b) => {
          const dateA = new Date(a.publishedDate || a.pubDate || 0);
          const dateB = new Date(b.publishedDate || b.pubDate || 0);
          return dateB.getTime() - dateA.getTime();
        });
      });
      
      // Generate statistics
      rssData.stats.totalItems = rssData.allItems.length;
      rssData.stats.categoryCounts = Object.fromEntries(
        Object.entries(rssData.categories).map(([cat, items]) => [cat, items.length])
      );
      
      console.log(`[Multi-RSS] Plugin Stats:`, rssData.stats);

      // Save to cache for development use
      try {
        const cacheDir = path.dirname(cacheFile);
        if (!fs.existsSync(cacheDir)) {
          fs.mkdirSync(cacheDir, { recursive: true });
        }
        fs.writeFileSync(cacheFile, JSON.stringify(rssData, null, 2), 'utf-8');
        console.log('[Multi-RSS] Cached RSS data for development use');
      } catch (error) {
        console.warn('[Multi-RSS] Failed to write cache:', error);
      }

      return rssData;
    },
    
    async contentLoaded({ content, actions }): Promise<void> {
      const { createData } = actions;
      const { enableSeparateFiles = true } = options;
      
      // Create main RSS data file
      await createData('rss-data.json', JSON.stringify(content, null, 2));
      
      if (enableSeparateFiles) {
        // Create separate files for each feed
        for (const [feedKey, feedData] of Object.entries(content.feeds)) {
          await createData(`feed-${feedKey}.json`, JSON.stringify(feedData, null, 2));
        }
        
        // Create category files
        for (const [category, items] of Object.entries(content.categories)) {
          await createData(`category-${category}.json`, JSON.stringify({
            category,
            items,
            count: items.length
          }, null, 2));
        }
        
        // Create latest items file
        const latestItems = content.allItems.slice(0, 50);
        await createData('latest-items.json', JSON.stringify(latestItems, null, 2));
        
        // Create stats file
        await createData('rss-stats.json', JSON.stringify(content.stats, null, 2));
      }
    },
    
    getPathsToWatch(): string[] {
      // Return empty array since we're fetching external data
      return [];
    }
  };
}

export { multiRSSPlugin };
