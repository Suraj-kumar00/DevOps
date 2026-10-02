import type { CSSProperties, ReactNode, SVGProps } from 'react';

/*
 * Hand-drawn icons for the six tracks and the "Start here" section. One visual language:
 * a 24px grid, 1.5px rounded strokes in the current text color, and one accent in a brand
 * color, cyan for the foundations and pipelines through violet for AI.
 * Parts with an `icon-*` class animate on the home page track cards (see global.css). The motion
 * loops continuously and stops when the reader prefers reduced motion.
 */

type IconProps = SVGProps<SVGSVGElement>;

const tone = {
  cyan: 'var(--color-brand-cyan)',
  blue: 'var(--color-brand-blue)',
  violet: 'var(--color-brand-violet)',
};

/** A solid accent shape with no outline. */
const fill = (color: string): CSSProperties => ({ fill: color });
/** An accent shape: outline in the accent color with a soft fill of the same color. */
const shape = (color: string): CSSProperties => ({ fill: color, stroke: color });
/** An accent line. */
const line = (color: string): CSSProperties => ({ stroke: color });
const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

export function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export { fill, line, shape, tone };

/** Start here: a route from a starting point to a flag. */
export function StartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 18.5c0-3 2.5-4.5 6-4.5s5.5-1.5 5.5-4.5V3.5" />
      <path d="M17.5 3.5H22l-1.6 2.25L22 8h-4.5" style={shape(tone.cyan)} fillOpacity={0.25} />
      <circle
        className="icon-pulse"
        cx="6"
        cy="18.5"
        r="2.5"
        style={fill(tone.cyan)}
        stroke="none"
      />
    </Icon>
  );
}

/** AI infrastructure: a GPU card with its spinning fan, heat sink and PCIe connector. */
export function GpuIcon(props: IconProps) {
  const blade = 'M8.5 11c0-1.3.8-2.2 2-2.1';
  return (
    <Icon {...props}>
      <rect x="2.5" y="5.5" width="19" height="11" rx="2" />
      <circle cx="8.5" cy="11" r="3.25" style={shape(tone.violet)} fillOpacity={0.2} />
      <g className="icon-fan" style={line(tone.violet)}>
        <path d={blade} />
        <path d={blade} transform="rotate(120 8.5 11)" />
        <path d={blade} transform="rotate(240 8.5 11)" />
      </g>
      <path d="M14.5 9v4M17 9v4M19.5 9v4" />
      <path d="M6 16.5V19h8v-2.5" />
    </Icon>
  );
}

/** LLMOps: a chat reply that the model keeps writing, line by line. */
export function LlmReplyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M4.5 3.5h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8L7 20v-3.5H4.5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"
        style={shape(tone.violet)}
        fillOpacity={0.12}
      />
      <g style={line(tone.violet)}>
        <path className="icon-type" pathLength={1} d="M6.5 7.5h11" />
        <path className="icon-type" style={delay(0.45)} pathLength={1} d="M6.5 10.25h8" />
        <path className="icon-type" style={delay(0.9)} pathLength={1} d="M6.5 13h5" />
      </g>
    </Icon>
  );
}

/** MLOps: a small neural network with signals flowing from the inputs to the prediction. */
export function NeuralNetIcon(props: IconProps) {
  const edges =
    'M4 6 12 8.5M4 6l8 7M4 12l8-3.5M4 12l8 3.5M4 18l8-9.5M4 18l8-2.5M12 8.5 20 12M12 15.5 20 12';
  return (
    <Icon {...props}>
      <path d={edges} strokeOpacity={0.3} strokeWidth={1.25} />
      <path className="icon-signal" d={edges} strokeWidth={1.25} style={line(tone.blue)} />
      <g fill="currentColor" stroke="none">
        <circle cx="4" cy="6" r="1.75" />
        <circle cx="4" cy="12" r="1.75" />
        <circle cx="4" cy="18" r="1.75" />
        <circle cx="12" cy="8.5" r="1.75" />
        <circle cx="12" cy="15.5" r="1.75" />
      </g>
      <circle
        className="icon-pulse"
        cx="20"
        cy="12"
        r="2.25"
        style={fill(tone.blue)}
        stroke="none"
      />
    </Icon>
  );
}

/** The DevOps loop: one continuous figure eight, so the motion can run around it forever. */
const devopsLoop =
  'M12 12C14 9.33 16 8 18 8a4 4 0 0 1 0 8c-2 0-4-1.33-6-4S8 8 6 8a4 4 0 0 0 0 8c2 0 4-1.33 6-4z';

/** DevOps: the infinity loop, with work moving around it without end. */
export function DevOpsLoopIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={devopsLoop} strokeOpacity={0.35} />
      <path className="icon-flow" pathLength={100} d={devopsLoop} style={line(tone.cyan)} />
    </Icon>
  );
}

/** DevSecOps: the DevOps loop running inside a shield. */
export function SecureLoopIcon(props: IconProps) {
  const loop =
    'M12 11.5c1.13-1.5 2.25-2.25 3.38-2.25a2.25 2.25 0 0 1 0 4.5c-1.13 0-2.25-.75-3.38-2.25S9.75 9.25 8.63 9.25a2.25 2.25 0 0 0 0 4.5c1.12 0 2.25-.75 3.37-2.25z';
  return (
    <Icon {...props}>
      <path
        d="M12 2.5 19.5 5.5V11c0 5-3.2 8.6-7.5 10.5C7.7 19.6 4.5 16 4.5 11V5.5z"
        style={shape(tone.blue)}
        fillOpacity={0.12}
      />
      <path d={loop} strokeOpacity={0.35} strokeWidth={1.25} />
      <path
        className="icon-flow"
        pathLength={100}
        d={loop}
        strokeWidth={1.25}
        style={line(tone.blue)}
      />
    </Icon>
  );
}

/** Foundations: a terminal with a prompt and a blinking cursor. */
export function TerminalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8h19" />
      <g fill="currentColor" stroke="none">
        <circle cx="5" cy="6" r=".7" />
        <circle cx="7.25" cy="6" r=".7" />
        <circle cx="9.5" cy="6" r=".7" />
      </g>
      <path d="m6.5 11.5 2.5 2.25L6.5 16" />
      <rect
        className="icon-blink"
        x="11"
        y="14.75"
        width="4.5"
        height="1.75"
        rx=".5"
        style={fill(tone.cyan)}
        stroke="none"
      />
    </Icon>
  );
}

/** Icon names used in `content/docs/**\/meta.json`, mapped to their components. */
export const trackIcons = {
  start: StartIcon,
  'ai-infra': GpuIcon,
  llmops: LlmReplyIcon,
  mlops: NeuralNetIcon,
  devops: DevOpsLoopIcon,
  devsecops: SecureLoopIcon,
  foundations: TerminalIcon,
} as const;

export type TrackIconName = keyof typeof trackIcons;

export function isTrackIconName(name: string): name is TrackIconName {
  return Object.hasOwn(trackIcons, name);
}
