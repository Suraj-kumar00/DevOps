import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/home/section';
import { LevelBadge } from '@/components/ui/level-badge';
import type { Level } from '@/lib/content/schema';

interface Path {
  level: Level;
  title: string;
  body: string;
}

const paths: Path[] = [
  {
    level: 'beginner',
    title: 'New to DevOps',
    body: 'Start with the Foundations track, then DevOps. On each page, read "What and why" and "How it works" first and come back for the rest later.',
  },
  {
    level: 'intermediate',
    title: 'Working engineer',
    body: 'Jump straight to the tool you use. The hands-on example and production notes are written for you, and the interview scenarios check what stuck.',
  },
  {
    level: 'advanced',
    title: 'Moving into AI infrastructure',
    body: 'Make sure the Kubernetes basics are solid, then follow AI Infrastructure, LLMOps and MLOps in that order.',
  },
];

export function Levels() {
  return (
    <Section
      id="levels"
      eyebrow="For every level"
      title="One page, read at your level"
      description="Pages are layered from beginner to senior, so you never need a separate course to go deeper."
      className="border-y bg-fd-card/40"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {paths.map((path) => (
          <div key={path.title} className="rounded-xl border bg-fd-background p-5">
            <LevelBadge level={path.level} />
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{path.title}</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">{path.body}</p>
          </div>
        ))}
      </div>
      <Link
        href="/docs/learning-paths"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary hover:underline"
      >
        See all learning paths
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Section>
  );
}
