import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { defineDocs } from 'fumadocs-mdx/macro';
import { docsFrontmatterSchema, docsMetaSchema } from '@/lib/content/schema';
import { docsRoute } from '@/lib/routes';

/**
 * Content collection for `content/docs`.
 * The macro is compiled by the bundler (see fumadocs-mdx "Macro API"), so `dir` must stay a literal.
 */
const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: docsFrontmatterSchema,
    postprocess: {
      // Needed by llms.txt, the per-page Markdown routes and the MCP server (see lib/llms.ts).
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: docsMetaSchema,
  },
});

export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type DocsPage = (typeof source)['$inferPage'];
