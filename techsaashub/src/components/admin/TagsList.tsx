"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteTagAction } from "@/app/admin/(dashboard)/tags/actions";
import type { TagWithCount } from "@/lib/admin/queries";

interface TagsListProps {
  tags: TagWithCount[];
}

export function TagsList({ tags }: TagsListProps) {
  const router = useRouter();
  const [confirmingTag, setConfirmingTag] = useState<string | null>(null);
  const [pendingTag, setPendingTag] = useState<string | null>(null);

  async function handleDelete(tag: string) {
    setPendingTag(tag);
    await deleteTagAction(tag);
    setPendingTag(null);
    setConfirmingTag(null);
    router.refresh();
  }

  if (tags.length === 0) {
    return <p className="text-sm text-muted-foreground">No tags in use yet.</p>;
  }

  return (
    <ul className="glass relative divide-y divide-foreground/[0.06] overflow-hidden">
      <div className="glass-edge" aria-hidden="true" />
      {tags.map(({ tag, count }) => (
        <li key={tag} className="flex items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Badge variant="outline">#{tag}</Badge>
            <span className="text-sm text-muted-foreground">
              {count} post{count === 1 ? "" : "s"}
            </span>
          </div>

          {confirmingTag === tag ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Remove from all posts?</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:text-destructive"
                disabled={pendingTag === tag}
                onClick={() => handleDelete(tag)}
                aria-label="Confirm delete tag"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setConfirmingTag(null)}
                aria-label="Cancel"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => setConfirmingTag(tag)}
              aria-label={`Delete tag ${tag}`}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
