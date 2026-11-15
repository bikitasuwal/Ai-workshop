// Makes an existing account the admin.   Usage: npm run make-admin -- someone@example.com
// (Create the account first on the website, then run this.)
import pg from "pg";

const email = (process.argv[2] ?? "").trim().toLowerCase();
if (!email || !process.env.DATABASE_URL) {
  console.error("Usage: npm run make-admin -- someone@example.com   (DATABASE_URL must be set in backend/.env)");
  process.exit(1);
}
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
const r = await c.query("UPDATE users SET role = 'admin' WHERE email = $1 RETURNING email", [email]);
console.log(r.rowCount ? `${email} is now an admin.` : `No account found for ${email}. Sign up on the website first.`);
await c.end();
process.exit(r.rowCount ? 0 : 1);
