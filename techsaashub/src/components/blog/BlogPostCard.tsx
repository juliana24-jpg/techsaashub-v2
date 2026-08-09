import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryName } from "@/lib/constants";
import type { BlogPostSummary } from "@/lib/blog-data";

interface BlogPostCardProps {
  post: BlogPostSummary;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="glass group flex h-full flex-col overflow-hidden">
        <div className="glass-edge" aria-hidden="true" />
        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <Badge variant="secondary" className="w-fit">
            {getCategoryName(post.category)}
          </Badge>
          <h2 className="mt-3 font-display text-lg font-semibold text-foreground">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{post.author.name}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readingTimeMinutes} min
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
