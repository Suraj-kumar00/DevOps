import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from '@/components/mdx/mermaid';
import { ProductionNote } from '@/components/mdx/production-note';
import { Scenario, Scenarios } from '@/components/mdx/scenario';
import { LevelBadge } from '@/components/ui/level-badge';

/**
 * Components available in every MDX page without importing them.
 * Documented for contributors in /docs/page-template.
 */
export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    Mermaid,
    ProductionNote,
    Scenario,
    Scenarios,
    LevelBadge,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
