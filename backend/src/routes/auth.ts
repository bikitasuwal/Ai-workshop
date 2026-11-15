import { Router } from "express";
import { db } from "../lib/db.js";
import {
  checkPassword,
  currentUser,
  endSession,
  hashPassword,
  sameOrigin,
  startSession,
  tooMany,
  validEmail,
} from "../lib/auth.js";
import { fail } from "../lib/http.js";

const router = Router();

// Compared against when the email is unknown, so response time doesn't reveal which emails exist.
let dummy: Promise<string> | null = null;
const dummyHash = () => (dummy ??= hashPassword("not-a-real-password"));

router.post("/signup", async (req, res) => {
  if (!sameOrigin(req)) return fail(res, 403, "Request blocked.");
  if (tooMany(`signup:${req.ip}`, 5)) return fail(res, 429, "Too many attempts. Please try again in a few minutes.");

  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const name = String(req.body?.name ?? "").trim().replace(/\s+/g, " ");
  const password = String(req.body?.password ?? "");

  if (!validEmail(email)) return fail(res, 400, "Please enter a valid email address.");
  if (name.length < 2 || name.length > 40) return fail(res, 400, "Display name must be 2–40 characters.");
  if (password.length < 8) return fail(res, 400, "Password must be at least 8 characters.");
  if (Buffer.byteLength(password) > 72) return fail(res, 400, "Password is too long (max 72 bytes).");

  const q = await db();
  const exists = await q("SELECT 1 FROM users WHERE email = $1", [email]);
  if (exists.rows.length) return fail(res, 409, "An account with this email already exists. Try signing in.");

  // The very first account matching ADMIN_EMAIL becomes the admin (only while no admin exists).
  let role: "user" | "admin" = "user";
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (adminEmail && adminEmail === email) {
    const admins = await q("SELECT 1 FROM users WHERE role = 'admin' LIMIT 1");
    if (!admins.rows.length) role = "admin";
  }

  const hash = await hashPassword(password);
  const { rows } = await q(
    "INSERT INTO users (email, display_name, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id",
    [email, name, hash, role],
  );
  await startSession(res, { id: String(rows[0].id), email, name, role });
  res.status(201).json({ user: { name, email, role } });
});

router.post("/login", async (req, res) => {
  if (!sameOrigin(req)) return fail(res, 403, "Request blocked.");
  if (tooMany(`login:${req.ip}`, 10)) return fail(res, 429, "Too many attempts. Please try again in a few minutes.");

  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");
  if (!email || !password) return fail(res, 400, "Enter your email and password.");

  const q = await db();
  const { rows } = await q(
    "SELECT id, email, display_name, password_hash, role, banned FROM users WHERE email = $1",
    [email],
  );
  const u = rows[0];
  const ok = await checkPassword(password, u ? String(u.password_hash) : await dummyHash());
  if (!u || !ok) return fail(res, 401, "Incorrect email or password.");
  if (u.banned) return fail(res, 403, "This account has been suspended.");

  const user = { id: String(u.id), email: String(u.email), name: String(u.display_name), role: u.role as "user" | "admin" };
  await startSession(res, user);
  res.json({ user: { name: user.name, email: user.email, role: user.role } });
});

router.post("/logout", (req, res) => {
  if (!sameOrigin(req)) return fail(res, 403, "Request blocked.");
  endSession(res);
  res.json({ ok: true });
});

router.get("/me", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const u = await currentUser(req);
  res.json({ user: u ? { name: u.name, email: u.email, role: u.role } : null });
});

export default router;
