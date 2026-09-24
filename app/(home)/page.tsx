import { AiReady } from '@/components/home/ai-ready';
import { Contribute } from '@/components/home/contribute';
import { Hero } from '@/components/home/hero';
import { LatestPosts } from '@/components/home/latest-posts';
import { Levels } from '@/components/home/levels';
import { Principles } from '@/components/home/principles';
import { TrackGrid } from '@/components/home/track-grid';
import { blog } from '@/lib/blog';
import { getTracks } from '@/lib/content/get-tracks';
import { getNewsletterProvider } from '@/lib/newsletter';
import { siteUrl } from '@/lib/site-url';

/** Rebuild the page at most once an hour so new blog posts show up without a deploy. */
export const revalidate = 3600;

export default async function HomePage() {
  const tracks = getTracks();
  const flagship = tracks.find((track) => track.flagship);
  const posts = await blog.getRecentPosts(3);

  return (
    <>
      <Hero flagship={flagship ? { title: flagship.title, url: flagship.url } : undefined} />
      <TrackGrid tracks={tracks} />
      <Levels />
      <Principles />
      <AiReady mcpUrl={`${siteUrl}/api/mcp`} />
      <LatestPosts posts={posts} />
      <Contribute newsletterEnabled={getNewsletterProvider() !== undefined} />
    </>
  );
}
