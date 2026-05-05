# Volcanix Infotech — Full Stack Website
### 100% Free Stack: React (Vercel) + Supabase (DB + Auth + Edge Functions)

No paid backend needed. Everything runs on free tiers.

---

## Architecture

```
Browser
  └── React SPA (Vercel — free)
        ├── Supabase Auth  (login/session)
        ├── Supabase Edge Functions  (serverless API — free)
        │     ├── contact          POST — save contact form
        │     ├── subscribe        POST — save email subscriber
        │     ├── posts            GET  — public blog posts
        │     ├── admin-stats      GET  — dashboard stats (auth required)
        │     ├── admin-messages   GET/PATCH/DELETE (auth required)
        │     └── admin-posts      GET/POST/PUT/DELETE (auth required)
        └── Supabase DB  (PostgreSQL — free 500MB)
```

---

## Setup (3 steps, ~15 minutes)

---

### Step 1 — Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New Project** (free)
2. **SQL Editor** → paste and run `supabase/migrations/001_schema.sql`
3. **Create admin user:**
   - Go to **Authentication → Users → Add User**
   - Enter your email (e.g. `admin@volcanixinfotech.org`) and a strong password
   - Click **Create User**
4. Copy from **Project Settings → API**:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`
   - **service_role key** → needed for Edge Functions (keep secret)

---

### Step 2 — Deploy Edge Functions

Install Supabase CLI:
```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-ref
```

Deploy all functions:
```bash
cd supabase
supabase functions deploy contact
supabase functions deploy subscribe
supabase functions deploy posts
supabase functions deploy admin-stats
supabase functions deploy admin-messages
supabase functions deploy admin-posts
```

Set the service role secret (needed by functions internally — Supabase injects SUPABASE_URL and SUPABASE_ANON_KEY automatically, but service role must be set manually):
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> **Note:** `SUPABASE_URL` and `SUPABASE_ANON_KEY` are automatically available inside Edge Functions. Only `SUPABASE_SERVICE_ROLE_KEY` needs to be set manually.

---

### Step 3 — Deploy Frontend to Vercel

1. Push the `frontend/` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Set **Environment Variables** in Vercel project settings:
   ```
   VITE_SUPABASE_URL      = https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY = your_anon_public_key
   ```
4. Deploy — Vercel auto-detects Vite. Done.

---

## Local Development

```bash
cd frontend
npm install
cp .env.example .env      # Fill in your Supabase URL + anon key
npm run dev               # http://localhost:5173
```

To test Edge Functions locally:
```bash
supabase start            # Starts local Supabase
supabase functions serve  # Serves all functions locally
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/services` | Services — School Software, R&D, Digital Marketing |
| `/about` | About Us — Team, Mission, Vision |
| `/contact` | Contact form |
| `/blog` | Blog post listing |
| `/blog/:slug` | Single blog post |
| `/x-admin` | **Hidden** admin login (not linked publicly) |
| `/x-admin/dashboard` | Stats overview |
| `/x-admin/messages` | Contact form inbox |
| `/x-admin/posts` | Blog post manager |
| `/x-admin/posts/new` | Create post |
| `/x-admin/posts/:id/edit` | Edit post |

---

## Admin Login

- Go to `/x-admin`
- Email: whatever you created in Supabase Auth
- Password: whatever you set there
- Session managed by Supabase Auth (auto-refreshes, persists across tabs)

---

## Free Tier Summary

| Service | What's free |
|---------|-------------|
| **Supabase** | 500MB DB, 2 projects, 500K Edge Function calls/month, Supabase Auth |
| **Vercel** | Unlimited deploys, 100GB bandwidth/month |
| **Total cost** | **$0** |

---

## Project Structure

```
volcanix/
├── supabase/
│   ├── functions/
│   │   ├── _shared/helpers.ts       # CORS + response utils
│   │   ├── contact/index.ts
│   │   ├── subscribe/index.ts
│   │   ├── posts/index.ts
│   │   ├── admin-stats/index.ts
│   │   ├── admin-messages/index.ts
│   │   └── admin-posts/index.ts
│   ├── migrations/
│   │   └── 001_schema.sql
│   └── config.toml
│
└── frontend/
    ├── src/
    │   ├── lib/supabase.js      # Supabase client + all API calls
    │   ├── hooks/useAuth.jsx    # Auth context (Supabase Auth)
    │   ├── components/          # Navbar, Footer, ProtectedRoute
    │   └── pages/               # All public + admin pages
    ├── .env.example
    └── vercel.json
```
