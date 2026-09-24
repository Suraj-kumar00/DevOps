import { ExternalLink, PenLine } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/newsletter-form';
import { ButtonLink } from '@/components/ui/button-link';
import { siteConfig } from '@/lib/site';

interface ContributeProps {
  /** Renders the newsletter form when a provider is configured, a link otherwise. */
  newsletterEnabled: boolean;
}

export function Contribute({ newsletterEnabled }: ContributeProps) {
  const proposeTopicUrl = `${siteConfig.repo.issuesUrl}/new?template=new-topic.yml`;

  return (
    <section aria-labelledby="contribute-heading" className="px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border bg-fd-card p-6 sm:p-8">
          <h2 id="contribute-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Write the page you wish existed
          </h2>
          <p className="mt-3 max-w-xl text-fd-muted-foreground">
            Share a production story, fix an outdated example, or propose a topic. Every
            contribution is reviewed and credited.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/docs/contributing">
              <PenLine aria-hidden="true" />
              How to contribute
            </ButtonLink>
            <ButtonLink href={proposeTopicUrl} variant="outline">
              Propose a topic
              <ExternalLink aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-2xl border bg-fd-card p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">Get new guides by email</h2>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            An occasional email when new guides and posts are published.
          </p>
          <div className="mt-5">
            {newsletterEnabled ? (
              <NewsletterForm />
            ) : (
              <ButtonLink href={siteConfig.blog.profileUrl} variant="outline">
                Follow the blog
                <ExternalLink aria-hidden="true" />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
