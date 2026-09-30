import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Values come from .env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) when set,
// otherwise from the project that was already configured in utils/supabase/info.tsx.
// The anon key is designed to be public; Row Level Security in Supabase is what
// actually decides who can read and write (see supabase/setup.sql).
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || `https://${projectId}.supabase.co`;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const IMAGE_BUCKET = 'site-images';
