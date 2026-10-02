import type { CSSProperties } from 'react';
import { BrandLogo, BrandLogoSprite, type BrandLogoName } from '@/components/icons/brand-logos';

interface Tool {
  /** Name as written on the track roadmaps. */
  name: string;
  /** Official logo. Tools without one here show their name only (see brand-logos.tsx). */
  logo?: BrandLogoName;
}

/** Foundations, DevOps and cloud. */
const foundations: Tool[] = [
  { name: 'Linux', logo: 'linux' },
  { name: 'Bash', logo: 'bash' },
  { name: 'Git', logo: 'git' },
  { name: 'GitHub', logo: 'github' },
  { name: 'YAML', logo: 'yaml' },
  { name: 'Python', logo: 'python' },
  { name: 'Go', logo: 'go' },
  { name: 'Docker', logo: 'docker' },
  { name: 'Kubernetes', logo: 'kubernetes' },
  { name: 'Helm', logo: 'helm' },
  { name: 'Terraform', logo: 'terraform' },
  { name: 'GitHub Actions', logo: 'githubActions' },
  { name: 'Argo CD', logo: 'argo' },
  { name: 'Prometheus', logo: 'prometheus' },
  { name: 'Grafana', logo: 'grafana' },
  // AWS allows third parties to use its name in plain text only, without logos.
  { name: 'AWS' },
];

/** AI infrastructure, LLMOps, MLOps and DevSecOps. */
const aiStack: Tool[] = [
  { name: 'NVIDIA GPU Operator', logo: 'nvidia' },
  // A Kubernetes API, so it carries the Kubernetes logo.
  { name: 'Dynamic Resource Allocation', logo: 'kubernetes' },
  { name: 'HAMi', logo: 'hami' },
  { name: 'Kueue', logo: 'kueue' },
  { name: 'KubeRay', logo: 'ray' },
  { name: 'vLLM', logo: 'vllm' },
  { name: 'llm-d', logo: 'llmd' },
  { name: 'KServe', logo: 'kserve' },
  // The project publishes its logo only as PNG images that include the name.
  { name: 'Gateway API Inference Extension' },
  { name: 'MLflow', logo: 'mlflow' },
  { name: 'Kubeflow Pipelines', logo: 'kubeflowPipelines' },
  { name: 'Apache Airflow', logo: 'airflow' },
  { name: 'OpenTelemetry', logo: 'opentelemetry' },
  { name: 'Falco', logo: 'falco' },
];

const logoNames = [
  ...new Set([...foundations, ...aiStack].flatMap((tool) => (tool.logo ? [tool.logo] : []))),
];

/** Scroll speed in pixels per second, the same for every row. */
const speed = 32;

/**
 * Animation length for a row, from its estimated width: each pill is about 38px of padding,
 * border and spacing, 26px for the logo and 7.6px per character at text-sm. Rows of different
 * lengths then move at the same speed.
 */
function duration(tools: Tool[]): string {
  const width = tools.reduce(
    (sum, tool) => sum + 38 + (tool.logo ? 26 : 0) + tool.name.length * 7.6,
    0,
  );
  return `${Math.round(width / speed)}s`;
}

function ToolPill({ tool }: { tool: Tool }) {
  return (
    <li className="mr-3 inline-flex shrink-0 items-center gap-2 rounded-full border bg-fd-card px-3 py-1.5 text-sm text-fd-foreground">
      {tool.logo ? <BrandLogo name={tool.logo} className="size-[18px] shrink-0" /> : null}
      {tool.name}
    </li>
  );
}

/**
 * One row that scrolls sideways forever. The list is rendered twice so the loop is seamless;
 * the copy is hidden from assistive technology. Hovering pauses it, and with reduced motion the
 * row stands still and wraps instead (see `.marquee` in global.css).
 */
function MarqueeRow({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const pills = tools.map((tool) => <ToolPill key={tool.name} tool={tool} />);
  return (
    <div
      className="marquee"
      data-reverse={reverse ? '' : undefined}
      style={{ '--marquee-duration': duration(tools) } as CSSProperties}
    >
      <div className="marquee-track">
        <ul className="flex">{pills}</ul>
        <ul className="marquee-copy flex" aria-hidden="true">
          {pills}
        </ul>
      </div>
    </div>
  );
}

export function ToolsMarquee() {
  return (
    <section aria-labelledby="tools-heading" className="border-b py-10">
      <BrandLogoSprite names={logoNames} />
      <h2
        id="tools-heading"
        className="mb-6 px-4 text-center text-sm font-medium text-fd-muted-foreground"
      >
        The tools these guides cover, from the foundations to AI infrastructure
      </h2>
      <div className="space-y-3">
        <MarqueeRow tools={foundations} />
        <MarqueeRow tools={aiStack} reverse />
      </div>
    </section>
  );
}
