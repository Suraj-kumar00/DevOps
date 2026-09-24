export interface BlogPost {
  title: string;
  excerpt: string;
  url: string;
  /** ISO 8601 timestamp. */
  publishedAt: string;
  coverImageUrl?: string;
  readingTimeMinutes?: number;
  tags: string[];
}

/**
 * Where blog posts come from. The UI depends on this interface only,
 * so switching platforms (Hashnode, RSS, local MDX) does not touch components.
 */
export interface BlogSource {
  /** Latest posts, newest first. Resolves to an empty list when the source is unreachable. */
  getRecentPosts(limit: number): Promise<BlogPost[]>;
}
