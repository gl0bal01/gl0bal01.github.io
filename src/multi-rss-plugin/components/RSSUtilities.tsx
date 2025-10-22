import React from 'react';
import type {
  LatestRSSItemsProps,
  CategoryRSSFeedProps,
  SingleRSSFeedProps,
  RSSFeedStatusProps,
  RSSItem,
  CategoryData,
  ProcessedFeed,
  RSSData
} from '../types/rss';
import { sanitizeUrl } from '../utils/rssUtils';

// Component to display latest items from all feeds
export const LatestRSSItems: React.FC<LatestRSSItemsProps> = ({ 
  maxItems = 10, 
  showFeedName = true 
}) => {
  let latestItems: RSSItem[];
  
  try {
    latestItems = require('@site/.docusaurus/multi-rss-plugin/default/latest-items.json');
  } catch (error) {
    return <div className="rss-error">Latest RSS items not available.</div>;
  }

  const items = latestItems.slice(0, maxItems);

  return (
    <div className="rss-latest-items">
      <h3>Latest Articles</h3>
      <ul className="rss-simple-list">
        {items.map((item: RSSItem, index: number) => (
          <li key={index} className="rss-simple-item">
            <a href={sanitizeUrl(item.link)} target="_blank" rel="noopener noreferrer">
              {item.cleanTitle || item.title}
            </a>
            <div className="rss-simple-meta">
              {showFeedName && (
                <span className="feed-name">{item.feedTitle}</span>
              )}
              <time>
                {item.publishedDate 
                  ? new Date(item.publishedDate).toLocaleDateString()
                  : 'Unknown date'}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component to display items from a specific category
export const CategoryRSSFeed: React.FC<CategoryRSSFeedProps> = ({ 
  category, 
  maxItems = 15, 
  showDescription = true 
}) => {
  let categoryData: CategoryData;
  
  try {
    categoryData = require(`@site/.docusaurus/multi-rss-plugin/default/category-${category}.json`);
  } catch (error) {
    return <div className="rss-error">Category "{category}" not found.</div>;
  }

  const items = categoryData.items.slice(0, maxItems);

  return (
    <div className="rss-category-feed">
      <h3>{category.charAt(0).toUpperCase() + category.slice(1)} News</h3>
      <p className="category-count">{categoryData.count} articles available</p>
      
      <div className="rss-category-items">
        {items.map((item: RSSItem, index: number) => (
          <article key={index} className="rss-category-item">
            <h4>
              <a href={sanitizeUrl(item.link)} target="_blank" rel="noopener noreferrer">
                {item.cleanTitle || item.title}
              </a>
            </h4>
            <div className="rss-item-info">
              <span className="source">{item.feedTitle}</span>
              <time>
                {item.publishedDate 
                  ? new Date(item.publishedDate).toLocaleDateString()
                  : 'Unknown date'}
              </time>
            </div>
            {showDescription && item.summary && (
              <p className="rss-summary">{item.summary.substring(0, 120)}...</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

// Component to display a specific RSS feed
export const SingleRSSFeed: React.FC<SingleRSSFeedProps> = ({ 
  feedKey, 
  maxItems = 10, 
  layout = 'list' 
}) => {
  let feedData: ProcessedFeed;
  
  try {
    feedData = require(`@site/.docusaurus/multi-rss-plugin/default/feed-${feedKey}.json`);
  } catch (error) {
    return <div className="rss-error">Feed "{feedKey}" not found.</div>;
  }

  if (feedData.status === 'error') {
    return (
      <div className="rss-error">
        Failed to load {feedData.title}: {feedData.error}
      </div>
    );
  }

  const items = feedData.items.slice(0, maxItems);

  return (
    <div className={`rss-single-feed rss-layout-${layout}`}>
      <div className="rss-feed-header">
        <h3>
          {feedData.link ? (
            <a href={sanitizeUrl(feedData.link)} target="_blank" rel="noopener noreferrer">
              {feedData.title}
            </a>
          ) : (
            feedData.title
          )}
        </h3>
        {feedData.description && (
          <p className="rss-feed-description">{feedData.description}</p>
        )}
        <p className="rss-feed-stats">
          {feedData.itemCount} articles • Category: {feedData.category}
        </p>
      </div>

      <div className="rss-feed-items">
        {items.map((item: RSSItem, index: number) => (
          <article key={index} className={`rss-feed-item rss-item-${layout}`}>
            <h4 className="rss-item-title">
              <a href={sanitizeUrl(item.link)} target="_blank" rel="noopener noreferrer">
                {item.cleanTitle || item.title}
              </a>
            </h4>
            
            <div className="rss-item-meta">
              <time>
                {item.publishedDate 
                  ? new Date(item.publishedDate).toLocaleDateString()
                  : 'Unknown date'}
              </time>
              {item.author && item.author !== 'Unknown' && (
                <span className="author">by {item.author}</span>
              )}
            </div>
            
            {layout === 'cards' && item.summary && (
              <p className="rss-item-description">
                {item.summary.substring(0, 150)}...
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

// RSS Feed Status Component
export const RSSFeedStatus: React.FC<RSSFeedStatusProps> = () => {
  let rssData: RSSData;
  
  try {
    rssData = require('@site/.docusaurus/multi-rss-plugin/default/rss-data.json');
  } catch (error) {
    return <div className="rss-error">RSS status not available.</div>;
  }

  const { stats, feeds, lastUpdated } = rssData;

  return (
    <div className="rss-status">
      <h3>RSS Feed Status</h3>
      <div className="status-overview">
        <div className="status-item success">
          <strong>{stats.successfulFeeds}</strong> Successful
        </div>
        <div className="status-item error">
          <strong>{stats.failedFeeds}</strong> Failed
        </div>
        <div className="status-item info">
          <strong>{stats.totalItems}</strong> Total Items
        </div>
      </div>
      
      <p className="last-updated">
        Last updated: {new Date(lastUpdated).toLocaleString()}
      </p>

      {stats.failedFeeds > 0 && (
        <details className="failed-feeds-details">
          <summary>View Failed Feeds ({stats.failedFeeds})</summary>
          <ul>
            {Object.entries(feeds)
              .filter(([_, feed]) => feed.status === 'error')
              .map(([key, feed]) => (
                <li key={key} className="failed-feed-item">
                  <strong>{feed.title || key}</strong>
                  <span className="error-message">{feed.error}</span>
                </li>
              ))}
          </ul>
        </details>
      )}
    </div>
  );
};

// Export utility functions
export const formatRSSDate = (dateString: string | Date | undefined): string => {
  if (!dateString) return 'Unknown date';
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const truncateRSSText = (text: string | undefined, maxLength: number = 150): string => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
