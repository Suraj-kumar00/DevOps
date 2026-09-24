import { LevelBadge } from '@/components/ui/level-badge';
import { pageLayers } from '@/lib/content/page-anatomy';

/** Visual summary of the six-layer page template, shown in the hero. */
export function PageAnatomyCard() {
  return (
    <figure className="rounded-2xl border bg-fd-card/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
      <figcaption className="mb-4">
        <p className="text-sm font-medium text-fd-primary">Every topic page</p>
        <p className="text-lg font-semibold tracking-tight">Six layers, beginner to senior</p>
      </figcaption>
      <ol className="space-y-2.5">
        {pageLayers.map((layer, index) => (
          <li
            key={layer.heading}
            className="flex items-start gap-3 rounded-lg border bg-fd-background/70 p-3"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-fd-primary/10 text-xs font-semibold text-fd-primary"
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <p className="font-medium">{layer.heading}</p>
                <LevelBadge level={layer.level} />
              </div>
              <p className="mt-0.5 text-sm text-fd-muted-foreground">{layer.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
