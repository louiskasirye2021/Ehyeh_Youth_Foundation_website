-- Ehyeh Youth Foundation website: content storage setup
-- Run this once in Supabase → SQL Editor → New query. It is safe to re-run.

-- 1. Where the website content lives (one row per section) ------------------
create table if not exists public.site_content (
  section    text primary key
             check (section in ('programs', 'testimonials', 'blog', 'gallery', 'team', 'about')),
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. Who is allowed to edit ---------------------------------------------------
-- Only emails listed here can change content, even if someone else manages
-- to create an account. Nobody can read or change this table from the website.
create table if not exists public.admin_users (
  email text primary key
);
alter table public.admin_users enable row level security;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

-- 3. Access rules for content: everyone reads, admins write -------------------
alter table public.site_content enable row level security;

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

drop policy if exists "Anyone can read site content" on public.site_content;
create policy "Anyone can read site content"
  on public.site_content for select
  using (true);

drop policy if exists "Admins can add site content" on public.site_content;
create policy "Admins can add site content"
  on public.site_content for insert to authenticated
  with check (public.is_site_admin());

drop policy if exists "Admins can change site content" on public.site_content;
create policy "Admins can change site content"
  on public.site_content for update to authenticated
  using (public.is_site_admin())
  with check (public.is_site_admin());

drop policy if exists "Admins can remove site content" on public.site_content;
create policy "Admins can remove site content"
  on public.site_content for delete to authenticated
  using (public.is_site_admin());

-- 4. Image uploads --------------------------------------------------------------
-- Public bucket: anyone can view images, only admins can upload or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload site images" on storage.objects;
create policy "Admins can upload site images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and public.is_site_admin());

drop policy if exists "Admins can replace site images" on storage.objects;
create policy "Admins can replace site images"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-images' and public.is_site_admin());

drop policy if exists "Admins can delete site images" on storage.objects;
create policy "Admins can delete site images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and public.is_site_admin());

-- 5. Add the client's email as an admin ----------------------------------------
-- First create their login in Authentication → Users → Add user
-- (tick "Auto Confirm User"), then put the same email here and run this line:
-- insert into public.admin_users (email) values ('client@example.com') on conflict do nothing;
