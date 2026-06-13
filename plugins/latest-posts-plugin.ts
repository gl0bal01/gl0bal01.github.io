// Latest-Posts Plugin for Docusaurus
// Reads blog frontmatter at build time and exposes the newest N posts as global
// data, so the /links page always reflects the real latest posts on each build.
import type { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';

export interface LatestPost {
  title: string;
  description: string;
  permalink: string;
  date: string; // YYYY-MM-DD
}

interface LatestPostsOptions {
  blogDir?: string;
  count?: number;
  routeBasePath?: string;
}

interface LatestPostsContent {
  posts: LatestPost[];
}

const FILE_RE = /^(\d{4}-\d{2}-\d{2})-(.*)\.mdx?$/;

export default function latestPostsPlugin(
  context: LoadContext,
  options: LatestPostsOptions = {}
): Plugin<LatestPostsContent> {
  const { blogDir = 'blog', count = 2, routeBasePath = 'blog' } = options;

  return {
    name: 'latest-posts-plugin',

    async loadContent(): Promise<LatestPostsContent> {
      const dir = path.resolve(context.siteDir, blogDir);
      let files: string[] = [];
      try {
        files = fs.readdirSync(dir);
      } catch {
        return { posts: [] };
      }

      const collected: (LatestPost & { ts: number })[] = [];

      for (const file of files) {
        const fileMatch = file.match(FILE_RE);
        if (!fileMatch) continue;

        let raw: string;
        try {
          raw = fs.readFileSync(path.join(dir, file), 'utf8');
        } catch {
          continue;
        }

        const { data } = matter(raw);
        if (data.draft === true || data.unlisted === true) continue;

        const [, fileDate, fileSlugPart] = fileMatch;
        const title = typeof data.title === 'string' ? data.title : fileSlugPart;
        const description = typeof data.description === 'string' ? data.description : '';
        const slug =
          typeof data.slug === 'string' && data.slug
            ? data.slug.replace(/^\//, '')
            : fileSlugPart;

        // Prefer frontmatter date, fall back to the filename date prefix.
        let ts = 0;
        let dateStr = fileDate;
        if (data.date) {
          const d = new Date(data.date as string);
          if (!Number.isNaN(d.getTime())) {
            ts = d.getTime();
            dateStr = d.toISOString().slice(0, 10);
          }
        }
        if (!ts) {
          const d = new Date(fileDate);
          ts = Number.isNaN(d.getTime()) ? 0 : d.getTime();
        }

        const base = routeBasePath ? `/${routeBasePath.replace(/^\/|\/$/g, '')}` : '';
        const permalink = `${base}/${slug}`;

        collected.push({ title, description, permalink, date: dateStr, ts });
      }

      // Date desc, then permalink desc to break same-day ties deterministically
      // (otherwise readdirSync order would leak into the result across environments).
      collected.sort((a, b) => b.ts - a.ts || (a.permalink < b.permalink ? 1 : -1));

      const posts = collected.slice(0, count).map(({ ts: _ts, ...rest }) => rest);
      return { posts };
    },

    async contentLoaded({ content, actions }): Promise<void> {
      actions.setGlobalData({ posts: content?.posts ?? [] });
    },
  };
}
