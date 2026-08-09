export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
}

// No team profiles have been published yet — intentionally empty rather than
// filled with a fabricated bio. Populate this once real authors are ready.
export const authors: Author[] = [];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}
