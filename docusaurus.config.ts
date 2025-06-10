import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'gl0bal01 | Security Research',
  tagline: 'Security research, penetration testing and digital investigation techniques',
  favicon: 'img/favicon.ico',

  // Configuration spécifique pour gl0bal01.github.io
  url: 'https://gl0bal01.github.io',
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
          editUrl:
            'https://github.com/gl0bal01/gl0bal01.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/gl0bal01/gl0bal01.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
//    image: 'img/logo.svg',
    navbar: {
      title: 'Om̐',
      logo: {
        alt: 'gl0bal01',
        src: '/img/logo.svg',
      },
      items: [
        {to: '/ai', label: 'AI', position: 'left'},
        {to: '/cyber', label: 'Cyber', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
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
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `C0pain Right! © ${new Date().getFullYear()} gl0bal01. Build with Docusaurus.`,
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