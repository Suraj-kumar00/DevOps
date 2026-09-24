import { Card, Cards } from 'fumadocs-ui/components/card';
import { ArrowUpRight } from 'lucide-react';
import { LevelBadge } from '@/components/ui/level-badge';
import type { Track } from '@/lib/content/tracks';
import { siteConfig } from '@/lib/site';

export const PUBLISHED_HEADING_ID = 'published-topics';
export const ROADMAP_HEADING_ID = 'roadmap';

/** Opens the "new topic" issue form, pre-filled with the topic and its track. */
function topicIssueUrl(trackTitle: string, topicTitle: string): string {
  const params = new URLSearchParams({
    template: 'new-topic.yml',
    title: `[Topic] ${topicTitle}`,
    track: trackTitle,
  });
  return `${siteConfig.repo.issuesUrl}/new?${params.toString()}`;
}

/** Published topics and the remaining roadmap of a track, appended to its overview page. */
export function TrackOverview({ track }: { track: Track }) {
  return (
    <>
      <section aria-labelledby={PUBLISHED_HEADING_ID}>
        <h2 id={PUBLISHED_HEADING_ID}>Published topics</h2>
        {track.published.length > 0 ? (
          <Cards>
            {track.published.map((topic) => (
              <Card key={topic.url} href={topic.url} title={topic.title}>
                {topic.description}
                {topic.level ? (
                  <span className="mt-2 block">
                    <LevelBadge level={topic.level} />
                  </span>
                ) : null}
              </Card>
            ))}
          </Cards>
        ) : (
          <p>
            Nothing is published in this track yet. The roadmap below is being written in the open,
            and contributions are welcome.
          </p>
        )}
      </section>

      {track.planned.length > 0 ? (
        <section aria-labelledby={ROADMAP_HEADING_ID}>
          <h2 id={ROADMAP_HEADING_ID}>On the roadmap</h2>
          <p>
            Planned pages, in suggested reading order. To write one, open an issue from its{' '}
            <em>Write this page</em> link first, so nobody duplicates the work.
          </p>
          <ol className="not-prose my-6 divide-y rounded-xl border bg-fd-card">
            {track.planned.map((topic, index) => (
              <li
                key={topic.slug}
                className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-fd-secondary text-xs font-medium text-fd-muted-foreground"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{topic.title}</p>
                    <p className="mt-0.5 text-sm text-fd-muted-foreground">{topic.description}</p>
                  </div>
                </div>
                <a
                  href={topicIssueUrl(track.title, topic.title)}
                  className="inline-flex shrink-0 items-center gap-1 self-start text-sm font-medium whitespace-nowrap text-fd-primary hover:underline sm:ms-0 ms-9"
                >
                  Write this page
                  <span className="sr-only">: {topic.title}</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </>
  );
}
