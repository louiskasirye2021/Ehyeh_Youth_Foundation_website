-- Ehyeh Youth Foundation website: update for the full-site admin editor
-- Run once in Supabase → SQL Editor → New query. Safe to re-run.
--
-- The admin panel can now edit every part of the website (banner, contact
-- details, footer, FAQ, privacy policy, terms…). Each part is saved as its own
-- row, so the table needs to accept the new section names.

alter table public.site_content
  drop constraint if exists site_content_section_check;

alter table public.site_content
  add constraint site_content_section_check
  check (section ~ '^[a-zA-Z]{2,40}$');
