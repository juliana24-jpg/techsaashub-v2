"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { AlertCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ContentBlockEditor } from "@/components/admin/ContentBlockEditor";
import { toolCategories } from "@/lib/constants";
import { generateSlug } from "@/lib/admin/content-utils";
import { postFormSchema, type PostFormValues } from "@/lib/admin/post-schema";
import { createPostAction, updatePostAction } from "@/app/admin/(dashboard)/posts/actions";

interface AuthorOption {
  id: string;
  name: string;
}

interface PostFormProps {
  mode: "create" | "edit";
  postId?: string;
  authors: AuthorOption[];
  defaultValues?: Partial<PostFormValues>;
}

const emptyValues: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  category: "seo",
  tags: [],
  coverImage: "",
  status: "draft",
  authorId: "",
  content: [{ type: "paragraph", text: "" }],
};

export function PostForm({ mode, postId, authors, defaultValues }: PostFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>({
    ...emptyValues,
    ...defaultValues,
    authorId: defaultValues?.authorId ?? authors[0]?.id ?? "",
  });
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    updateField("title", title);
    if (!slugTouched) {
      updateField("slug", generateSlug(title));
    }
  }

  function addTag() {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !values.tags.includes(trimmed)) {
      updateField("tags", [...values.tags, trimmed]);
    }
    setTagInput("");
  }

  function handleTagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  }

  function removeTag(tag: string) {
    updateField(
      "tags",
      values.tags.filter((t) => t !== tag),
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitError(null);

    const parsed = postFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const result =
      mode === "create"
        ? await createPostAction(parsed.data)
        : await updatePostAction(postId ?? "", parsed.data);

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      <div className="glass relative grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
        <div className="glass-edge" aria-hidden="true" />

        <div className="sm:col-span-2">
          <label htmlFor="post-title" className="mb-1.5 block text-sm font-medium text-foreground">
            Title
          </label>
          <Input
            id="post-title"
            value={values.title}
            onChange={(event) => handleTitleChange(event.target.value)}
          />
          {errors.title && <p className="mt-1.5 text-xs text-destructive">{errors.title}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="post-slug" className="mb-1.5 block text-sm font-medium text-foreground">
            Slug
          </label>
          <Input
            id="post-slug"
            value={values.slug}
            onChange={(event) => {
              setSlugTouched(true);
              updateField("slug", event.target.value);
            }}
          />
          {errors.slug && <p className="mt-1.5 text-xs text-destructive">{errors.slug}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="post-excerpt" className="mb-1.5 block text-sm font-medium text-foreground">
            Excerpt
          </label>
          <Textarea
            id="post-excerpt"
            rows={2}
            value={values.excerpt}
            onChange={(event) => updateField("excerpt", event.target.value)}
          />
          {errors.excerpt && <p className="mt-1.5 text-xs text-destructive">{errors.excerpt}</p>}
        </div>

        <div>
          <label htmlFor="post-category" className="mb-1.5 block text-sm font-medium text-foreground">
            Category
          </label>
          <select
            id="post-category"
            value={values.category}
            onChange={(event) =>
              updateField("category", event.target.value as PostFormValues["category"])
            }
            className="h-11 w-full rounded-xl border border-input bg-foreground/[0.02] px-4 text-sm text-foreground"
          >
            {toolCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="post-author" className="mb-1.5 block text-sm font-medium text-foreground">
            Author
          </label>
          <select
            id="post-author"
            value={values.authorId}
            onChange={(event) => updateField("authorId", event.target.value)}
            className="h-11 w-full rounded-xl border border-input bg-foreground/[0.02] px-4 text-sm text-foreground"
          >
            {authors.length === 0 && <option value="">No authors yet</option>}
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {errors.authorId && <p className="mt-1.5 text-xs text-destructive">{errors.authorId}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="post-tags" className="mb-1.5 block text-sm font-medium text-foreground">
            Tags
          </label>
          <Input
            id="post-tags"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={addTag}
            placeholder="Type a tag and press Enter"
          />
          {values.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {values.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Cover image</span>
          <ImageUpload
            value={values.coverImage ?? ""}
            onChange={(url) => updateField("coverImage", url)}
          />
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-foreground">Status</span>
          <div className="flex gap-2">
            {(["draft", "published"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => updateField("status", status)}
                className={`rounded-lg border px-3.5 py-2 text-sm font-medium capitalize transition-colors ${
                  values.status === status
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-foreground/[0.08] text-muted-foreground hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">Content</h2>
        <ContentBlockEditor
          blocks={values.content}
          onChange={(content) => updateField("content", content)}
        />
        {errors.content && <p className="mt-2 text-xs text-destructive">{errors.content}</p>}
      </div>

      {submitError && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {submitError}
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : mode === "create" ? "Create post" : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/admin/posts")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
