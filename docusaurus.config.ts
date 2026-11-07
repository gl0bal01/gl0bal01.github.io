import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { rssFeeds, rssPluginOptions } from './rss-feeds.config';

const config: Config = {
  title: "Operator's Notebook",
  tagline: 'Pentest playbooks, OSINT tradecraft, RE notes. Field-tested, opinionated, free.',
  favicon: 'icons/favicon.ico',

  url: 'https://gl0bal01.com',
  baseUrl: '/',

  organizationName: 'gl0bal01',
  projectName: 'gl0bal01.github.io',
  trailingSlash: false,

  // The vault is authored for Obsidian, where a link resolves by basename; a link
  // that is valid there can still point nowhere here, and only the build can see it.
  onBrokenLinks: 'throw',
  // Still 'warn': five headings carry emoji or an em dash, which each renderer
  // slugifies differently, so their own table-of-contents anchors miss.
  onBrokenAnchors: 'warn',

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
  
  plugins: [
    [
      './plugins/multi-rss-plugin.ts',
      {
        ...rssPluginOptions,
        feeds: rssFeeds
      }
    ],
    [
      './plugins/latest-posts-plugin.ts',
      {
        count: 4,
      },
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
        // Vault notes like 00-Case-Overview keep their prefix: links in the vault
        // and the old lecodex.xyz URLs both use the full filename.
        numberPrefixParser: false,
      },
    ],
    [
      // lecodex.xyz/<path> 301s to /intel-codex/<path> (Cloudflare rule). Quartz
      // served folder listings at the bare folder path; Docusaurus has them under
      // /category/<label slug>, so bridge those old URLs here.
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          ['Cases', 'case-studies'],
          ['CTF', 'ctf'],
          ['CTF/Writeups', 'writeups'],
          ['Investigations', 'investigations'],
          ['Investigations/Platforms', 'platform-guides'],
          ['Investigations/Techniques', 'investigation-techniques'],
          ['Security', 'security--analysis'],
          ['Security/Analysis', 'analysis'],
          ['Security/Pentesting', 'penetration-testing'],
        ]
          .map(([from, slug]) => ({
            from: `/intel-codex/${from}`,
            to: `/intel-codex/category/${slug}`,
          }))
          .concat({
            from: '/intel-codex/Cases/2025-001-Example-Investigation/README',
            to: '/intel-codex/Cases/2025-001-Example-Investigation',
          }),
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
          '**/.omc/**',
          '**/Case-Template/**',
          '**/Student-Exercises/**',
          // Hub for Case-Template and Student-Exercises, both excluded above.
          '**/Cases/README.md',
          'CONTRIBUTING.md',
          'README.md', // README.md is for GitHub, index.md is for Docusaurus
          'CLAUDE.md',
          '**/CLAUDE.md'
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
          blogDescription: 'Articles on cybersecurity, OSINT, AI tools, prompt engineering, penetration testing, and developer productivity.',
          postsPerPage: 30,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL', // Show all posts in sidebar instead of default 5
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
          ignorePatterns: [
            '/intel-codex/**',
            '**/tags/**',
            '**/category/**',
            '/search/**',
            '/page/**',
            '/blog/archive',
            '/blog/authors',
          ],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // SEO: Social card for link previews (Open Graph, Twitter Cards)
    image: 'img/global01.jpg',

    // SEO: Additional metadata tags
    metadata: [
      {name: 'keywords', content: 'cybersecurity, osint, digital forensics, penetration testing, reverse engineering, malware analysis, AI security, intelligence gathering'},
      {name: 'author', content: 'gl0bal01'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@gl0bal01'},
      {name: 'twitter:creator', content: '@gl0bal01'},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:site_name', content: 'gl0bal01'},
      {property: 'og:type', content: 'website'},
    ],

    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
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
        alt: 'gl0bal01 - Security Research & OSINT',
        // 96px source: the logo renders at 32 CSS px, so 48px was blurry on 2x/3x screens.
        src: '/icons/android-icon-96x96.png',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'intelCodexSidebar',
          position: 'left',
          label: 'Intel Codex',
          docsPluginId: 'intel-codex',
        },
        {
          label: 'Guides',
          position: 'left',
          items: [
            {to: '/osint', label: 'OSINT'},
            {to: '/cyber', label: 'Cybersecurity'},
            {to: '/reverse-engineering', label: 'Reverse Engineering'},
          ],
        },
        {to: '/cheatsheets', label: 'Cheatsheets', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/news', label: 'News', position: 'left'},
        {
          to: '/links',
          label: 'Links',
          position: 'right',
          className: 'header-links-cta',
          // Kept: stops screen readers announcing the CSS ✦ and → glyphs around the label.
          'aria-label': 'All my links — socials, projects, community',
        },
      ],
    },
footer: {
    style: 'dark',
    links: [
      {
        title: 'Intel Codex',
        items: [
          {label: 'Overview', to: '/intel-codex'},
          {label: 'Investigations', to: '/intel-codex/Investigations/Investigations-Index'},
          {label: 'Pentesting', to: '/intel-codex/Security/Pentesting/Pentesting-Index'},
          {label: 'Security Analysis', to: '/intel-codex/Security/Analysis/Analysis-Index'},
          {label: 'Get the vault', href: 'https://github.com/gl0bal01/intel-codex'},
        ],
      },
      {
        title: 'Learn',
        items: [
          {label: 'OSINT Foundations', to: '/osint'},
          {label: 'Cybersecurity', to: '/cyber'},
          {label: 'Reverse Engineering', to: '/reverse-engineering'},
          {label: 'Cheatsheets', to: '/cheatsheets'},
        ],
      },
      {
        title: 'Read',
        items: [
          {label: 'Blog', to: '/blog'},
          {label: 'News', to: '/news'},
          // pathname:// = static file, not a route: plain <a>, skipped by the broken-link check.
          {label: 'RSS feed', to: 'pathname:///blog/rss.xml'},
        ],
      },
      {
        title: 'Projects',
        items: [
          {label: 'CaseBandit', href: 'https://casebandit.com/'},
          {label: 'YouArePlayer', href: 'https://youareplayer.com/'},
        ],
      },
      {
        title: 'Elsewhere',
        items: [
          {label: 'GitHub', href: 'https://github.com/gl0bal01'},
          {label: 'X', href: 'https://x.com/gl0bal01'},
          {label: 'Discord', href: 'http://join.gl0bal01.com'},
          {label: 'Start.me', href: 'https://start.me/u/gl0bal01'},
          {label: 'All links', to: '/links'},
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} gl0bal01. Built with Docusaurus.`,
  },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'typescript', 'php', 'yaml', 'go', 'sql', 'python', 'powershell', 'c', 'toml', 'nix', 'lua'],
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
    // Preconnect to Google Tag Manager
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://www.googletagmanager.com',
      },
    },
    // DNS prefetch for third-party domains
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
    // Apple touch icon
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-icon-180x180.png',
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
    // JSON-LD: WebSite schema with SearchAction (enables Google sitelinks search box)
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://gl0bal01.com/#website',
            url: 'https://gl0bal01.com',
            name: 'gl0bal01',
            description: 'Security research, penetration testing, OSINT, digital investigation techniques, and cybersecurity education resources.',
            inLanguage: 'en',
            publisher: {
              '@id': 'https://gl0bal01.com/#organization',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://gl0bal01.com/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@type': 'Organization',
            '@id': 'https://gl0bal01.com/#organization',
            name: 'gl0bal01',
            url: 'https://gl0bal01.com',
            description: 'Security research, penetration testing, OSINT, digital investigation techniques, and cybersecurity education.',
            logo: {
              '@type': 'ImageObject',
              url: 'https://gl0bal01.com/icons/android-icon-192x192.png',
              width: 192,
              height: 192,
            },
            sameAs: [
              'https://github.com/gl0bal01',
              'https://x.com/gl0bal01',
              'http://join.gl0bal01.com',
              'https://start.me/u/gl0bal01',
            ],
          },
          {
            '@type': 'Person',
            '@id': 'https://gl0bal01.com/#author',
            name: 'gl0bal01',
            url: 'https://gl0bal01.com',
            image: 'https://github.com/gl0bal01.png',
            jobTitle: 'Researcher',
            sameAs: [
              'https://github.com/gl0bal01',
              'https://x.com/gl0bal01',
            ],
          },
        ],
      }),
    },
  ],
};

export default config;
