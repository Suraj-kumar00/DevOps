import { describe, expect, it } from 'vitest';
import { docsFrontmatterSchema, sourceSchema } from '@/lib/content/schema';

const validTopic = {
  title: 'Liveness, readiness and startup probes',
  level: 'intermediate',
  toolVersion: 'Kubernetes 1.34',
  lastVerified: '2026-09-22',
  sources: [
    {
      title: 'Liveness, Readiness, and Startup Probes',
      url: 'https://kubernetes.io/docs/concepts/workloads/pods/probes/',
    },
  ],
};

function issuesFor(input: unknown) {
  const result = docsFrontmatterSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join('.'));
}

describe('docsFrontmatterSchema', () => {
  it('accepts a complete topic page and applies defaults', () => {
    const result = docsFrontmatterSchema.parse(validTopic);
    expect(result.kind).toBe('topic');
    expect(result.sources[0]?.type).toBe('official');
    expect(result.prerequisites).toEqual([]);
    expect(result.planned).toEqual([]);
    expect(result.flagship).toBe(false);
  });

  it('treats pages as topics by default and requires the topic fields', () => {
    expect(issuesFor({ title: 'Untitled' })).toEqual(
      expect.arrayContaining(['level', 'toolVersion', 'lastVerified', 'sources']),
    );
  });

  it('requires at least one official source on topic pages', () => {
    const onlyCommunity = {
      ...validTopic,
      sources: [
        {
          title: 'A great blog post',
          url: 'https://example.com/post',
          type: 'community',
          author: 'Jane Doe',
        },
      ],
    };
    expect(issuesFor(onlyCommunity)).toContain('sources');
  });

  it('rejects impossible dates', () => {
    expect(issuesFor({ ...validTopic, lastVerified: '2026-02-30' })).toContain('lastVerified');
    expect(issuesFor({ ...validTopic, lastVerified: '22-09-2026' })).toContain('lastVerified');
  });

  it('only allows prerequisites that are docs URLs', () => {
    expect(issuesFor({ ...validTopic, prerequisites: ['https://example.com'] })).toContain(
      'prerequisites.0',
    );
  });

  it('does not require topic fields on guide and track pages', () => {
    expect(issuesFor({ title: 'Start here', kind: 'guide' })).toEqual([]);
    expect(issuesFor({ title: 'AI Infrastructure', kind: 'track', flagship: true })).toEqual([]);
  });

  it('only allows planned topics and flagship on track pages', () => {
    const planned = [{ slug: 'gpu-sharing', title: 'GPU sharing', description: 'How to share GPUs.' }];
    expect(issuesFor({ title: 'Guide', kind: 'guide', planned })).toContain('planned');
    expect(issuesFor({ title: 'Guide', kind: 'guide', flagship: true })).toContain('planned');
  });

  it('rejects duplicate or badly formatted planned slugs', () => {
    const topic = { slug: 'gpu-sharing', title: 'GPU sharing', description: 'How to share GPUs.' };
    expect(issuesFor({ title: 'Track', kind: 'track', planned: [topic, topic] })).toContain(
      'planned',
    );
    expect(
      issuesFor({ title: 'Track', kind: 'track', planned: [{ ...topic, slug: 'GPU Sharing' }] }),
    ).toContain('planned.0.slug');
  });
});

describe('sourceSchema', () => {
  it('requires https URLs', () => {
    const result = sourceSchema.safeParse({ title: 'Docs', url: 'http://example.com' });
    expect(result.success).toBe(false);
  });

  it('requires an author for anything that is not official documentation', () => {
    const result = sourceSchema.safeParse({
      title: 'Conference talk',
      url: 'https://example.com/talk',
      type: 'talk',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['author']);
  });
});
