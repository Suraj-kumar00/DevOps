import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { SiteFooter } from '@/components/site-footer';
import { SkipLink } from '@/components/skip-link';
import { baseOptions } from '@/lib/layout.shared';

const CONTENT_ID = 'main-content';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <SkipLink targetId={CONTENT_ID} />
      {/* HomeLayout renders <main>; the footer sits outside it to keep the contentinfo landmark. */}
      <HomeLayout {...baseOptions()}>
        <div id={CONTENT_ID} className="flex flex-1 flex-col">
          {children}
        </div>
      </HomeLayout>
      <SiteFooter />
    </>
  );
}
