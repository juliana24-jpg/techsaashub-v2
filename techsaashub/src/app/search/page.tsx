import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, SearchX } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchPageInput } from "@/components/search/SearchPageInput";
import { searchSite } from "@/lib/search";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: "Search",
  description: "Search tools, guides and pages across the site.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q ?? "";
  const results = searchSite(query);

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={query ? `Results for "${query}"` : "Search TechSaaShub"}
        description="Find tools, categories and pages across the site."
      />

      <div className="container pb-20 pt-4 sm:pb-28">
        <SearchPageInput initialQuery={query} />

        <div className="mx-auto mt-10 max-w-2xl">
          {query.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Start typing above to search.
            </p>
          ) : results.length === 0 ? (
            <div className="glass relative flex flex-col items-center px-6 py-14 text-center">
              <div className="glass-edge" aria-hidden="true" />
              <SearchX className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
                {`No results for "${query}"`}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different term, or browse the full tool library.
              </p>
              <Link
                href="/tools"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
              >
                Browse all tools
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {results.map((result) => (
                <li key={`${result.type}-${result.href}`}>
                  <Link
                    href={result.href}
                    className="glass flex items-center justify-between gap-4 p-5 transition-shadow duration-200 hover:shadow-glow-primary"
                  >
                    <span>
                      <span className="block font-medium text-foreground">{result.label}</span>
                      {result.description && (
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {result.description}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
