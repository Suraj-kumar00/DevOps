import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookOpen, Rss } from 'lucide-react';
import { GitHubMark } from '@/components/brand/github-mark';
import { Logo } from '@/components/brand/logo';
import { docsRoute } from '@/lib/routes';
import { siteConfig } from '@/lib/site';

/** Options shared by the home and docs layouts (navbar, links, GitHub link). */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },
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
      {
        type: 'icon',
        url: siteConfig.repo.url,
        text: 'GitHub',
        label: 'GitHub repository',
        icon: <GitHubMark />,
        external: true,
      },
    ],
  };
}
