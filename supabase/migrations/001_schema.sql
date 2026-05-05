-- ============================================================
-- Volcanix Infotech — Supabase Schema
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGSERIAL PRIMARY KEY,
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  subject     VARCHAR(255) NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS posts (
  id           BIGSERIAL PRIMARY KEY,
  title        VARCHAR(500) NOT NULL,
  slug         VARCHAR(500) UNIQUE NOT NULL,
  excerpt      TEXT DEFAULT '',
  content      TEXT NOT NULL,
  cover_image  VARCHAR(1000) DEFAULT '',
  status       VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id         BIGSERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on posts
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Row Level Security ──────────────────────────────────────

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts             ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers       ENABLE ROW LEVEL SECURITY;

-- Public: read published posts only
CREATE POLICY "public_read_posts" ON posts
  FOR SELECT USING (status = 'published');

-- Public: insert contact messages
CREATE POLICY "public_insert_messages" ON contact_messages
  FOR INSERT WITH CHECK (TRUE);

-- Public: insert subscribers
CREATE POLICY "public_insert_subscribers" ON subscribers
  FOR INSERT WITH CHECK (TRUE);

-- Service role (Edge Functions) bypasses RLS automatically.
-- No extra policies needed for server-side access.

-- ── Indexes ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_posts_status     ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_slug       ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_messages_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read    ON contact_messages(is_read);
