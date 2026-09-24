/**
 * Site-wide settings: branding, URLs and social links.
 *
 * This module is the single place to change them. Components and routes import
 * from here instead of hard-coding names or URLs. It holds static values only,
 * so it is safe to import from both server and client components.
 * Environment-dependent values live in `lib/site-url.ts` and `lib/newsletter`.
 */

const repo = {
  owner: 'Suraj-kumar00',
  name: 'DevOps',
  branch: 'main',
} as const;

const repoUrl = `https://github.com/${repo.owner}/${repo.name}`;

export const siteConfig = {
  name: 'DevOps Learning Hub',
  description:
    'A free, open-source handbook for DevOps, DevSecOps, MLOps, LLMOps and AI infrastructure on Kubernetes. Official docs first, hands-on examples, and production notes from practicing engineers.',
  repo: {
    ...repo,
    url: repoUrl,
    issuesUrl: `${repoUrl}/issues`,
    contributingUrl: `${repoUrl}/blob/${repo.branch}/CONTRIBUTING.md`,
    codeOfConductUrl: `${repoUrl}/blob/${repo.branch}/CODE_OF_CONDUCT.md`,
  },
  maintainer: {
    name: 'Suraj Kumar',
    url: 'https://github.com/Suraj-kumar00',
  },
  social: {
    github: 'https://github.com/Suraj-kumar00',
    linkedin: 'https://www.linkedin.com/in/surajkumar00',
    x: 'https://x.com/surajk_umar01',
  },
  blog: {
    hashnodeUsername: 'surajkumar00',
    /** Fallback link when the blog feed cannot be loaded. */
    profileUrl: 'https://hashnode.com/@surajkumar00',
  },
} as const;

export type SiteConfig = typeof siteConfig;
