-- ─────────────────────────────────────────────────────────────────
-- TechSaaShub — Database Schema
-- Run this once against a fresh Supabase project (SQL Editor, or
-- `supabase db push` if you're using the Supabase CLI).
-- ─────────────────────────────────────────────────────────────────

-- Required for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────
-- authors
-- Public byline profiles. Optionally linked to a Supabase auth user
-- via user_id — nullable because not every byline needs dashboard
-- access (e.g. a guest contributor).
-- ─────────────────────────────────────────────────────────────────
create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  slug text unique not null,
  name text not null,
  role text not null default '',
  bio text not null default '',
  avatar_url text,
  created_at timestamptz not null default now()
);

create index if not exists authors_slug_idx on public.authors (slug);

-- ─────────────────────────────────────────────────────────────────
-- posts
-- `category` is intentionally constrained to the same 5 categories
-- used across the rest of the site (see src/lib/constants.ts) rather
-- than a free-form categories table, so the taxonomy never drifts
-- out of sync between tools and blog content.
-- `content` mirrors the ContentBlock[] shape used on the frontend
-- (src/lib/blog-data.ts), stored as jsonb so no separate blocks
-- table or join is needed for what is, structurally, simple content.
-- ─────────────────────────────────────────────────────────────────
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content jsonb not null default '[]'::jsonb,
  category text not null check (category in ('seo', 'ai', 'developer', 'image', 'pdf')),
  tags text[] not null default '{}',
  cover_image text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  reading_time_minutes integer not null default 1,
  author_id uuid not null references public.authors (id) on delete restrict,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_idx on public.posts (status);
create index if not exists posts_category_idx on public.posts (category);
create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_tags_idx on public.posts using gin (tags);
create index if not exists posts_published_at_idx on public.posts (published_at desc);

-- Auto-maintain updated_at on every write.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row
  execute function public.set_updated_at();

-- Stamp published_at the first time a post's status becomes 'published'.
create or replace function public.set_published_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and old.status is distinct from 'published' and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists posts_set_published_at on public.posts;
create trigger posts_set_published_at
  before update on public.posts
  for each row
  execute function public.set_published_at();

-- ─────────────────────────────────────────────────────────────────
-- Row Level Security
-- This is a single-tenant admin panel with no public self-service
-- signup — accounts are provisioned manually in the Supabase
-- dashboard, so "authenticated" is treated as "admin" throughout.
-- ─────────────────────────────────────────────────────────────────
alter table public.authors enable row level security;
alter table public.posts enable row level security;

-- Authors are public-readable (author profile pages are public).
drop policy if exists "Authors are publicly readable" on public.authors;
create policy "Authors are publicly readable"
  on public.authors for select
  using (true);

drop policy if exists "Authenticated users manage authors" on public.authors;
create policy "Authenticated users manage authors"
  on public.authors for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Anonymous visitors can only read published posts.
drop policy if exists "Published posts are publicly readable" on public.posts;
create policy "Published posts are publicly readable"
  on public.posts for select
  using (status = 'published' or auth.role() = 'authenticated');

drop policy if exists "Authenticated users manage posts" on public.posts;
create policy "Authenticated users manage posts"
  on public.posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────
-- Storage — cover images
-- Create the bucket via the dashboard (Storage → New bucket → name
-- it "post-images", mark it Public) or run this if your project
-- has the storage extension available in the SQL editor.
-- ─────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

drop policy if exists "Post images are publicly readable" on storage.objects;
create policy "Post images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'post-images');

drop policy if exists "Authenticated users upload post images" on storage.objects;
create policy "Authenticated users upload post images"
  on storage.objects for insert
  with check (bucket_id = 'post-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users update post images" on storage.objects;
create policy "Authenticated users update post images"
  on storage.objects for update
  using (bucket_id = 'post-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users delete post images" on storage.objects;
create policy "Authenticated users delete post images"
  on storage.objects for delete
  using (bucket_id = 'post-images' and auth.role() = 'authenticated');
