"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/useUser";
import type { Post } from "@/lib/posts";
import PostCard from "./PostCard";
import { Notice, Reveal } from "./ui";
import { useLanguage } from "@/i18n/LanguageContext";

type Stats = {
  posts: { pending: number; approved: number; rejected: number };
  users: { members: number; suspended: number };
};

function Tile({ href, n, label, ne, tone }: { href: string; n: number | string; label: string; ne: string; tone: string }) {
  return (
    <Link href={href} className={`wood-frame block rounded-2xl p-4 transition active:scale-[0.97] ${tone}`}>
      <p className="font-display text-4xl leading-none">{n}</p>
      <p className="mt-2 font-semibold">{label}</p>
      <p className="font-deva text-xs opacity-80">{ne}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const user = useUser();
  const { t } = useLanguage();
  const [stats, setStats] = useState<Stats | null>(null);
  const [latest, setLatest] = useState<Post[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let live = true;
    Promise.all([
      fetch("/api/admin/stats", { cache: "no-store" }).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch("/api/admin/posts?status=pending", { cache: "no-store" }).then((r) => (r.ok ? r.json() : Promise.reject())),
    ])
      .then(([s, p]) => live && (setStats(s), setLatest(p.posts.slice(0, 3))))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, []);

  return (
    <>
      <Reveal>
        <p className="text-center font-deva text-sm font-semibold text-vermilion">
          {t("components.admin.dashboard.ne", "प्रशासक ड्यासबोर्ड")}
        </p>
        <h1 className="text-center font-display text-3xl text-brick">
          {t("components.admin.dashboard.title", "Admin dashboard")}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-center text-wood/80">
          {t("components.admin.dashboard.welcome", "Welcome, {name}. Your job here is to review what visitors send. You don't post yourself.").replace(
            "{name}",
            user?.name ?? "",
          )}
        </p>
      </Reveal>

      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-vermilion/10 px-4 py-3 text-sm font-semibold text-brick-deep">
          {t("components.admin.dashboard.loadError", "Could not load the numbers. Is the backend running?")}
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Tile
          href="/admin/posts"
          n={stats?.posts.pending ?? "–"}
          label={t("components.admin.dashboard.tilePending", "Waiting for review")}
          ne="पर्खिरहेका"
          tone="bg-marigold text-wood"
        />
        <Tile
          href="/admin/posts"
          n={stats?.posts.approved ?? "–"}
          label={t("components.admin.dashboard.tilePublished", "Published")}
          ne="प्रकाशित"
          tone="bg-teal text-cream"
        />
        <Tile
          href="/admin/posts"
          n={stats?.posts.rejected ?? "–"}
          label={t("components.admin.dashboard.tileRejected", "Rejected")}
          ne="अस्वीकृत"
          tone="bg-brick text-cream"
        />
        <Tile
          href="/admin/users"
          n={stats?.users.members ?? "–"}
          label={t("components.admin.dashboard.tileMembers", "Members")}
          ne="सदस्य"
          tone="bg-cream text-wood"
        />
        <Tile
          href="/admin/users"
          n={stats?.users.suspended ?? "–"}
          label={t("components.admin.dashboard.tileSuspended", "Suspended")}
          ne="निलम्बित"
          tone="bg-cream text-wood"
        />
      </div>

      <div className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-xl text-brick">
            {t("components.admin.dashboard.needsReview", "Needs your review")}
          </h2>
          <Link href="/admin/posts" className="min-h-[44px] content-center text-sm font-semibold text-teal underline underline-offset-4">
            {t("components.admin.dashboard.openAll", "Open all →")}
          </Link>
        </div>
        <div className="mt-4 space-y-4">
          {latest === null ? (
            <p className="text-center text-wood/60">{error ? "" : t("components.admin.dashboard.loading", "Loading…")}</p>
          ) : latest.length ? (
            latest.map((p) => (
              <PostCard key={p.id} post={p}>
                <Link href="/admin/posts" className="mt-3 inline-flex min-h-[48px] items-center rounded-full bg-brick px-6 font-semibold text-cream active:scale-95">
                  {t("components.admin.dashboard.reviewThis", "Review this")}
                </Link>
              </PostCard>
            ))
          ) : (
            <Notice title={t("components.admin.dashboard.emptyTitle", "All caught up")}>
              {t("components.admin.dashboard.emptyBody", "No posts are waiting.")}
            </Notice>
          )}
        </div>
      </div>
    </>
  );
}
