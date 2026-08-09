"use client";

import { ArrowDown, ArrowUp, Heading2, Pilcrow, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { slugifyHeading } from "@/lib/admin/content-utils";
import type { ContentBlock } from "@/lib/blog-data";

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function ContentBlockEditor({ blocks, onChange }: ContentBlockEditorProps) {
  function updateBlock(index: number, block: ContentBlock) {
    const next = [...blocks];
    next[index] = block;
    onChange(next);
  }

  function removeBlock(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const next = [...blocks];
    const [moved] = next.splice(index, 1);
    if (!moved) return;
    next.splice(targetIndex, 0, moved);
    onChange(next);
  }

  function addParagraph() {
    onChange([...blocks, { type: "paragraph", text: "" }]);
  }

  function addHeading() {
    onChange([...blocks, { type: "heading", level: 2, text: "", id: "" }]);
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <div key={index} className="glass relative p-4">
          <div className="glass-edge" aria-hidden="true" />
          <div className="flex items-start gap-3">
            <span className="mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.06] text-muted-foreground">
              {block.type === "heading" ? (
                <Heading2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pilcrow className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </span>

            <div className="min-w-0 flex-1 space-y-2">
              {block.type === "heading" ? (
                <>
                  <div className="flex items-center gap-2">
                    <select
                      value={block.level}
                      onChange={(event) =>
                        updateBlock(index, {
                          ...block,
                          level: Number(event.target.value) as 2 | 3,
                        })
                      }
                      className="h-9 rounded-lg border border-input bg-foreground/[0.02] px-2 text-sm text-foreground"
                    >
                      <option value={2}>Heading 2</option>
                      <option value={3}>Heading 3</option>
                    </select>
                  </div>
                  <Input
                    value={block.text}
                    onChange={(event) =>
                      updateBlock(index, {
                        ...block,
                        text: event.target.value,
                        id: slugifyHeading(event.target.value),
                      })
                    }
                    placeholder="Heading text"
                  />
                </>
              ) : (
                <Textarea
                  value={block.text}
                  onChange={(event) => updateBlock(index, { ...block, text: event.target.value })}
                  placeholder="Paragraph text"
                  rows={3}
                />
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => moveBlock(index, -1)}
                disabled={index === 0}
                aria-label="Move block up"
                className="h-7 w-7"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => moveBlock(index, 1)}
                disabled={index === blocks.length - 1}
                aria-label="Move block down"
                className="h-7 w-7"
              >
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeBlock(index)}
                aria-label="Remove block"
                className="h-7 w-7 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={addParagraph}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Paragraph
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={addHeading}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Heading
        </Button>
      </div>
    </div>
  );
}
