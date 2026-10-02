import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { type NextRequest, NextResponse } from 'next/server';
import { docsContentRoute, docsRoute } from '@/lib/routes';

/**
 * Serves the Markdown version of docs pages:
 * - `/docs/foo.md` always returns Markdown;
 * - `/docs/foo` returns Markdown when the client prefers it (`Accept: text/markdown`),
 *   which is how many AI agents fetch pages.
 */
const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

export default function proxy(request: NextRequest) {
  const suffixed = rewriteSuffix(request.nextUrl.pathname);
  if (suffixed) {
    return NextResponse.rewrite(new URL(suffixed, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const negotiated = rewriteDocs(request.nextUrl.pathname);
    if (negotiated) {
      return NextResponse.rewrite(new URL(negotiated, request.nextUrl), {
        // Same URL, two representations selected by `Accept`.
        headers: { Vary: 'Accept' },
      });
    }
  }

  return NextResponse.next();
}

// Only docs URLs can be rewritten, so skip the proxy for everything else.
export const config = {
  matcher: ['/docs', '/docs.md', '/docs/:path*'],
};
