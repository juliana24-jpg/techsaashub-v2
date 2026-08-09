"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

interface SearchPageInputProps {
  initialQuery: string;
}

export function SearchPageInput({ initialQuery }: SearchPageInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search tools and pages"
      className="glass mx-auto flex w-full max-w-xl items-center gap-2 rounded-2xl p-2 pl-5"
    >
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <label htmlFor="search-page-input" className="sr-only">
        Search tools, guides and SEO checklists
      </label>
      <input
        id="search-page-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search tools, guides, SEO checklists…"
        className="h-11 w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
      />
      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-gradient-brand px-4 text-sm font-medium text-background transition-transform duration-200 ease-premium hover:scale-[1.03] active:scale-[0.98]"
      >
        Search
      </button>
    </form>
  );
}
