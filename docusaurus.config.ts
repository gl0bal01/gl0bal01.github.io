import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ma Documentation TypeScript',
  tagline: 'Documentation technique avancée avec TypeScript',
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
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
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
    // Remplacer par votre image de réseau social
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Ma Documentation',
      logo: {
        alt: 'Logo du Site',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/gl0bal01/gl0bal01.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Communauté',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'Plus',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/gl0bal01/gl0bal01.github.io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} gl0bal01.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'typescript', 'php', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;