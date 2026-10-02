import { describe, expect, it } from 'vitest';
import { renderPageMarkdown } from '@/lib/content/page-markdown';
import type { Track } from '@/lib/content/tracks';

describe('renderPageMarkdown', () => {
  it('adds verification metadata and credited sources to topic pages', () => {
    const markdown = renderPageMarkdown(
      {
        title: 'Probes',
        url: '/docs/devops/kubernetes-probes',
        kind: 'topic',
        level: 'intermediate',
        toolVersion: 'Kubernetes 1.34',
        lastVerified: '2026-09-22',
        sources: [
          { title: 'Probes', url: 'https://kubernetes.io/docs/concepts/workloads/pods/probes/', type: 'official' },
          { title: 'A post', url: 'https://example.com/post', type: 'community', author: 'Jane Doe' },
        ],
      },
      '## What and why\n\nBody.',
    );

    expect(markdown).toBe(
      [
        '# Probes (/docs/devops/kubernetes-probes)',
        '',
        '> Level: intermediate. Tested with: Kubernetes 1.34. Last verified: 2026-09-22.',
        '',
        '## What and why',
        '',
        'Body.',
        '',
        '## Sources and credits',
        '',
        '- [Probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/) (official)',
        '- [A post](https://example.com/post) by Jane Doe (community)',
        '',
      ].join('\n'),
    );
  });

  it('lists published and planned topics on track pages', () => {
    const track: Track = {
      slug: 'ai-infra',
      title: 'AI Infrastructure',
      url: '/docs/ai-infra',
      flagship: true,
      published: [],
      planned: [{ slug: 'gpu-sharing', title: 'GPU sharing', description: 'Share one GPU.' }],
    };
    const markdown = renderPageMarkdown(
      { title: 'AI Infrastructure', url: '/docs/ai-infra', kind: 'track', sources: [] },
      'Intro.',
      track,
    );

    expect(markdown).toContain('## Published topics\n\nNothing published in this track yet.');
    expect(markdown).toContain('## On the roadmap\n\n- GPU sharing: Share one GPU.');
    expect(markdown).not.toContain('Sources and credits');
  });

  it('leaves guide pages as they are', () => {
    const markdown = renderPageMarkdown(
      { title: 'Start here', url: '/docs', kind: 'guide', sources: [] },
      'Welcome.',
    );
    expect(markdown).toBe('# Start here (/docs)\n\nWelcome.\n');
  });
});
