"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteTagAction(tag: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { data: taggedPosts, error: fetchError } = await supabase
    .from("posts")
    .select("id, tags")
    .contains("tags", [tag]);

  if (fetchError) return { success: false, error: fetchError.message };

  for (const post of taggedPosts ?? []) {
    const updatedTags = (post.tags ?? []).filter((existingTag) => existingTag !== tag);
    const { error: updateError } = await supabase
      .from("posts")
      .update({ tags: updatedTags })
      .eq("id", post.id);
    if (updateError) return { success: false, error: updateError.message };
  }

  revalidatePath("/admin/tags");
  revalidatePath("/admin/posts");
  revalidatePath("/blog");

  return { success: true };
}
