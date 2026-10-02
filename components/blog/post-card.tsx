import Image from 'next/image';
import type { BlogPost } from '@/lib/blog/types';
import { formatDate } from '@/lib/format';

/** A blog post teaser. Links out to the post on the blog platform. */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border bg-fd-card transition-colors hover:border-fd-primary/50 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-fd-ring">
      {post.coverImageUrl ? (
        <div className="relative aspect-[1.91/1] overflow-hidden border-b bg-fd-secondary">
          <Image
            src={post.coverImageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-fd-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.readingTimeMinutes ? <> · {post.readingTimeMinutes} min read</> : null}
        </p>
        <h3 className="mt-2 font-semibold tracking-tight">
          <a href={post.url} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </a>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-fd-muted-foreground">{post.excerpt}</p>
        {post.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-fd-secondary px-2 py-0.5 text-xs text-fd-secondary-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
