import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookOpen, Rss } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { docsRoute } from '@/lib/routes';
import { siteConfig } from '@/lib/site';

/** Options shared by the home and docs layouts (navbar, links, GitHub button). */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },
    githubUrl: siteConfig.repo.url,
    links: [
      {
        text: 'Docs',
        url: docsRoute,
        active: 'nested-url',
        icon: <BookOpen />,
      },
      {
        text: 'Blog',
        url: '/blogs',
        active: 'nested-url',
        icon: <Rss />,
      },
    ],
  };
}
