const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * Formats a date as "22 Sep 2026". Uses UTC so the server and the browser always
 * render the same string (no hydration mismatch across time zones).
 */
export function formatDate(value: string | Date): string {
  const date =
    typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(`${value}T00:00:00Z`)
      : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return dateFormatter.format(date);
}
