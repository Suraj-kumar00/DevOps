import { z } from 'zod';
import type { BlogPost, BlogSource } from '@/lib/blog/types';

export const HASHNODE_GQL_ENDPOINT = 'https://gql.hashnode.com';

/** Hashnode caps page sizes; keep requests within a safe range. */
const MAX_PAGE_SIZE = 20;

/**
 * Field names follow Hashnode's public GraphQL schema
 * (see the `User.posts` connection in Hashnode's official starter kit schema).
 */
const RECENT_POSTS_QUERY = /* GraphQL */ `
  query RecentPosts($username: String!, $pageSize: Int!) {
    user(username: $username) {
      posts(page: 1, pageSize: $pageSize, sortBy: DATE_PUBLISHED_DESC) {
        edges {
          node {
            title
            brief
            url
            publishedAt
            readTimeInMinutes
            coverImage {
              url
            }
            tags {
              name
            }
          }
        }
      }
    }
  }
`;

const responseSchema = z.object({
  data: z
    .object({
      user: z
        .object({
          posts: z.object({
            edges: z.array(
              z.object({
                node: z.object({
                  title: z.string(),
                  brief: z.string(),
                  url: z.url(),
                  publishedAt: z.string(),
                  readTimeInMinutes: z.number().nullish(),
                  coverImage: z.object({ url: z.url() }).nullish(),
                  tags: z.array(z.object({ name: z.string() })).nullish(),
                }),
              }),
            ),
          }),
        })
        .nullable(),
    })
    .nullish(),
  errors: z.array(z.object({ message: z.string() })).optional(),
});

export interface HashnodeBlogOptions {
  username: string;
  endpoint?: string;
  /** Seconds before Next.js refetches the feed. */
  revalidateSeconds?: number;
  timeoutMs?: number;
  /** Injected for tests. Defaults to the global fetch. */
  fetchImpl?: typeof fetch;
  /** Injected for tests. Defaults to console.warn. */
  onError?: (message: string) => void;
}

export function createHashnodeBlogSource({
  username,
  endpoint = HASHNODE_GQL_ENDPOINT,
  revalidateSeconds = 3600,
  timeoutMs = 8000,
  fetchImpl = fetch,
  onError = (message) => console.warn(`[blog] ${message}`),
}: HashnodeBlogOptions): BlogSource {
  return {
    async getRecentPosts(limit) {
      const pageSize = Math.min(Math.max(1, Math.trunc(limit)), MAX_PAGE_SIZE);

      let payload: unknown;
      try {
        const response = await fetchImpl(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: RECENT_POSTS_QUERY, variables: { username, pageSize } }),
          signal: AbortSignal.timeout(timeoutMs),
          next: { revalidate: revalidateSeconds },
        });
        if (!response.ok) {
          onError(`Hashnode responded with HTTP ${response.status}.`);
          return [];
        }
        payload = await response.json();
      } catch (error) {
        onError(
          `Could not reach Hashnode: ${error instanceof Error ? error.message : String(error)}`,
        );
        return [];
      }

      const parsed = responseSchema.safeParse(payload);
      if (!parsed.success) {
        onError('Unexpected response shape from Hashnode.');
        return [];
      }
      if (parsed.data.errors?.length) {
        onError(`Hashnode GraphQL error: ${parsed.data.errors[0]?.message}`);
        return [];
      }

      const edges = parsed.data.data?.user?.posts.edges ?? [];
      return edges.map(({ node }): BlogPost => ({
        title: node.title,
        excerpt: node.brief,
        url: node.url,
        publishedAt: node.publishedAt,
        coverImageUrl: node.coverImage?.url ?? undefined,
        readingTimeMinutes: node.readTimeInMinutes ?? undefined,
        tags: (node.tags ?? []).map((tag) => tag.name),
      }));
    },
  };
}
