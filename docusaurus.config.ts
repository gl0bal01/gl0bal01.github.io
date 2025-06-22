import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Configuration i18n (optionnel)
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
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
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/gl0bal01/gl0bal01.github.io/tree/main/',
          blogTitle: 'Blog',
          blogDescription: 'Exploring neurodiversity, human psychology, and the madness of mind—alongside research in cybersecurity, and digital forensics.',
          postsPerPage: 30,
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
    colorMode: {
      defaultMode: 'dark',
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
    algolia: {
      appId: '4X4QPM0QJE',
      apiKey: '7bd1f7f08cef3ff374e0c7f4f2d89725',
      indexName: 'gl0bal01',
      contextualSearch: true,
      searchPagePath: 'search',
    },
    announcementBar: {
      content: `🎉️ ⭐️ If you like this repo, give it a star and follow me on <a target="_blank" rel="noopener noreferrer" href="https://github.com/gl0bal01/">GitHub</a> 🥳️`,
    },
//    image: 'img/logo.svg',
    navbar: {
      title: 'gl0bal01',
      logo: {
        alt: 'gl0bal01',
        src: '/icons/android-icon-48x48.png',
      },
      items: [
        {to: '/ai', label: 'Ai', position: 'left'},
        {to: '/cyber', label: 'Cyber', position: 'left'},
        {to: '/osint', label: 'Osint', position: 'left'},
        {to: '/cheatsheets', label: 'Cheatsheets', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left', className: 'blog-button'},
        {
          label: 'Links',
          position: 'right',
          items: [
            {
              href: '/blog/ctf-platforms-training',
              label: '🎭 Play & Learn',
              rel: null,
            },
            {
              href: 'https://github.com/gl0bal01/',
              label: 'Github',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://start.me/u/gl0bal01',
              label: 'Start.me',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://github.com/gl0bal01/bookmarklets',
              label: 'Bookmarklets',
              target: '_blank',
              rel: null,
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} gl0bal01. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'typescript', 'php', 'yaml', 'go', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
    headTags: [
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
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@600;700;800&display=swap',
      },
    },
  ],
};

export default config;