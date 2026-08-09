import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, PostRow } from "@/types/database.types";

type TypedClient = SupabaseClient<Database>;

export interface DashboardStats {
  totalPosts: number;
  publishedCount: number;
  draftCount: number;
  categoryBreakdown: Array<{ category: string; count: number }>;
}

export async function getDashboardStats(supabase: TypedClient): Promise<DashboardStats> {
  const { data, error } = await supabase.from("posts").select("status, category");

  if (error || !data) {
    return { totalPosts: 0, publishedCount: 0, draftCount: 0, categoryBreakdown: [] };
  }

  const publishedCount = data.filter((post) => post.status === "published").length;
  const draftCount = data.filter((post) => post.status === "draft").length;

  const counts = new Map<string, number>();
  data.forEach((post) => {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  });

  return {
    totalPosts: data.length,
    publishedCount,
    draftCount,
    categoryBreakdown: Array.from(counts.entries()).map(([category, count]) => ({
      category,
      count,
    })),
  };
}

export interface AdminPostRow extends PostRow {
  authors: { name: string } | null;
}

export async function getAllPostsAdmin(supabase: TypedClient): Promise<AdminPostRow[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, authors ( name )")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as unknown as AdminPostRow[];
}

export async function getPostByIdAdmin(supabase: TypedClient, id: string): Promise<PostRow | null> {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data;
}

export async function getRecentPostsAdmin(
  supabase: TypedClient,
  limit = 5,
): Promise<AdminPostRow[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, authors ( name )")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as unknown as AdminPostRow[];
}

export interface TagWithCount {
  tag: string;
  count: number;
}

export async function getAllTagsWithCounts(supabase: TypedClient): Promise<TagWithCount[]> {
  const { data, error } = await supabase.from("posts").select("tags");
  if (error || !data) return [];

  const counts = new Map<string, number>();
  data.forEach((post) => {
    (post.tags ?? []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getAllAuthorsAdmin(supabase: TypedClient) {
  const { data, error } = await supabase.from("authors").select("*").order("name");
  if (error || !data) return [];
  return data;
}
