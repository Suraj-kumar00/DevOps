import { CalloutContainer, CalloutDescription, CalloutTitle } from 'fumadocs-ui/components/callout';
import { Wrench } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

interface ProductionNoteProps {
  title?: string;
  children: ReactNode;
}

/**
 * A lesson from running the tool in production: a failure mode, a trade-off, a cost trap.
 * Styled like Fumadocs callouts, in the "advanced" level color.
 */
export function ProductionNote({ title, children }: ProductionNoteProps) {
  return (
    <CalloutContainer
      icon={<Wrench className="size-5 -me-0.5 text-(--callout-color)" aria-hidden="true" />}
      style={{ '--callout-color': 'var(--color-level-advanced)' } as CSSProperties}
    >
      <CalloutTitle>{title ? `Production note: ${title}` : 'Production note'}</CalloutTitle>
      <CalloutDescription>{children}</CalloutDescription>
    </CalloutContainer>
  );
}
