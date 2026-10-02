import type { ReactNode } from 'react';
import type { Level, PageKind, PlannedTopic } from '@/lib/content/schema';

/** The subset of a docs page this module needs. Keeps the logic testable without the loader. */
export interface TrackPageLike {
  url: string;
  slugs: string[];
  data: {
    title: string;
    description?: string;
    kind: PageKind;
    flagship: boolean;
    planned: PlannedTopic[];
    level?: Level;
  };
}

export interface TopicLink {
  title: string;
  description?: string;
  url: string;
  level?: Level;
}

export interface Track {
  /** First URL segment, e.g. "ai-infra". */
  slug: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  url: string;
  flagship: boolean;
  /** Topic pages that exist in the track. */
  published: TopicLink[];
  /** Roadmap topics that do not have a page yet (published ones are removed automatically). */
  planned: PlannedTopic[];
}

/**
 * Builds a track from its overview page and the full page list.
 * A planned topic disappears from `planned` as soon as a page with the same slug is published,
 * so the roadmap never lists something that already exists.
 */
export function buildTrack(
  indexPage: TrackPageLike,
  allPages: readonly TrackPageLike[],
  display: { title?: string; description?: string; icon?: ReactNode } = {},
): Track {
  const slug = indexPage.slugs[0];
  if (!slug || indexPage.data.kind !== 'track') {
    throw new Error(`${indexPage.url} is not a track overview page (kind: track).`);
  }

  const topicPages = allPages.filter(
    (page) => page.slugs[0] === slug && page.slugs.length > 1 && page.data.kind === 'topic',
  );
  const publishedSlugs = new Set(topicPages.map((page) => page.slugs.at(-1)));

  return {
    slug,
    title: display.title ?? indexPage.data.title,
    description: display.description ?? indexPage.data.description,
    icon: display.icon,
    url: indexPage.url,
    flagship: indexPage.data.flagship,
    published: topicPages.map((page) => ({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      level: page.data.level,
    })),
    planned: indexPage.data.planned.filter((topic) => !publishedSlugs.has(topic.slug)),
  };
}
