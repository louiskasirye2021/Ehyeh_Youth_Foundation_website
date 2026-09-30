# Ehyeh Youth Foundation

Website for Ehyeh Youth Foundation. Originally exported from Figma (https://www.figma.com/design/yw4ttj1oLOe6HHZJ7Uhh8q/Ehyeh-Youth-Foundation), hosted on GitHub Pages.

## How content editing works

The site is static (GitHub Pages), but the editable content (About, Programs, Gallery, Team, News & Stories, Testimonials) is loaded from Supabase when a visitor opens the page:

- `site_content` table: one row per section, stored as JSON. Everyone can read it; only admins can write.
- `site-images` storage bucket: images uploaded from the admin panel.
- Supabase Auth: admins sign in at `/#/admin` with email and password.

A section that has never been saved shows the original content bundled in `src/utils/adminStorage.ts`. Edits go live for every visitor as soon as they are saved, with no rebuild or redeploy.

## One-time Supabase setup

1. Open the Supabase project. The site uses the project in `src/utils/supabase/info.tsx` by default. To use a different one, copy `.env.example` to `.env` and fill in its URL and anon key.
2. In **SQL Editor**, run `supabase/setup.sql`.
3. In **Authentication → Users → Add user**, create the client's login (tick "Auto Confirm User").
4. In **SQL Editor**, allow that email to edit:
   ```sql
   insert into public.admin_users (email) values ('client@example.com');
   ```
5. In **Authentication → Sign In / Providers**, turn off "Allow new users to sign up".
6. In **Edge Functions**, delete `make-server-667c1a81` if it is deployed. It was never used by the site and lets anyone overwrite content.

To add another editor, repeat steps 3 and 4. To reset a password, use the user's menu in Authentication → Users.

## Development

```bash
npm install
npm run dev      # local dev server
npm run deploy   # builds and publishes to GitHub Pages
```
