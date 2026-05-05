// supabase/functions/posts/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ok, err, options } from '../_shared/helpers.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return options();
  if (req.method !== 'GET') return err('Method not allowed', 405);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,  // anon key — RLS enforces published-only
  );

  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');

  try {
    if (slug) {
      // Single post by slug
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error || !data) return err('Post not found', 404);
      return ok(data);
    } else {
      // List all published posts
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, cover_image, created_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return ok(data);
    }
  } catch (e) {
    console.error(e);
    return err('Failed to fetch posts', 500);
  }
});
