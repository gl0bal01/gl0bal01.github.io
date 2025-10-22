import React from 'react';
import type { RSSItem } from '../types/rss';
import { usePaginatedRSSItems } from '../hooks/useRSS';
import { formatRelativeTime, truncateText, sanitizeUrl } from '../utils/rssUtils';

interface PaginatedRSSFeedProps {
  category?: string;
  itemsPerPage?: number;
  layout?: 'list' | 'grid' | 'compact';
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showFeedName?: boolean;
  className?: string;
}

const PaginatedRSSFeed: React.FC<PaginatedRSSFeedProps> = ({
  category,
  itemsPerPage = 10,
  layout = 'list',
  showExcerpt = true,
  showAuthor = true,
  showFeedName = true,
  className = ''
}) => {
  const {
    items,
    currentPage,
    totalPages,
    totalItems,
    nextPage,
    prevPage,
    goToPage,
    loading,
    error
  } = usePaginatedRSSItems(itemsPerPage, category);

  if (loading) {
    return (
      <div className={`rss-paginated-feed ${className}`}>
        <div className="rss-loading">
          <div className="loading-spinner"></div>
          <p>Loading RSS feeds...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rss-paginated-feed ${className}`}>
        <div className="rss-error">{error}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`rss-paginated-feed ${className}`}>
        <div className="no-items">
          {category 
            ? `No articles found in "${category}" category.`
            : 'No RSS articles available.'
          }
        </div>
      </div>
    );
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          aria-label={`Go to page ${i}`}
          aria-current={i === currentPage ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    return (
      <nav className="rss-pagination" aria-label="RSS articles pagination">
        <div className="pagination-info">
          Showing page {currentPage} of {totalPages} ({totalItems} total articles)
        </div>
        
        <div className="pagination-controls">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="pagination-button prev"
            aria-label="Previous page"
          >
            ← Previous
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => goToPage(1)}
                className="pagination-button"
                aria-label="Go to first page"
              >
                1
              </button>
              {startPage > 2 && <span className="pagination-ellipsis">...</span>}
            </>
          )}

          {pages}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
              <button
                onClick={() => goToPage(totalPages)}
                className="pagination-button"
                aria-label="Go to last page"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="pagination-button next"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      </nav>
    );
  };

  const renderItem = (item: RSSItem, index: number) => {
    const itemId = `rss-item-${currentPage}-${index}`;
    
    return (
      <article 
        key={`${item.feedKey}-${item.link}-${index}`} 
        className={`rss-paginated-item rss-item-${layout}`}
        id={itemId}
      >
        <header className="rss-item-header">
          <h3 className="rss-item-title">
            <a
              href={sanitizeUrl(item.link)}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby={showExcerpt ? `${itemId}-excerpt` : undefined}
            >
              {item.cleanTitle || item.title || 'Untitled'}
            </a>
          </h3>
          
          <div className="rss-item-meta">
            {showFeedName && item.feedTitle && (
              <span className="rss-feed-name" title={`From ${item.feedTitle}`}>
                {item.feedTitle}
              </span>
            )}
            
            {item.category && (
              <span className="rss-category" title={`Category: ${item.category}`}>
                {item.category}
              </span>
            )}
            
            <time 
              className="rss-date" 
              dateTime={item.publishedDate?.toString() || item.pubDate}
              title={item.publishedDate?.toString() || item.pubDate || 'Unknown date'}
            >
              {formatRelativeTime(item.publishedDate || item.pubDate)}
            </time>
          </div>
        </header>

        {showExcerpt && item.summary && (
          <div className="rss-item-content">
            <p id={`${itemId}-excerpt`} className="rss-item-excerpt">
              {truncateText(item.summary, layout === 'compact' ? 100 : 200)}
            </p>
          </div>
        )}

        <footer className="rss-item-footer">
          {showAuthor && item.author && item.author !== 'Unknown' && (
            <span className="rss-author">By {item.author}</span>
          )}

          <a
            href={sanitizeUrl(item.link)}
            target="_blank"
            rel="noopener noreferrer"
            className="rss-read-more"
            aria-label={`Read full article: ${item.cleanTitle || item.title}`}
          >
            Read More →
          </a>
        </footer>
      </article>
    );
  };

  return (
    <div className={`rss-paginated-feed rss-layout-${layout} ${className}`}>
      <div className="rss-feed-header">
        {category && (
          <h2 className="rss-category-title">
            {category.charAt(0).toUpperCase() + category.slice(1)} Articles
          </h2>
        )}
        
        <div className="rss-feed-summary">
          <span className="total-items">{totalItems} articles</span>
          {category && (
            <span className="category-badge">
              Category: {category}
            </span>
          )}
        </div>
      </div>

      <div className={`rss-items-container rss-items-${layout}`}>
        {items.map(renderItem)}
      </div>

      {renderPagination()}

      {/* Quick jump to top */}
      {currentPage > 1 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="rss-scroll-top"
          aria-label="Scroll to top"
          title="Back to top"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default PaginatedRSSFeed;
