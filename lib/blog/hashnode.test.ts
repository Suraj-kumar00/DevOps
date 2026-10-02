import { describe, expect, it, vi } from 'vitest';
import { createHashnodeBlogSource } from '@/lib/blog/hashnode';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const node = {
  title: 'Airflow 3 on EKS',
  brief: 'Lessons from an upgrade.',
  url: 'https://blog.example.com/airflow-3-on-eks',
  publishedAt: '2026-09-01T10:00:00.000Z',
  readTimeInMinutes: 7,
  coverImage: { url: 'https://cdn.hashnode.com/cover.png' },
  tags: [{ name: 'airflow' }, { name: 'kubernetes' }],
};

describe('createHashnodeBlogSource', () => {
  it('maps posts from the GraphQL response', async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ data: { user: { posts: { edges: [{ node }] } } } }));
    const blog = createHashnodeBlogSource({
      username: 'someone',
      fetchImpl,
      onError: vi.fn<(message: string) => void>(),
    });

    await expect(blog.getRecentPosts(3)).resolves.toEqual([
      {
        title: 'Airflow 3 on EKS',
        excerpt: 'Lessons from an upgrade.',
        url: 'https://blog.example.com/airflow-3-on-eks',
        publishedAt: '2026-09-01T10:00:00.000Z',
        coverImageUrl: 'https://cdn.hashnode.com/cover.png',
        readingTimeMinutes: 7,
        tags: ['airflow', 'kubernetes'],
      },
    ]);

    const [, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string).variables).toEqual({ username: 'someone', pageSize: 3 });
  });

  it('clamps the page size to what Hashnode allows', async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ data: { user: { posts: { edges: [] } } } }));
    const blog = createHashnodeBlogSource({
      username: 'someone',
      fetchImpl,
      onError: vi.fn<(message: string) => void>(),
    });

    await blog.getRecentPosts(500);
    const [, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string).variables.pageSize).toBe(20);
  });

  it.each([
    ['a network error', () => Promise.reject(new Error('ECONNRESET'))],
    ['an HTTP error', () => Promise.resolve(jsonResponse({}, 503))],
    ['a GraphQL error', () => Promise.resolve(jsonResponse({ errors: [{ message: 'nope' }] }))],
    ['an unexpected shape', () => Promise.resolve(jsonResponse({ data: { user: { posts: 1 } } }))],
  ])('returns no posts and reports %s', async (_label, respond) => {
    const onError = vi.fn<(message: string) => void>();
    const blog = createHashnodeBlogSource({
      username: 'someone',
      fetchImpl: vi.fn<typeof fetch>().mockImplementation(respond),
      onError,
    });

    await expect(blog.getRecentPosts(3)).resolves.toEqual([]);
    expect(onError).toHaveBeenCalledOnce();
  });

  it('returns no posts for an unknown user', async () => {
    const blog = createHashnodeBlogSource({
      username: 'nobody',
      fetchImpl: vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ data: { user: null } })),
      onError: vi.fn<(message: string) => void>(),
    });
    await expect(blog.getRecentPosts(3)).resolves.toEqual([]);
  });
});
