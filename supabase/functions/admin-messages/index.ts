// supabase/functions/admin-messages/index.ts
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return options();

  const admin = await getAdminClient(req);
  if (!admin) return err('Unauthorized', 401);

  const url = new URL(req.url);
  // Extract ID from path: /admin-messages/{id}/read or /admin-messages/{id}
  const pathParts = url.pathname.split('/').filter(Boolean);
  const lastPart  = pathParts[pathParts.length - 1];
  const prevPart  = pathParts[pathParts.length - 2];

  // PATCH /admin-messages/{id}/read
  if (req.method === 'PATCH' && lastPart === 'read') {
    const id = prevPart;
    const { data, error } = await admin
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();
    if (error) return err('Failed to update', 500);
    return ok(data);
  }

  // DELETE /admin-messages/{id}
  if (req.method === 'DELETE' && lastPart !== 'admin-messages') {
    const id = lastPart;
    const { error } = await admin.from('contact_messages').delete().eq('id', id);
    if (error) return err('Failed to delete', 500);
    return ok({ message: 'Deleted' });
  }

  // GET /admin-messages?filter=unread
  if (req.method === 'GET') {
    const filter = url.searchParams.get('filter');
    let query = admin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter === 'unread') query = query.eq('is_read', false);

    const { data, error } = await query;
    if (error) return err('Failed to fetch', 500);
    return ok(data);
  }

  return err('Method not allowed', 405);
});
