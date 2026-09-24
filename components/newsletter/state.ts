export interface SubscribeState {
  status: 'idle' | 'success' | 'error';
  message: string;
}

export const initialSubscribeState: SubscribeState = { status: 'idle', message: '' };

/** Name of the hidden honeypot field. Humans never see it; naive bots fill it in. */
export const HONEYPOT_FIELD = 'website';
