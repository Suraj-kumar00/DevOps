import type { Level } from '@/lib/content/schema';
import { cn } from '@/lib/cn';

const labels: Record<Level | 'all', string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  all: 'All levels',
};

const styles: Record<Level | 'all', string> = {
  beginner: 'text-level-beginner border-level-beginner/30 bg-level-beginner/10',
  intermediate: 'text-level-intermediate border-level-intermediate/30 bg-level-intermediate/10',
  advanced: 'text-level-advanced border-level-advanced/30 bg-level-advanced/10',
  all: 'text-fd-muted-foreground border-fd-border bg-fd-secondary',
};

/** Small pill showing the reader level a page or section targets. */
export function LevelBadge({ level, className }: { level: Level | 'all'; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        styles[level],
        className,
      )}
    >
      {labels[level]}
    </span>
  );
}
