"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { postFormSchema, type PostFormValues } from "@/lib/admin/post-schema";
import { computeReadingTimeMinutes } from "@/lib/admin/content-utils";

export interface PostActionResult {
  success: boolean;
  error?: string;
  postId?: string;
}

function toRow(values: PostFormValues) {
  return {
    title: values.title,
    slug: values.slug,
    excerpt: values.excerpt,
    category: values.category,
    tags: values.tags,
    cover_image: values.coverImage || null,
    status: values.status,
    author_id: values.authorId,
    content: values.content,
    reading_time_minutes: computeReadingTimeMinutes(values.content),
  };
}

export async function createPostAction(values: PostFormValues): Promise<PostActionResult> {
  const parsed = postFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("posts")
    .insert(toRow(parsed.data))
    .select("id")
    .single();

  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to create post" };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  revalidatePath("/blog");

  return { success: true, postId: data.id };
}

export async function updatePostAction(
  id: string,
  values: PostFormValues,
): Promise<PostActionResult> {
  const parsed = postFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid data" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase.from("posts").update(toRow(parsed.data)).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);

  return { success: true, postId: id };
}

export async function deletePostAction(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  revalidatePath("/blog");

  return { success: true };
}

export async function toggleStatusAction(
  id: string,
  currentStatus: "draft" | "published",
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const newStatus = currentStatus === "published" ? "draft" : "published";
  const { error } = await supabase.from("posts").update({ status: newStatus }).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  revalidatePath("/blog");

  return { success: true };
}
