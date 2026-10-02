import type { SVGProps } from 'react';
import { Icon, fill, line, shape, tone } from '@/components/icons/track-icons';

/*
 * Static icons for the home page feature lists, drawn in the same style as the track icons.
 */

type IconProps = SVGProps<SVGSVGElement>;

/** Official docs first: a document with a verified seal. */
export function VerifiedDocIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l4 4v4" />
      <path d="M14 3v4h4M8.5 9h5M8.5 12.5h3.5" />
      <circle cx="17" cy="17" r="4" style={shape(tone.blue)} fillOpacity={0.2} />
      <path d="m15.25 17 1.25 1.25 2.25-2.5" style={line(tone.blue)} />
    </Icon>
  );
}

/** Credit, never copy: a quotation with its author named underneath. */
export function AttributionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <g fill="currentColor" stroke="none">
        <rect x="4" y="5" width="6" height="6" rx="1.5" />
        <rect x="13" y="5" width="6" height="6" rx="1.5" />
      </g>
      <path d="M10 9.5c0 2.8-1.4 4.6-4.5 5.5M19 9.5c0 2.8-1.4 4.6-4.5 5.5" />
      <circle cx="6" cy="20" r="1.25" style={fill(tone.cyan)} stroke="none" />
      <path d="M9.5 20h8.5" style={line(tone.cyan)} />
    </Icon>
  );
}

/** Verified and dated: a calendar with a check mark. */
export function VerifiedDateIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <path d="m9 15 2 2 4-4" style={line(tone.violet)} strokeWidth={1.75} />
    </Icon>
  );
}

/** Open source: a pull request, the way anyone can fix a page. */
export function PullRequestIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <path d="M6 8v8" />
      <circle cx="18" cy="18" r="2" style={shape(tone.cyan)} fillOpacity={0.25} />
      <path d="M18 16V9a3 3 0 0 0-3-3h-4" />
      <path d="m13 4-2 2 2 2" />
    </Icon>
  );
}

/** llms.txt: an index listing every page. */
export function PageIndexIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <g style={fill(tone.violet)} stroke="none">
        <circle cx="8" cy="8.5" r="1" />
        <circle cx="8" cy="12.5" r="1" />
        <circle cx="8" cy="16.5" r="1" />
      </g>
      <path d="M11 8.5h5M11 12.5h5M11 16.5h3" />
    </Icon>
  );
}

/** Markdown for every page: the public-domain Markdown mark, an M with a down arrow. */
export function MarkdownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M6 15V9l2.5 3L11 9v6" />
      <path d="M16 9v6M13.75 12.75 16 15l2.25-2.25" style={line(tone.violet)} />
    </Icon>
  );
}

/** MCP server: a connector that plugs AI tools into these docs. */
export function ConnectorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 7V3M15 7V3" />
      <path d="M6 7h12v4a6 6 0 0 1-12 0z" style={shape(tone.violet)} fillOpacity={0.2} />
      <path d="M12 17v4" />
    </Icon>
  );
}
