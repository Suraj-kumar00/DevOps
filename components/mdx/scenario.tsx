import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import type { ReactNode } from 'react';
import { LevelBadge } from '@/components/ui/level-badge';
import type { Level } from '@/lib/content/schema';

/** Wraps a list of interview scenarios. Answers stay collapsed so readers can test themselves. */
export function Scenarios({ children }: { children: ReactNode }) {
  return <Accordions className="my-6">{children}</Accordions>;
}

interface ScenarioProps {
  question: string;
  level: Level;
  /** The model answer: what a strong candidate would say, and why. */
  children: ReactNode;
}

export function Scenario({ question, level, children }: ScenarioProps) {
  return (
    <Accordion
      // Accordion derives its value from `title` when it is a string; ours is JSX, so pass one.
      value={question}
      title={
        <span className="flex flex-1 flex-wrap items-center justify-between gap-2 text-start">
          <span>{question}</span>
          <LevelBadge level={level} />
        </span>
      }
    >
      {children}
    </Accordion>
  );
}
