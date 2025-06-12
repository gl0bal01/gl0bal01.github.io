import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'gl0bal01 | Research',
  tagline: 'Security research, penetration testing, digital investigation techniques and human madness',
  favicon: 'img/favicon.ico',

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
          showLastUpdateAuthor: true,
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
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
   /* announcementBar: {
      content: `🎉️ ⭐️ If you like this repo, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/gl0bal01/gl0bal01.github.io">GitHub</a> 🥳️`,
    },*/
//    image: 'img/logo.svg',
    navbar: {
      title: '',
      logo: {
        alt: 'gl0bal01',
        src: '/img/logo.svg',
      },
      items: [
        {to: '/ai', label: 'AI', position: 'left'},
        {to: '/cyber', label: 'CYBER', position: 'left'},
        {to: '/osint', label: 'OSINT', position: 'left'},
        {to: '/blog', label: 'BLOG', position: 'left'},
        {to: 'https://github.com/gl0bal01/', label: 'Github', target: '_blank', rel: null, position: 'right'},
        {to: 'https://start.me/u/gl0bal01', label: 'Start.me', target: '_blank', rel: null, position: 'right'},
/*        {
          label: 'Links',
          position: 'right',
          items: [
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
          ],
        },*/
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} gl0bal01. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'typescript', 'php', 'yaml', 'go'],
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