import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// Base URL for Edge Functions
const FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

async function callFunction(name, options = {}) {
  const session = (await supabase.auth.getSession()).data.session;
  const headers = {
    'Content-Type': 'application/json',
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    ...(session && { Authorization: `Bearer ${session.access_token}` }),
    ...options.headers,
  };

  const res = await fetch(`${FN}/${name}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

// ── Public API ─────────────────────────────────────────────
export const api = {
  sendMessage: (body) =>
    callFunction('contact', { method: 'POST', body: JSON.stringify(body) }),

  subscribe: (email) =>
    callFunction('subscribe', { method: 'POST', body: JSON.stringify({ email }) }),

  getPosts: () =>
    callFunction('posts'),

  getPost: (slug) =>
    callFunction(`posts?slug=${encodeURIComponent(slug)}`),

  // ── Auth (Supabase Auth directly) ──────────────────────
  login: (email, password) =>
    supabase.auth.signInWithPassword({ email, password }),

  logout: () =>
    supabase.auth.signOut(),

  getSession: () =>
    supabase.auth.getSession(),

  // ── Admin: Stats ───────────────────────────────────────
  getStats: () =>
    callFunction('admin-stats'),

  // ── Admin: Messages ────────────────────────────────────
  getMessages: (filter) =>
    callFunction(`admin-messages${filter ? `?filter=${filter}` : ''}`),

  markRead: (id) =>
    callFunction(`admin-messages/${id}/read`, { method: 'PATCH' }),

  deleteMessage: (id) =>
    callFunction(`admin-messages/${id}`, { method: 'DELETE' }),

  // ── Admin: Posts ───────────────────────────────────────
  adminGetPosts: () =>
    callFunction('admin-posts'),

  adminGetPost: (id) =>
    callFunction(`admin-posts/${id}`),

  adminCreatePost: (body) =>
    callFunction('admin-posts', { method: 'POST', body: JSON.stringify(body) }),

  adminUpdatePost: (id, body) =>
    callFunction(`admin-posts/${id}`, { method: 'PUT', body: JSON.stringify(body) }),

  adminDeletePost: (id) =>
    callFunction(`admin-posts/${id}`, { method: 'DELETE' }),
};
