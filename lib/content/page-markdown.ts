import type { Level, Source } from '@/lib/content/schema';
import type { Track } from '@/lib/content/tracks';

export interface MarkdownPage {
  title: string;
  url: string;
  kind: 'topic' | 'track' | 'guide';
  level?: Level;
  toolVersion?: string;
  lastVerified?: string;
  sources: Source[];
}

function sourceLine(source: Source): string {
  const credit = source.author ? ` by ${source.author}` : '';
  return `- [${source.title}](${source.url})${credit} (${source.type})`;
}

function trackSections(track: Track): string[] {
  const sections: string[] = [];

  sections.push('## Published topics', '');
  if (track.published.length === 0) {
    sections.push('Nothing published in this track yet.', '');
  } else {
    for (const topic of track.published) {
      const description = topic.description ? `: ${topic.description}` : '';
      sections.push(`- [${topic.title}](${topic.url})${description}`);
    }
    sections.push('');
  }

  if (track.planned.length > 0) {
    sections.push('## On the roadmap', '');
    for (const topic of track.planned) {
      sections.push(`- ${topic.title}: ${topic.description}`);
    }
    sections.push('');
  }

  return sections;
}

/**
 * Markdown served to AI agents (`*.md` pages, llms-full.txt, MCP).
 * Adds what the MDX body does not contain but readers see on the page:
 * verification metadata, the sources list, and a track's topics.
 */
export function renderPageMarkdown(page: MarkdownPage, body: string, track?: Track): string {
  const lines: string[] = [`# ${page.title} (${page.url})`, ''];

  if (page.kind === 'topic' && page.level && page.toolVersion && page.lastVerified) {
    lines.push(
      `> Level: ${page.level}. Tested with: ${page.toolVersion}. Last verified: ${page.lastVerified}.`,
      '',
    );
  }

  lines.push(body.trim(), '');

  if (track) lines.push(...trackSections(track));

  if (page.kind === 'topic' && page.sources.length > 0) {
    lines.push('## Sources and credits', '', ...page.sources.map(sourceLine), '');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}
