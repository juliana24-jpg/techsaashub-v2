import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryName } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog-data";

interface FeaturedPostProps {
  post: BlogPost;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass group grid grid-cols-1 overflow-hidden lg:grid-cols-2"
    >
      <div className="glass-edge" aria-hidden="true" />
      <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-auto">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-brand" />
        )}
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <div className="flex items-center gap-2">
          <Badge>Featured</Badge>
          <Badge variant="secondary">{getCategoryName(post.category)}</Badge>
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{post.author.name}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTimeMinutes} min read
          </span>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
          Read the article
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
