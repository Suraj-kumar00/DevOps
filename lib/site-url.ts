import 'server-only';

type Env = Record<string, string | undefined>;

/**
 * Resolves the public origin of the site (no trailing slash).
 *
 * Order: `SITE_URL`, then Vercel's production domain, then the local dev server.
 * `SITE_URL` is deliberately not `NEXT_PUBLIC_`: Next.js inlines those at build time, while this
 * value must also be readable at runtime (for example `docker run -e SITE_URL=...`).
 * Statically generated pages (sitemap, metadata) still use the value present at build time.
 */
export function resolveSiteUrl(env: Env = process.env): string {
  const explicit = env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercelProduction = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return `https://${vercelProduction}`;

  return 'http://localhost:3000';
}

export const siteUrl = resolveSiteUrl();
