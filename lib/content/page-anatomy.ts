import type { Level } from '@/lib/content/schema';

export interface PageLayer {
  /** The H2 heading topic pages use for this layer. */
  heading: string;
  summary: string;
  level: Level | 'all';
}

/**
 * The six layers every topic page follows, in order.
 * Single source of truth for the home page and the page template guide.
 */
export const pageLayers: readonly PageLayer[] = [
  {
    heading: 'What and why',
    summary: 'A plain-language definition from the official docs, and the problem it solves.',
    level: 'beginner',
  },
  {
    heading: 'How it works',
    summary: 'Architecture and core concepts, with a diagram drawn for this site.',
    level: 'intermediate',
  },
  {
    heading: 'Hands-on',
    summary: 'A minimal example that was actually run, pinned to a tool version.',
    level: 'intermediate',
  },
  {
    heading: 'Production notes',
    summary: 'Failure modes, trade-offs, security, observability and cost.',
    level: 'advanced',
  },
  {
    heading: 'Interview scenarios',
    summary: 'Scenario-based questions, tagged by experience level.',
    level: 'all',
  },
  {
    heading: 'Sources and credits',
    summary: 'Official docs first, and every community author named.',
    level: 'all',
  },
];
