'use client';

import { useTheme } from 'next-themes';
import { Suspense, use, useId, useSyncExternalStore } from 'react';

interface MermaidProps {
  chart: string;
  /** Accessible name for the diagram, e.g. "How a pod gets a GPU". */
  title?: string;
}

/**
 * Renders a Mermaid diagram in the browser, following the official Fumadocs recipe,
 * with one deliberate change: `securityLevel: 'strict'` (the recipe uses 'loose').
 * Strict mode encodes HTML in labels and disables click handlers, so a diagram in a
 * contributed page cannot inject markup or scripts.
 */
export function Mermaid({ chart, title }: MermaidProps) {
  // `false` on the server and during hydration, `true` afterwards.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient) return <DiagramPlaceholder />;
  return (
    <Suspense fallback={<DiagramPlaceholder />}>
      <MermaidContent chart={chart} title={title} />
    </Suspense>
  );
}

function DiagramPlaceholder() {
  return (
    <div
      className="my-6 h-40 animate-pulse rounded-xl border bg-fd-card motion-reduce:animate-none"
      aria-hidden="true"
    />
  );
}

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(key: string, create: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;
  const promise = create();
  cache.set(key, promise);
  return promise;
}

function MermaidContent({ chart, title }: MermaidProps) {
  // Mermaid uses the id in CSS selectors, so strip React's special characters.
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const { resolvedTheme } = useTheme();
  const { default: mermaid } = use(cachePromise('mermaid', () => import('mermaid')));

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    fontFamily: 'inherit',
    themeCSS: 'margin: 1.5rem auto 0;',
    theme: resolvedTheme === 'dark' ? 'dark' : 'default',
  });

  const { svg } = use(
    cachePromise(`${chart}-${resolvedTheme}`, () =>
      mermaid.render(id, chart.replaceAll('\\n', '\n')),
    ),
  );

  return (
    <div
      role={title ? 'img' : undefined}
      aria-label={title}
      className="my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      // Output of mermaid.render with securityLevel 'strict' (sanitized by Mermaid).
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
