import { describe, expect, it, vi } from 'vitest';
import { createHashnodeNewsletter } from '@/lib/newsletter/hashnode';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('createHashnodeNewsletter', () => {
  it('sends the email and publication ID and maps PENDING', async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ data: { subscribeToNewsletter: { status: 'PENDING' } } }));
    const newsletter = createHashnodeNewsletter({ publicationId: 'pub-1', fetchImpl });

    await expect(newsletter.subscribe('reader@example.com')).resolves.toEqual({
      status: 'pending',
    });
    const [, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string).variables).toEqual({
      input: { email: 'reader@example.com', publicationId: 'pub-1' },
    });
  });

  it('maps CONFIRMED', async () => {
    const newsletter = createHashnodeNewsletter({
      publicationId: 'pub-1',
      fetchImpl: vi
        .fn<typeof fetch>()
        .mockResolvedValue(
          jsonResponse({ data: { subscribeToNewsletter: { status: 'CONFIRMED' } } }),
        ),
    });
    await expect(newsletter.subscribe('reader@example.com')).resolves.toEqual({
      status: 'confirmed',
    });
  });

  it('hides upstream GraphQL messages from the visitor but reports them', async () => {
    const onError = vi.fn<(message: string) => void>();
    const newsletter = createHashnodeNewsletter({
      publicationId: 'pub-1',
      fetchImpl: vi
        .fn<typeof fetch>()
        .mockResolvedValue(jsonResponse({ errors: [{ message: 'internal detail' }] })),
      onError,
    });

    const result = await newsletter.subscribe('reader@example.com');
    expect(result.status).toBe('error');
    expect(JSON.stringify(result)).not.toContain('internal detail');
    expect(onError).toHaveBeenCalledWith(expect.stringContaining('internal detail'));
  });

  it('returns a generic error when Hashnode is unreachable', async () => {
    const newsletter = createHashnodeNewsletter({
      publicationId: 'pub-1',
      fetchImpl: vi.fn<typeof fetch>().mockRejectedValue(new Error('timeout')),
      onError: vi.fn<(message: string) => void>(),
    });
    await expect(newsletter.subscribe('reader@example.com')).resolves.toMatchObject({
      status: 'error',
    });
  });
});
