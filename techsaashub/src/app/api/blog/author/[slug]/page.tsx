import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthorBySlug, authors } from "@/lib/authors-data";
import { getPostsByAuthor } from "@/lib/blog-data";
import { siteConfig } from "@/lib/constants";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  return {
    title: author.name,
    description: `Articles by ${author.name} on ${siteConfig.name}. ${author.bio}`,
    alternates: { canonical: `/blog/author/${author.slug}` },
    openGraph: {
      title: `${author.name} — ${siteConfig.name}`,
      description: author.bio,
      url: `${siteConfig.url}/blog/author/${author.slug}`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const authorPosts = getPostsByAuthor(author.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${siteConfig.url}/blog/author/${author.slug}`,
  };

  return (
    <div className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: author.name, href: `/blog/author/${author.slug}` }]} />

      <div className="container mt-8 flex flex-col items-center text-center">
        <Avatar className="h-20 w-20">
          {author.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
          <AvatarFallback className="text-lg">{getInitials(author.name)}</AvatarFallback>
        </Avatar>
        <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">
          {author.name}
        </h1>
        <p className="mt-1 text-sm font-medium uppercase tracking-wider text-accent">
          {author.role}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {author.bio}
        </p>
      </div>

      <div className="container mt-16">
        {authorPosts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No published articles from {author.name} yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {authorPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
