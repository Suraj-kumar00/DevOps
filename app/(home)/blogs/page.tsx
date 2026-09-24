import { ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { PostCard } from '@/components/blog/post-card';
import { ButtonLink } from '@/components/ui/button-link';
import { blog } from '@/lib/blog';
import { siteConfig } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description: `Articles by ${siteConfig.maintainer.name} on DevOps, Kubernetes, MLOps and AI infrastructure.`,
};

const POSTS_PER_PAGE = 12;

export default async function BlogPage() {
  const posts = await blog.getRecentPosts(POSTS_PER_PAGE);
  // Posts carry their canonical URL; use its origin so "more posts" follows the blog's real domain.
  const blogHome = posts[0] ? new URL(posts[0].url).origin : siteConfig.blog.profileUrl;

  return (
    <div className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium tracking-wide text-fd-primary uppercase">Blog</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Notes from the field
          </h1>
          <p className="mt-3 text-lg text-fd-muted-foreground">
            Long-form write-ups on real projects, troubleshooting and lessons learned. Posts are
            published on the blog and listed here.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="font-medium">Posts could not be loaded right now.</p>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              You can still read everything on the blog itself.
            </p>
          </div>
        )}

        <div className="mt-10">
          <ButtonLink href={blogHome} variant="outline">
            {posts.length > 0 ? 'More posts on the blog' : 'Open the blog'}
            <ExternalLink aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
