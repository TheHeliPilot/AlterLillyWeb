import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  featuredImage?: string;
  excerpt: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
  htmlContent: string;
}

// Ensure posts directory exists
function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Get all post slugs
export function getPostSlugs(): string[] {
  ensurePostsDirectory();
  try {
    const files = fs.readdirSync(postsDirectory);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensurePostsDirectory();
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      author: data.author || "Veducko",
      category: data.category || "Development Updates",
      featuredImage: data.featuredImage,
      excerpt: data.excerpt || content.slice(0, 160) + "...",
      tags: data.tags || [],
      content,
      htmlContent,
    };
  } catch {
    return null;
  }
}

// Get all posts sorted by date
export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = getPostSlugs();
  const posts: PostMeta[] = [];

  for (const slug of slugs) {
    const post = await getPostBySlug(slug);
    if (post) {
      posts.push({
        slug: post.slug,
        title: post.title,
        date: post.date,
        author: post.author,
        category: post.category,
        featuredImage: post.featuredImage,
        excerpt: post.excerpt,
        tags: post.tags,
      });
    }
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categories = new Set(allPosts.map((post) => post.category));
  return Array.from(categories);
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all tags
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}

// Get recent posts
export async function getRecentPosts(limit: number = 3): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

// Get featured post (latest)
export async function getFeaturedPost(): Promise<PostMeta | null> {
  const allPosts = await getAllPosts();
  return allPosts[0] || null;
}

// Search posts
export async function searchPosts(query: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  const lowerQuery = query.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get posts archive grouped by month
export async function getPostsArchive(): Promise<Record<string, PostMeta[]>> {
  const allPosts = await getAllPosts();
  const archive: Record<string, PostMeta[]> = {};

  allPosts.forEach((post) => {
    const date = new Date(post.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!archive[key]) {
      archive[key] = [];
    }
    archive[key].push(post);
  });

  return archive;
}
