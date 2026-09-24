import 'server-only';
import type * as PageTree from 'fumadocs-core/page-tree';
import { buildTrack, type Track } from '@/lib/content/tracks';
import { source, type DocsPage } from '@/lib/source';

/**
 * The overview page of a track folder. Folders list `index` in their `meta.json` pages,
 * which makes it a regular child rather than `folder.index`, so check both.
 */
function findTrackOverview(folder: PageTree.Folder): DocsPage | undefined {
  const pageNodes = [folder.index, ...folder.children].filter(
    (node): node is PageTree.Item => node?.type === 'page',
  );
  for (const node of pageNodes) {
    const page = source.getNodePage(node);
    if (page?.data.kind === 'track') return page;
  }
  return undefined;
}

/**
 * All learning tracks in sidebar order (the order of `content/docs/meta.json`).
 * Display name, description and icon come from each track's `meta.json`,
 * the roadmap and flagship flag from its `index.mdx` frontmatter.
 */
export function getTracks(): Track[] {
  const pages = source.getPages();

  return source.getPageTree().children.flatMap((node) => {
    if (node.type !== 'folder') return [];
    const overview = findTrackOverview(node);
    if (!overview) return [];

    return [
      buildTrack(overview, pages, {
        title: typeof node.name === 'string' ? node.name : undefined,
        description: typeof node.description === 'string' ? node.description : undefined,
        icon: node.icon,
      }),
    ];
  });
}

/** A track by its first URL segment, e.g. "ai-infra". */
export function getTrackBySlug(slug: string): Track | undefined {
  return getTracks().find((track) => track.slug === slug);
}
