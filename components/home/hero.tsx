import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { ArrowRight } from 'lucide-react';
import { PageAnatomyCard } from '@/components/home/page-anatomy-card';
import { ButtonLink } from '@/components/ui/button-link';
import { docsRoute } from '@/lib/routes';
import { siteConfig } from '@/lib/site';

interface HeroProps {
  /** Link to the flagship track, when one exists. */
  flagship?: { title: string; url: string };
}

export function Hero({ flagship }: HeroProps) {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-60"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <a
            href={siteConfig.repo.url}
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-fd-background/80 px-3 py-1 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <span className="size-2 rounded-full bg-fd-primary" aria-hidden="true" />
            Open source and community-driven
          </a>
          <h1
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            Learn DevOps and AI infrastructure the way it runs in production
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fd-muted-foreground text-pretty">
            Free guides for DevOps, DevSecOps, MLOps, LLMOps and AI infrastructure on Kubernetes.
            Every page starts from the official docs, adds a hands-on example, and ends with
            production notes and interview scenarios.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={docsRoute} size="lg">
              Start learning
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            {flagship ? (
              <ButtonLink href={flagship.url} size="lg" variant="outline">
                Explore {flagship.title}
              </ButtonLink>
            ) : null}
          </div>
          <FullSearchTrigger className="mt-6 w-full max-w-md py-2 ps-3 text-base" />
          <p className="mt-6 text-sm text-fd-muted-foreground">
            Maintained by{' '}
            <a
              href={siteConfig.maintainer.url}
              className="font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 hover:decoration-fd-primary"
            >
              {siteConfig.maintainer.name}
            </a>{' '}
            and contributors.
          </p>
        </div>
        <PageAnatomyCard />
      </div>
    </section>
  );
}
