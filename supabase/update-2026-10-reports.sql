-- Ehyeh Youth Foundation website: storage for reports (PDF and Word files)
-- Run once in Supabase → SQL Editor → New query. Safe to re-run.

-- Public bucket: anyone can open/download reports, only admins can upload or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-documents', 'site-documents', true, 26214400,
        array['application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload documents" on storage.objects;
create policy "Admins can upload documents"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-documents' and public.is_site_admin());

drop policy if exists "Admins can replace documents" on storage.objects;
create policy "Admins can replace documents"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-documents' and public.is_site_admin());

drop policy if exists "Admins can delete documents" on storage.objects;
create policy "Admins can delete documents"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-documents' and public.is_site_admin());
