import React, { HTMLAttributes } from 'react';
import { MDXProvider } from '@mdx-js/react';

type ComponentProps = HTMLAttributes<HTMLElement>;

const components = {
  h1: (props: ComponentProps) => <h1 className="text-4xl font-bold mb-4" {...props} />,
  h2: (props: ComponentProps) => <h2 className="text-3xl font-bold mb-3" {...props} />,
  h3: (props: ComponentProps) => <h3 className="text-2xl font-bold mb-2" {...props} />,
  p: (props: ComponentProps) => <p className="mb-4 text-gray-700 dark:text-gray-300" {...props} />,
  ul: (props: ComponentProps) => <ul className="list-disc list-inside mb-4 ml-4" {...props} />,
  ol: (props: ComponentProps) => <ol className="list-decimal list-inside mb-4 ml-4" {...props} />,
  li: (props: ComponentProps) => <li className="mb-2" {...props} />,
  code: (props: ComponentProps) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1" {...props} />
  ),
  pre: (props: ComponentProps) => (
    <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4 overflow-x-auto" {...props} />
  ),
};

export function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={components}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>
    </MDXProvider>
  );
} 