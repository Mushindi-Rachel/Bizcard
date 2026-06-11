-- Run this in your Neon SQL editor

CREATE TABLE IF NOT EXISTS business_cards (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL,              -- Clerk user ID
  full_name   TEXT NOT NULL,
  job_title   TEXT,
  company     TEXT,
  phone       TEXT,
  email       TEXT NOT NULL,
  website     TEXT,
  address     TEXT,
  logo_url    TEXT,
  template    TEXT NOT NULL DEFAULT 'classic',
  card_data   JSONB,                      -- full card JSON snapshot
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cards_user_id ON business_cards(user_id);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON business_cards
FOR EACH ROW EXECUTE FUNCTION update_updated_at();
