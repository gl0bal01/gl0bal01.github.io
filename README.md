# gl0bal01.com

[![Deploy](https://github.com/gl0bal01/gl0bal01.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/gl0bal01/gl0bal01.github.io/actions/workflows/deploy.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0-brightgreen)](https://nodejs.org/)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.9.1-blue)](https://docusaurus.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Open%20Source-green)](LICENSE)

Security research, OSINT techniques, and digital investigation methodologies.

**Live Site:** [gl0bal01.com](https://gl0bal01.com)

---

## Overview

This repository contains a Docusaurus-based documentation site covering:

- Cybersecurity research and penetration testing methodologies
- OSINT techniques and digital investigation frameworks
- AI applications in security contexts
- Reverse engineering and binary analysis
- Technical reference materials and cheatsheets

The site includes a custom RSS aggregation plugin that fetches and displays security news from multiple industry sources.

---

## Architecture

### Content Structure

```
docs/
├── ai/                        # AI research
├── cyber/                     # Cybersecurity
├── osint/                     # OSINT methodologies
├── reverse-engineering/       # Binary analysis
└── cheatsheets/               # Reference guides

blog/                          # Blog posts
src/pages/                     # Custom pages (news, feeds)
plugins/                       # Custom Docusaurus plugins
static/                        # Static assets
```

---

## Development

### Prerequisites

- Node.js >= 18.0
- npm

### Commands

```bash
npm install          # Install dependencies
npm start            # Start dev server (localhost:3000)
npm run build        # Build static site
npm run typecheck    # Run TypeScript checks
npm run clear        # Clear Docusaurus cache
npm run serve        # Preview production build
npm run deploy       # Deploy to GitHub Pages
```

---

## Technology Stack

- Docusaurus 3.9.1
- TypeScript 5.6
- React 19
- rss-parser
- Algolia DocSearch
- Google Analytics
- Mermaid (diagrams)

---

## Deployment

Deployed to GitHub Pages via the `gh-pages` branch. Custom domain configured at gl0bal01.com.

---

## License

Open source. Available for educational and research purposes.
