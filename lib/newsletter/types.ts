export type SubscribeResult =
  /** Subscription created; the provider sent a confirmation email. */
  | { status: 'pending' }
  /** The address is subscribed and confirmed. */
  | { status: 'confirmed' }
  | { status: 'error'; message: string };

/**
 * A newsletter backend. The form and server action depend on this interface only,
 * so a different provider (Buttondown, Listmonk, ...) is one new implementation.
 */
export interface NewsletterProvider {
  subscribe(email: string): Promise<SubscribeResult>;
}
