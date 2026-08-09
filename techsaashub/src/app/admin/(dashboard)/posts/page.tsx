import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostsTable } from "@/components/admin/PostsTable";
import { createClient } from "@/lib/supabase/server";
import { getAllPostsAdmin } from "@/lib/admin/queries";

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const posts = await getAllPostsAdmin(supabase);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {posts.length} post{posts.length === 1 ? "" : "s"} total.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New post
          </Link>
        </Button>
      </div>

      <div className="mt-8">
        <PostsTable posts={posts} />
      </div>
    </div>
  );
}
