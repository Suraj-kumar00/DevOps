import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { Section } from '@/components/home/section';
import type { BlogPost } from '@/lib/blog/types';

/** Renders nothing when the feed is empty, so a blog outage never leaves a broken section. */
export function LatestPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <Section
      id="blog"
      eyebrow="From the blog"
      title="Notes from the field"
      description="Longer write-ups on real projects, troubleshooting and lessons learned."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.url} post={post} />
        ))}
      </div>
      <Link
        href="/blogs"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary hover:underline"
      >
        All posts
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Section>
  );
}
