// Creates the PostgreSQL database named in DATABASE_URL (default name: hoc) if it is missing,
// then creates the tables. Safe to run many times.   Usage: npm run db:setup
import pg from "pg";
import { SCHEMA } from "../src/lib/db.js";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set in backend/.env");
  process.exit(1);
}

const target = new URL(url);
const name = decodeURIComponent(target.pathname.replace(/^\//, "")) || "hoc";
if (!/^[a-z_][a-z0-9_]*$/i.test(name)) {
  console.error(`Unsafe database name: ${name}`);
  process.exit(1);
}

// Connect to the always-present "postgres" database to create ours.
const admin = new URL(url);
admin.pathname = "/postgres";
const a = new pg.Client({ connectionString: admin.toString() });
await a.connect();
const exists = await a.query("SELECT 1 FROM pg_database WHERE datname = $1", [name]);
if (exists.rowCount) {
  console.log(`Database "${name}" already exists.`);
} else {
  await a.query(`CREATE DATABASE "${name}"`);
  console.log(`Created database "${name}".`);
}
await a.end();

const c = new pg.Client({ connectionString: url });
await c.connect();
await c.query(SCHEMA);
const t = await c.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY 1");
console.log("Tables:", t.rows.map((r) => r.table_name).join(", "));
await c.end();
