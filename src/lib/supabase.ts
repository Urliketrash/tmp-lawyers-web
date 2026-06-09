import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client for browser-side database queries and auth interaction.
 */
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
