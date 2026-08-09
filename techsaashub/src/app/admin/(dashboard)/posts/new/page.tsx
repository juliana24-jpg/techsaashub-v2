import { PostForm } from "@/components/admin/PostForm";
import { createClient } from "@/lib/supabase/server";
import { getAllAuthorsAdmin } from "@/lib/admin/queries";

export default async function NewPostPage() {
  const supabase = await createClient();
  const authors = await getAllAuthorsAdmin(supabase);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">New post</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in the details below and publish when ready.
      </p>

      <div className="mt-8">
        <PostForm mode="create" authors={authors.map((a) => ({ id: a.id, name: a.name }))} />
      </div>
    </div>
  );
}
