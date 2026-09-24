import { generateOGImage } from 'fumadocs-ui/og';
import { notFound } from 'next/navigation';
import { getPageImageUrl } from '@/lib/routes';
import { siteConfig } from '@/lib/site';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  // The last segment is always `image.png`, see getPageImageUrl().
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: siteConfig.name,
    primaryColor: 'rgba(36, 88, 211, 0.35)',
    primaryTextColor: 'rgb(122, 162, 255)',
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImageUrl(page).segments,
  }));
}
