import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import type { Request, Response } from "express";
import { db } from "./db.js";

const COOKIE = "bh_session";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days
const isProd = process.env.NODE_ENV === "production";

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) {
    if (isProd) throw new Error("AUTH_SECRET (32+ chars) is required in production");
    return new TextEncoder().encode("dev-only-secret-change-me-dev-only-secret");
  }
  return new TextEncoder().encode(s);
}

/** Call at startup so a misconfigured production server fails immediately, not on the first signup. */
export const assertConfigured = () => void secret();

export type SessionUser = { id: string; email: string; name: string; role: "user" | "admin" };

export const hashPassword = (pw: string) => bcrypt.hash(pw, 12);
export const checkPassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);

export async function startSession(res: Response, u: SessionUser) {
  const token = await new SignJWT({ email: u.email, name: u.name, role: u.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(u.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: MAX_AGE * 1000,
  });
}

export const endSession = (res: Response) => void res.clearCookie(COOKIE, { path: "/" });

/** The signed-in user, re-checked against the database so bans / deletions take effect immediately. */
export async function currentUser(req: Request): Promise<SessionUser | null> {
  const token = req.cookies?.[COOKIE] as string | undefined;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    const q = await db();
    const { rows } = await q("SELECT id, email, display_name, role, banned FROM users WHERE id = $1", [payload.sub]);
    const u = rows[0];
    if (!u || u.banned) return null;
    return { id: String(u.id), email: String(u.email), name: String(u.display_name), role: u.role as "user" | "admin" };
  } catch (e) {
    // an invalid/expired token is normal; anything else (e.g. database down) should be visible in logs
    if (!(e instanceof Error) || !/JWT|JWS|signature|expired/i.test(`${e.name} ${e.message}`)) {
      console.error("currentUser failed:", e);
    }
    return null;
  }
}

// ---- helpers shared by the routes ----
const hits = new Map<string, { n: number; reset: number }>();
/** true when the caller has exceeded `max` attempts in `windowMs`. */
export function tooMany(key: string, max = 8, windowMs = 10 * 60_000) {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k); // keep memory bounded
  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs });
    return false;
  }
  h.n += 1;
  return h.n > max;
}

export const allowedOrigins = () =>
  (process.env.FRONTEND_URL ?? "http://localhost:3000")
    .split(",")
    .map((s) => s.trim().replace(/\/$/, ""))
    .filter(Boolean);

/** CSRF defence: state-changing requests from a browser must come from our own website. */
export function sameOrigin(req: Request) {
  const origin = req.headers.origin;
  if (!origin) return true; // non-browser clients (curl) send no Origin
  return allowedOrigins().includes(origin.replace(/\/$/, ""));
}

export const validEmail = (e: string) => /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(e) && e.length <= 254;
