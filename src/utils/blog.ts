import type { PaginateFunction } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post, ProcessedPostTerm } from '~/types';
import { APP_BLOG } from '~/utils/config';
import {
  cleanSlug,
  trimSlash,
  BLOG_BASE,
  POST_PERMALINK_PATTERN,
  CATEGORY_BASE,
  TAG_BASE,
} from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (
  post: CollectionEntry<'post'>,
): Promise<Post> => {
  const { id, slug: rawSlug = '', data } = post;
  const { Content, remarkPluginFrontmatter } = await post.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    description,
    image,
    isFeaturedImageEnabled,
    tags: rawTags = [],
    categories: rawCategories = [],
    category: rawCategory,
    author,
    draft = false,
    permalink,
    metadata = {},
  } = data;

  const slug = cleanSlug(permalink ?? rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  // to avoid duplicates tags
  const tags = new Set<string>();
  const processedTags: ProcessedPostTerm[] = [];
  rawTags.forEach((tag: string) => {
    const slug = cleanSlug(tag);
    if (tags.has(slug)) return;
    tags.add(slug);
    processedTags.push({ raw: tag, slug });
  });
  const categories = new Set<string>();
  const processedCategories: ProcessedPostTerm[] = [];
  rawCategories.forEach((category: string) => {
    const slug = cleanSlug(category);
    if (categories.has(slug)) return;
    categories.add(slug);
    processedCategories.push({ raw: category, slug });
  });

  return {
    id,
    slug,
    permalink: await generatePermalink({ id, slug, publishDate, category }),

    publishDate,
    updateDate,

    title,
    excerpt,
    description,
    image,
    isFeaturedImageEnabled,

    category,
    rawCategory,
    tags: [...tags],
    processedTags,
    categories: [...categories],
    processedCategories,
    author,

    draft,

    metadata,

    Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection('post');
  const normalizedPosts = posts.map(
    async (post) => await getNormalizedPost(post),
  );

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

/** */
export const findPostsBySlugs = async (
  slugs: Array<string>,
): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (
  ids: Array<string>,
): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({
  count,
}: {
  count?: number;
}): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();

  return posts ? posts.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({
  paginate,
}: {
  paginate: PaginateFunction;
}) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchPosts(), {
    params: { blog: BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

/** */
export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({
  paginate,
}: {
  paginate: PaginateFunction;
}) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const categories = new Set<string>();
  const rawCategories = new Map<string, string>();
  posts.map((post) => {
    if (post.category) {
      extractPostCategory(categories, post.category);
      rawCategories.set(post.category, post.rawCategory!);
    }
    Array.isArray(post.processedCategories) &&
      post.processedCategories.forEach((category) => {
        if (rawCategories.has(category.slug)) return;
        extractPostCategory(categories, category.slug);
        rawCategories.set(category.slug, category.raw);
      });
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      posts.filter(
        (post) =>
          (typeof post.category === 'string' &&
            category === post.category.toLowerCase()) ||
          (Array.isArray(post.categories) &&
            post.categories.find((cat) => cat.toLowerCase() === category)),
      ),
      {
        params: { category: category, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: {
          category,
          rawCategory: rawCategories.get(category),
          categories,
          processedCategories: rawCategories,
        },
      },
    ),
  );
};

/** */
export const getStaticPathsBlogTag = async ({
  paginate,
}: {
  paginate: PaginateFunction;
}) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const tags = new Set<string>();
  const rawTags = new Map<string, string>();
  posts.forEach((post) => {
    Array.isArray(post.processedTags) &&
      post.processedTags.forEach((tag) => {
        tags.add(tag.slug);
        rawTags.set(tag.slug, tag.raw);
      });
  });

  return Array.from(tags).flatMap((tag) =>
    paginate(
      posts.filter(
        (post) =>
          Array.isArray(post.tags) &&
          post.tags.find((elem) => elem.toLowerCase() === tag),
      ),
      {
        params: { tag: tag, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag, raw: rawTags.get(tag) },
      },
    ),
  );
};
function extractPostCategory(categories: Set<string>, category?: string) {
  typeof category === 'string' &&
    category.length > 0 &&
    categories.add(category.toLowerCase());
}
