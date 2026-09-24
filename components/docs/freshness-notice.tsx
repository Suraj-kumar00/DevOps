import { Callout } from 'fumadocs-ui/components/callout';

interface FreshnessNoticeProps {
  ageInDays: number;
  issueUrl: string;
}

/** Shown on topic pages that have not been re-verified recently. */
export function FreshnessNotice({ ageInDays, issueUrl }: FreshnessNoticeProps) {
  const months = Math.floor(ageInDays / 30);

  return (
    <Callout type="warn" title="This page may be outdated">
      It was last checked against the official docs about {months} months ago, and tools in this
      space change fast. Compare with the official documentation before relying on it, and{' '}
      <a href={issueUrl}>let us know</a> if something changed.
    </Callout>
  );
}
