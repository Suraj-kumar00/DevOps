import { z } from 'zod';
import { HASHNODE_GQL_ENDPOINT } from '@/lib/blog/hashnode';
import type { NewsletterProvider, SubscribeResult } from '@/lib/newsletter/types';

/**
 * Mutation and enum values follow Hashnode's public GraphQL schema:
 * `subscribeToNewsletter(input: { email, publicationId })` returns `status: PENDING | CONFIRMED`.
 */
const SUBSCRIBE_MUTATION = /* GraphQL */ `
  mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      status
    }
  }
`;

const responseSchema = z.object({
  data: z
    .object({
      subscribeToNewsletter: z.object({ status: z.enum(['PENDING', 'CONFIRMED']).nullish() }),
    })
    .nullish(),
  errors: z.array(z.object({ message: z.string() })).optional(),
});

export interface HashnodeNewsletterOptions {
  publicationId: string;
  endpoint?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  onError?: (message: string) => void;
}

const GENERIC_ERROR = 'Could not subscribe right now. Please try again later.';

export function createHashnodeNewsletter({
  publicationId,
  endpoint = HASHNODE_GQL_ENDPOINT,
  timeoutMs = 8000,
  fetchImpl = fetch,
  onError = (message) => console.warn(`[newsletter] ${message}`),
}: HashnodeNewsletterOptions): NewsletterProvider {
  return {
    async subscribe(email): Promise<SubscribeResult> {
      let payload: unknown;
      try {
        const response = await fetchImpl(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: SUBSCRIBE_MUTATION,
            variables: { input: { email, publicationId } },
          }),
          signal: AbortSignal.timeout(timeoutMs),
          cache: 'no-store',
        });
        if (!response.ok) {
          onError(`Hashnode responded with HTTP ${response.status}.`);
          return { status: 'error', message: GENERIC_ERROR };
        }
        payload = await response.json();
      } catch (error) {
        onError(
          `Could not reach Hashnode: ${error instanceof Error ? error.message : String(error)}`,
        );
        return { status: 'error', message: GENERIC_ERROR };
      }

      const parsed = responseSchema.safeParse(payload);
      if (!parsed.success) {
        onError('Unexpected response shape from Hashnode.');
        return { status: 'error', message: GENERIC_ERROR };
      }

      const graphQLError = parsed.data.errors?.[0]?.message;
      if (graphQLError) {
        // Log the provider's message, but do not show raw upstream errors to visitors.
        onError(`Hashnode GraphQL error: ${graphQLError}`);
        return {
          status: 'error',
          message: 'This address could not be subscribed. It may already be on the list.',
        };
      }

      return parsed.data.data?.subscribeToNewsletter.status === 'CONFIRMED'
        ? { status: 'confirmed' }
        : { status: 'pending' };
    },
  };
}
