export type PostStatus = "draft" | "published";
export type PostCategory = "seo" | "ai" | "developer" | "image" | "pdf";

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          user_id: string | null;
          slug: string;
          name: string;
          role: string;
          bio: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          slug: string;
          name: string;
          role?: string;
          bio?: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["authors"]["Insert"]>;
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: unknown;
          category: PostCategory;
          tags: string[];
          cover_image: string | null;
          status: PostStatus;
          reading_time_minutes: number;
          author_id: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content?: unknown;
          category: PostCategory;
          tags?: string[];
          cover_image?: string | null;
          status?: PostStatus;
          reading_time_minutes?: number;
          author_id: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "authors";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_submissions"]["Insert"]>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

export type AuthorRow = Database["public"]["Tables"]["authors"]["Row"];
export type PostRow = Database["public"]["Tables"]["posts"]["Row"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];
export type ContactSubmissionInsert = Database["public"]["Tables"]["contact_submissions"]["Insert"];
export type NewsletterSubscriberInsert =
  Database["public"]["Tables"]["newsletter_subscribers"]["Insert"];
