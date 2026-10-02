import type { TOCItemType } from 'fumadocs-core/toc';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FreshnessNotice } from '@/components/docs/freshness-notice';
import { PageActions } from '@/components/docs/page-actions';
import { Prerequisites, type PrerequisiteLink } from '@/components/docs/prerequisites';
import { SOURCES_HEADING_ID, SourcesList } from '@/components/docs/sources-list';
import { TopicMeta } from '@/components/docs/topic-meta';
import {
  PUBLISHED_HEADING_ID,
  ROADMAP_HEADING_ID,
  TrackOverview,
} from '@/components/docs/track-overview';
import { getMDXComponents } from '@/components/mdx';
import { getFreshness } from '@/lib/content/freshness';
import { getTrackBySlug } from '@/lib/content/get-tracks';
import {
  getPageGitHubUrl,
  getPageImageUrl,
  getPageIssueUrl,
  getPageMarkdownUrl,
} from '@/lib/routes';
import { siteUrl } from '@/lib/site-url';
import { source, type DocsPage as DocsPageData } from '@/lib/source';

/** Re-render docs pages daily so the "may be outdated" notice appears without a new deploy. */
export const revalidate = 86400;

/** Resolves prerequisite URLs to page titles. A broken prerequisite fails the build. */
function resolvePrerequisites(page: DocsPageData): PrerequisiteLink[] {
  return page.data.prerequisites.map((url) => {
    const target = source.getPageByUrl(url);
    if (!target) {
      throw new Error(`${page.path}: prerequisite "${url}" does not match any page.`);
    }
    return { title: target.data.title, url: target.url };
  });
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const { data } = page;
  const MDX = data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const githubUrl = getPageGitHubUrl(page.path);
  const issueUrl = getPageIssueUrl({ title: data.title, pageUrl: `${siteUrl}${page.url}` });

  const isTopic = data.kind === 'topic';
  const track = data.kind === 'track' ? getTrackBySlug(page.slugs[0] ?? '') : undefined;
  const freshness =
    isTopic && data.lastVerified ? getFreshness(data.lastVerified, new Date()) : undefined;

  // Sections rendered from frontmatter are not MDX headings, so add them to the TOC here.
  const generatedToc: TOCItemType[] = [];
  if (track) {
    generatedToc.push({ title: 'Published topics', url: `#${PUBLISHED_HEADING_ID}`, depth: 2 });
    if (track.planned.length > 0) {
      generatedToc.push({ title: 'On the roadmap', url: `#${ROADMAP_HEADING_ID}`, depth: 2 });
    }
  }
  if (isTopic && data.sources.length > 0) {
    generatedToc.push({ title: 'Sources and credits', url: `#${SOURCES_HEADING_ID}`, depth: 2 });
  }

  return (
    <DocsPage toc={[...data.toc, ...generatedToc]} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription className="mb-0">{data.description}</DocsDescription>
      {isTopic && data.level && data.toolVersion && data.lastVerified ? (
        <TopicMeta
          level={data.level}
          toolVersion={data.toolVersion}
          lastVerified={data.lastVerified}
        />
      ) : null}
      <div className="flex flex-row flex-wrap items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
      </div>
      <DocsBody>
        {freshness?.stale ? (
          <FreshnessNotice ageInDays={freshness.ageInDays} issueUrl={issueUrl} />
        ) : null}
        {isTopic ? <Prerequisites items={resolvePrerequisites(page)} /> : null}
        <MDX
          components={getMDXComponents({
            // Lets pages link to each other with relative file paths.
            a: createRelativeLink(source, page),
          })}
        />
        {track ? <TrackOverview track={track} /> : null}
        {isTopic ? <SourcesList sources={data.sources} /> : null}
      </DocsBody>
      <PageActions editUrl={githubUrl} issueUrl={issueUrl} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
      types: { 'text/markdown': getPageMarkdownUrl(page).url },
    },
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
