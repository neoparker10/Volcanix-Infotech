// supabase/functions/admin-stats/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ok, err, options } from '../_shared/helpers.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return options();

  // Verify admin via Supabase Auth JWT
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return err('Unauthorized', 401);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return err('Unauthorized', 401);

  // Use service role for admin data access
  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SB_SERVICE_KEY')!,
  );

  try {
    const [msgs, unread, posts, subs] = await Promise.all([
      admin.from('contact_messages').select('*', { count: 'exact', head: true }),
      admin.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
      admin.from('posts').select('status'),
      admin.from('subscribers').select('*', { count: 'exact', head: true }),
    ]);

    const published = posts.data?.filter(p => p.status === 'published').length ?? 0;
    const drafts    = posts.data?.filter(p => p.status === 'draft').length ?? 0;

    return ok({
      total_messages:  msgs.count   ?? 0,
      unread_messages: unread.count ?? 0,
      published_posts: published,
      draft_posts:     drafts,
      total_posts:     (posts.data?.length ?? 0),
      subscribers:     subs.count   ?? 0,
    });
  } catch (e) {
    console.error(e);
    return err('Failed to fetch stats', 500);
  }
});
