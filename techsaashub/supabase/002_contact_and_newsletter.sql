-- ─────────────────────────────────────────────────────────────────
-- TechSaaShub — Migration 002: Contact & Newsletter
-- Additive migration — run this after supabase/schema.sql.
-- Powers src/app/api/contact/route.ts and src/app/api/newsletter/route.ts.
-- ─────────────────────────────────────────────────────────────────

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (email);

alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Both tables are write-only for anonymous visitors (the API routes use the
-- anon key) and fully readable/manageable by authenticated admins, matching
-- the same "authenticated = admin" model used throughout the admin panel.

drop policy if exists "Anyone can submit the contact form" on public.contact_submissions;
create policy "Anyone can submit the contact form"
  on public.contact_submissions for insert
  with check (true);

drop policy if exists "Authenticated users read contact submissions" on public.contact_submissions;
create policy "Authenticated users read contact submissions"
  on public.contact_submissions for select
  using (auth.role() = 'authenticated');

drop policy if exists "Authenticated users delete contact submissions" on public.contact_submissions;
create policy "Authenticated users delete contact submissions"
  on public.contact_submissions for delete
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can subscribe to the newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to the newsletter"
  on public.newsletter_subscribers for insert
  with check (true);

drop policy if exists "Authenticated users manage newsletter subscribers" on public.newsletter_subscribers;
create policy "Authenticated users manage newsletter subscribers"
  on public.newsletter_subscribers for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
