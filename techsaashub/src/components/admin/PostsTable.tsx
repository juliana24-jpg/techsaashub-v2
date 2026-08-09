"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Eye, EyeOff, Pencil, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryName } from "@/lib/constants";
import { deletePostAction, toggleStatusAction } from "@/app/admin/(dashboard)/posts/actions";
import type { AdminPostRow } from "@/lib/admin/queries";

interface PostsTableProps {
  posts: AdminPostRow[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setPendingId(id);
    await deletePostAction(id);
    setPendingId(null);
    setConfirmingId(null);
    router.refresh();
  }

  async function handleToggleStatus(id: string, status: "draft" | "published") {
    setPendingId(id);
    await toggleStatusAction(id, status);
    setPendingId(null);
    router.refresh();
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No posts yet.{" "}
        <Link href="/admin/posts/new" className="text-accent hover:underline">
          Create your first post
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="glass relative overflow-x-auto">
      <div className="glass-edge" aria-hidden="true" />
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-foreground/[0.08] text-xs uppercase tracking-wider text-muted-foreground">
            <th className="px-5 py-3 font-medium">Title</th>
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Updated</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-foreground/[0.06]">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="max-w-xs truncate px-5 py-3.5 font-medium text-foreground">
                {post.title}
              </td>
              <td className="px-5 py-3.5 text-muted-foreground">
                {getCategoryName(post.category)}
              </td>
              <td className="px-5 py-3.5">
                <Badge variant={post.status === "published" ? "success" : "outline"}>
                  {post.status}
                </Badge>
              </td>
              <td className="px-5 py-3.5 text-muted-foreground">
                {formatDate(post.updated_at)}
              </td>
              <td className="px-5 py-3.5">
                {confirmingId === post.id ? (
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">Delete?</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      disabled={pendingId === post.id}
                      onClick={() => handleDelete(post.id)}
                      aria-label="Confirm delete"
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => setConfirmingId(null)}
                      aria-label="Cancel delete"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      disabled={pendingId === post.id}
                      onClick={() => handleToggleStatus(post.id, post.status)}
                      aria-label={post.status === "published" ? "Unpublish" : "Publish"}
                      title={post.status === "published" ? "Unpublish" : "Publish"}
                    >
                      {post.status === "published" ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      aria-label="Edit post"
                    >
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setConfirmingId(post.id)}
                      aria-label="Delete post"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
