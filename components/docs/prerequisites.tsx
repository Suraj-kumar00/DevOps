import { Callout } from 'fumadocs-ui/components/callout';
import Link from 'next/link';

export interface PrerequisiteLink {
  title: string;
  url: string;
}

/** "Before you start" list for topic pages that build on other pages. */
export function Prerequisites({ items }: { items: PrerequisiteLink[] }) {
  if (items.length === 0) return null;

  return (
    <Callout title="Before you start">
      <ul>
        {items.map((item) => (
          <li key={item.url}>
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </Callout>
  );
}
