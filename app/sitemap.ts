import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/blogs`, changeFrequency: 'weekly', priority: 0.5 },
  ];

  const docs: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    // Only topic pages carry a verification date; use it as the content's last change.
    lastModified: page.data.lastVerified,
    changeFrequency: 'monthly',
    priority: page.data.kind === 'topic' ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...docs];
}
