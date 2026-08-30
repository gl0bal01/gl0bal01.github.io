// Canonical-Mirror Plugin for Docusaurus
// The Intel Codex vault is published twice: here under /intel-codex, and on the
// dedicated site lecodex.xyz. Two live copies each declaring themselves
// canonical split the search authority between them, so this rewrites the
// canonical link of the mirrored pages to point at the dedicated site.
//
// Docusaurus emits its own <link rel="canonical"> from url + baseUrl and gives
// no per-page override, so the rewrite happens in postBuild on the emitted
// HTML. Only routes backed by a real source file are rewritten: Docusaurus-only
// pages (/tags, /category/*, search) have no counterpart on the mirror, and a
// canonical aimed at a 404 is worse than no canonical at all.
import type { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';
import * as fs from 'fs';

interface CanonicalMirrorOptions {
  /** Route prefix served here, without slashes, e.g. 'intel-codex'. */
  routeBasePath: string;
  /** Source dir for those docs, relative to siteDir. */
  docsDir: string;
  /** Origin owning the canonical, no trailing slash. */
  target: string;
}

const CANONICAL_RE = /<link\b[^>]*\brel="canonical"[^>]*>/i;

export default function canonicalMirrorPlugin(
  _context: LoadContext,
  options: CanonicalMirrorOptions
): Plugin<void> {
  const { routeBasePath, docsDir, target } = options;

  return {
    name: 'canonical-mirror-plugin',

    async postBuild({ siteDir, outDir, routesPaths }) {
      const prefix = `/${routeBasePath}`;
      let rewritten = 0;
      let skipped = 0;

      for (const route of routesPaths) {
        if (route !== prefix && !route.startsWith(`${prefix}/`)) continue;

        // '/intel-codex/Security/Pentesting/sop-bug-bounty' -> 'Security/Pentesting/sop-bug-bounty'
        const rest = route.slice(prefix.length).replace(/^\//, '');
        // The site root maps to the mirror's own root, which is its index page.
        const sourceRel = rest === '' ? 'index' : rest;

        const hasSource =
          fs.existsSync(path.resolve(siteDir, docsDir, `${sourceRel}.md`)) ||
          fs.existsSync(path.resolve(siteDir, docsDir, `${sourceRel}.mdx`));
        if (!hasSource) {
          skipped++;
          continue;
        }

        // trailingSlash:false emits flat files; keep the directory form as a fallback.
        const base = path.join(outDir, routeBasePath);
        const candidates =
          rest === ''
            ? [path.join(base, 'index.html'), `${base}.html`]
            : [path.join(base, `${rest}.html`), path.join(base, rest, 'index.html')];
        const file = candidates.find((p) => fs.existsSync(p));
        if (!file) {
          skipped++;
          continue;
        }

        const html = fs.readFileSync(file, 'utf-8');
        if (!CANONICAL_RE.test(html)) {
          skipped++;
          continue;
        }

        const href = rest === '' ? `${target}/` : `${target}/${rest}`;
        fs.writeFileSync(
          file,
          html.replace(CANONICAL_RE, `<link data-rh="true" rel="canonical" href="${href}">`),
          'utf-8'
        );
        rewritten++;
      }

      console.log(
        `[canonical-mirror] ${rewritten} page(s) canonicalised to ${target}, ${skipped} left on this origin`
      );
    },
  };
}
