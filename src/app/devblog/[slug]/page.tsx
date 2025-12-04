import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, getRecentPosts } from "@/lib/blog";
import { Icon } from "@/components/ui/Icons";
import { ShareButtons } from "@/components/ShareButtons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = await getRecentPosts(3);
  const relatedPosts = recentPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="bg-bg-mid border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/devblog"
            className="inline-flex items-center gap-2 text-text-muted hover:text-maxine-orange transition-colors mb-6"
          >
            <Icon name="chevronLeft" size={16} />
            Back to Blog
          </Link>

          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
            <span className="px-2 py-1 bg-maxine-orange/10 text-maxine-orange rounded">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="calendar" size={14} />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="user" size={14} />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl text-text-cream tracking-wide">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-border/30 text-text-muted/70 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="aspect-video relative overflow-hidden rounded-lg border border-border bg-bg-mid">
            {/* [PLACEHOLDER: Featured Image] */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="image" size={64} className="text-text-muted/20" />
            </div>
            {/* <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" /> */}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:tracking-wide
            prose-h2:text-2xl prose-h2:text-text-cream prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:text-text-cream prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-text-muted prose-p:leading-relaxed
            prose-a:text-maxine-orange prose-a:no-underline hover:prose-a:underline
            prose-strong:text-text-cream
            prose-code:text-maxine-orange prose-code:bg-bg-mid prose-code:px-1 prose-code:rounded
            prose-pre:bg-bg-mid prose-pre:border prose-pre:border-border
            prose-blockquote:border-maxine-orange prose-blockquote:text-text-muted
            prose-img:rounded-lg prose-img:border prose-img:border-border
            prose-hr:border-border"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        {/* Share Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-text-muted text-sm mb-4">Share this post:</p>
          <ShareButtons title={post.title} slug={slug} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="font-display text-xl text-text-cream mb-6">More Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/devblog/${relatedPost.slug}`}
                  className="block group"
                >
                  <article className="bg-bg-mid/50 border border-border/50 rounded-lg p-4 hover:border-border transition-colors">
                    <span className="text-maxine-orange text-xs">{relatedPost.category}</span>
                    <h3 className="font-display text-text-cream group-hover:text-maxine-orange transition-colors mt-1 mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-text-muted text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
