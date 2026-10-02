'use client';

import { useActionState, useId } from 'react';
import { HONEYPOT_FIELD, initialSubscribeState } from '@/components/newsletter/state';
import { subscribeAction } from '@/components/newsletter/subscribe-action';
import { cn } from '@/lib/cn';

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeAction, initialSubscribeState);
  const emailId = useId();
  const messageId = useId();

  return (
    <form action={formAction} className="w-full max-w-md" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby={messageId}
          aria-invalid={state.status === 'error' || undefined}
          className="h-10 flex-1 rounded-lg border bg-fd-background px-3 text-sm placeholder:text-fd-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-fd-ring"
        />
        {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-fd-primary px-4 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-primary disabled:opacity-70"
        >
          {pending ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <output
        id={messageId}
        aria-live="polite"
        className={cn(
          'mt-2 block min-h-5 text-sm',
          state.status === 'error' ? 'text-fd-error' : 'text-fd-muted-foreground',
        )}
      >
        {state.message}
      </output>
    </form>
  );
}
