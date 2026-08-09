import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Badge } from "@/components/ui/badge";
import { NewsletterCTASection } from "@/components/home/NewsletterCTASection";
import { getPostBySlug, getRelatedPosts, getTableOfContents, posts } from "@/lib/blog-data";
import { getCategoryName, siteConfig } from "@/lib/constants";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} — ${siteConfig.name}`,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = getTableOfContents(post);
  const relatedPosts = getRelatedPosts(post.slug, post.category);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    image: post.coverImage,
    url: postUrl,
  };

  return (
    <div className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]}
      />

      <div className="container mt-8 max-w-3xl">
        <Badge variant="secondary">{getCategoryName(post.category)}</Badge>
        <h1 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AuthorBox
            author={post.author}
            publishedAt={post.publishedAt}
            readingTimeMinutes={post.readingTimeMinutes}
          />
          <ShareButtons title={post.title} url={postUrl} />
        </div>
      </div>

      {post.coverImage && (
        <div className="container mt-10 max-w-4xl">
          <div className="glass relative aspect-[16/9] w-full overflow-hidden !rounded-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
          </div>
        </div>
      )}

      <div className="container mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_240px]">
        <article className="min-w-0 max-w-3xl">
          <BlogContent blocks={post.content} />

          <div className="mt-10 flex flex-wrap gap-2 border-t border-foreground/[0.08] pt-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-foreground/[0.08] pt-6">
            <span className="text-sm text-muted-foreground">Found this useful?</span>
            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </article>

        <aside className="hidden lg:block">
          <TableOfContents items={toc} />
        </aside>
      </div>

      {relatedPosts.length > 0 && (
        <div className="container mt-20 max-w-5xl">
          <h2 className="font-display text-xl font-semibold text-foreground">More like this</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogPostCard key={related.slug} post={related} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-20">
        <NewsletterCTASection />
      </div>
    </div>
  );
}
