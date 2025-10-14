import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import type { 
  RSSDashboardProps, 
  RSSData, 
  RSSItem 
} from '../types/rss';

const RSSDashboard: React.FC<RSSDashboardProps> = ({
  maxItems = 20,
  showStats = true,
  enableFiltering = true,
  defaultCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  let rssData: RSSData;

  try {
    rssData = require('@site/.docusaurus/docusaurus-plugin-multi-rss/default/rss-data.json');
  } catch (error) {
    return (
      <div className="rss-error">
        RSS data not available. Make sure the multi-rss plugin is configured correctly.
      </div>
    );
  }

  const { feeds, categories, allItems, stats, lastUpdated } = rssData;
  
  // Filter items based on category and search
  let filteredItems: RSSItem[] = selectedCategory === 'all' 
    ? allItems 
    : categories[selectedCategory] || [];
  
  if (searchTerm) {
    filteredItems = filteredItems.filter((item: RSSItem) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  const displayItems = filteredItems.slice(0, maxItems);
  const categoryList = Object.keys(categories).sort();

  const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return 'Unknown date';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string | undefined, maxLength: number = 150): string => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="rss-dashboard">
      {showStats && (
        <div className="rss-stats-panel">
          <h2>RSS Feed Dashboard</h2>
          <div className="rss-stats">
            <div className="stat-item">
              <strong>{stats.totalItems}</strong>
              <span>Total Articles</span>
            </div>
            <div className="stat-item">
              <strong>{stats.successfulFeeds}</strong>
              <span>Active Feeds</span>
            </div>
            <div className="stat-item">
              <strong>{categoryList.length}</strong>
              <span>Categories</span>
            </div>
            <div className="stat-item">
              <strong>{stats.failedFeeds}</strong>
              <span>Failed Feeds</span>
            </div>
          </div>
          <p className="last-updated">Last updated: {formatDate(lastUpdated)}</p>
        </div>
      )}

      {enableFiltering && (
        <div className="rss-filters">
          <div className="filter-row">
            <div className="category-filter">
              <label htmlFor="category-select">Category:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories ({allItems.length})</option>
                {categoryList.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} ({categories[category].length})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="search-filter">
              <label htmlFor="search-input">Search:</label>
              <input
                id="search-input"
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="rss-items-grid">
        {displayItems.length === 0 ? (
          <div className="no-items">
            {searchTerm || selectedCategory !== 'all' 
              ? 'No articles found matching your criteria.' 
              : 'No RSS items available.'}
          </div>
        ) : (
          displayItems.map((item: RSSItem, index: number) => (
            <article key={`${item.feedKey}-${index}`} className="rss-item-card">
              <div className="rss-item-header">
                <h3 className="rss-item-title">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.cleanTitle || item.title}
                  </a>
                </h3>
                <div className="rss-item-meta">
                  <span className="rss-feed-name">{item.feedTitle}</span>
                  <span className="rss-category">{item.category}</span>
                  <time className="rss-date">
                    {formatDate(item.publishedDate || item.pubDate)}
                  </time>
                </div>
              </div>
              
              {item.summary && (
                <p className="rss-item-summary">
                  {truncateText(item.summary)}
                </p>
              )}
              
              <div className="rss-item-footer">
                {item.author && item.author !== 'Unknown' && (
                  <span className="rss-author">By {item.author}</span>
                )}
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rss-read-more"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))
        )}
      </div>
      
      {filteredItems.length > maxItems && (
        <div className="rss-load-more">
          <p>Showing {maxItems} of {filteredItems.length} articles</p>
        </div>
      )}
      
      {stats.failedFeeds > 0 && (
        <div className="rss-failed-feeds">
          <h3>Failed Feeds</h3>
          <ul>
            {Object.entries(feeds)
              .filter(([_, feed]) => feed.status === 'error')
              .map(([key, feed]) => (
                <li key={key}>
                  <strong>{feed.title}</strong>: {feed.error}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RSSDashboard;
