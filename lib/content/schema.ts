import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

/**
 * Frontmatter contract for every page in `content/docs`.
 *
 * Validated at build time, so a page that breaks the contract fails the build
 * (and CI) with a message pointing at the missing field.
 *
 * Page kinds:
 * - `topic` (default): a tool or concept page. Strict: must declare level, the version it
 *   was verified against, the date it was verified, and at least one official source.
 * - `track`: the overview page of a learning track, with its planned topics.
 * - `guide`: site guides such as "Start here" or the contributing guide.
 */

export const pageKinds = ['topic', 'track', 'guide'] as const;
export type PageKind = (typeof pageKinds)[number];

export const levels = ['beginner', 'intermediate', 'advanced'] as const;
export type Level = (typeof levels)[number];

export const sourceTypes = ['official', 'community', 'talk', 'paper', 'book'] as const;
export type SourceType = (typeof sourceTypes)[number];

const kebabCase = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const sourceSchema = z
  .object({
    title: z.string().trim().min(1),
    url: z.url({ protocol: /^https$/ }),
    type: z.enum(sourceTypes).default('official'),
    /** Required for anything that is not official documentation, so we always credit people. */
    author: z.string().trim().min(1).optional(),
  })
  .superRefine((source, ctx) => {
    if (source.type !== 'official' && !source.author) {
      ctx.addIssue({
        code: 'custom',
        path: ['author'],
        message: `"${source.title}" is a ${source.type} source: add its author so we credit them.`,
      });
    }
  });

export type Source = z.infer<typeof sourceSchema>;

export const plannedTopicSchema = z.object({
  /** File name the page will get, e.g. `gpu-sharing` for `gpu-sharing.mdx`. */
  slug: z.string().regex(kebabCase, 'Use kebab-case, e.g. "gpu-sharing".'),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

export type PlannedTopic = z.infer<typeof plannedTopicSchema>;

export const docsFrontmatterSchema = pageSchema
  .extend({
    kind: z.enum(pageKinds).default('topic'),
    /** Minimum level a reader needs to get value from the page. */
    level: z.enum(levels).optional(),
    /** Version the examples were tested against, e.g. "Kubernetes 1.34". */
    toolVersion: z.string().trim().min(1).optional(),
    /** Date (YYYY-MM-DD) someone last checked the page against the official docs. */
    lastVerified: z.iso.date().optional(),
    sources: z.array(sourceSchema).default([]),
    /** Doc URLs a reader should know first, e.g. "/docs/devops/kubernetes". */
    prerequisites: z.array(z.string().startsWith('/docs/')).default([]),
    /** Track pages only: topics on the roadmap that do not have a page yet. */
    planned: z.array(plannedTopicSchema).default([]),
    /** Track pages only: highlight the track on the home page. */
    flagship: z.boolean().default(false),
  })
  .superRefine((page, ctx) => {
    const guide = 'See /docs/page-template for the page contract.';

    if (page.kind === 'topic') {
      const required = ['level', 'toolVersion', 'lastVerified'] as const;
      for (const key of required) {
        if (!page[key]) {
          ctx.addIssue({
            code: 'custom',
            path: [key],
            message: `Topic pages need "${key}". ${guide}`,
          });
        }
      }

      if (!page.sources.some((source) => source.type === 'official')) {
        ctx.addIssue({
          code: 'custom',
          path: ['sources'],
          message: `Topic pages need at least one official source. ${guide}`,
        });
      }
    }

    if (page.kind !== 'track' && (page.planned.length > 0 || page.flagship)) {
      ctx.addIssue({
        code: 'custom',
        path: ['planned'],
        message: '"planned" and "flagship" are only allowed on track pages (kind: track).',
      });
    }

    const plannedSlugs = page.planned.map((topic) => topic.slug);
    const duplicate = plannedSlugs.find((slug, index) => plannedSlugs.indexOf(slug) !== index);
    if (duplicate) {
      ctx.addIssue({
        code: 'custom',
        path: ['planned'],
        message: `Planned topic slug "${duplicate}" is listed twice.`,
      });
    }
  });

export type DocsFrontmatter = z.infer<typeof docsFrontmatterSchema>;

export const docsMetaSchema = metaSchema;
