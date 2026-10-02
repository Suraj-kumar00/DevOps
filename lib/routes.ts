import { createGetUrl } from 'fumadocs-core/source';
import { siteConfig } from '@/lib/site';

/** Route prefixes. Change them here and every link, rewrite and generated URL follows. */
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

interface PageRef {
  slugs: string[];
  locale?: string;
}

const getContentUrl = createGetUrl(docsContentRoute);
const getImageUrl = createGetUrl(docsImageRoute);

/** Markdown version of a docs page (served for AI agents and the "Copy Markdown" button). */
export function getPageMarkdownUrl(page: PageRef) {
  const segments = [...page.slugs, 'content.md'];
  return { segments, url: getContentUrl(segments, page.locale) };
}

/** Generated Open Graph image of a docs page. */
export function getPageImageUrl(page: PageRef) {
  const segments = [...page.slugs, 'image.png'];
  return { segments, url: getImageUrl(segments, page.locale) };
}

/** Source file of a docs page on GitHub. `path` is relative to `content/docs`. */
export function getPageGitHubUrl(path: string): string {
  const { url, branch } = siteConfig.repo;
  return `${url}/blob/${branch}/content/docs/${path}`;
}

/**
 * Opens the "Content is wrong or outdated" issue form with the page pre-filled.
 * `pageUrl` should be absolute so the report is useful outside the site.
 */
export function getPageIssueUrl(page: { title: string; pageUrl: string }): string {
  const params = new URLSearchParams({
    template: 'content-error.yml',
    title: `[Content] ${page.title}`,
    page: page.pageUrl,
  });
  return `${siteConfig.repo.issuesUrl}/new?${params.toString()}`;
}
