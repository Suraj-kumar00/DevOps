import 'server-only';
import type * as PageTree from 'fumadocs-core/page-tree';
import { llms } from 'fumadocs-core/source';
import { getTrackBySlug } from '@/lib/content/get-tracks';
import { renderPageMarkdown } from '@/lib/content/page-markdown';
import { siteConfig } from '@/lib/site';
import { source } from '@/lib/source';

type Node = PageTree.Node | PageTree.Root;

function isRoot(node: Node): node is PageTree.Root {
  // The root's `type` is optional: 'root' or undefined.
  return node.type === undefined || node.type === 'root';
}

/**
 * Markdown renderers for AI agents: llms.txt, llms-full.txt, `*.md` pages and the MCP server.
 * `renderName` and `renderDescription` only change the root (site name and summary, as the
 * llms.txt format expects); every other node falls back to the Fumadocs defaults.
 */
export const docsLlms = llms(source, {
  renderName(node, ctx) {
    if (isRoot(node)) return siteConfig.name;
    if (node.type === 'page') return source.getNodePage(node, ctx.lang)?.data.title ?? '';
    if (node.type === 'folder') {
      const title = source.getNodeMeta(node, ctx.lang)?.data.title;
      if (title) return title;
    }
    return typeof node.name === 'string' ? node.name : '';
  },
  renderDescription(node, ctx) {
    if (isRoot(node)) return siteConfig.description;
    const description =
      node.type === 'page'
        ? source.getNodePage(node, ctx.lang)?.data.description
        : source.getNodeMeta(node, ctx.lang)?.data.description;
    return description ?? (typeof node.description === 'string' ? node.description : '');
  },
  async renderPage(page) {
    const track = page.data.kind === 'track' ? getTrackBySlug(page.slugs[0] ?? '') : undefined;
    return renderPageMarkdown(
      { ...page.data, url: page.url },
      await page.data.getText('processed'),
      track,
    );
  },
});
