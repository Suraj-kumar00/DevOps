import { describe, expect, it } from 'vitest';
import {
  parseProgress,
  percentDone,
  serializeProgress,
  storageKey,
  toggleItem,
} from '@/lib/progress';

describe('storageKey', () => {
  it('namespaces the key', () => {
    expect(storageKey('week-1')).toBe('devops-hub:progress:week-1');
  });

  it('rejects ids that are not kebab-case', () => {
    expect(() => storageKey('Week 1')).toThrow(/Invalid checklist id/);
    expect(() => storageKey('')).toThrow(/Invalid checklist id/);
  });
});

describe('parseProgress', () => {
  it('reads a saved list', () => {
    expect(parseProgress('[0,2]', 3)).toEqual(new Set([0, 2]));
  });

  it('treats empty and missing values as no progress', () => {
    expect(parseProgress(null, 3)).toEqual(new Set());
    expect(parseProgress('', 3)).toEqual(new Set());
  });

  it('survives corrupt or hand-edited values', () => {
    expect(parseProgress('{not json', 3)).toEqual(new Set());
    expect(parseProgress('{"0":true}', 3)).toEqual(new Set());
    expect(parseProgress('"text"', 3)).toEqual(new Set());
  });

  it('drops indexes that are invalid or no longer exist', () => {
    expect(parseProgress('[0,1,5,-1,1.5,"2",null]', 3)).toEqual(new Set([0, 1]));
  });
});

describe('toggleItem', () => {
  it('ticks and unticks without changing the input', () => {
    const empty = new Set<number>();
    const ticked = toggleItem(empty, 1);
    expect(ticked).toEqual(new Set([1]));
    expect(empty.size).toBe(0);
    expect(toggleItem(ticked, 1)).toEqual(new Set());
  });
});

describe('serializeProgress', () => {
  it('round-trips and keeps indexes sorted', () => {
    const done = new Set([2, 0, 1]);
    expect(serializeProgress(done)).toBe('[0,1,2]');
    expect(parseProgress(serializeProgress(done), 3)).toEqual(done);
  });
});

describe('percentDone', () => {
  it('rounds to whole numbers', () => {
    expect(percentDone(new Set([0]), 3)).toBe(33);
    expect(percentDone(new Set([0, 1]), 3)).toBe(67);
    expect(percentDone(new Set([0, 1, 2]), 3)).toBe(100);
  });

  it('is 0 for an empty list', () => {
    expect(percentDone(new Set(), 0)).toBe(0);
  });
});
