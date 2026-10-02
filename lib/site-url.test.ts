import { describe, expect, it } from 'vitest';
import { resolveSiteUrl } from '@/lib/site-url';

describe('resolveSiteUrl', () => {
  it('prefers SITE_URL and strips trailing slashes', () => {
    expect(
      resolveSiteUrl({
        SITE_URL: 'https://devops.example.com///',
        VERCEL_PROJECT_PRODUCTION_URL: 'ignored.vercel.app',
      }),
    ).toBe('https://devops.example.com');
  });

  it('falls back to the Vercel production domain', () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'devops.vercel.app' })).toBe(
      'https://devops.vercel.app',
    );
  });

  it('falls back to localhost', () => {
    expect(resolveSiteUrl({})).toBe('http://localhost:3000');
  });
});
