"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowRight, Search, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  blogResults,
  staticPages,
  toolResults,
  type SiteSearchResult,
} from "@/lib/search";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultResults: SiteSearchResult[] = [
  ...staticPages.slice(0, 5),
  ...toolResults.slice(0, 4),
];

const allResults: SiteSearchResult[] = [...staticPages, ...toolResults, ...blogResults];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const results = React.useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length === 0) return defaultResults;
    return allResults
      .filter(
        (result) =>
          result.label.toLowerCase().includes(trimmed) ||
          result.description?.toLowerCase().includes(trimmed),
      )
      .slice(0, 8);
  }, [query]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
    setQuery("");
    return undefined;
  }, [open]);

  function navigateTo(href: string) {
    onOpenChange(false);
    router.push(href);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const result = results[activeIndex];
      if (result) navigateTo(result.href);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPortal forceMount>
            <DialogOverlay />
            <DialogPrimitive.Content
              asChild
              forceMount
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="glass fixed left-1/2 top-24 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden !rounded-2xl p-0 sm:top-28"
              >
                <VisuallyHidden asChild>
                  <DialogTitle>Search tools and pages</DialogTitle>
                </VisuallyHidden>

                <div className="flex items-center gap-3 border-b border-foreground/[0.08] px-5 py-4">
                  <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search tools, articles, pages…"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="search-results-list"
                    aria-activedescendant={
                      results[activeIndex] ? `search-result-${activeIndex}` : undefined
                    }
                    autoComplete="off"
                    className="h-6 w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
                  />
                  <DialogClose
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </DialogClose>
                </div>

                <ul
                  id="search-results-list"
                  role="listbox"
                  aria-label="Search results"
                  className="max-h-80 overflow-y-auto p-2"
                >
                  {results.length === 0 && (
                    <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                      {`No results for "${query}".`}
                    </li>
                  )}
                  {results.map((result, index) => (
                    <li
                      key={`${result.type}-${result.href}`}
                      id={`search-result-${index}`}
                      role="option"
                      aria-selected={index === activeIndex}
                    >
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => navigateTo(result.href)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150",
                          index === activeIndex
                            ? "bg-foreground/[0.06]"
                            : "hover:bg-foreground/[0.04]",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {result.label}
                          </span>
                          {result.description && (
                            <span className="block truncate text-xs text-muted-foreground">
                              {result.description}
                            </span>
                          )}
                        </span>
                        <ArrowRight
                          className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150",
                            index === activeIndex && "translate-x-0.5 text-accent",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="hidden items-center gap-4 border-t border-foreground/[0.08] px-5 py-3 text-xs text-muted-foreground sm:flex">
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-foreground/[0.12] bg-foreground/[0.04] px-1.5 py-0.5 font-sans">
                      ↑↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-foreground/[0.12] bg-foreground/[0.04] px-1.5 py-0.5 font-sans">
                      Enter
                    </kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-foreground/[0.12] bg-foreground/[0.04] px-1.5 py-0.5 font-sans">
                      Esc
                    </kbd>
                    Close
                  </span>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
