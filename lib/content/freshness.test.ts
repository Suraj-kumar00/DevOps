import { describe, expect, it } from 'vitest';
import { getFreshness, STALE_AFTER_DAYS } from '@/lib/content/freshness';

const now = new Date('2026-09-22T12:00:00Z');

describe('getFreshness', () => {
  it('counts whole days since verification', () => {
    expect(getFreshness('2026-09-12', now)).toEqual({ ageInDays: 10, stale: false });
  });

  it('is stale only after the threshold', () => {
    const atThreshold = new Date(now.getTime() - STALE_AFTER_DAYS * 24 * 60 * 60 * 1000);
    const date = atThreshold.toISOString().slice(0, 10);
    expect(getFreshness(date, now).stale).toBe(false);
    expect(getFreshness('2025-01-01', now).stale).toBe(true);
  });

  it('never reports a negative age for future dates', () => {
    expect(getFreshness('2027-01-01', now).ageInDays).toBe(0);
  });

  it('rejects malformed dates', () => {
    expect(() => getFreshness('not-a-date', now)).toThrow(/Invalid lastVerified/);
  });
});
