// PostgreSQL access. The database is named "hoc" and lives on your local PostgreSQL server.
// Connection string: DATABASE_URL in backend/.env, e.g. postgresql://postgres:PASSWORD@localhost:5432/hoc
import pg from "pg";

export type Row = Record<string, unknown>;
export type Query = (text: string, params?: unknown[]) => Promise<{ rows: Row[] }>;

export const SCHEMA = `
-- Admin accounts only. Visitors do not sign up.
CREATE TABLE IF NOT EXISTS users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text UNIQUE NOT NULL,
  display_name  text NOT NULL,
  password_hash text NOT NULL,
  role          text NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  banned        boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Visitor submissions (no account needed). Nothing is public until an admin sets status = 'approved'.
--   type 'story' -> shown on the Stories page;  type 'photo' -> shown in the Gallery album of its place.
CREATE TABLE IF NOT EXISTS submissions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type          text NOT NULL CHECK (type IN ('story','photo')),
  place         text NOT NULL CHECK (place IN ('22-dhara','pyatho-ajima','ward-16')),
  author_name   text NOT NULL,
  author_role   text,
  author_email  text,
  author_age    text,
  attribution   text NOT NULL DEFAULT 'real_name' CHECK (attribution IN ('real_name','anonymous','representative')),
  category      text,
  era           text,
  title         text,
  body          text NOT NULL DEFAULT '',
  status        text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reject_reason text,
  reviewed_by   uuid REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at   timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS submissions_status_idx ON submissions (status, created_at DESC);

CREATE TABLE IF NOT EXISTS submission_photos (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  file          text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS submission_photos_idx ON submission_photos (submission_id);
`;

let ready: Promise<Query> | null = null;

async function init(): Promise<Query> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Add it to backend/.env, e.g. DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/hoc  then run "npm run db:setup".',
    );
  }
  const pool = new pg.Pool({ connectionString: url, max: 5 });
  pool.on("error", (e) => console.error("Postgres idle client error:", e.message)); // don't crash if the server restarts
  const q: Query = (text, params) => pool.query(text, params as unknown[]) as unknown as Promise<{ rows: Row[] }>;
  try {
    await q(SCHEMA);
  } catch (e) {
    if ((e as { code?: string }).code === "3D000") {
      throw new Error('The database "hoc" does not exist yet. Run: npm run db:setup');
    }
    throw e;
  }
  console.log("Database: PostgreSQL (hoc)");
  return q;
}

/** Shared query function (connects and creates tables on first use). */
export function db(): Promise<Query> {
  return (ready ??= init());
}
