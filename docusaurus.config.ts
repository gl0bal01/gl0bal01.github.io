import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { rssFeeds, rssPluginOptions } from './rss-feeds.config';

const config: Config = {
  title: 'gl0bal01 | Notes & Research',
  tagline: 'Security research, penetration testing, digital investigation techniques and human madness',
  favicon: 'icons/favicon.ico',

  // Configuration spécifique pour gl0bal01.github.io
  url: 'https://gl0bal01.com',
  baseUrl: '/', // Pour un site utilisateur GitHub Pages

  // Configuration GitHub Pages
  organizationName: 'gl0bal01', // Nom d'utilisateur GitHub
  projectName: 'gl0bal01.github.io', // Nom du repository
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn', // Temporarily set to warn to allow build with intel-codex broken links

  // Configuration i18n (optionnel)
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  
  // 🔥 PLUGINS SECTION - Multi-RSS Plugin, Intel Codex Docs Instance & Obsidian Vault Plugin
  plugins: [
    [
      './plugins/multi-rss-plugin.ts',
      {
        ...rssPluginOptions,
        feeds: rssFeeds
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'intel-codex',
        path: 'intel-codex',
        routeBasePath: 'intel-codex',
        sidebarPath: './sidebars-intel-codex.ts',
        editUrl: 'https://github.com/gl0bal01/intel-codex/tree/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: true,
        sidebarCollapsed: true,
        breadcrumbs: true,
      },
    ],
    [
      './plugins/obsidian-vault-plugin.ts',
      {
        vaultSource: {
          type: 'github',
          repository: 'gl0bal01/intel-codex',
          branch: 'main',
          path: '.temp-vault',
        },
        docsPath: 'intel-codex', // Changed from 'docs/intel-codex' to match new docs instance
        assetsPath: 'static/img/intel-codex',
        exclude: [
          '**/.obsidian/**',
          '**/.git/**',
          '**/CTF/**',
          '**/Cases/**',
          '**/Case-Template/**',
          '**/Student-Exercises/**',
          'CONTRIBUTING.md',
          'README.md' // README.md is for GitHub, index.md is for Docusaurus
        ],
        transformations: {
          convertWikilinks: true,
          convertCallouts: true,
          preserveFrontmatter: true,
        },
        generateCategories: true,
        categoryLabels: {
          'intel-codex': 'Intel Codex',
          'Investigations': 'Investigations',
          'Platforms': 'Platform Guides',
          'Techniques': 'Investigation Techniques',
          'Security': 'Security & Analysis',
          'Analysis': 'Analysis',
          'Pentesting': 'Penetration Testing',
          'Cases': 'Case Studies',
        },
        categoryIndexFile: 'index.md', // Use index.md as category index (previously START.md)
        bannerTop: ':::danger[Synced from an **Obsidian vault**]\nFor graph and advanced features, download the **full** **[Intel Codex Vault](https://github.com/gl0bal01/intel-codex)** and open it in **Obsidian**.\n:::',
        debug: false, // Enable for testing - set to false for production
      }
    ]
  ],
  
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/gl0bal01/gl0bal01.github.io/tree/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          sidebarCollapsed: true,
          // SEO: Add breadcrumbs for better navigation and SEO
          breadcrumbs: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/gl0bal01/gl0bal01.github.io/tree/main/',
          blogTitle: 'Blog',
          blogDescription: 'Exploring neurodiversity, human psychology, and the madness of mind—alongside research in cybersecurity, and digital forensics.',
          postsPerPage: 30,
          // SEO: Add feed for blog RSS
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'gl0bal01 Blog - Security Research & Human Psychology',
            description: 'Latest posts on cybersecurity, OSINT, digital forensics, neurodiversity, and human psychology',
            copyright: `Copyright © ${new Date().getFullYear()} gl0bal01`,
            language: 'en',
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-NFE7MZ9S3P',
          anonymizeIP: true,
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // SEO: Social card for link previews (Open Graph, Twitter Cards)
    image: 'img/lama.jpg',

    // SEO: Additional metadata tags
    metadata: [
      {name: 'keywords', content: 'cybersecurity, osint, digital forensics, penetration testing, reverse engineering, malware analysis, AI security, intelligence gathering'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],

    colorMode: {
      defaultMode: 'light',
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    algolia: {
      appId: '4X4QPM0QJE',
      apiKey: '7bd1f7f08cef3ff374e0c7f4f2d89725',
      indexName: 'gl0bal01',
      contextualSearch: true,
      searchPagePath: 'search',
      searchParameters: {
        facetFilters: [],
      },
      insights: true,
    },
    /*announcementBar: {
      content: `🎉️ ⭐️ If you like this repo, give it a star and follow me on <a target="_blank" rel="noopener noreferrer" href="https://github.com/gl0bal01/">GitHub</a> 🥳️`,
    },*/
    navbar: {
      title: 'gl0bal01',
      logo: {
        alt: 'gl0bal01',
        src: '/icons/android-icon-48x48.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'intelCodexSidebar',
          position: 'left',
          label: 'Intel Codex',
          docsPluginId: 'intel-codex',
          'aria-label': 'Intel Codex documentation',
        },
        {
          label: 'Practical',
          position: 'left',
          'aria-label': 'Practical resources navigation menu',
          items: [
            {
              to: '/osint',
              label: 'Osint',
              'aria-label': 'OSINT resources',
            },
            {
              to: '/cyber',
              label: 'Cyber',
              'aria-label': 'Cybersecurity resources',
            },
            {
              to: '/reverse-engineering',
              label: 'Reverse',
              'aria-label': 'Reverse engineering resources',
            },
            {
              to: '/ai',
              label: 'AI',
              'aria-label': 'AI and machine learning resources',
            },
          ],
        },
        {to: '/cheatsheets', label: 'Cheatsheets', position: 'left', 'aria-label': 'Security and development cheatsheets'},
        {to: '/blog', label: 'Blog', position: 'left', 'aria-label': 'Blog posts and articles'},
        {to: '/news', label: 'News', position: 'left', 'aria-label': 'Latest news and updates'},
        {
          href: 'https://github.com/gl0bal01',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
footer: {
    style: 'dark',
    links: [
      {
        title: 'Intel Codex',
        items: [
          {
            label: 'Overview',
            to: '/intel-codex/',
            'aria-label': 'Intel Codex overview page',
          },
          {
            label: 'Download Vault',
            href: 'https://github.com/gl0bal01/intel-codex',
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'Download the Intel Codex Obsidian vault',
          },
        ],
      },
      {
        title: 'OSINT Investigations',
        items: [
          {
            label: 'Investigation Index',
            to: '/intel-codex/Investigations/Investigations-Index',
            'aria-label': 'OSINT investigation index',
          },
          {
            label: 'Investigation Techniques',
            to: '/intel-codex/Investigations/Techniques/Techniques-Index',
            'aria-label': 'Investigation techniques and methodologies',
          },
          {
            label: 'Platform Guides',
            to: '/intel-codex/Investigations/Platforms/Platforms-Index',
            'aria-label': 'Platform-specific investigation guides',
          },
        ],
      },
      {
        title: 'Security Operations',
        items: [
          {
            label: 'Security Analysis',
            to: '/intel-codex/Security/Analysis/Analysis-Index',
            'aria-label': 'Security analysis resources and guides',
          },
          {
            label: 'Penetration Testing',
            to: '/intel-codex/Security/Pentesting/Pentesting-Index',
            'aria-label': 'Penetration testing methodologies and tools',
          },
          {
            label: 'Malware Analysis',
            to: '/intel-codex/Security/Analysis/sop-malware-analysis',
            'aria-label': 'Malware analysis procedures',
          },
          {
            label: 'Reverse Engineering',
            to: '/intel-codex/Security/Analysis/sop-reverse-engineering',
            'aria-label': 'Reverse engineering techniques',
          },
          {
            label: 'Digital Forensics (DFIR)',
            to: '/intel-codex/Security/Analysis/sop-forensics-investigation',
            'aria-label': 'Digital forensics investigation procedures',
          },
        ],
      },
      {
        title: 'Resources',
        items: [
          {
            label: 'OSINT Foundations',
            to: '/osint',
            'aria-label': 'OSINT foundations and resources',
          },
          {
            label: 'Cybersecurity',
            to: '/cyber',
            'aria-label': 'Cybersecurity resources and guides',
          },
          {
            label: 'AI Resources',
            to: '/ai',
            'aria-label': 'Artificial intelligence resources',
          },
          {
            label: 'Cheatsheets',
            to: '/cheatsheets',
            'aria-label': 'Technical cheatsheets and quick references',
          },
          {
            label: 'News Feeds',
            to: '/news',
            'aria-label': 'Security and technology news feeds',
          },
          {
            label: 'Blog',
            to: '/blog',
            'aria-label': 'Visit our blog',
          },
        ],
      },
      {
        title: 'Community',
        items: [
          {
            label: 'Play & Learn',
            href: '/blog/ctf-platforms-training',
            'aria-label': 'CTF platforms and training resources',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/gl0bal01/',
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'Visit gl0bal01 on GitHub',
          },
          {
            label: 'Discord',
            href: 'https://discord.gg/T5tc9Rq8DV',
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'Join gl0bal01 Discord community',
          },
          {
            label: 'Start.me',
            href: 'https://start.me/u/gl0bal01',
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'Visit gl0bal01 Start.me page',
          },
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} gl0bal01. Built with Docusaurus.`,
  },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'typescript', 'php', 'yaml', 'go', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
  headTags: [
    // Preconnect to Google Fonts
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    // Preconnect to Algolia for search
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://4X4QPM0QJE-dsn.algolia.net',
        crossorigin: 'anonymous',
      },
    },
    // Preconnect to Google Analytics
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://www.googletagmanager.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://www.google-analytics.com',
      },
    },
    // DNS prefetch for additional performance
    {
      tagName: 'link',
      attributes: {
        rel: 'dns-prefetch',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'dns-prefetch',
        href: 'https://www.googletagmanager.com',
      },
    },
    // Font stylesheet (with display=swap for better performance)
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@600;800&display=swap',
      },
    },
  ],
};

export default config;