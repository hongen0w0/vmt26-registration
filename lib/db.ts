import { sql } from "@vercel/postgres";

export type PaymentStatus =
  | "awaiting_payment_screenshot"
  | "payment_uploaded"
  | "pending_manual_payment"
  | "payment_confirmed"
  | "needs_follow_up";

export type Registration = {
  id: number;
  registration_token: string | null;
  maimai_ign: string | null;
  player_name: string | null;
  gmail: string | null;
  discord_id: string | null;
  phone_number: string | null;
  maimai_rating: number | null;
  payment_screenshot_data_url: string | null;
  payment_uploaded_at: Date | null;
  real_name: string;
  player_handle: string;
  email: string;
  discord_handle: string;
  region: string;
  team_info: string | null;
  notes: string | null;
  payment_status: PaymentStatus;
  created_at: Date;
};

const paymentStatuses: PaymentStatus[] = [
  "awaiting_payment_screenshot",
  "payment_uploaded",
  "pending_manual_payment",
  "payment_confirmed",
  "needs_follow_up"
];

export function isPaymentStatus(value: string): value is PaymentStatus {
  return paymentStatuses.includes(value as PaymentStatus);
}

export async function ensureRegistrationsTable() {
  await sql`
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
    )
  `;

  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS registration_token TEXT`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS maimai_ign TEXT`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS player_name TEXT`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS gmail TEXT`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS discord_id TEXT`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS phone_number TEXT`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS maimai_rating INTEGER`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_screenshot_data_url TEXT`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_uploaded_at TIMESTAMPTZ`;
  await sql`ALTER TABLE registrations ALTER COLUMN region DROP NOT NULL`;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS registrations_registration_token_idx
      ON registrations (registration_token)
      WHERE registration_token IS NOT NULL
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS registrations_created_at_idx
      ON registrations (created_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS registrations_payment_status_idx
      ON registrations (payment_status)
  `;
}

export async function createRegistration(input: {
  registrationToken: string;
  maimaiIgn: string;
  playerName: string;
  gmail: string;
  discordId: string;
  phoneNumber: string;
  maimaiRating: number;
}) {
  await ensureRegistrationsTable();

  await sql`
    INSERT INTO registrations (
      registration_token,
      maimai_ign,
      player_name,
      gmail,
      discord_id,
      phone_number,
      maimai_rating,
      real_name,
      player_handle,
      email,
      discord_handle,
      payment_status
    ) VALUES (
      ${input.registrationToken},
      ${input.maimaiIgn},
      ${input.playerName},
      ${input.gmail},
      ${input.discordId},
      ${input.phoneNumber},
      ${input.maimaiRating},
      ${input.playerName},
      ${input.maimaiIgn},
      ${input.gmail},
      ${input.discordId},
      'awaiting_payment_screenshot'
    )
  `;

  return input.registrationToken;
}

export async function getRegistrationByToken(registrationToken: string) {
  await ensureRegistrationsTable();

  const result = await sql<Registration>`
    SELECT *
    FROM registrations
    WHERE registration_token = ${registrationToken}
    LIMIT 1
  `;

  return result.rows[0] ?? null;
}

export async function savePaymentScreenshot(input: {
  registrationToken: string;
  dataUrl: string;
}) {
  await ensureRegistrationsTable();

  await sql`
    UPDATE registrations
    SET
      payment_screenshot_data_url = ${input.dataUrl},
      payment_uploaded_at = NOW(),
      payment_status = 'payment_uploaded'
    WHERE registration_token = ${input.registrationToken}
  `;
}

export async function getRegistrations(search = "") {
  await ensureRegistrationsTable();

  const normalizedSearch = `%${search.trim().toLowerCase()}%`;

  if (search.trim()) {
    const result = await sql<Registration>`
      SELECT *
      FROM registrations
      WHERE
        LOWER(real_name) LIKE ${normalizedSearch}
        OR LOWER(player_handle) LIKE ${normalizedSearch}
        OR LOWER(email) LIKE ${normalizedSearch}
        OR LOWER(discord_handle) LIKE ${normalizedSearch}
        OR LOWER(COALESCE(maimai_ign, '')) LIKE ${normalizedSearch}
        OR LOWER(COALESCE(player_name, '')) LIKE ${normalizedSearch}
        OR LOWER(COALESCE(gmail, '')) LIKE ${normalizedSearch}
        OR LOWER(COALESCE(discord_id, '')) LIKE ${normalizedSearch}
        OR LOWER(COALESCE(phone_number, '')) LIKE ${normalizedSearch}
        OR LOWER(region) LIKE ${normalizedSearch}
      ORDER BY created_at DESC
    `;

    return result.rows;
  }

  const result = await sql<Registration>`
    SELECT *
    FROM registrations
    ORDER BY created_at DESC
  `;

  return result.rows;
}

export async function updateRegistrationPaymentStatus(
  id: number,
  paymentStatus: PaymentStatus
) {
  await ensureRegistrationsTable();

  await sql`
    UPDATE registrations
    SET payment_status = ${paymentStatus}
    WHERE id = ${id}
  `;
}
