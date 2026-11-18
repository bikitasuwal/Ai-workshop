"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/useUser";
import { kindLabel, placeLabel, shrinkImage, type Kind, type PlaceKey, type Post } from "@/lib/posts";
import PostCard from "./PostCard";
import { Notice } from "./ui";
import { chip, field } from "@/lib/styles";
import { useLanguage } from "@/i18n/LanguageContext";

const MAX_PHOTOS = 3;

const statusStyle = {
  pending: "bg-marigold/25 text-wood",
  approved: "bg-teal/15 text-teal-deep",
  rejected: "bg-vermilion/15 text-brick-deep",
} as const;
const statusFallback = {
  pending: "Waiting for admin",
  approved: "Published",
  rejected: "Not published",
} as const;

function Composer({ onPosted }: { onPosted: () => void }) {
  const { t, isNepali } = useLanguage();
  const [kind, setKind] = useState<Kind>("review");
  const [place, setPlace] = useState<PlaceKey>("dhara");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), [files]);

  async function addFiles(list: FileList | null) {
    if (!list) return;
    const picked = Array.from(list).slice(0, MAX_PHOTOS - files.length);
    const shrunk = await Promise.all(picked.map((f) => shrinkImage(f)));
    setFiles((cur) => [...cur, ...shrunk.map((file) => ({ file, url: URL.createObjectURL(file) }))].slice(0, MAX_PHOTOS));
    if (fileInput.current) fileInput.current.value = "";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (body.trim().length < 10) return setError(t("components.voices.errTooShort", "Please write at least 10 characters."));
    if (kind === "photo" && !files.length) return setError(t("components.voices.errNoPhoto", "Add at least one photo."));
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("kind", kind);
      fd.set("place", place);
      fd.set("title", title);
      fd.set("body", body);
      if (kind === "review" && rating) fd.set("rating", String(rating));
      files.forEach((f) => fd.append("photos", f.file));
      const res = await fetch("/api/posts", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data.error ?? t("components.voices.errSend", "Could not send. Please try again."));
      setDone(true);
      setTitle("");
      setBody("");
      setRating(0);
      setFiles([]);
      onPosted();
    } catch {
      setError(t("components.voices.errNet", "No connection. Please try again."));
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-teal p-6 text-center text-cream" role="status">
        <p className="font-display text-2xl">{t("components.voices.thanks", "Thank you! धन्यवाद")}</p>
        <p className="mt-1 text-cream/90">{t("components.voices.thanksBody")}</p>
        <button onClick={() => setDone(false)} className="mt-4 min-h-[48px] rounded-full bg-marigold px-6 font-semibold text-wood active:scale-95">
          {t("components.voices.shareAnother", "Share another")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="wood-frame space-y-5 rounded-3xl bg-paper p-5">
      <fieldset>
        <legend className="mb-2 font-semibold text-brick">{t("components.voices.legend", "What would you like to share?")}</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(kindLabel) as Kind[]).map((k) => (
            <button
              type="button"
              key={k}
              onClick={() => setKind(k)}
              aria-pressed={kind === k}
              className={chip(kind === k)}
            >
              {isNepali ? (
                <>
                  {kindLabel[k].ne} <span className="font-deva text-xs opacity-80">{kindLabel[k].en}</span>
                </>
              ) : (
                <>
                  {kindLabel[k].en} <span className="font-deva text-xs opacity-80">{kindLabel[k].ne}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block font-semibold text-brick">{t("components.voices.aboutPlace", "About which place?")}</span>
        <select value={place} onChange={(e) => setPlace(e.target.value as PlaceKey)} className={field}>
          {(Object.keys(placeLabel) as PlaceKey[]).map((p) => (
            <option key={p} value={p}>
              {t(`postCopy.place.${p}`, placeLabel[p])}
            </option>
          ))}
        </select>
      </label>

      {kind === "review" && (
        <div>
          <span className="mb-1 block font-semibold text-brick">{t("components.voices.ratingLabel", "Your rating (optional)")}</span>
          <div className="flex gap-1" role="radiogroup" aria-label={t("components.voices.ratingAria", "Rating")}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                role="radio"
                aria-checked={rating === n}
                aria-label={t(n > 1 ? "components.voices.starMany" : "components.voices.starOne", n > 1 ? "{n} stars" : "{n} star").replace(
                  "{n}",
                  String(n),
                )}
                onClick={() => setRating(rating === n ? 0 : n)}
                className={`h-12 w-12 text-3xl transition active:scale-90 ${n <= rating ? "text-marigold" : "text-wood/25"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      )}

      <label className="block">
        <span className="mb-2 block font-semibold text-brick">{t("components.voices.titleLabel", "Title (optional)")}</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} className={field} />
      </label>

      <label className="block">
        <span className="mb-2 block font-semibold text-brick">
          {kind === "complaint"
            ? t("components.voices.bodyComplaint", "What needs care?")
            : kind === "photo"
              ? t("components.voices.bodyPhoto", "About this photo")
              : t("components.voices.bodyReview", "Your experience")}
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          maxLength={1500}
          placeholder={
            kind === "complaint"
              ? t("components.voices.phComplaint", "e.g. litter near the spouts, damage, access problems…")
              : t("components.voices.phOther", "Tell us in your own words…")
          }
          className={field}
        />
        <span className="mt-1 block text-right text-xs text-wood/55">{body.length}/1500</span>
      </label>

      <div>
        <span className="mb-2 block font-semibold text-brick">
          {t("components.voices.photosLabel", "Photos")}{" "}
          {kind === "photo" ? "" : t("components.voices.photosOptional", "(optional)")}{" "}
          {t("components.voices.photosUpTo", "· up to {n}").replace("{n}", String(MAX_PHOTOS))}
        </span>
        <div className="flex flex-wrap gap-3">
          {files.map((f, i) => (
            <div key={f.url} className="relative h-24 w-24 overflow-hidden rounded-xl border-2 border-marigold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.url} alt={t("components.voices.selectedPhoto", "Selected photo")} className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label={t("components.voices.removePhoto", "Remove photo")}
                onClick={() => setFiles(files.filter((_, j) => j !== i))}
                className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-bl-xl bg-brick-deep text-cream"
              >
                ✕
              </button>
            </div>
          ))}
          {files.length < MAX_PHOTOS && (
            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-brick/50 text-center text-xs font-semibold text-brick active:scale-95">
              <span className="text-2xl leading-none">＋</span>
              {t("components.voices.addPhoto", "Add photo")}
              <input ref={fileInput} type="file" accept="image/*" multiple onChange={(e) => addFiles(e.target.files)} className="sr-only" />
            </label>
          )}
        </div>
        <p className="mt-2 text-xs text-wood/65">{t("components.voices.photoNote")}</p>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-vermilion/10 px-4 py-3 text-sm font-semibold text-brick-deep">
          {error}
        </p>
      )}

      <button
        disabled={busy}
        className="min-h-[56px] w-full rounded-full bg-brick text-lg font-semibold text-cream transition active:scale-[0.98] disabled:opacity-60"
      >
        {busy ? t("components.voices.sending", "Sending…") : t("components.voices.sendForReview", "Send for review")}
      </button>
      <p className="text-center text-xs text-wood/65">{t("components.voices.modNote")}</p>
    </form>
  );
}

function Mine({ posts, onChanged }: { posts: Post[]; onChanged: () => void }) {
  const { t } = useLanguage();
  async function withdraw(id: string) {
    if (!confirm(t("components.voices.confirmDelete", "Delete this post?"))) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    onChanged();
  }
  if (!posts.length) return null;
  return (
    <div className="mt-10">
      <h2 className="font-display text-xl text-brick">{t("components.voices.yourPosts", "Your posts")}</h2>
      <div className="mt-3 space-y-4">
        {posts.map((p) => (
          <PostCard key={p.id} post={p}>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[p.status]}`}>
                {t(`components.voices.status.${p.status}`, statusFallback[p.status])}
              </span>
              <button onClick={() => withdraw(p.id)} className="min-h-[44px] text-sm font-semibold text-vermilion underline underline-offset-4">
                {t("components.voices.delete", "Delete")}
              </button>
            </div>
            {p.status === "rejected" && p.rejectReason && (
              <p className="mt-2 text-sm text-wood/75">
                {t("components.voices.reasonPrefix", "Reason:")} {p.rejectReason}
              </p>
            )}
          </PostCard>
        ))}
      </div>
    </div>
  );
}

export default function VoicesBoard() {
  const user = useUser();
  const { t } = useLanguage();
  const [pub, setPub] = useState<Post[] | null>(null);
  const [mine, setMine] = useState<Post[]>([]);
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const [loadError, setLoadError] = useState(false);

  const [tick, setTick] = useState(0);
  const reload = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let live = true;
    fetch("/api/posts", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => live && (setPub(d.posts ?? []), setLoadError(false)))
      .catch(() => live && (setLoadError(true), setPub([])));
    return () => {
      live = false;
    };
  }, [tick]);

  const signedIn = !!user;
  useEffect(() => {
    if (!signedIn) return;
    let live = true;
    fetch("/api/posts/mine", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => live && setMine(d.posts ?? []))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [signedIn, tick]);

  const shown = (pub ?? []).filter((p) => filter === "all" || p.kind === filter);

  return (
    <>
      <div className="mt-8">
        {user === undefined ? (
          <div className="h-40" aria-hidden />
        ) : user === null ? (
          <div className="rounded-3xl bg-brick p-6 text-center text-cream">
            <h2 className="font-display text-2xl">{t("components.voices.signInTitle", "Sign in to post")}</h2>
            <p className="mt-1 text-cream/85">{t("components.voices.signInBody", "Anyone can read. Only signed-in visitors can share.")}</p>
            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/signup" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-marigold px-7 font-semibold text-wood active:scale-95">
                {t("components.auth.createAccount", "Create account")}
              </Link>
              <Link href="/login" className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-marigold/70 px-7 font-semibold active:scale-95">
                {t("components.auth.signIn", "Sign in")}
              </Link>
            </div>
          </div>
        ) : user.role === "admin" ? (
          <div className="rounded-3xl bg-teal p-6 text-center text-cream">
            <h2 className="font-display text-2xl">{t("components.voices.adminTitle", "You are the admin")}</h2>
            <p className="mt-1 text-cream/90">{t("components.voices.adminBody", "Admins approve visitors' posts but do not post themselves.")}</p>
            <Link href="/admin" className="mt-4 inline-flex min-h-[52px] items-center justify-center rounded-full bg-marigold px-7 font-semibold text-wood active:scale-95">
              {t("components.voices.openQueue", "Open review queue")}
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-3 text-center font-display text-xl text-brick">
              {t("components.voices.namaste", "Namaste, {name}").replace("{name}", user.name)}
            </p>
            <Composer onPosted={reload} />
          </>
        )}
      </div>

      {user && user.role !== "admin" && <Mine posts={mine} onChanged={reload} />}

      <div className="mt-12">
        <h2 className="text-center font-display text-2xl text-brick">
          {t("components.voices.fromVisitors", "From visitors")}
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {(["all", "review", "photo", "complaint"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              aria-pressed={filter === k}
              className={chip(filter === k)}
            >
              {k === "all"
                ? t("components.voices.filterAll", "All")
                : t(
                    `components.voices.filter${k === "review" ? "Review" : k === "photo" ? "Photo" : "Complaint"}`,
                    k === "review" ? "Reviews" : k === "photo" ? "Photos" : "Complaints",
                  )}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {pub === null ? (
            <p className="text-center text-wood/60">{t("common.loading", "Loading…")}</p>
          ) : loadError ? (
            <p className="text-center text-wood/70">{t("components.voices.loadError", "Posts couldn't be loaded right now.")}</p>
          ) : shown.length ? (
            shown.map((p) => <PostCard key={p.id} post={p} />)
          ) : (
            <Notice title={t("components.voices.emptyTitle", "Nothing published here yet")}>
              {t("components.voices.emptyBody", "Be the first voice.")}
            </Notice>
          )}
        </div>
      </div>
    </>
  );
}
