"use client";

import { useMemo, useState } from "react";
import { Clock3, Heart, Search, Sparkles, ArrowDownAZ } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/tools/ToolCard";
import { useFavorites } from "@/hooks/useFavorites";
import { toolCategories, type ToolCategory } from "@/lib/constants";
import { tools } from "@/lib/tools-data";
import { cn } from "@/lib/utils";

type FilterValue = ToolCategory | "all";
type SortMode = "popular" | "newest" | "az";

const sortOptions: Array<{ value: SortMode; label: string; Icon: typeof Sparkles }> = [
  { value: "popular", label: "Popular", Icon: Sparkles },
  { value: "newest", label: "Newest", Icon: Clock3 },
  { value: "az", label: "A–Z", Icon: ArrowDownAZ },
];

export function ToolsDirectory() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [sortMode, setSortMode] = useState<SortMode>("popular");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const { favorites, hydrated } = useFavorites();

  const filteredTools = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    let result = tools.filter((tool) => {
      const matchesCategory = filter === "all" || tool.category === filter;
      const matchesQuery =
        trimmedQuery.length === 0 ||
        tool.name.toLowerCase().includes(trimmedQuery) ||
        tool.description.toLowerCase().includes(trimmedQuery);
      const matchesFavorites = !favoritesOnly || (hydrated && favorites.includes(tool.slug));
      return matchesCategory && matchesQuery && matchesFavorites;
    });

    result = [...result].sort((a, b) => {
      if (sortMode === "az") return a.name.localeCompare(b.name);
      if (sortMode === "newest") {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
      // popular
      if (a.popular === b.popular) return a.name.localeCompare(b.name);
      return a.popular ? -1 : 1;
    });

    return result;
  }, [filter, query, favoritesOnly, favorites, hydrated, sortMode]);

  return (
    <div>
      <div className="mx-auto max-w-md">
        <label htmlFor="tools-search" className="sr-only">
          Search tools
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="tools-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools…"
            className="pl-11"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSortMode(option.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
              sortMode === option.value
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-foreground/[0.08] text-muted-foreground hover:text-foreground",
            )}
          >
            <option.Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {option.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setFavoritesOnly((current) => !current)}
          aria-pressed={favoritesOnly}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
            favoritesOnly
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-foreground/[0.08] text-muted-foreground hover:text-foreground",
          )}
        >
          <Heart className={cn("h-3.5 w-3.5", favoritesOnly && "fill-current")} aria-hidden="true" />
          Favorites
        </button>
      </div>

      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as FilterValue)}
        className="mt-6 flex flex-col items-center"
      >
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All ({tools.length})</TabsTrigger>
          {toolCategories.map((category) => (
            <TabsTrigger key={category.slug} value={category.slug}>
              {category.name} ({category.toolCount})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter} className="w-full">
          {filteredTools.length === 0 ? (
            <p className="mt-12 text-center text-sm text-muted-foreground">
              {favoritesOnly
                ? "No favorites yet — tap the heart on any tool to save it here."
                : "No tools match those filters."}
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} index={index} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
