import { describe, expect, it } from 'vitest';
import {
  getPageGitHubUrl,
  getPageImageUrl,
  getPageIssueUrl,
  getPageMarkdownUrl,
} from '@/lib/routes';

describe('route helpers', () => {
  it('builds the Markdown URL of a page', () => {
    expect(getPageMarkdownUrl({ slugs: ['ai-infra', 'gpu-sharing'] })).toEqual({
      segments: ['ai-infra', 'gpu-sharing', 'content.md'],
      url: '/llms.mdx/docs/ai-infra/gpu-sharing/content.md',
    });
    expect(getPageMarkdownUrl({ slugs: [] }).url).toBe('/llms.mdx/docs/content.md');
  });

  it('builds the Open Graph image URL of a page', () => {
    expect(getPageImageUrl({ slugs: ['devops'] }).url).toBe('/og/docs/devops/image.png');
  });

  it('links to the source file on GitHub', () => {
    expect(getPageGitHubUrl('devops/index.mdx')).toBe(
      'https://github.com/Suraj-kumar00/DevOps/blob/main/content/docs/devops/index.mdx',
    );
  });

  it('pre-fills the content issue form', () => {
    const url = new URL(
      getPageIssueUrl({
        title: 'GPU sharing',
        pageUrl: 'https://example.com/docs/ai-infra/gpu-sharing',
      }),
    );
    expect(url.pathname).toBe('/Suraj-kumar00/DevOps/issues/new');
    expect(url.searchParams.get('template')).toBe('content-error.yml');
    expect(url.searchParams.get('title')).toBe('[Content] GPU sharing');
    expect(url.searchParams.get('page')).toBe('https://example.com/docs/ai-infra/gpu-sharing');
  });
});
