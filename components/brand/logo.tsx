import { Infinity as InfinityIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site';

/** Square brand mark: the DevOps loop on the primary color. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-fd-primary text-fd-primary-foreground',
        className,
      )}
    >
      <InfinityIcon className="size-4.5" strokeWidth={2.5} />
    </span>
  );
}

/** Mark plus site name, used in the navbar. */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <LogoMark />
      <span>{siteConfig.name}</span>
    </span>
  );
}
