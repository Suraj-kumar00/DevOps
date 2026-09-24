import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SkipLink } from '@/components/skip-link';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <>
      {/* `nd-page` is the <article> Fumadocs renders for every docs page. */}
      <SkipLink targetId="nd-page" />
      <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
        {children}
      </DocsLayout>
    </>
  );
}
