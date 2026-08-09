import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { BlogAuthor } from "@/lib/blog-data";

interface AuthorBoxProps {
  author: BlogAuthor;
  publishedAt: string;
  readingTimeMinutes: number;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AuthorBox({ author, publishedAt, readingTimeMinutes }: AuthorBoxProps) {
  return (
    <div className="flex items-center gap-3">
      <Link href={`/blog/author/${author.slug}`} aria-label={`View ${author.name}'s profile`}>
        <Avatar>
          {author.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
          <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="text-sm">
        <Link
          href={`/blog/author/${author.slug}`}
          className="font-medium text-foreground transition-colors hover:text-accent"
        >
          {author.name}
        </Link>
        <p className="text-muted-foreground">
          {formatDate(publishedAt)} · {readingTimeMinutes} min read
        </p>
      </div>
    </div>
  );
}
