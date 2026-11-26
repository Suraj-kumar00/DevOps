/**
 * Progress tracking for `<Checklist>`: which items a reader has ticked off.
 *
 * Progress lives only in the reader's browser (localStorage). There is no account, no server
 * and nothing to sign up for. The functions here are pure so they can be tested without a DOM.
 */

const STORAGE_PREFIX = 'devops-hub:progress:';

/** Checklist ids are written by authors in MDX. Keep them URL-safe so keys stay predictable. */
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function storageKey(id: string): string {
  if (!idPattern.test(id)) {
    throw new Error(`Invalid checklist id "${id}". Use kebab-case, e.g. "week-1".`);
  }
  return `${STORAGE_PREFIX}${id}`;
}

/**
 * Reads the saved set of ticked item indexes.
 * Anything unexpected (empty, corrupt, edited by hand) yields an empty set, never an error,
 * so a bad value in storage can never break a page.
 */
export function parseProgress(raw: string | null, itemCount: number): Set<number> {
  if (!raw) return new Set();

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return new Set();
  }

  if (!Array.isArray(value)) return new Set();

  const done = new Set<number>();
  for (const entry of value) {
    // Drop indexes that no longer exist, for example after an author removed an item.
    if (Number.isInteger(entry) && entry >= 0 && entry < itemCount) done.add(entry);
  }
  return done;
}

export function serializeProgress(done: ReadonlySet<number>): string {
  return JSON.stringify([...done].sort((a, b) => a - b));
}

/** Returns a new set with `index` ticked or unticked. The input is not modified. */
export function toggleItem(done: ReadonlySet<number>, index: number): Set<number> {
  const next = new Set(done);
  if (next.has(index)) next.delete(index);
  else next.add(index);
  return next;
}

/** Whole-number percentage, 0 to 100. An empty list counts as 0, not NaN. */
export function percentDone(done: ReadonlySet<number>, itemCount: number): number {
  if (itemCount <= 0) return 0;
  return Math.round((done.size / itemCount) * 100);
}
