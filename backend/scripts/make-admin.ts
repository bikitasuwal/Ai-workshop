// Creates (or updates) the admin account. Visitors never sign up; only the admin has an account.
//   Usage: npm run make-admin -- you@example.com "a strong password" ["Display name"]
import pg from "pg";
import bcrypt from "bcryptjs";
import { SCHEMA } from "../src/lib/db.js";

const email = (process.argv[2] ?? "").trim().toLowerCase();
const password = process.argv[3] ?? "";
const name = (process.argv[4] ?? "Admin").trim() || "Admin";
if (!email || !process.env.DATABASE_URL || password.length < 8) {
  console.error('Usage: npm run make-admin -- you@example.com "a password of 8+ characters" ["Display name"]');
  console.error("(DATABASE_URL must be set in backend/.env)");
  process.exit(1);
}
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
await c.query(SCHEMA);
const hash = await bcrypt.hash(password, 12);
await c.query(
  `INSERT INTO users (email, display_name, password_hash, role) VALUES ($1,$2,$3,'admin')
   ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'admin', banned = false`,
  [email, name, hash],
);
console.log(`${email} is now an admin. Sign in at /login.`);
await c.end();
