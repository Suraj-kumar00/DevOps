/** First focusable element on every page: lets keyboard users jump past the navigation. */
export function SkipLink({ targetId }: { targetId: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-fd-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-fd-primary-foreground"
    >
      Skip to content
    </a>
  );
}
