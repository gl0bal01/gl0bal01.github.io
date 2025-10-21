// Obsidian → Docusaurus Transformation Utilities

/**
 * Convert Obsidian wikilinks to Docusaurus markdown links
 * Handles: [[path/to/file|Display]] → [Display](./path/to/file.md)
 *          [[path/to/file]] → [file](./path/to/file.md)
 *
 * Note: Obsidian wikilinks are always relative to vault root.
 * We need to calculate the correct relative path from the current file.
 */
export function convertWikilinks(
  content: string,
  currentFilePath: string,
  fileIndex?: Map<string, string>
): string {
  // Pattern: [[link]] or [[link|display text]]
  const wikilinkPattern = /\[\[([^\]|]+)(\|([^\]]+))?\]\]/g;

  // Normalize path separators for cross-platform compatibility
  const normalizedCurrentPath = currentFilePath.replace(/\\/g, '/');

  // Calculate how many levels up we need to go from current file to vault root
  const currentDir = normalizedCurrentPath.includes('/')
    ? normalizedCurrentPath.substring(0, normalizedCurrentPath.lastIndexOf('/'))
    : '';
  const levelsUp = currentDir ? currentDir.split('/').length : 0;
  const pathToRoot = levelsUp > 0 ? '../'.repeat(levelsUp) : './';

  return content.replace(wikilinkPattern, (match, linkPath, _, displayText) => {
    // Clean up the link path
    let cleanPath = linkPath.trim();

    // Remove heading anchors (e.g., "file#heading" → "file")
    const [pathWithoutAnchor, anchor] = cleanPath.split('#');
    cleanPath = pathWithoutAnchor;

    // Strip any leading ../ or ./ prefixes (these are relative path indicators)
    // In Obsidian, wikilinks should be vault-root-relative, so we normalize them
    cleanPath = cleanPath.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');

    // Resolve using file index if available
    if (fileIndex) {
      if (!cleanPath.includes('/')) {
        // Filename-only: direct lookup
        const fullPath = fileIndex.get(cleanPath);
        if (fullPath) {
          cleanPath = fullPath;
        }
      } else {
        // Partial path: check if any file ends with this path
        // Example: "Techniques/sop-legal-ethics" should match "Investigations/Techniques/sop-legal-ethics"
        const normalizedCleanPath = cleanPath.replace(/\\/g, '/');
        let foundPath: string | undefined;

        for (const [filename, fullPath] of fileIndex.entries()) {
          // Check if the full path ends with the partial path
          if (fullPath.endsWith(normalizedCleanPath)) {
            foundPath = fullPath;
            break;
          }
        }

        // If we found a match, use it; otherwise use the path as-is (assume it's from vault root)
        if (foundPath) {
          cleanPath = foundPath;
        }
      }
    }

    // Ensure .md extension
    if (!cleanPath.endsWith('.md')) {
      cleanPath += '.md';
    }

    // Wikilinks are relative to vault root, so prepend the path to root
    // Example: If current file is "Cases/Example/README.md" (2 levels deep)
    //          and link is "START", result is "../../START.md"
    //          If link is "Investigations/Platforms/twitter", result is "../../Investigations/Platforms/twitter.md"
    const finalPath = pathToRoot + cleanPath;

    // Use display text or extract filename
    const label = displayText?.trim() || extractFilename(linkPath);

    // Reconstruct with anchor if present
    const pathWithAnchor = anchor ? `${finalPath}#${anchor}` : finalPath;

    return `[${label}](${pathWithAnchor})`;
  });
}

/**
 * Extract filename from path
 * "path/to/sop-twitter-x" → "sop-twitter-x"
 */
function extractFilename(path: string): string {
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  return filename.replace(/\.md$/, '');
}

/**
 * Convert Obsidian callouts to Docusaurus admonitions
 * > [!note] Title → :::note Title
 * > Content            Content
 *                      :::
 */
export function convertCallouts(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let inCallout = false;
  let calloutType = '';
  let calloutTitle = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect callout start: > [!type] Title
    const calloutStart = line.match(/^>\s*\[!(note|tip|info|warning|danger|caution)\]\s*(.*)$/i);

    if (calloutStart) {
      // Start new callout
      calloutType = calloutStart[1].toLowerCase();
      calloutTitle = calloutStart[2].trim();
      inCallout = true;

      // Map Obsidian types to Docusaurus types
      const mappedType = mapCalloutType(calloutType);
      result.push(`:::${mappedType}${calloutTitle ? ' ' + calloutTitle : ''}`);
      continue;
    }

    // If in callout and line starts with >, it's callout content
    if (inCallout && line.startsWith('>')) {
      const content = line.replace(/^>\s*/, '');
      result.push(content);
      continue;
    }

    // If in callout and line doesn't start with >, end callout
    if (inCallout && !line.startsWith('>')) {
      result.push(':::');
      result.push('');
      inCallout = false;
    }

    // Regular line
    result.push(line);
  }

  // Close callout if file ends while still in one
  if (inCallout) {
    result.push(':::');
  }

  return result.join('\n');
}

/**
 * Map Obsidian callout types to Docusaurus admonition types
 */
function mapCalloutType(obsidianType: string): string {
  const mapping: Record<string, string> = {
    'note': 'note',
    'tip': 'tip',
    'info': 'info',
    'warning': 'warning',
    'danger': 'danger',
    'caution': 'caution',
    'important': 'warning',
    'success': 'tip',
    'question': 'info',
    'bug': 'danger',
  };

  return mapping[obsidianType.toLowerCase()] || 'note';
}

/**
 * Extract frontmatter from markdown content
 */
export function extractFrontmatter(content: string): {
  frontmatter: Record<string, any> | null;
  body: string;
} {
  const frontmatterPattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterPattern);

  if (!match) {
    return { frontmatter: null, body: content };
  }

  const [, frontmatterContent, body] = match;

  // Parse YAML-like frontmatter (simple key: value pairs)
  const frontmatter: Record<string, any> = {};
  const lines = frontmatterContent.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: any = line.slice(colonIndex + 1).trim();

    // Handle null/undefined
    if (value === 'null' || value === 'undefined' || value === '') {
      continue; // Skip null/empty values
    }

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays (including tags with dash notation)
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1).trim();
      if (arrayContent) {
        value = arrayContent.split(',').map((v: string) => v.trim()).filter(Boolean);
      } else {
        continue; // Skip empty arrays
      }
    }

    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

/**
 * Enhance frontmatter for Docusaurus
 */
export function enhanceFrontmatter(
  frontmatter: Record<string, any> | null,
  filename: string
): Record<string, any> {
  const enhanced: Record<string, any> = frontmatter ? { ...frontmatter } : {};

  // Ensure sidebar_label or title exists
  if (!enhanced.sidebar_label && !enhanced.title) {
    // Extract just the basename from the path (handle both / and \ separators)
    const basename = filename.split(/[/\\]/).pop() || filename;
    enhanced.sidebar_label = formatTitle(basename);
  }

  // Map Obsidian tags to Docusaurus tags
  if (enhanced.tags && Array.isArray(enhanced.tags)) {
    enhanced.tags = enhanced.tags.map((tag: string) =>
      tag.replace(/^#/, '')
    );
  }

  return enhanced;
}

/**
 * Format filename into readable title
 * "sop-platform-twitter-x" → "Platform Twitter X"
 */
function formatTitle(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/^sop-/, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Reconstruct markdown with frontmatter
 */
export function reconstructMarkdown(
  frontmatter: Record<string, any>,
  body: string
): string {
  const frontmatterLines = Object.entries(frontmatter).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: [${value.join(', ')}]`;
    }
    if (typeof value === 'string' && value.includes(':')) {
      return `${key}: "${value}"`;
    }
    return `${key}: ${value}`;
  });

  return `---\n${frontmatterLines.join('\n')}\n---\n\n${body}`;
}

/**
 * Escape MDX-problematic characters
 * Fixes: `<2` or `<4` in tables, and `<query>` in URLs being parsed as invalid HTML tags
 */
export function escapeMDXCharacters(content: string): string {
  let result = content;

  // Fix self-closing tags: <br> → <br /> (MDX requires proper self-closing syntax)
  result = result.replace(/<br>/gi, '<br />');
  result = result.replace(/<hr>/gi, '<hr />');

  // Replace < followed by a digit with escaped version
  // This prevents MDX from trying to parse `<2048` as a tag
  result = result.replace(/<(\d)/g, '&lt;$1');

  // Replace <word> placeholders in URLs/text (but not actual HTML tags)
  // Common patterns: <query>, <username>, <id>, etc.
  // Only escape lowercase single-word patterns that aren't known HTML tags
  const knownHTMLTags = ['a', 'b', 'i', 'u', 'p', 'div', 'span', 'img', 'br', 'hr', 'code', 'pre', 'table', 'tr', 'td', 'th'];
  result = result.replace(/<([a-z][\w-]*?)>/gi, (match, tagName) => {
    // Don't escape known HTML tags or self-closing tags
    if (knownHTMLTags.includes(tagName.toLowerCase()) || content.includes(`</${tagName}>`)) {
      return match;
    }
    return `&lt;${tagName}&gt;`;
  });

  return result;
}

/**
 * Resolve relative markdown links to work in Docusaurus
 * Handles: [text](../path/file.md) → [text](../path/file)
 *          [text](./file.md) → [text](./file)
 *          [text](path/file.md) → [text](path/file)
 *
 * Docusaurus expects links without .md extension for internal docs
 */
export function resolveRelativeLinks(content: string): string {
  // Pattern: [text](path.md) where path:
  // - starts with ./ or ../ (explicit relative)
  // - OR is a simple path without http:// or https:// (implicit relative)
  const relativeLinkPattern = /\[([^\]]+)\]\((?!https?:\/\/)([^)]+\.md(?:#[^)]*)?)\)/g;

  return content.replace(relativeLinkPattern, (match, linkText, linkPath) => {
    // Remove .md extension for Docusaurus
    // Keep anchor if present (e.g., file.md#section → file#section)
    const cleanPath = linkPath.replace(/\.md(#|$)/, '$1');

    return `[${linkText}](${cleanPath})`;
  });
}

/**
 * Add banners to content
 */
export function addBanners(
  content: string,
  bannerTop?: string,
  bannerBottom?: string
): string {
  let result = content;

  // Add top banner (after frontmatter if present)
  if (bannerTop) {
    const frontmatterPattern = /^(---\n[\s\S]*?\n---\n\n?)/;
    const match = result.match(frontmatterPattern);

    if (match) {
      // Insert banner after frontmatter
      const frontmatter = match[1];
      const rest = result.slice(frontmatter.length);
      result = `${frontmatter}\n${bannerTop}\n\n${rest}`;
    } else {
      // Insert banner at the very top
      result = `${bannerTop}\n\n${result}`;
    }
  }

  // Add bottom banner
  if (bannerBottom) {
    result = `${result}\n\n---\n\n${bannerBottom}`;
  }

  return result;
}

/**
 * Main transformation pipeline
 */
export function transformObsidianContent(
  content: string,
  filename: string,
  options: {
    convertWikilinks?: boolean;
    convertCallouts?: boolean;
    preserveFrontmatter?: boolean;
    resolveRelativeLinks?: boolean;
    bannerTop?: string;
    bannerBottom?: string;
    fileIndex?: Map<string, string>;
  } = {}
): string {
  const {
    convertWikilinks: doWikilinks = true,
    convertCallouts: doCallouts = true,
    preserveFrontmatter = true,
    resolveRelativeLinks: doResolveLinks = true,
    bannerTop,
    bannerBottom,
    fileIndex,
  } = options;

  // Extract frontmatter
  const { frontmatter, body } = extractFrontmatter(content);

  // Transform body
  let transformedBody = body;

  // Escape MDX-problematic characters first
  transformedBody = escapeMDXCharacters(transformedBody);

  if (doWikilinks) {
    transformedBody = convertWikilinks(transformedBody, filename, fileIndex);
  }

  // Resolve relative markdown links (important: do this after wikilinks conversion)
  if (doResolveLinks) {
    transformedBody = resolveRelativeLinks(transformedBody);
  }

  if (doCallouts) {
    transformedBody = convertCallouts(transformedBody);
  }

  // Enhance and reconstruct frontmatter
  let finalContent: string;
  if (preserveFrontmatter) {
    const enhanced = enhanceFrontmatter(frontmatter, filename);
    finalContent = reconstructMarkdown(enhanced, transformedBody);
  } else {
    finalContent = transformedBody;
  }

  // Add banners (after all transformations)
  if (bannerTop || bannerBottom) {
    finalContent = addBanners(finalContent, bannerTop, bannerBottom);
  }

  return finalContent;
}
