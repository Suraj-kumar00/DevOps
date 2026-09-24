import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps {
  id?: string;
  /** Small label above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Consistent spacing, max width and heading hierarchy for home page sections. */
export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('px-4 py-16 sm:px-6 md:py-20', className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          {eyebrow ? (
            <p className="mb-2 text-sm font-medium tracking-wide text-fd-primary uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base text-fd-muted-foreground text-pretty sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
