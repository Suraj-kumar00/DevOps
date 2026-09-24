import type { Source, SourceType } from '@/lib/content/schema';

export const SOURCES_HEADING_ID = 'sources-and-credits';

const groupTitles: Record<SourceType, string> = {
  official: 'Official documentation',
  community: 'Community write-ups',
  talk: 'Talks',
  paper: 'Papers',
  book: 'Books',
};

const groupOrder: SourceType[] = ['official', 'community', 'talk', 'paper', 'book'];

/**
 * "Sources and credits", generated from the page frontmatter so every topic page
 * lists its sources the same way and credits authors by name.
 */
export function SourcesList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;

  return (
    <section aria-labelledby={SOURCES_HEADING_ID}>
      <h2 id={SOURCES_HEADING_ID}>Sources and credits</h2>
      {groupOrder.map((type) => {
        const group = sources.filter((source) => source.type === type);
        if (group.length === 0) return null;

        return (
          <div key={type}>
            <h3>{groupTitles[type]}</h3>
            <ul>
              {group.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer">
                    {source.title}
                  </a>
                  {source.author ? <> by {source.author}</> : null}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
