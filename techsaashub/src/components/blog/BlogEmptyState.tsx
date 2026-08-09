import { Newspaper } from "lucide-react";

export function BlogEmptyState() {
  return (
    <div className="glass relative mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
      <div className="glass-edge" aria-hidden="true" />
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
        <Newspaper className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold text-foreground">
        Nothing published yet
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        We&rsquo;re writing the first batch of guides and tool deep-dives now. Check back soon,
        or subscribe on the homepage to get them the day they go live.
      </p>
    </div>
  );
}
