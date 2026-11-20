// Reviews, photos and complaints.
//  - Only signed-in users can post.
//  - Every post starts as 'pending'. Nothing is public until an admin approves it.
//  - Uploaded images are re-encoded (this validates they are real images and strips GPS/EXIF data).
import { Router, type Request, type Response, type NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { unlink, readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "../lib/db.js";
import { currentUser, sameOrigin, tooMany, type SessionUser } from "../lib/auth.js";
import { fail, isUuid } from "../lib/http.js";

export const UPLOAD_DIR = path.resolve("uploads");
mkdirSync(UPLOAD_DIR, { recursive: true });

const KINDS = ["review", "photo", "complaint"] as const;
const PLACES = ["dhara", "ajima", "general"] as const;
const MAX_PHOTOS = 3;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024, files: MAX_PHOTOS, fields: 8, fieldSize: 8 * 1024 },
});


type AuthedReq = Request & { user: SessionUser };
async function requireUser(req: Request, res: Response, next: NextFunction) {
  const u = await currentUser(req);
  if (!u) return fail(res, 401, "Please sign in first.");
  (req as AuthedReq).user = u;
  next();
}
async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const u = await currentUser(req);
  if (!u) return fail(res, 401, "Please sign in first.");
  if (u.role !== "admin") return fail(res, 403, "Admins only.");
  (req as AuthedReq).user = u;
  next();
}
function blockForeignOrigin(req: Request, res: Response, next: NextFunction) {
  if (!sameOrigin(req)) return fail(res, 403, "Request blocked.");
  next();
}

type PostRow = Record<string, unknown>;
const shape = (p: PostRow, withAuthorEmail = false) => ({
  id: String(p.id),
  kind: p.kind,
  place: p.place,
  rating: p.rating ?? null,
  title: p.title ?? null,
  body: p.body,
  status: p.status,
  rejectReason: p.reject_reason ?? null,
  author: p.author,
  ...(withAuthorEmail ? { authorEmail: p.author_email } : {}),
  createdAt: p.created_at,
  photos: (p.photos as string[] | null) ?? [],
});

const SELECT = `
  SELECT p.*, u.display_name AS author, u.email AS author_email,
         COALESCE((SELECT array_agg(ph.id::text ORDER BY ph.created_at) FROM post_photos ph WHERE ph.post_id = p.id), '{}') AS photos
  FROM posts p JOIN users u ON u.id = p.user_id`;

async function removeFiles(postIds: string[]) {
  if (!postIds.length) return;
  const q = await db();
  const { rows } = await q("SELECT file FROM post_photos WHERE post_id = ANY($1::uuid[])", [postIds]);
  await Promise.all(rows.map((r) => unlink(path.join(UPLOAD_DIR, String(r.file))).catch(() => {})));
}

// ------------------------------------------------------------------ public + member routes
const router = Router();

/** Approved posts only. */
router.get("/", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const kind = String(req.query.kind ?? "");
  const place = String(req.query.place ?? "");
  const where = ["p.status = 'approved'"];
  const params: unknown[] = [];
  if ((KINDS as readonly string[]).includes(kind)) where.push(`p.kind = $${params.push(kind)}`);
  if ((PLACES as readonly string[]).includes(place)) where.push(`p.place = $${params.push(place)}`);
  const q = await db();
  const { rows } = await q(`${SELECT} WHERE ${where.join(" AND ")} ORDER BY p.reviewed_at DESC NULLS LAST LIMIT 60`, params);
  res.json({ posts: rows.map((r) => shape(r)) });
});

/** The signed-in user's own posts, including pending and rejected ones. */
router.get("/mine", requireUser, async (req, res) => {
  res.set("Cache-Control", "no-store");
  const q = await db();
  const { rows } = await q(`${SELECT} WHERE p.user_id = $1 ORDER BY p.created_at DESC LIMIT 100`, [(req as AuthedReq).user.id]);
  res.json({ posts: rows.map((r) => shape(r)) });
});

/** A photo is visible if its post is approved, or to its owner and to admins. */
router.get("/photos/:id", async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const q = await db();
  const { rows } = await q(
    "SELECT ph.file, p.status, p.user_id FROM post_photos ph JOIN posts p ON p.id = ph.post_id WHERE ph.id = $1",
    [id],
  );
  const r = rows[0];
  if (!r) return fail(res, 404, "Not found");
  const approved = r.status === "approved";
  if (!approved) {
    const u = await currentUser(req);
    if (!u || (u.role !== "admin" && u.id !== String(r.user_id))) return fail(res, 404, "Not found");
  }
  try {
    const data = await readFile(path.join(UPLOAD_DIR, String(r.file)));
    res.set({
      "Content-Type": "image/jpeg",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": approved ? "public, max-age=86400" : "private, no-store",
    });
    res.send(data);
  } catch {
    fail(res, 404, "Not found");
  }
});

router.post(
  "/",
  blockForeignOrigin,
  requireUser,
  (req, res, next) =>
    upload.array("photos", MAX_PHOTOS)(req, res, (err: unknown) => {
      if (!err) return next();
      const code = (err as { code?: string }).code;
      if (code === "LIMIT_FILE_SIZE") return fail(res, 400, "Each photo must be under 6 MB.");
      if (code === "LIMIT_FILE_COUNT" || code === "LIMIT_UNEXPECTED_FILE") return fail(res, 400, `You can add up to ${MAX_PHOTOS} photos.`);
      return fail(res, 400, "The upload could not be read.");
    }),
  async (req, res) => {
    const user = (req as AuthedReq).user;
    if (user.role === "admin") return fail(res, 403, "Admins review posts but cannot post. Use a visitor account to share.");
    if (tooMany(`post:${user.id}`, 6, 60 * 60_000)) return fail(res, 429, "You've posted a lot recently. Please try again in an hour.");

    const kind = String(req.body?.kind ?? "");
    const place = String(req.body?.place ?? "");
    const title = String(req.body?.title ?? "").trim().replace(/\s+/g, " ").slice(0, 80);
    const body = String(req.body?.body ?? "").trim();
    const ratingRaw = Number(req.body?.rating);
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];

    if (!(KINDS as readonly string[]).includes(kind)) return fail(res, 400, "Choose what you want to share.");
    if (!(PLACES as readonly string[]).includes(place)) return fail(res, 400, "Choose a place.");
    if (body.length < 10 || body.length > 1500) return fail(res, 400, "Please write between 10 and 1500 characters.");
    if (kind === "photo" && !files.length) return fail(res, 400, "Add at least one photo.");
    const rating = kind === "review" && Number.isInteger(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 5 ? ratingRaw : null;

    const q = await db();
    const pending = await q("SELECT count(*)::int AS n FROM posts WHERE user_id = $1 AND status = 'pending'", [user.id]);
    if (Number(pending.rows[0].n) >= 10) return fail(res, 429, "You have 10 posts waiting for review. Please wait for an admin to check them.");

    // Re-encode every image: proves it is a real image and drops location/camera metadata.
    const saved: string[] = [];
    try {
      for (const f of files) {
        const name = `${randomUUID()}.jpg`;
        await sharp(f.buffer, { limitInputPixels: 60_000_000 })
          .rotate()
          .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 82 })
          .toFile(path.join(UPLOAD_DIR, name));
        saved.push(name);
      }
    } catch {
      await Promise.all(saved.map((n) => unlink(path.join(UPLOAD_DIR, n)).catch(() => {})));
      return fail(res, 400, "One of the files is not a valid image. Please use JPG, PNG or WebP.");
    }

    try {
      const ins = await q(
        "INSERT INTO posts (user_id, kind, place, rating, title, body) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id",
        [user.id, kind, place, rating, title || null, body],
      );
      const postId = String(ins.rows[0].id);
      for (const n of saved) await q("INSERT INTO post_photos (post_id, file) VALUES ($1,$2)", [postId, n]);
      res.status(201).json({ ok: true, id: postId, status: "pending" });
    } catch (e) {
      await Promise.all(saved.map((n) => unlink(path.join(UPLOAD_DIR, n)).catch(() => {})));
      throw e;
    }
  },
);

/** Owners can withdraw their own post at any time. */
router.delete("/:id", blockForeignOrigin, requireUser, async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const q = await db();
  const found = await q("SELECT id FROM posts WHERE id = $1 AND user_id = $2", [id, (req as AuthedReq).user.id]);
  if (!found.rows.length) return fail(res, 404, "Not found");
  await removeFiles([id]);
  await q("DELETE FROM posts WHERE id = $1", [id]);
  res.json({ ok: true });
});

// ------------------------------------------------------------------ admin moderation
export const adminRouter = Router();
adminRouter.use(requireAdmin);

adminRouter.get("/posts", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const status = ["pending", "approved", "rejected"].includes(String(req.query.status)) ? String(req.query.status) : "pending";
  const q = await db();
  const { rows } = await q(`${SELECT} WHERE p.status = $1 ORDER BY p.created_at ASC LIMIT 100`, [status]);
  const counts = await q("SELECT status, count(*)::int AS n FROM posts GROUP BY status");
  res.json({
    posts: rows.map((r) => shape(r, true)),
    counts: Object.fromEntries(counts.rows.map((c) => [String(c.status), Number(c.n)])),
  });
});

adminRouter.post("/posts/:id/approve", blockForeignOrigin, async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const q = await db();
  const r = await q(
    "UPDATE posts SET status='approved', reject_reason=NULL, reviewed_by=$2, reviewed_at=now() WHERE id=$1 RETURNING id",
    [id, (req as AuthedReq).user.id],
  );
  if (!r.rows.length) return fail(res, 404, "Not found");
  res.json({ ok: true });
});

adminRouter.post("/posts/:id/reject", blockForeignOrigin, async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const reason = String(req.body?.reason ?? "").trim().slice(0, 300);
  const q = await db();
  const r = await q(
    "UPDATE posts SET status='rejected', reject_reason=$3, reviewed_by=$2, reviewed_at=now() WHERE id=$1 RETURNING id",
    [id, (req as AuthedReq).user.id, reason || null],
  );
  if (!r.rows.length) return fail(res, 404, "Not found");
  res.json({ ok: true });
});

/** Numbers for the dashboard. */
adminRouter.get("/stats", async (_req, res) => {
  res.set("Cache-Control", "no-store");
  const q = await db();
  const posts = await q("SELECT status, count(*)::int AS n FROM posts GROUP BY status");
  const users = await q(
    "SELECT count(*) FILTER (WHERE role = 'user')::int AS members, count(*) FILTER (WHERE banned)::int AS suspended FROM users",
  );
  const by = Object.fromEntries(posts.rows.map((r) => [String(r.status), Number(r.n)]));
  res.json({
    posts: { pending: by.pending ?? 0, approved: by.approved ?? 0, rejected: by.rejected ?? 0 },
    users: { members: Number(users.rows[0].members), suspended: Number(users.rows[0].suspended) },
  });
});

adminRouter.get("/users", async (_req, res) => {
  res.set("Cache-Control", "no-store");
  const q = await db();
  const { rows } = await q(
    "SELECT u.id, u.email, u.display_name, u.role, u.banned, u.created_at, (SELECT count(*)::int FROM posts p WHERE p.user_id = u.id) AS posts FROM users u ORDER BY u.created_at DESC LIMIT 200",
  );
  res.json({
    users: rows.map((u) => ({
      id: String(u.id),
      email: u.email,
      name: u.display_name,
      role: u.role,
      banned: u.banned,
      posts: Number(u.posts),
      createdAt: u.created_at,
    })),
  });
});

/** Suspend / restore a member. Admins cannot be suspended. A suspended member is signed out on their next request. */
adminRouter.post("/users/:id/ban", blockForeignOrigin, async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const banned = req.body?.banned === true;
  const q = await db();
  const r = await q("UPDATE users SET banned = $2 WHERE id = $1 AND role = 'user' RETURNING id", [id, banned]);
  if (!r.rows.length) return fail(res, 404, "Member not found (admins cannot be suspended).");
  res.json({ ok: true });
});

adminRouter.delete("/posts/:id", blockForeignOrigin, async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const q = await db();
  await removeFiles([id]);
  await q("DELETE FROM posts WHERE id = $1", [id]);
  res.json({ ok: true });
});

export default router;
