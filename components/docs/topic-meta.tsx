import { CalendarCheck, Package } from 'lucide-react';
import { LevelBadge } from '@/components/ui/level-badge';
import type { Level } from '@/lib/content/schema';
import { formatDate } from '@/lib/format';

interface TopicMetaProps {
  level: Level;
  toolVersion: string;
  lastVerified: string;
}

/** Level, tested version and verification date, shown under a topic page title. */
export function TopicMeta({ level, toolVersion, lastVerified }: TopicMetaProps) {
  return (
    <dl className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fd-muted-foreground">
      <div className="flex items-center gap-1.5">
        <dt className="sr-only">Level</dt>
        <dd>
          <LevelBadge level={level} />
        </dd>
      </div>
      <div className="flex items-center gap-1.5">
        <dt className="inline-flex items-center gap-1.5">
          <Package className="size-4" aria-hidden="true" />
          Tested with
        </dt>
        <dd className="font-medium text-fd-foreground">{toolVersion}</dd>
      </div>
      <div className="flex items-center gap-1.5">
        <dt className="inline-flex items-center gap-1.5">
          <CalendarCheck className="size-4" aria-hidden="true" />
          Last verified
        </dt>
        <dd className="font-medium text-fd-foreground">
          <time dateTime={lastVerified}>{formatDate(lastVerified)}</time>
        </dd>
      </div>
    </dl>
  );
}
