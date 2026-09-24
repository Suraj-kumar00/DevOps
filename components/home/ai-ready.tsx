import { Bot, FileText, ListTree } from 'lucide-react';
import type { ReactNode } from 'react';
import { Section } from '@/components/home/section';

const features: { icon: ReactNode; title: string; body: ReactNode }[] = [
  {
    icon: <ListTree />,
    title: 'llms.txt',
    body: (
      <>
        An index of every page at <code className="text-fd-foreground">/llms.txt</code>, and the
        full text at <code className="text-fd-foreground">/llms-full.txt</code>.
      </>
    ),
  },
  {
    icon: <FileText />,
    title: 'Markdown for every page',
    body: (
      <>
        Add <code className="text-fd-foreground">.md</code> to any docs URL, or use the Copy
        Markdown button on the page.
      </>
    ),
  },
  {
    icon: <Bot />,
    title: 'MCP server',
    body: 'Let Claude, Cursor or any MCP client search and read these docs while you work.',
  },
];

export function AiReady({ mcpUrl }: { mcpUrl: string }) {
  const config = JSON.stringify({ mcpServers: { 'devops-hub': { url: mcpUrl } } }, null, 2);

  return (
    <Section
      id="ai-ready"
      eyebrow="For humans and AI agents"
      title="Use it from your editor or your assistant"
      description="The same verified content is available in formats built for AI tools, so answers can cite a page instead of guessing."
      className="border-y bg-fd-card/40"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border bg-fd-background text-fd-primary [&_svg]:size-5"
              >
                {feature.icon}
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-1 text-sm text-fd-muted-foreground">{feature.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <figure className="overflow-hidden rounded-xl border bg-fd-background">
          <figcaption className="border-b px-4 py-2 text-xs font-medium text-fd-muted-foreground">
            MCP client configuration
          </figcaption>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
            <code>{config}</code>
          </pre>
        </figure>
      </div>
    </Section>
  );
}
