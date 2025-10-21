// Docusaurus Plugin for Obsidian Vault Integration
import type { LoadContext, Plugin } from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';
import type {
  ObsidianPluginOptions,
  VaultData,
  VaultFile,
  CategoryInfo,
  VaultStats,
} from '../src/obsidian-vault-plugin/types/obsidian';
import {
  transformObsidianContent,
  extractFrontmatter,
} from '../src/obsidian-vault-plugin/utils/transformers';

export default function obsidianVaultPlugin(
  context: LoadContext,
  options: ObsidianPluginOptions
): Plugin<VaultData> {
  // 🔥 CRITICAL: Create destination folder IMMEDIATELY in plugin initialization
  // This ensures the folder exists BEFORE @docusaurus/plugin-content-docs tries to load it
  const destPath = path.join(context.siteDir, options.docsPath);
  if (!fs.existsSync(destPath)) {
    console.log(`[Obsidian Vault] Creating placeholder folder: ${destPath}`);
    fs.mkdirSync(destPath, { recursive: true });

    // Create a placeholder file so the docs plugin doesn't error
    const placeholderPath = path.join(destPath, '.placeholder.md');
    if (!fs.existsSync(placeholderPath)) {
      fs.writeFileSync(
        placeholderPath,
        '---\ntitle: Loading Intel Codex...\nsidebar_position: 1\n---\n\n# Intel Codex\n\nVault is syncing...',
        'utf-8'
      );
    }
  }

  return {
    name: 'docusaurus-plugin-obsidian-vault',

    async loadContent(): Promise<VaultData> {
      console.log('[Obsidian Vault] Starting vault sync...');

      const vaultData: VaultData = {
        files: [],
        categories: [],
        stats: {
          totalFiles: 0,
          totalSize: 0,
          categoriesGenerated: 0,
          wikilinsConverted: 0,
          calloutsConverted: 0,
          assetscopied: 0,
        },
        lastSynced: new Date().toISOString(),
      };

      const {
        vaultSource,
        docsPath,
        assetsPath = 'static/img/obsidian-vault',
        exclude = ['**/.obsidian/**', '**/.git/**', '**/node_modules/**'],
        include = ['**/*.md'],
        transformations = {},
        generateCategories = true,
        categoryLabels = {},
        categoryIndexFile,
        bannerTop,
        bannerBottom,
        debug = false,
      } = options;

      // Determine source path
      let sourcePath: string;
      if (vaultSource.type === 'local') {
        sourcePath = vaultSource.path!;
      } else {
        // For GitHub source, we'll use a temp directory or expect GitHub Actions to clone
        console.log('[Obsidian Vault] GitHub source detected. Ensure vault is cloned via GitHub Actions.');
        sourcePath = vaultSource.path || path.join(process.cwd(), '.temp-vault');
      }

      if (!fs.existsSync(sourcePath)) {
        console.warn(`[Obsidian Vault] Source path does not exist: ${sourcePath}`);
        return vaultData;
      }

      // Destination path (relative to Docusaurus root)
      const destPath = path.join(context.siteDir, docsPath);
      const assetsDestPath = path.join(context.siteDir, assetsPath);

      if (debug) {
        console.log('[Obsidian Vault] Config:', {
          sourcePath,
          destPath,
          assetsDestPath,
        });
      }

      // Ensure destination directories exist
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      if (!fs.existsSync(assetsDestPath)) {
        fs.mkdirSync(assetsDestPath, { recursive: true });
      }

      // Scan vault for markdown files
      const files = scanDirectory(sourcePath, sourcePath, include, exclude);

      if (debug) {
        console.log(`[Obsidian Vault] Found ${files.length} markdown files`);
      }

      // Track categories
      const categorySet = new Set<string>();

      // Build file index for wikilink resolution (filename -> relative path)
      const fileIndex = new Map<string, string>();
      for (const file of files) {
        const relativePath = path.relative(sourcePath, file).replace(/\\/g, '/');
        const filename = path.basename(file, '.md');
        fileIndex.set(filename, relativePath.replace(/\.md$/, ''));
      }

      if (debug) {
        console.log(`[Obsidian Vault] Built file index with ${fileIndex.size} files`);
      }

      // Process each file
      for (const file of files) {
        try {
          const relativePath = path.relative(sourcePath, file);
          const destFilePath = path.join(destPath, relativePath);
          const destDir = path.dirname(destFilePath);

          // Ensure destination directory exists
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }

          // Read file
          const originalContent = fs.readFileSync(file, 'utf-8');

          // Transform content (pass relative path for correct link resolution)
          const transformedContent = transformObsidianContent(
            originalContent,
            relativePath, // Use full relative path, not just basename
            {
              ...transformations,
              bannerTop,
              bannerBottom,
              fileIndex, // Pass file index for wikilink resolution
            }
          );

          // Extract frontmatter for metadata
          const { frontmatter } = extractFrontmatter(transformedContent);

          // Write transformed file
          fs.writeFileSync(destFilePath, transformedContent, 'utf-8');

          // Get file stats
          const stats = fs.statSync(file);

          // Add to vault data
          const vaultFile: VaultFile = {
            sourcePath: relativePath,
            destinationPath: path.relative(destPath, destFilePath),
            originalContent,
            transformedContent,
            frontmatter: frontmatter || undefined,
            title: frontmatter?.title || frontmatter?.sidebar_label,
            tags: frontmatter?.tags,
            size: stats.size,
            modified: stats.mtime,
            created: stats.birthtime,
          };

          vaultData.files.push(vaultFile);
          vaultData.stats.totalFiles++;
          vaultData.stats.totalSize += stats.size;

          // Track category
          const category = path.dirname(relativePath);
          if (category && category !== '.') {
            categorySet.add(category);
          }

          if (debug) {
            console.log(`[Obsidian Vault] Processed: ${relativePath}`);
          }
        } catch (error) {
          console.error(`[Obsidian Vault] Error processing ${file}:`, error);
        }
      }

      // Generate _category_.json files
      if (generateCategories) {
        // Handle root-level category (for docs/intel-codex itself)
        if (categoryIndexFile) {
          const rootIndexPath = path.join(destPath, categoryIndexFile);
          if (fs.existsSync(rootIndexPath)) {
            const rootCategoryFile = path.join(destPath, '_category_.json');
            const rootLabel = categoryLabels[''] || categoryLabels[path.basename(docsPath)] || formatCategoryLabel(path.basename(docsPath));

            // Doc IDs in _category_.json are ALWAYS relative to docs root (not category)
            // docsPath is 'docs/intel-codex', so we need to extract 'intel-codex'
            const categoryPath = docsPath.split(/[\/\\]/).pop() || path.basename(docsPath);
            const docId = `${categoryPath}/${categoryIndexFile}`.replace(/\.md$/, '').replace(/\\/g, '/');

            const rootCategoryData = {
              label: rootLabel,
              collapsed: false,
              link: {
                type: 'doc',
                id: docId,
              },
            };

            fs.writeFileSync(rootCategoryFile, JSON.stringify(rootCategoryData, null, 2), 'utf-8');

            if (debug) {
              console.log(`[Obsidian Vault] Generated root category with index: ${categoryIndexFile} (ID: ${docId})`);
            }
          }
        }

        // Handle subdirectory categories
        for (const category of categorySet) {
          const categoryPath = path.join(destPath, category);
          const categoryFile = path.join(categoryPath, '_category_.json');

          // Get custom label or generate from folder name
          const folderName = path.basename(category);
          const label = categoryLabels[category] || categoryLabels[folderName] || formatCategoryLabel(folderName);

          // Check if category has an index file
          let categoryData: any = {
            label,
            collapsed: false,
          };

          if (categoryIndexFile) {
            const indexFilePath = path.join(categoryPath, categoryIndexFile);
            if (fs.existsSync(indexFilePath)) {
              // Doc IDs must include the vault name prefix (e.g., 'intel-codex/Investigations/START')
              const vaultName = docsPath.split(/[\/\\]/).pop() || path.basename(docsPath);
              const relativeToVault = path.relative(destPath, indexFilePath).replace(/\\/g, '/').replace(/\.md$/, '');
              const docId = `${vaultName}/${relativeToVault}`;

              categoryData.link = {
                type: 'doc',
                id: docId,
              };

              if (debug) {
                console.log(`[Obsidian Vault] Category ${category} linked to ${categoryIndexFile} (ID: ${docId})`);
              }
            } else {
              // Fall back to generated index
              categoryData.link = {
                type: 'generated-index',
                description: `Documentation for ${label}`,
              };
            }
          } else {
            // No index file specified, use generated index
            categoryData.link = {
              type: 'generated-index',
              description: `Documentation for ${label}`,
            };
          }

          fs.writeFileSync(categoryFile, JSON.stringify(categoryData, null, 2), 'utf-8');

          vaultData.categories.push({
            path: category,
            label,
            collapsed: false,
            link: categoryData.link,
          });

          vaultData.stats.categoriesGenerated++;

          if (debug) {
            console.log(`[Obsidian Vault] Generated category: ${category}`);
          }
        }
      }

      // Copy assets (images, PDFs, etc.)
      const assetExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.pdf', '.webp'];
      const assetFiles = scanDirectory(
        sourcePath,
        sourcePath,
        assetExtensions.map(ext => `**/*${ext}`),
        exclude
      );

      for (const assetFile of assetFiles) {
        try {
          const relativePath = path.relative(sourcePath, assetFile);
          const destAssetPath = path.join(assetsDestPath, relativePath);
          const destAssetDir = path.dirname(destAssetPath);

          if (!fs.existsSync(destAssetDir)) {
            fs.mkdirSync(destAssetDir, { recursive: true });
          }

          fs.copyFileSync(assetFile, destAssetPath);
          vaultData.stats.assetscopied++;

          if (debug) {
            console.log(`[Obsidian Vault] Copied asset: ${relativePath}`);
          }
        } catch (error) {
          console.error(`[Obsidian Vault] Error copying asset ${assetFile}:`, error);
        }
      }

      // Clean up placeholder file if it exists
      const placeholderPath = path.join(destPath, '.placeholder.md');
      if (fs.existsSync(placeholderPath)) {
        fs.unlinkSync(placeholderPath);
        if (debug) {
          console.log('[Obsidian Vault] Removed placeholder file');
        }
      }

      console.log('[Obsidian Vault] Sync complete:', vaultData.stats);

      return vaultData;
    },

    async contentLoaded({ content, actions }): Promise<void> {
      const { createData } = actions;

      // Create vault data file for potential use by components
      await createData('vault-stats.json', JSON.stringify(content.stats, null, 2));

      if (options.debug) {
        await createData('vault-data.json', JSON.stringify(content, null, 2));
      }
    },

    getPathsToWatch(): string[] {
      // Watch the vault source path if it's local
      if (options.vaultSource.type === 'local' && options.vaultSource.path) {
        return [path.join(options.vaultSource.path, '**/*.md')];
      }
      return [];
    },
  };
}

/**
 * Scan directory for files matching patterns
 */
function scanDirectory(
  dir: string,
  baseDir: string,
  includePatterns: string[],
  excludePatterns: string[]
): string[] {
  const results: string[] = [];

  function scan(currentDir: string) {
    if (!fs.existsSync(currentDir)) return;

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      // Check exclusions
      if (shouldExclude(relativePath, excludePatterns)) {
        continue;
      }

      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile()) {
        // Check inclusions
        if (shouldInclude(relativePath, includePatterns)) {
          results.push(fullPath);
        }
      }
    }
  }

  scan(dir);
  return results;
}

/**
 * Check if path should be excluded
 */
function shouldExclude(relativePath: string, excludePatterns: string[]): boolean {
  // Normalize path separators for matching
  const normalizedPath = relativePath.replace(/\\/g, '/');

  return excludePatterns.some(pattern => {
    const regex = globToRegex(pattern);
    return regex.test(normalizedPath);
  });
}

/**
 * Check if path should be included
 */
function shouldInclude(relativePath: string, includePatterns: string[]): boolean {
  // Normalize path separators for matching
  const normalizedPath = relativePath.replace(/\\/g, '/');

  return includePatterns.some(pattern => {
    const regex = globToRegex(pattern);
    return regex.test(normalizedPath);
  });
}

/**
 * Convert glob pattern to regex (simple implementation)
 */
function globToRegex(pattern: string): RegExp {
  // Normalize path separators to forward slashes
  const normalizedPattern = pattern.replace(/\\/g, '/');

  const regexPattern = normalizedPattern
    .replace(/\./g, '\\.')
    .replace(/\*\*/g, '__DOUBLE_STAR__')
    .replace(/\*/g, '[^/]*')
    .replace(/__DOUBLE_STAR__/g, '.*')
    .replace(/\?/g, '.');

  // Handle the case where ** at the start should match zero or more directories
  // Example: **/*.md should match both "file.md" and "dir/file.md"
  const finalPattern = regexPattern
    .replace(/^\.\*\//, '(.*/)?' )  // **/ at start becomes optional directory path
    .replace(/\/\.\*$/, '(/.*)?');   // /** at end becomes optional directory path

  return new RegExp(`^${finalPattern}$`, 'i'); // Case-insensitive for Windows
}

/**
 * Format category label from folder name
 */
function formatCategoryLabel(folderName: string): string {
  return folderName
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export { obsidianVaultPlugin };
