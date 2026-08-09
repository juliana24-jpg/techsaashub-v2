import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogDirectory } from "@/components/blog/BlogDirectory";
import { getAllTags, getFeaturedPost, posts } from "@/lib/blog-data";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: `Sharp, no-fluff writing on SEO, AI and developer tooling from ${siteConfig.name}.`,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: "Sharp, no-fluff writing on SEO, AI and developer tooling.",
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const remainingPosts = featured ? posts.filter((post) => post.slug !== featured.slug) : posts;
  const allTags = getAllTags();

  return (
    <>
      <PageHeader
        eyebrow="From the blog"
        title="Articles & guides"
        description="Sharp, no-fluff writing on the tools, tactics and trends behind modern SaaS."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        {posts.length === 0 || !featured ? (
          <BlogEmptyState />
        ) : (
          <>
            <FeaturedPost post={featured} />
            <div className="mt-16">
              <BlogDirectory posts={remainingPosts} allTags={allTags} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
