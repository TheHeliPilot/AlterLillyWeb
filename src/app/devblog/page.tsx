import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, getFeaturedPost, getRecentPosts } from "@/lib/blog";
import { Icon } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Devblog",
  description: `Follow the development of ${SITE_CONFIG.name}. Behind-the-scenes updates, character deep-dives, and technical insights.`,
};

export default async function DevblogPage() {
  const allPosts = await getAllPosts();
  const featuredPost = await getFeaturedPost();
  const categories = await getAllCategories();

  // If no posts yet, show placeholder
  if (allPosts.length === 0) {
    return (
      <main className="min-h-screen bg-bg-dark">
        {/* Header */}
        <div className="bg-bg-mid border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-maxine-orange transition-colors mb-4"
            >
              <Icon name="chevronLeft" size={16} />
              Back to Home
            </Link>
            <h1 className="font-display text-4xl md:text-5xl text-text-cream tracking-wider">
              Development Blog
            </h1>
            <p className="text-text-muted mt-2 max-w-2xl">
              Behind-the-scenes updates, character deep-dives, and technical insights
              from the world of {SITE_CONFIG.name}
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-maxine-orange/10 flex items-center justify-center">
              <Icon name="scroll" size={48} className="text-maxine-orange" />
            </div>
            <h2 className="font-display text-2xl text-text-cream mb-4">
              Blog Posts Coming Soon
            </h2>
            <p className="text-text-muted max-w-md mx-auto mb-8">
              We're preparing our first development posts. Subscribe to our newsletter
              to be notified when new content is published.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-maxine-orange text-bg-dark rounded-lg font-ui font-medium hover:bg-maxine-orange/80 transition-colors"
            >
              <Icon name="mail" size={20} />
              Subscribe for Updates
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="bg-bg-mid border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-maxine-orange transition-colors mb-4"
          >
            <Icon name="chevronLeft" size={16} />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-text-cream tracking-wider">
            Development Blog
          </h1>
          <p className="text-text-muted mt-2 max-w-2xl">
            Behind-the-scenes updates, character deep-dives, and technical insights
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <span className="text-maxine-orange text-sm font-ui uppercase tracking-wider">
                  Latest Post
                </span>
                <Link href={`/devblog/${featuredPost.slug}`} className="block mt-2 group">
                  <article className="bg-bg-mid border border-border rounded-lg overflow-hidden hover:border-maxine-orange/50 transition-colors">
                    {featuredPost.featuredImage && (
                      <div className="aspect-video relative overflow-hidden bg-bg-dark">
                        {/* [PLACEHOLDER: Featured Image] */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon name="image" size={48} className="text-text-muted/20" />
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                        <span className="px-2 py-1 bg-maxine-orange/10 text-maxine-orange rounded">
                          {featuredPost.category}
                        </span>
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <h2 className="font-display text-2xl text-text-cream group-hover:text-maxine-orange transition-colors mb-2">
                        {featuredPost.title}
                      </h2>
                      <p className="text-text-muted line-clamp-3">{featuredPost.excerpt}</p>
                      <div className="mt-4 flex items-center gap-2 text-maxine-orange font-ui text-sm">
                        Read more
                        <Icon name="chevronRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* All Posts */}
            <h2 className="font-display text-xl text-text-cream mb-6">All Posts</h2>
            <div className="space-y-6">
              {allPosts.map((post) => (
                <Link key={post.slug} href={`/devblog/${post.slug}`} className="block group">
                  <article className="bg-bg-mid/50 border border-border/50 rounded-lg p-6 hover:border-border transition-colors">
                    <div className="flex items-center gap-4 text-sm text-text-muted mb-2">
                      <span className="text-maxine-orange">{post.category}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>by {post.author}</span>
                    </div>
                    <h3 className="font-display text-lg text-text-cream group-hover:text-maxine-orange transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-text-muted text-sm line-clamp-2">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-border/30 text-text-muted/60 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-bg-mid border border-border rounded-lg p-6 mb-6">
              <h3 className="font-display text-lg text-text-cream mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category}
                      href={`/devblog?category=${encodeURIComponent(category)}`}
                      className="block text-text-muted hover:text-maxine-orange transition-colors"
                    >
                      {category}
                    </Link>
                  ))
                ) : (
                  <p className="text-text-muted/50 text-sm">No categories yet</p>
                )}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-bg-mid border border-border rounded-lg p-6">
              <h3 className="font-display text-lg text-text-cream mb-2">Stay Updated</h3>
              <p className="text-text-muted text-sm mb-4">
                Subscribe to get notified when we publish new posts
              </p>
              <Link
                href="/#newsletter"
                className="block w-full text-center px-4 py-2 bg-maxine-orange text-bg-dark rounded font-ui text-sm hover:bg-maxine-orange/80 transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
