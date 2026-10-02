import { Bug, Pencil } from 'lucide-react';

interface PageActionsProps {
  editUrl: string;
  issueUrl: string;
}

/** "Improve this page" links at the end of every docs page. */
export function PageActions({ editUrl, issueUrl }: PageActionsProps) {
  const linkClass =
    'inline-flex items-center gap-1.5 rounded-md text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground';

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-6">
      <a href={editUrl} className={linkClass}>
        <Pencil className="size-4" aria-hidden="true" />
        Edit this page on GitHub
      </a>
      <a href={issueUrl} className={linkClass}>
        <Bug className="size-4" aria-hidden="true" />
        Report something wrong or outdated
      </a>
    </div>
  );
}
