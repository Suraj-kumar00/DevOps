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

/** Diagram colors in light mode. Text on every fill passes 4.5:1. */
const lightDiagram = {
  darkMode: false,
  background: '#ffffff',
  primaryColor: '#eaf0fd',
  primaryBorderColor: '#2458d3',
  primaryTextColor: '#0b0d12',
  secondaryColor: '#f1ebfe',
  secondaryBorderColor: '#6d28d9',
  secondaryTextColor: '#0b0d12',
  tertiaryColor: '#eef0f4',
  tertiaryBorderColor: '#dde1e8',
  tertiaryTextColor: '#0b0d12',
  lineColor: '#5b6271',
  textColor: '#0b0d12',
  nodeTextColor: '#0b0d12',
  edgeLabelBackground: '#ffffff',
  clusterBkg: '#f7f8fa',
  clusterBorder: '#dde1e8',
  titleColor: '#0b0d12',
};

/** Diagram colors in dark mode. Text on every fill passes 4.5:1. */
const darkDiagram = {
  darkMode: true,
  background: '#11141b',
  primaryColor: '#1a2340',
  primaryBorderColor: '#7aa2ff',
  primaryTextColor: '#e8ebf1',
  secondaryColor: '#241b3d',
  secondaryBorderColor: '#c4a7ff',
  secondaryTextColor: '#e8ebf1',
  tertiaryColor: '#171b24',
  tertiaryBorderColor: '#262c38',
  tertiaryTextColor: '#e8ebf1',
  lineColor: '#9ba3b4',
  textColor: '#e8ebf1',
  nodeTextColor: '#e8ebf1',
  edgeLabelBackground: '#171b24',
  clusterBkg: '#0b0d12',
  clusterBorder: '#262c38',
  titleColor: '#e8ebf1',
};

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
    // Only the "base" theme takes custom colors; these mirror app/global.css.
    theme: 'base',
    themeVariables: resolvedTheme === 'dark' ? darkDiagram : lightDiagram,
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
