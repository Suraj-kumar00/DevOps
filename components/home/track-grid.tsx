import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/home/section';
import { cn } from '@/lib/cn';
import type { Track } from '@/lib/content/tracks';

function topicCountLabel(track: Track): string {
  const published = track.published.length;
  const planned = track.planned.length;
  if (published === 0) return `${planned} topics on the roadmap`;
  if (planned === 0) return `${published} topics`;
  return `${published} published, ${planned} planned`;
}

/** First topics of a track (published ones first), previewed on the flagship card. */
function previewTopics(track: Track, count = 5): string[] {
  return [
    ...track.published.map((topic) => topic.title),
    ...track.planned.map((topic) => topic.title),
  ].slice(0, count);
}

function TrackCard({ track }: { track: Track }) {
  const preview = track.flagship ? previewTopics(track) : [];

  return (
    <Link
      href={track.url}
      className={cn(
        'group relative flex flex-col rounded-xl border bg-fd-card p-5 transition-colors hover:border-fd-primary/50 hover:bg-fd-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring',
        track.flagship &&
          'border-fd-primary/40 bg-fd-primary/[0.04] sm:col-span-2 sm:p-6 lg:row-span-2',
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className="inline-flex size-10 items-center justify-center rounded-lg border bg-fd-background text-fd-primary [&_svg]:size-5"
        >
          {track.icon}
        </span>
        {track.flagship ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-fd-primary px-2.5 py-0.5 text-xs font-medium text-fd-primary-foreground">
            <Sparkles className="size-3" aria-hidden="true" />
            Flagship track
          </span>
        ) : null}
      </div>
      <h3 className={cn('font-semibold tracking-tight', track.flagship ? 'text-2xl' : 'text-lg')}>
        {track.title}
      </h3>
      {track.description ? (
        <p
          className={cn(
            'mt-1.5 text-fd-muted-foreground',
            track.flagship ? 'text-base' : 'flex-1 text-sm',
          )}
        >
          {track.description}
        </p>
      ) : null}
      {preview.length > 0 ? (
        <div className="mt-5 flex-1">
          <p className="text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
            Starts with
          </p>
          <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2 lg:grid-cols-1">
            {preview.map((title) => (
              <li key={title} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-fd-primary" />
                {title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-4 flex items-center justify-between text-sm font-medium text-fd-muted-foreground">
        <span>{topicCountLabel(track)}</span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 text-fd-primary transition-transform group-hover:translate-x-0.5"
        />
      </p>
    </Link>
  );
}

export function TrackGrid({ tracks }: { tracks: Track[] }) {
  return (
    <Section
      id="tracks"
      eyebrow="Tracks"
      title="Pick where you want to go"
      description="AI infrastructure is the flagship track. DevOps, DevSecOps and the foundations are what it stands on, so they are covered too."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </div>
    </Section>
  );
}
