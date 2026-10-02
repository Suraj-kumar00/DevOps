'use server';

import { z } from 'zod';
import { HONEYPOT_FIELD, type SubscribeState } from '@/components/newsletter/state';
import { getNewsletterProvider } from '@/lib/newsletter';

const emailSchema = z.email().max(254);

const SUCCESS_MESSAGE = 'Almost there. Check your inbox to confirm your subscription.';

export async function subscribeAction(
  _previous: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Pretend success for bots so they do not retry with a different payload.
  if (formData.get(HONEYPOT_FIELD)) {
    return { status: 'success', message: SUCCESS_MESSAGE };
  }

  const email = emailSchema.safeParse(String(formData.get('email') ?? '').trim());
  if (!email.success) {
    return { status: 'error', message: 'Enter a valid email address.' };
  }

  const provider = getNewsletterProvider();
  if (!provider) {
    return { status: 'error', message: 'The newsletter is not set up yet.' };
  }

  const result = await provider.subscribe(email.data);
  switch (result.status) {
    case 'pending':
      return { status: 'success', message: SUCCESS_MESSAGE };
    case 'confirmed':
      return { status: 'success', message: 'You are subscribed. Thanks for reading.' };
    case 'error':
      return { status: 'error', message: result.message };
  }
}
