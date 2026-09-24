import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button-link';
import { baseOptions } from '@/lib/layout.shared';
import { docsRoute } from '@/lib/routes';
import { siteConfig } from '@/lib/site';

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-medium text-fd-primary">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page does not exist
        </h1>
        <p className="mt-3 max-w-md text-fd-muted-foreground">
          It may have moved while the docs were reorganized. Try searching, or start from the
          overview.
        </p>
        <FullSearchTrigger className="mt-8 w-full max-w-sm py-2 ps-3 text-base" />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href={docsRoute}>
            <ArrowLeft aria-hidden="true" />
            Go to the docs
          </ButtonLink>
          <ButtonLink href={siteConfig.repo.issuesUrl} variant="outline">
            Report a broken link
          </ButtonLink>
        </div>
      </div>
    </HomeLayout>
  );
}
