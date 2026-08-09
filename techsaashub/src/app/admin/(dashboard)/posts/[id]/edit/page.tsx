import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { createClient } from "@/lib/supabase/server";
import { getAllAuthorsAdmin, getPostByIdAdmin } from "@/lib/admin/queries";
import type { PostFormValues } from "@/lib/admin/post-schema";
import type { ContentBlock } from "@/lib/blog-data";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const [post, authors] = await Promise.all([
    getPostByIdAdmin(supabase, id),
    getAllAuthorsAdmin(supabase),
  ]);

  if (!post) notFound();

  const defaultValues: Partial<PostFormValues> = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    coverImage: post.cover_image ?? "",
    status: post.status,
    authorId: post.author_id,
    content: (post.content as ContentBlock[] | null) ?? [{ type: "paragraph", text: "" }],
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Edit post</h1>
      <p className="mt-1 text-sm text-muted-foreground">{post.title}</p>

      <div className="mt-8">
        <PostForm
          mode="edit"
          postId={post.id}
          authors={authors.map((a) => ({ id: a.id, name: a.name }))}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
}
