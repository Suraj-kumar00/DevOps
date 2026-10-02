import { describe, expect, it } from 'vitest';
import { buildTrack, type TrackPageLike } from '@/lib/content/tracks';

function page(
  url: string,
  data: Partial<TrackPageLike['data']> & Pick<TrackPageLike['data'], 'title'>,
): TrackPageLike {
  return {
    url,
    slugs: url.replace(/^\/docs\/?/, '').split('/').filter(Boolean),
    data: { kind: 'topic', flagship: false, planned: [], ...data },
  };
}

const overview = page('/docs/ai-infra', {
  title: 'AI Infrastructure',
  kind: 'track',
  flagship: true,
  planned: [
    { slug: 'gpu-sharing', title: 'GPU sharing', description: 'Share one GPU.' },
    { slug: 'gpu-observability', title: 'GPU observability', description: 'Watch GPUs.' },
  ],
});

describe('buildTrack', () => {
  it('drops planned topics once a page with the same slug is published', () => {
    const published = page('/docs/ai-infra/gpu-sharing', { title: 'GPU sharing', level: 'advanced' });
    const track = buildTrack(overview, [overview, published]);

    expect(track.published).toEqual([
      { title: 'GPU sharing', description: undefined, url: '/docs/ai-infra/gpu-sharing', level: 'advanced' },
    ]);
    expect(track.planned.map((topic) => topic.slug)).toEqual(['gpu-observability']);
  });

  it('ignores pages from other tracks and non-topic pages', () => {
    const otherTrack = page('/docs/devops/helm', { title: 'Helm' });
    const guide = page('/docs/ai-infra/about', { title: 'About', kind: 'guide' });
    const track = buildTrack(overview, [overview, otherTrack, guide]);

    expect(track.published).toEqual([]);
    expect(track.planned).toHaveLength(2);
  });

  it('prefers display values from the folder metadata', () => {
    const track = buildTrack(overview, [overview], { title: 'AI Infra', description: 'GPUs.' });
    expect(track.title).toBe('AI Infra');
    expect(track.description).toBe('GPUs.');
    expect(track.flagship).toBe(true);
    expect(track.slug).toBe('ai-infra');
  });

  it('refuses pages that are not track overviews', () => {
    const topic = page('/docs/ai-infra/gpu-sharing', { title: 'GPU sharing' });
    expect(() => buildTrack(topic, [topic])).toThrow(/not a track overview/);
  });
});
