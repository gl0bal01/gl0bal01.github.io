# Docusaurus Custom Plugins

This directory contains custom Docusaurus plugins for this site.

## Available Plugins

### 1. Multi-RSS Plugin (`multi-rss-plugin.ts`)

Aggregates RSS feeds from multiple sources at build time and makes them available to Docusaurus pages.

**Features:**
- Fetches and parses 17+ RSS feeds
- Categorizes feeds (cyber, osint, ai, tech, research, news, exploits)
- Batch processing with configurable concurrency
- Generates JSON data files for component consumption
- Used by `/news`, `/cyber-feeds`, and `/osint-feeds` pages

**Configuration:** See `rss-feeds.config.ts`

---

### 2. Obsidian Vault Plugin (`obsidian-vault-plugin.ts`)

Syncs an Obsidian vault to Docusaurus docs at build time, with automatic content transformation.

**Features:**
- ✅ Local or GitHub-sourced Obsidian vaults
- ✅ Wikilink conversion (`[[link|text]]` → `[text](./link.md)`)
- ✅ Callout/admonition transformation
- ✅ MDX-safe character escaping (`<2048` → `&lt;2048`)
- ✅ Automatic `_category_.json` generation
- ✅ Asset copying (images, PDFs)
- ✅ Frontmatter preservation and enhancement
- ✅ File filtering (exclude templates, internal folders)
- ✅ **Interactive Knowledge Graph** visualization

#### Quick Start

**1. Install** (already done for this project):

```bash
# Plugin files already in place:
# - plugins/obsidian-vault-plugin.ts
# - src/obsidian-vault-plugin/types/obsidian.ts
# - src/obsidian-vault-plugin/utils/transformers.ts
```

**2. Configure** in `docusaurus.config.ts`:

```typescript
plugins: [
  [
    './plugins/obsidian-vault-plugin.ts',
    {
      vaultSource: {
        type: 'local', // or 'github'
        path: 'C:\\path\\to\\your\\obsidian-vault',
      },
      docsPath: 'docs/my-vault',
      assetsPath: 'static/img/my-vault',
      exclude: [
        '**/.obsidian/**',
        '**/.git/**',
        '**/Templates/**',
      ],
      transformations: {
        convertWikilinks: true,
        convertCallouts: true,
        preserveFrontmatter: true,
      },
      generateCategories: true,
      categoryLabels: {
        'Folder Name': 'Display Label',
      },
      debug: false,
    }
  ]
]
```

**3. Build:**

```bash
npm run build
```

The plugin will:
1. Scan your Obsidian vault for `.md` files
2. Transform Obsidian syntax to Docusaurus-compatible markdown
3. Copy files to `docs/my-vault/`
4. Generate category metadata
5. Copy assets to `static/img/my-vault/`

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vaultSource.type` | `'local' \| 'github'` | Required | Source type |
| `vaultSource.path` | `string` | Required | Local path or GitHub clone path |
| `docsPath` | `string` | Required | Destination in Docusaurus (e.g., `docs/vault`) |
| `assetsPath` | `string` | `static/img/obsidian-vault` | Where to copy images/assets |
| `exclude` | `string[]` | `['**/.obsidian/**']` | Glob patterns to exclude |
| `include` | `string[]` | `['**/*.md']` | Glob patterns to include |
| `transformations.convertWikilinks` | `boolean` | `true` | Convert `[[links]]` to markdown |
| `transformations.convertCallouts` | `boolean` | `true` | Convert callouts to admonitions |
| `transformations.preserveFrontmatter` | `boolean` | `true` | Keep YAML frontmatter |
| `generateCategories` | `boolean` | `true` | Auto-generate `_category_.json` |
| `categoryLabels` | `Record<string, string>` | `{}` | Custom category labels |
| `debug` | `boolean` | `false` | Enable debug logging |
| `graph.enabled` | `boolean` | `false` | Enable knowledge graph generation |
| `graph.groupBy` | `'folder' \| 'category' \| 'tags' \| 'custom'` | `'folder'` | How to group nodes |
| `graph.nodeColors` | `Record<string, string>` | Auto-generated | Custom colors per group |

#### Knowledge Graph Visualization

**NEW**: The plugin can generate an interactive force-directed graph showing connections between vault files based on wikilinks.

**1. Enable in config:**

```typescript
plugins: [
  [
    './plugins/obsidian-vault-plugin.ts',
    {
      // ... other config ...
      graph: {
        enabled: true,
        groupBy: 'folder', // or 'category', 'tags', 'custom'
        excludePatterns: ['**/Private/**', '**/Templates/**'],
        nodeColors: {
          'Guides': '#FF6B6B',
          'API': '#4ECDC4',
          'Tutorials': '#45B7D1',
        },
        physics: {
          charge: -300,
          linkDistance: 100,
          centerStrength: 0.1,
        },
        nodeSize: {
          min: 1,
          max: 10,
          scaleFactor: 3,
        },
        includeOrphans: true,
      },
    }
  ]
]
```

**2. Add graph to a page:**

Create `docs/your-vault/knowledge-graph.md`:

```markdown
---
title: Knowledge Graph
---

# Knowledge Graph

import VaultGraph from '@site/src/obsidian-vault-plugin/components/VaultGraph';

<VaultGraph height={700} />
```

**3. Graph features:**

- **Interactive**: Click nodes to navigate, drag to reposition, zoom/pan to explore
- **Search**: Filter nodes by name or tags
- **Category filter**: Show only specific sections
- **Node sizing**: Larger nodes = more connections
- **Color coding**: Different colors for different categories
- **Tooltips**: Hover to see node details
- **Statistics**: View total nodes, links, and most connected documents

**Graph component props:**

```typescript
<VaultGraph
  height={600}              // Graph height in pixels
  showStats={true}          // Show statistics panel
  showControls={true}       // Show search/filter controls
  nodeColors={{}}           // Override config colors
  linkColor="#999999"       // Link color
  enableZoom={true}         // Enable zoom
  enableDrag={true}         // Enable node dragging
/>
```

**Graph grouping strategies:**

- `folder`: Group by immediate parent folder (default)
- `category`: Group by top-level folder
- `tags`: Group by first frontmatter tag
- `custom`: Use a custom function:

```typescript
graph: {
  enabled: true,
  groupBy: 'custom',
  customGroupFn: (file) => {
    if (file.tags?.includes('important')) return 'Important';
    if (file.sourcePath.startsWith('Guides/')) return 'Guides';
    return 'Other';
  },
}
```

**Example: See it in action**

Visit `/intel-codex/knowledge-graph` on this site to see the interactive graph visualization of 41 interconnected SOPs!

**4. Local page graph (automatic):**

When `graph.enabled` is true, the plugin automatically injects a **mini local graph** into each vault page showing the current page's connections:

- **Position**: Top-right corner (fixed)
- **Behavior**: Hover to expand (icon → full graph)
- **Shows**: Current page (blue) + direct neighbors
- **Click**: Navigate to connected pages
- **Mobile**: Hidden on small screens for better UX

The local graph provides a "you are here" visualization and makes it easy to explore related documents without leaving the page.

#### Transformations

**Wikilinks:**
```markdown
<!-- Obsidian -->
[[Investigations/Platforms/sop-platform-twitter-x|Twitter/X SOP]]

<!-- Becomes -->
[Twitter/X SOP](./Investigations/Platforms/sop-platform-twitter-x.md)
```

**Callouts:**
```markdown
<!-- Obsidian -->
> [!warning] Important
> This is a warning callout

<!-- Becomes -->
:::warning Important
This is a warning callout
:::
```

**MDX Escaping:**
```markdown
<!-- Obsidian -->
RSA key size <2048 is weak
URL: https://example.com/search?q=<query>

<!-- Becomes -->
RSA key size &lt;2048 is weak
URL: https://example.com/search?q=&lt;query&gt;
```

**Self-Closing Tags:**
```markdown
<!-- Obsidian -->
Line break<br>here

<!-- Becomes -->
Line break<br />here
```

#### GitHub Actions Auto-Sync

To automatically sync your Obsidian vault from GitHub on each build:

**Option A: Use GitHub Actions to clone vault before build**

```yaml
# .github/workflows/deploy.yml
name: Deploy Docusaurus

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Clone Obsidian Vault
        run: |
          git clone https://github.com/yourusername/your-obsidian-vault.git ./obsidian-vault

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install and Build
        run: |
          npm ci
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

**Option B: Configure plugin for GitHub source**

```typescript
vaultSource: {
  type: 'github',
  repository: 'username/vault-repo',
  branch: 'main',
  path: './temp-vault', // Where GitHub Actions will clone it
}
```

#### Use Case: This Website

This plugin syncs the [intel-codex](https://github.com/gl0bal01/intel-codex) Obsidian vault to `/intel-codex`:

- **Source:** Local vault at `C:\Users\greni\Desktop\WEBSITE\intel-codex`
- **Destination:** `docs/intel-codex/`
- **Excludes:** Templates, case examples, student exercises
- **Result:** 41 SOPs (OSINT, security, pentesting) automatically synced

**Benefits:**
- Edit content in Obsidian (wikilinks, callouts, etc.)
- Build site → Content auto-transforms for Docusaurus
- No manual conversion step needed
- Changes in vault automatically reflect on website

#### Troubleshooting

**Problem: No files found**
- Check `vaultSource.path` is correct
- Ensure `.md` files exist in vault
- Enable `debug: true` to see detailed logs

**Problem: Wikilinks not converting**
- Ensure `transformations.convertWikilinks: true`
- Check wikilink syntax: `[[path/to/file|Display Text]]`

**Problem: MDX compilation errors**
- Common cause: `<word>` in text (e.g., `<query>`)
- Plugin auto-escapes these, but you may need to adjust `escapeMDXCharacters()` in `src/obsidian-vault-plugin/utils/transformers.ts`

**Problem: Frontmatter errors**
- Ensure YAML is valid
- Plugin skips `null` values automatically
- Set `preserveFrontmatter: false` to strip all frontmatter

#### Contributing

This plugin is designed for community use! To improve it:

1. **Add transformers:** Edit `src/obsidian-vault-plugin/utils/transformers.ts`
2. **Add types:** Edit `src/obsidian-vault-plugin/types/obsidian.ts`
3. **Extend plugin:** Edit `plugins/obsidian-vault-plugin.ts`

Pull requests welcome!

#### License

MIT License - Free to use and modify.

---

**Built with ❤️ for the Docusaurus + Obsidian community**
