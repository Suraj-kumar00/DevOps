/** Pages not verified for this many days get an "may be outdated" notice. */
export const STALE_AFTER_DAYS = 180;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface Freshness {
  /** Whole days since the page was last verified (never negative). */
  ageInDays: number;
  stale: boolean;
}

/**
 * Computes how fresh a page is from its `lastVerified` date (YYYY-MM-DD, treated as UTC).
 * Pure function: pass `now` explicitly so results are deterministic in tests and builds.
 */
export function getFreshness(
  lastVerified: string,
  now: Date,
  staleAfterDays: number = STALE_AFTER_DAYS,
): Freshness {
  const verifiedAt = Date.parse(`${lastVerified}T00:00:00Z`);
  if (Number.isNaN(verifiedAt)) {
    throw new Error(`Invalid lastVerified date "${lastVerified}", expected YYYY-MM-DD.`);
  }

  const ageInDays = Math.max(0, Math.floor((now.getTime() - verifiedAt) / MS_PER_DAY));
  return { ageInDays, stale: ageInDays > staleAfterDays };
}
