import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getDashboardStats } from "@/lib/admin/queries";
import { toolCategories } from "@/lib/constants";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const stats = await getDashboardStats(supabase);

  const postCountFor = (slug: string) =>
    stats.categoryBreakdown.find((entry) => entry.category === slug)?.count ?? 0;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Categories</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Categories are fixed to the same 5 used across tools and the blog (see{" "}
        <code className="rounded bg-foreground/[0.06] px-1 py-0.5 text-xs">
          src/lib/constants.ts
        </code>
        ), so a post can never end up in a category the rest of the site doesn&rsquo;t know
        about. Assign a category per-post from the post editor.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {toolCategories.map((category) => (
          <div key={category.slug} className="glass relative p-6">
            <div className="glass-edge" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              {category.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {category.toolCount} tools · {postCountFor(category.slug)} posts
              </span>
              <Link
                href={`/category/${category.slug}`}
                target="_blank"
                className="text-accent hover:underline"
              >
                View live
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
