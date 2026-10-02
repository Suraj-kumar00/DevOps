import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata, Viewport } from 'next';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site';
import { siteUrl } from '@/lib/site-url';
import { fontMono, fontSans } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name}: DevOps, MLOps and AI infrastructure`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.maintainer.name, url: siteConfig.maintainer.url }],
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    description: siteConfig.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d12' },
  ],
};

/** Shown in the search dialog before the reader types anything. */
const searchShortcuts: [name: string, href: string][] = [
  ['Start here', '/docs'],
  ['AI Infrastructure', '/docs/ai-infra'],
  ['How pages are built', '/docs/page-template'],
];

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn(fontSans.variable, fontMono.variable)} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <RootProvider search={{ links: searchShortcuts }}>{children}</RootProvider>
      </body>
    </html>
  );
}
