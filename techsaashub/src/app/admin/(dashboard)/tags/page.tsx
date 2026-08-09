import { TagsList } from "@/components/admin/TagsList";
import { createClient } from "@/lib/supabase/server";
import { getAllTagsWithCounts } from "@/lib/admin/queries";

export default async function AdminTagsPage() {
  const supabase = await createClient();
  const tags = await getAllTagsWithCounts(supabase);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Tags</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tags are free-form and set per-post from the post editor. Deleting one here removes it
        from every post that uses it.
      </p>

      <div className="mt-8 max-w-2xl">
        <TagsList tags={tags} />
      </div>
    </div>
  );
}
