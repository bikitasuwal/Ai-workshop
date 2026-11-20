import { Router } from "express";
import { db } from "../lib/db.js";
import {
  checkPassword,
  currentUser,
  endSession,
  sameOrigin,
  startSession,
  tooMany,
} from "../lib/auth.js";
import { fail } from "../lib/http.js";

// There is no public sign-up: visitors share without an account. Only the admin signs in here.
const router = Router();

// Compared against when the email is unknown, so response time doesn't reveal which emails exist.
// (A real bcrypt hash of a throwaway string.)
const DUMMY_HASH = "$2b$12$KfPrHNUVzS2GVgthY6cDpO06LV2Mbv2W7ztsBMZl3T9KnjLCsSbrS";

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
  const ok = await checkPassword(password, u ? String(u.password_hash) : DUMMY_HASH);
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
