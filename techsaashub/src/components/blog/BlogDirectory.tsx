"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { toolCategories, type ToolCategory } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog-data";

type FilterValue = ToolCategory | "all";

interface BlogDirectoryProps {
  posts: BlogPost[];
  allTags: string[];
}

export function BlogDirectory({ posts, allTags }: BlogDirectoryProps) {
  const [category, setCategory] = useState<FilterValue>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      const matchesQuery =
        trimmedQuery.length === 0 ||
        post.title.toLowerCase().includes(trimmedQuery) ||
        post.excerpt.toLowerCase().includes(trimmedQuery);
      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [posts, category, activeTag, query]);

  return (
    <div>
      <div className="mx-auto max-w-md">
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            className="pl-11"
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
            >
              <Badge variant={activeTag === tag ? "accent" : "outline"} className="cursor-pointer">
                #{tag}
              </Badge>
            </button>
          ))}
        </div>
      )}

      <Tabs
        value={category}
        onValueChange={(value) => setCategory(value as FilterValue)}
        className="mt-8 flex flex-col items-center"
      >
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {toolCategories.map((cat) => (
            <TabsTrigger key={cat.slug} value={cat.slug}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={category} className="w-full">
          {filteredPosts.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              No articles match those filters yet.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
