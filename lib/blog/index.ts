import 'server-only';
import { createHashnodeBlogSource } from '@/lib/blog/hashnode';
import { siteConfig } from '@/lib/site';

export type { BlogPost, BlogSource } from '@/lib/blog/types';

/** The blog source used by the site. Swap the implementation here to change platforms. */
export const blog = createHashnodeBlogSource({
  username: siteConfig.blog.hashnodeUsername,
});
