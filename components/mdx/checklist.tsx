'use client';

import { useId, useSyncExternalStore } from 'react';
import {
  parseProgress,
  percentDone,
  serializeProgress,
  storageKey,
  toggleItem,
} from '@/lib/progress';

interface ChecklistProps {
  /** Unique, kebab-case id for this list. It names the browser storage key, so do not rename it. */
  id: string;
  items: string[];
}

const CHANGE_EVENT = 'devops-hub:progress-change';

/** Used when browser storage is blocked, so the list still works for the current visit. */
const memory = new Map<string, string>();

function readSaved(key: string): string | null {
  try {
    return localStorage.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

function writeSaved(key: string, value: string) {
  memory.set(key, value);
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage is blocked (private mode or strict settings). The memory copy keeps this visit working.
  }
  // `storage` events only fire in other tabs, so tell this tab's other checklists too.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/**
 * A checklist whose progress is saved in the reader's own browser, with no account.
 * Used for the weekly plans in the learning paths.
 */
export function Checklist({ id, items }: ChecklistProps) {
  const key = storageKey(id);
  const groupId = useId();

  // `undefined` on the server and during hydration, so the first render matches the server HTML.
  const saved = useSyncExternalStore<string | null | undefined>(
    subscribe,
    () => readSaved(key),
    () => undefined,
  );
  const ready = saved !== undefined;
  const done = parseProgress(saved ?? null, items.length);
  const percent = percentDone(done, items.length);

  function toggle(index: number) {
    writeSaved(key, serializeProgress(toggleItem(done, index)));
  }

  return (
    <div className="not-prose my-6 rounded-xl border bg-fd-card p-4 text-fd-card-foreground">
      <ul className="space-y-2">
        {items.map((item, index) => {
          const inputId = `${groupId}-${index}`;
          return (
            <li key={item} className="flex items-start gap-3">
              <input
                id={inputId}
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-(--color-fd-primary)"
                checked={done.has(index)}
                disabled={!ready}
                onChange={() => toggle(index)}
              />
              <label htmlFor={inputId} className="text-sm leading-6">
                {item}
              </label>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-fd-muted-foreground" aria-live="polite">
        {percent}% done. Saved only in this browser.
      </p>
    </div>
  );
}
