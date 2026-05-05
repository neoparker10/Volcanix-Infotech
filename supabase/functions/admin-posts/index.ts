// supabase/functions/admin-posts/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ok, err, options } from '../_shared/helpers.ts';

async function getAdminClient(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return null;

  const anonClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: { user } } = await anonClient.auth.getUser();
  if (!user) return null;

  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SB_SERVICE_KEY')!,
  );
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return options();

  const admin = await getAdminClient(req);
  if (!admin) return err('Unauthorized', 401);

  const url  = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const id    = parts[parts.length - 1] !== 'admin-posts' ? parts[parts.length - 1] : null;

  try {
    // GET list
    if (req.method === 'GET' && !id) {
      const { data, error } = await admin
        .from('posts')
        .select('id, title, slug, status, created_at, updated_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return ok(data);
    }

    // GET single
    if (req.method === 'GET' && id) {
      const { data, error } = await admin.from('posts').select('*').eq('id', id).single();
      if (error || !data) return err('Post not found', 404);
      return ok(data);
    }

    // POST create
    if (req.method === 'POST') {
      const body = await req.json();
      const { title, slug, excerpt = '', content, cover_image = '', status = 'draft' } = body;
      if (!title || !content) return err('Title and content are required');

      const finalSlug = slug ? slugify(slug) : slugify(title);

      const { data, error } = await admin
        .from('posts')
        .insert({ title, slug: finalSlug, excerpt, content, cover_image, status })
        .select()
        .single();
      if (error) {
        if (error.code === '23505') return err('Slug already exists — choose a different one', 409);
        throw error;
      }
      return ok(data, 201);
    }

    // PUT update
    if (req.method === 'PUT' && id) {
      const body = await req.json();
      if (body.slug) body.slug = slugify(body.slug);

      const { data, error } = await admin
        .from('posts')
        .update(body)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return ok(data);
    }

    // DELETE
    if (req.method === 'DELETE' && id) {
      const { error } = await admin.from('posts').delete().eq('id', id);
      if (error) throw error;
      return ok({ message: 'Post deleted' });
    }

    return err('Not found', 404);
  } catch (e) {
    console.error(e);
    return err('Server error', 500);
  }
});
