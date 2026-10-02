import type { SVGProps } from 'react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site';

/** Path data of the brand glyph, shared with the favicon (app/icon.svg) and the OG images. */
export const logoGlyph = {
  loop: 'M16.5 16C12.2 16 10.3 8 6 8a4 4 0 1 0 0 8c4.3 0 6.2-8 10.5-8a4 4 0 0 1 3.94 4.69',
  node: { cx: 19.33, cy: 14.83, r: 1.7 },
} as const;

/** The brand glyph: an open DevOps loop with a node, the reader's place in it. */
export function LogoGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g transform="translate(.75 0)">
        <path d={logoGlyph.loop} />
        <circle {...logoGlyph.node} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** Square brand mark: the glyph on the brand gradient. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'bg-gradient-brand inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-fd-primary-foreground',
        className,
      )}
    >
      <LogoGlyph className="size-5" />
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
