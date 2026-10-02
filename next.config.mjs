import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/**
 * Baseline security headers for every route.
 * The CSP is deliberately limited to directives that cannot break Next.js
 * (no script-src/style-src, which would need per-request nonces and dynamic rendering).
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Self-contained server bundle for the Docker image (see Dockerfile).
  output: 'standalone',
  images: {
    // Blog cover images come from Hashnode's CDN.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.hashnode.com' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withMDX(config);
