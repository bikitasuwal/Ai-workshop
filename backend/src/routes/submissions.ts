// Visitor submissions: full stories and photos.
//  - No account needed. Anyone can send one.
//  - Every submission starts as 'pending'. Nothing is public until an admin approves it.
//  - Approved stories appear on the Stories page; approved photos appear in the Gallery's "From visitors" album.
//  - Uploaded images are re-encoded (this validates they are real images and strips GPS/EXIF data).
//  - Spam protection without accounts: per-IP rate limit, a hidden honeypot field, and a cap on pending items.
import { Router, type Request, type Response, type NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { unlink, readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "../lib/db.js";
import { currentUser, sameOrigin, tooMany, validEmail, type SessionUser } from "../lib/auth.js";
import { fail, isUuid } from "../lib/http.js";

export const UPLOAD_DIR = path.resolve("uploads");
mkdirSync(UPLOAD_DIR, { recursive: true });

const TYPES = ["story", "photo"] as const;
const PLACES = ["22-dhara", "pyatho-ajima", "ward-16"] as const;
const ATTRIBUTIONS = ["real_name", "anonymous", "representative"] as const;
const MAX_PHOTOS = { story: 3, photo: 5 } as const;
const MAX_PENDING = 300; // total waiting for review; protects the queue and the uploads folder

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024, files: 5, fields: 20, fieldSize: 16 * 1024 },
});

type AuthedReq = Request & { user: SessionUser };
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

type Row = Record<string, unknown>;
const text = (v: unknown, max: number) => String(v ?? "").trim().replace(/[ \t]+/g, " ").slice(0, max);

/** What the public may see. Never includes the email address. */
const publicShape = (p: Row) => ({
  id: String(p.id),
  type: p.type,
  place: p.place,
  title: p.title ?? null,
  body: p.body,
  era: p.era ?? null,
  // "anonymous" hides the name completely
  authorName: p.attribution === "anonymous" ? null : p.author_name,
  authorRole: p.attribution === "anonymous" ? null : (p.author_role ?? null),
  authorAge: p.attribution === "anonymous" ? null : (p.author_age ?? null),
  attribution: p.attribution,
  createdAt: p.created_at,
  photos: (p.photos as string[] | null) ?? [],
});

/** What the admin sees: everything, including the real name and email. */
const adminShape = (p: Row) => ({
  ...publicShape(p),
  authorName: p.author_name,
  authorRole: p.author_role ?? null,
  authorAge: p.author_age ?? null,
  authorEmail: p.author_email ?? null,
  status: p.status,
  rejectReason: p.reject_reason ?? null,
});

const SELECT = `
  SELECT s.*,
         COALESCE((SELECT array_agg(ph.id::text ORDER BY ph.created_at) FROM submission_photos ph WHERE ph.submission_id = s.id), '{}') AS photos
  FROM submissions s`;

async function removeFiles(ids: string[]) {
  if (!ids.length) return;
  const q = await db();
  const { rows } = await q("SELECT file FROM submission_photos WHERE submission_id = ANY($1::uuid[])", [ids]);
  await Promise.all(rows.map((r) => unlink(path.join(UPLOAD_DIR, String(r.file))).catch(() => {})));
}

// ------------------------------------------------------------------ public routes
const router = Router();

/** Approved submissions only. Optional filters: ?type=story|photo  ?place=22-dhara|pyatho-ajima|ward-16 */
router.get("/", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const type = String(req.query.type ?? "");
  const place = String(req.query.place ?? "");
  const where = ["s.status = 'approved'"];
  const params: unknown[] = [];
  if ((TYPES as readonly string[]).includes(type)) where.push(`s.type = $${params.push(type)}`);
  if ((PLACES as readonly string[]).includes(place)) where.push(`s.place = $${params.push(place)}`);
  const q = await db();
  const { rows } = await q(`${SELECT} WHERE ${where.join(" AND ")} ORDER BY s.reviewed_at DESC NULLS LAST LIMIT 200`, params);
  res.json({ submissions: rows.map(publicShape) });
});

/** A photo is public once its submission is approved; before that only an admin can see it. */
router.get("/photos/:id", async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const q = await db();
  const { rows } = await q(
    "SELECT ph.file, s.status FROM submission_photos ph JOIN submissions s ON s.id = ph.submission_id WHERE ph.id = $1",
    [id],
  );
  const r = rows[0];
  if (!r) return fail(res, 404, "Not found");
  const approved = r.status === "approved";
  if (!approved) {
    const u = await currentUser(req);
    if (!u || u.role !== "admin") return fail(res, 404, "Not found");
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
  (req, res, next) => {
    // Rate limit before doing any upload work. 5 submissions per hour per IP.
    if (tooMany(`submit:${req.ip}`, 5, 60 * 60_000)) {
      return fail(res, 429, "You've sent a lot recently. Please try again in an hour.");
    }
    next();
  },
  (req, res, next) =>
    upload.array("photos", 5)(req, res, (err: unknown) => {
      if (!err) return next();
      const code = (err as { code?: string }).code;
      if (code === "LIMIT_FILE_SIZE") return fail(res, 400, "Each photo must be under 6 MB.");
      if (code === "LIMIT_FILE_COUNT" || code === "LIMIT_UNEXPECTED_FILE") return fail(res, 400, "Too many photos.");
      return fail(res, 400, "The upload could not be read.");
    }),
  async (req, res) => {
    // Honeypot: real visitors never see or fill this field, bots do. Pretend it worked.
    if (text(req.body?.website, 100)) return res.status(201).json({ ok: true, status: "pending" });

    const type = String(req.body?.type ?? "");
    const place = String(req.body?.place ?? "");
    const name = text(req.body?.name, 60);
    const role = text(req.body?.role, 100);
    const email = text(req.body?.email, 254).toLowerCase();
    const age = text(req.body?.age, 40);
    const attribution = String(req.body?.attribution ?? "real_name");
    const era = text(req.body?.era, 60);
    const title = text(req.body?.title, 120);
    const body = String(req.body?.body ?? "").trim().slice(0, 8000);
    const consent = String(req.body?.consent) === "true";
    const ownsPhotos = String(req.body?.ownsPhotos) === "true";
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];

    if (!(TYPES as readonly string[]).includes(type)) return fail(res, 400, "Choose what you are sharing.");
    const kind = type as (typeof TYPES)[number];
    if (!(PLACES as readonly string[]).includes(place)) return fail(res, 400, "Choose a place.");
    if (name.length < 2) return fail(res, 400, "Please enter your name.");
    if (!(ATTRIBUTIONS as readonly string[]).includes(attribution)) return fail(res, 400, "Choose how your name is shown.");
    if (email && !validEmail(email)) return fail(res, 400, "That email address doesn't look right.");
    if (!consent) return fail(res, 400, "Please agree to the archival consent.");
    if (files.length > MAX_PHOTOS[kind]) return fail(res, 400, `You can add up to ${MAX_PHOTOS[kind]} photos.`);

    if (kind === "story") {
      if (title.length < 5) return fail(res, 400, "The title must be at least 5 characters.");
      if (body.length < 50) return fail(res, 400, "The story must be at least 50 characters.");
    } else {
      if (!files.length) return fail(res, 400, "Add at least one photo.");
      if (body.length > 300) return fail(res, 400, "The caption can be up to 300 characters.");
    }
    if (files.length && !ownsPhotos) return fail(res, 400, "Please confirm you own the photos or have permission to share them.");

    const q = await db();
    const pending = await q("SELECT count(*)::int AS n FROM submissions WHERE status = 'pending'");
    if (Number(pending.rows[0].n) >= MAX_PENDING) {
      return fail(res, 503, "We have a lot waiting for review right now. Please try again in a few days.");
    }

    // Re-encode every image: proves it is a real image and drops location/camera metadata.
    const saved: string[] = [];
    try {
      for (const f of files) {
        const file = `${randomUUID()}.jpg`;
        await sharp(f.buffer, { limitInputPixels: 60_000_000 })
          .rotate()
          .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 82 })
          .toFile(path.join(UPLOAD_DIR, file));
        saved.push(file);
      }
    } catch {
      await Promise.all(saved.map((n) => unlink(path.join(UPLOAD_DIR, n)).catch(() => {})));
      return fail(res, 400, "One of the files is not a valid image. Please use JPG, PNG or WebP.");
    }

    try {
      const ins = await q(
        `INSERT INTO submissions (type, place, author_name, author_role, author_email, author_age, attribution, category, era, title, body)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
        [
          kind, place, name, role || null, email || null, age || null, attribution,
          null, era || null, kind === "story" ? title : null, body,
        ],
      );
      const id = String(ins.rows[0].id);
      for (const file of saved) await q("INSERT INTO submission_photos (submission_id, file) VALUES ($1,$2)", [id, file]);
      res.status(201).json({ ok: true, id, status: "pending" });
    } catch (e) {
      await Promise.all(saved.map((n) => unlink(path.join(UPLOAD_DIR, n)).catch(() => {})));
      throw e;
    }
  },
);

// ------------------------------------------------------------------ admin moderation
export const adminRouter = Router();
adminRouter.use(requireAdmin);

adminRouter.get("/submissions", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const status = ["pending", "approved", "rejected"].includes(String(req.query.status)) ? String(req.query.status) : "pending";
  const q = await db();
  const { rows } = await q(`${SELECT} WHERE s.status = $1 ORDER BY s.created_at ASC LIMIT 100`, [status]);
  const counts = await q("SELECT status, count(*)::int AS n FROM submissions GROUP BY status");
  res.json({
    submissions: rows.map(adminShape),
    counts: Object.fromEntries(counts.rows.map((c) => [String(c.status), Number(c.n)])),
  });
});

adminRouter.post("/submissions/:id/approve", blockForeignOrigin, async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const q = await db();
  const r = await q(
    "UPDATE submissions SET status='approved', reject_reason=NULL, reviewed_by=$2, reviewed_at=now() WHERE id=$1 RETURNING id",
    [id, (req as AuthedReq).user.id],
  );
  if (!r.rows.length) return fail(res, 404, "Not found");
  res.json({ ok: true });
});

adminRouter.post("/submissions/:id/reject", blockForeignOrigin, async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const reason = text(req.body?.reason, 300);
  const q = await db();
  const r = await q(
    "UPDATE submissions SET status='rejected', reject_reason=$3, reviewed_by=$2, reviewed_at=now() WHERE id=$1 RETURNING id",
    [id, (req as AuthedReq).user.id, reason || null],
  );
  if (!r.rows.length) return fail(res, 404, "Not found");
  res.json({ ok: true });
});

/** Numbers for the dashboard. */
adminRouter.get("/stats", async (_req, res) => {
  res.set("Cache-Control", "no-store");
  const q = await db();
  const rows = await q("SELECT status, type, count(*)::int AS n FROM submissions GROUP BY status, type");
  const out = {
    submissions: { pending: 0, approved: 0, rejected: 0 },
    pendingByType: { story: 0, photo: 0 },
  };
  for (const r of rows.rows) {
    const n = Number(r.n);
    out.submissions[String(r.status) as "pending" | "approved" | "rejected"] += n;
    if (r.status === "pending") out.pendingByType[String(r.type) as "story" | "photo"] += n;
  }
  res.json(out);
});

adminRouter.delete("/submissions/:id", blockForeignOrigin, async (req, res) => {
  const id = String(req.params.id);
  if (!isUuid(id)) return fail(res, 404, "Not found");
  const q = await db();
  await removeFiles([id]);
  await q("DELETE FROM submissions WHERE id = $1", [id]);
  res.json({ ok: true });
});

export default router;
