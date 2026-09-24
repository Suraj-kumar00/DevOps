import 'server-only';
import { createHashnodeNewsletter } from '@/lib/newsletter/hashnode';
import type { NewsletterProvider } from '@/lib/newsletter/types';

export type { NewsletterProvider, SubscribeResult } from '@/lib/newsletter/types';

/**
 * The configured newsletter provider, or `undefined` when no provider is configured.
 * Without one, the UI links to the blog instead of rendering a form.
 */
export function getNewsletterProvider(
  env: Record<string, string | undefined> = process.env,
): NewsletterProvider | undefined {
  const publicationId = env.HASHNODE_PUBLICATION_ID?.trim();
  return publicationId ? createHashnodeNewsletter({ publicationId }) : undefined;
}
