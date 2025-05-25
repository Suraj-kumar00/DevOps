import { Metadata } from "next";
import { Button } from "../../components/ui/button";
import { Card, CardDescription, CardTitle } from "../../components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "../../components/NewsletterForm";
import { Toaster } from "../../components/ui/toaster";
import { RefreshButton } from "./RefreshButton";

export const metadata: Metadata = {
  title: "Blogs | DevOps",
  description:
    "Latest insights, tutorials, and updates from our team of cloud and DevOps experts",
};

interface BlogPost {
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  coverImage: {
    url: string;
  };
  tags: Array<{ name: string }>;
}

interface BlogEdge {
  node: BlogPost;
}

interface BlogResponse {
  data: {
    user: {
      posts: {
        pageInfo: {
          hasNextPage: boolean;
        };
        edges: BlogEdge[];
      };
    };
  };
}

function formatDate(date: string) {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

async function getBlogs(page: number = 1): Promise<BlogResponse> {
  const response = await fetch(`http://localhost:3000/api/blogs?page=${page}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await response.json();
  return data;
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getBlogs(currentPage);
  const blogs = data?.data?.user?.posts?.edges || [];
  const hasMore = data?.data?.user?.posts?.pageInfo?.hasNextPage || false;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Toaster />
      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden bg-white dark:bg-transparent">
        <div className="absolute inset-0 bg-grid-gray-200/[0.2] dark:bg-grid-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-neutral-200 dark:to-neutral-500">
            Keep yourself updated with blogs
          </h1>
          <p className="text-xl text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Latest insights, tutorials, and updates from our team of cloud and
            DevOps experts
          </p>
          <RefreshButton />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {blogs.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-neutral-400">
            <p className="text-xl">
              No blogs found. Start writing on Hashnode to see your posts here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {blogs.map(({ node: blog }: BlogEdge, index: number) => (
              <Link
                href={`https://blog.devsuraj.me/${blog.slug}`}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="h-full bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-neutral-800 overflow-hidden flex">
                  <div className="relative w-2/5 h-64">
                    <Image
                      src={blog.coverImage?.url || "/placeholder-blog.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {blog.tags && blog.tags[0] && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full text-sm text-gray-900 dark:text-neutral-300 border border-gray-200 dark:border-neutral-800">
                        {blog.tags[0].name}
                      </div>
                    )}
                  </div>
                  <div className="w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-neutral-200 mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-neutral-400 mb-4">
                        {formatDate(blog.publishedAt)}
                      </CardDescription>
                      <p className="text-gray-700 dark:text-neutral-300 line-clamp-3">
                        {blog.brief}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="ghost"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 group flex items-center"
                      >
                        Read more
                        <span className="ml-2 transform transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center gap-4">
            {currentPage > 1 && (
              <Link
                href={`/blogs?page=${currentPage - 1}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-neutral-200 dark:to-neutral-500 hover:opacity-90 transition-opacity"
              >
                ← Previous Page
              </Link>
            )}
            <Link
              href={`/blogs?page=${currentPage + 1}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-neutral-200 dark:to-neutral-500 hover:opacity-90 transition-opacity"
            >
              Next Page →
            </Link>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="py-20 px-4 bg-white dark:bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/50 dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 backdrop-blur-sm p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-neutral-200 dark:to-neutral-500">
                Subscribe to my newsletter
              </h2>
              <p className="text-gray-600 dark:text-neutral-400 mb-8 text-lg">
                Get the latest updates about cloud computing and DevOps directly
                in your inbox.
              </p>
              <NewsletterForm />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
