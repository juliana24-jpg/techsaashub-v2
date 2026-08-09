import Link from "next/link";
import { CheckCircle2, FileText, FolderTree, PenLine } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { getDashboardStats, getRecentPostsAdmin } from "@/lib/admin/queries";
import { getCategoryName } from "@/lib/constants";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [stats, recentPosts] = await Promise.all([
    getDashboardStats(supabase),
    getRecentPostsAdmin(supabase, 5),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        An overview of your content on TechSaaShub.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total posts" value={stats.totalPosts} Icon={FileText} accent="primary" />
        <StatCard
          label="Published"
          value={stats.publishedCount}
          Icon={CheckCircle2}
          accent="secondary"
        />
        <StatCard label="Drafts" value={stats.draftCount} Icon={PenLine} accent="accent" />
        <StatCard
          label="Categories in use"
          value={stats.categoryBreakdown.length}
          Icon={FolderTree}
          accent="primary"
        />
      </div>

      <div className="glass relative mt-8 p-6">
        <div className="glass-edge" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">Recent posts</h2>
          <Link href="/admin/posts" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">
            No posts yet.{" "}
            <Link href="/admin/posts/new" className="text-accent hover:underline">
              Create your first post
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-foreground/[0.08]">
            {recentPosts.map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="block truncate font-medium text-foreground hover:text-accent"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {getCategoryName(post.category)} · {post.authors?.name ?? "Unknown author"}
                  </p>
                </div>
                <Badge variant={post.status === "published" ? "success" : "outline"}>
                  {post.status}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
