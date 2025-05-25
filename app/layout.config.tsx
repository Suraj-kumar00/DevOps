import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    // can be JSX too!
    title: " DevOps ",
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
    {
      text: "Blogs",
      url: "/blogs",
      active: "nested-url",
    },
    {
      text: "GitHub",
      url: "https://www.github.com/Suraj-kumar00",
    },
    {
      text: "Portfolio",
      url: "https://devsuraj.me",
    },
  ],
};
