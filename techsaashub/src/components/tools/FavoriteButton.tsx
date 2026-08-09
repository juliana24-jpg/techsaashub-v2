"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
}

export function FavoriteButton({ slug, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites();
  const active = hydrated && isFavorite(slug);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/[0.08] bg-background/70 backdrop-blur-sm transition-colors duration-200 hover:border-accent/40",
        active ? "text-accent" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", active && "fill-current")} aria-hidden="true" />
    </button>
  );
}
