declare module '*.mdx' {
  import { ReactNode } from 'react';
  
  export const frontMatter: {
    title: string;
    description: string;
    [key: string]: any;
  };

  const MDXComponent: (props: any) => ReactNode;
  export default MDXComponent;
} 