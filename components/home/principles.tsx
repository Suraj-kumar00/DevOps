import type { ReactNode } from 'react';
import {
  AttributionIcon,
  PullRequestIcon,
  VerifiedDateIcon,
  VerifiedDocIcon,
} from '@/components/icons/feature-icons';
import { Section } from '@/components/home/section';

const principles: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <VerifiedDocIcon />,
    title: 'Official docs first',
    body: 'Definitions and facts come from each project’s own documentation, linked on every page.',
  },
  {
    icon: <AttributionIcon />,
    title: 'Credit, never copy',
    body: 'Great community posts are linked with their author’s name. Their work is never republished here.',
  },
  {
    icon: <VerifiedDateIcon />,
    title: 'Verified and dated',
    body: 'Every page records the tool version it was tested with and when it was last checked. Old pages get a warning.',
  },
  {
    icon: <PullRequestIcon />,
    title: 'Open source',
    body: 'Code is MIT licensed and content is CC BY 4.0. Anyone can fix a page with a pull request.',
  },
];

export function Principles() {
  return (
    <Section
      id="principles"
      eyebrow="Principles"
      title="Why you can trust what you read here"
      description="Most DevOps content goes stale quietly. These rules are enforced on every page, partly by the build itself."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle) => (
          <li key={principle.title} className="reveal rounded-xl border bg-fd-card p-5">
            <span
              aria-hidden="true"
              className="mb-4 inline-flex size-11 items-center justify-center rounded-xl border bg-fd-background text-fd-foreground [&_svg]:size-6"
            >
              {principle.icon}
            </span>
            <h3 className="font-semibold tracking-tight">{principle.title}</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">{principle.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
