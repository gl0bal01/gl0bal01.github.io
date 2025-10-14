/**
 * RSS Feeds Configuration
 *
 * This file contains all RSS feed definitions and plugin options.
 * Separate from docusaurus.config.ts for better maintainability.
 */

export interface RSSFeedConfig {
  url: string;
  category: string;
  title: string;
}

export interface RSSFeeds {
  [key: string]: RSSFeedConfig;
}

export interface RSSPluginOptions {
  maxItemsPerFeed?: number;
  concurrency?: number;
  enableSeparateFiles?: boolean;
  timeout?: number;
}

/**
 * RSS Feed Definitions
 * Add or modify feeds here without touching docusaurus.config.ts
 */
export const rssFeeds: RSSFeeds = {
  // 🛡️ Cybersecurity Feeds
  'krebs-security': {
    url: 'https://krebsonsecurity.com/feed/',
    category: 'cyber',
    title: 'Krebs on Security'
  },
  'schneier-security': {
    url: 'https://www.schneier.com/feed/atom/',
    category: 'cyber',
    title: 'Schneier on Security'
  },
  'threatpost': {
    url: 'https://threatpost.com/feed/',
    category: 'cyber',
    title: 'Threatpost'
  },
  'dark-reading': {
    url: 'https://www.darkreading.com/rss.xml',
    category: 'cyber',
    title: 'Dark Reading'
  },
  'bleeping-computer': {
    url: 'https://www.bleepingcomputer.com/feed/',
    category: 'cyber',
    title: 'Bleeping Computer'
  },
  'malwarebytes-labs': {
    url: 'https://www.malwarebytes.com/blog/feed',
    category: 'cyber',
    title: 'Malwarebytes Labs'
  },

  // 🕵️ OSINT & Investigation Feeds
  'bellingcat': {
    url: 'https://www.bellingcat.com/feed/',
    category: 'osint',
    title: 'Bellingcat'
  },

  // 🤖 AI & Technology Feeds
  'ai-news': {
    url: 'https://artificialintelligence-news.com/feed/',
    category: 'ai',
    title: 'AI News'
  },
  'towards-data-science': {
    url: 'https://towardsdatascience.com/feed',
    category: 'ai',
    title: 'Towards Data Science'
  },
  'openai-blog': {
    url: 'https://openai.com/blog/rss.xml',
    category: 'ai',
    title: 'OpenAI Blog'
  },

  // 💻 Technical & Development
  'hacker-news': {
    url: 'https://hnrss.org/frontpage',
    category: 'tech',
    title: 'Hacker News'
  },
  'github-blog': {
    url: 'https://github.blog/feed/',
    category: 'tech',
    title: 'GitHub Blog'
  },

  // 🔬 Research & Academic
  'arxiv-cs-cr': {
    url: 'http://export.arxiv.org/rss/cs.CR',
    category: 'research',
    title: 'arXiv Cryptography'
  },

  // 🌐 General Security News
  'security-week': {
    url: 'https://www.securityweek.com/feed/',
    category: 'news',
    title: 'Security Week'
  },
  'infosecurity-magazine': {
    url: 'https://www.infosecurity-magazine.com/rss/news/',
    category: 'news',
    title: 'Infosecurity Magazine'
  },
  'the-hacker-news': {
    url: 'https://feeds.feedburner.com/TheHackersNews',
    category: 'news',
    title: 'The Hacker News'
  },

  // 🏴‍☠️ Specialized Security
  'exploit-db': {
    url: 'https://www.exploit-db.com/rss.xml',
    category: 'exploits',
    title: 'Exploit Database'
  }
};

/**
 * Plugin Options
 * Configure plugin behavior
 */
export const rssPluginOptions: RSSPluginOptions = {
  maxItemsPerFeed: 20,
  concurrency: 4,
  enableSeparateFiles: true,
  timeout: 15000,
};
