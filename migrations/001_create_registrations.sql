CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  registration_token TEXT UNIQUE,
  maimai_ign TEXT,
  player_name TEXT,
  gmail TEXT,
  discord_id TEXT,
  phone_number TEXT,
  maimai_rating INTEGER,
  real_name TEXT NOT NULL,
  player_handle TEXT NOT NULL,
  email TEXT NOT NULL,
  discord_handle TEXT NOT NULL,
  region TEXT,
  team_info TEXT,
  notes TEXT,
  payment_screenshot_data_url TEXT,
  payment_uploaded_at TIMESTAMPTZ,
  payment_status TEXT NOT NULL DEFAULT 'awaiting_payment_screenshot',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS registrations_registration_token_idx
  ON registrations (registration_token)
  WHERE registration_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS registrations_created_at_idx
  ON registrations (created_at DESC);

CREATE INDEX IF NOT EXISTS registrations_payment_status_idx
  ON registrations (payment_status);
