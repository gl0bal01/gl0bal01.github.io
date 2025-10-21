// Type Definitions for Docusaurus Obsidian Vault Plugin

export interface ObsidianPluginOptions {
  // Source vault configuration
  vaultSource: VaultSource;

  // Destination in Docusaurus docs
  docsPath: string; // e.g., 'docs/intel-codex'

  // Transformation options
  transformations?: TransformationOptions;

  // Asset handling
  assetsPath?: string; // Where to copy images/files (default: 'static/img/intel-codex')

  // Filtering
  exclude?: string[]; // Glob patterns to exclude (e.g., ['**/.obsidian/**', '**/Case-Template/**'])
  include?: string[]; // Glob patterns to include (default: ['**/*.md'])

  // Category generation
  generateCategories?: boolean; // Auto-generate _category_.json files (default: true)
  categoryLabels?: Record<string, string>; // Custom category labels
  categoryIndexFile?: string; // Filename to use as category index (e.g., 'START.md', 'README.md')

  // Banners
  bannerTop?: string; // Optional banner to add at top of each file (after frontmatter)
  bannerBottom?: string; // Optional banner to add at bottom of each file

  // Debug
  debug?: boolean;
}

export interface VaultSource {
  // GitHub repository
  type: 'github' | 'local';

  // For GitHub source
  repository?: string; // e.g., 'gl0bal01/intel-codex'
  branch?: string; // default: 'main'

  // For local source
  path?: string; // e.g., 'C:\\Users\\greni\\Desktop\\WEBSITE\\intel-codex'

  // Authentication (for private repos)
  token?: string; // GitHub token (use env var: process.env.GITHUB_TOKEN)
}

export interface TransformationOptions {
  // Wikilink conversion
  convertWikilinks?: boolean; // Default: true
  wikilinkStyle?: 'relative' | 'absolute'; // Default: 'relative'

  // Obsidian callouts → Docusaurus admonitions
  convertCallouts?: boolean; // Default: true

  // Preserve frontmatter
  preserveFrontmatter?: boolean; // Default: true

  // Custom transformations
  customTransformers?: CustomTransformer[];
}

export interface CustomTransformer {
  name: string;
  transform: (content: string, filePath: string) => string;
}

export interface VaultData {
  files: VaultFile[];
  categories: CategoryInfo[];
  stats: VaultStats;
  lastSynced: string;
}

export interface VaultFile {
  // Original file info
  sourcePath: string; // Path in Obsidian vault
  destinationPath: string; // Path in Docusaurus docs

  // Content
  originalContent: string;
  transformedContent: string;

  // Metadata
  frontmatter?: Record<string, any>;
  title?: string;
  tags?: string[];

  // File info
  size: number;
  modified: Date;
  created?: Date;
}

export interface CategoryInfo {
  path: string; // Directory path
  label: string; // Display label
  position?: number; // Sidebar position
  collapsed?: boolean; // Default collapsed state
  link?: {
    type: 'generated-index' | 'doc';
    slug?: string;
  };
}

export interface VaultStats {
  totalFiles: number;
  totalSize: number;
  categoriesGenerated: number;
  wikilinsConverted: number;
  calloutsConverted: number;
  assetscopied: number;
}

// Internal plugin types
export interface ProcessingResult {
  success: boolean;
  filesProcessed: number;
  errors: ProcessingError[];
}

export interface ProcessingError {
  file: string;
  error: string;
  type: 'transformation' | 'copy' | 'category';
}
