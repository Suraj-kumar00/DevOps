import Link from 'next/link';
import { LogoMark } from '@/components/brand/logo';
import { getTracks } from '@/lib/content/get-tracks';
import { docsRoute } from '@/lib/routes';
import { siteConfig } from '@/lib/site';

interface FooterLink {
  text: string;
  href: string;
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const tracks = getTracks();
  const year = new Date().getUTCFullYear();

  return (
    <footer className="border-t bg-fd-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
            <LogoMark />
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-sm text-sm text-fd-muted-foreground">
            Free, open-source guides for DevOps and AI infrastructure. Official docs first, verified
            and dated.
          </p>
        </div>
        <FooterColumn
          title="Learn"
          links={[
            { text: 'Start here', href: docsRoute },
            ...tracks.map((track) => ({ text: track.title, href: track.url })),
          ]}
        />
        <FooterColumn
          title="Community"
          links={[
            { text: 'GitHub repository', href: siteConfig.repo.url },
            { text: 'Contributing guide', href: '/docs/contributing' },
            { text: 'Code of Conduct', href: siteConfig.repo.codeOfConductUrl },
            { text: 'Report an issue', href: siteConfig.repo.issuesUrl },
          ]}
        />
        <FooterColumn
          title="Connect"
          links={[
            { text: 'Blog', href: '/blogs' },
            { text: 'LinkedIn', href: siteConfig.social.linkedin },
            { text: 'X', href: siteConfig.social.x },
            { text: 'GitHub', href: siteConfig.social.github },
          ]}
        />
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-fd-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {year} {siteConfig.maintainer.name} and contributors. Code under MIT, content under CC
            BY 4.0.
          </p>
          <p>
            Built with{' '}
            <a
              href="https://fumadocs.dev"
              className="underline underline-offset-2 hover:text-fd-foreground"
            >
              Fumadocs
            </a>{' '}
            and{' '}
            <a
              href="https://nextjs.org"
              className="underline underline-offset-2 hover:text-fd-foreground"
            >
              Next.js
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
