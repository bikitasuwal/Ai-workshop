"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/useUser";
import type { Submission } from "@/lib/submissions";
import SubmissionCard from "./SubmissionCard";
import { Notice, Reveal } from "./ui";
import { useLanguage } from "@/i18n/LanguageContext";

type Stats = {
  submissions: { pending: number; approved: number; rejected: number };
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
  const [latest, setLatest] = useState<Submission[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let live = true;
    Promise.all([
      fetch("/api/admin/stats", { cache: "no-store" }).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch("/api/admin/submissions?status=pending", { cache: "no-store" }).then((r) => (r.ok ? r.json() : Promise.reject())),
    ])
      .then(([s, p]) => live && (setStats(s), setLatest(p.submissions.slice(0, 3))))
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
          {t("components.admin.dashboard.welcome", "Welcome, {name}. Your job here is to review the stories and photos visitors send.").replace(
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

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Tile
          href="/admin/submissions"
          n={stats?.submissions.pending ?? "–"}
          label={t("components.admin.dashboard.tilePending", "Waiting for review")}
          ne="पर्खिरहेका"
          tone="bg-marigold text-wood"
        />
        <Tile
          href="/admin/submissions"
          n={stats?.submissions.approved ?? "–"}
          label={t("components.admin.dashboard.tilePublished", "Published")}
          ne="प्रकाशित"
          tone="bg-teal text-cream"
        />
        <Tile
          href="/admin/submissions"
          n={stats?.submissions.rejected ?? "–"}
          label={t("components.admin.dashboard.tileRejected", "Rejected")}
          ne="अस्वीकृत"
          tone="bg-brick text-cream"
        />
      </div>

      <div className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-xl text-brick">
            {t("components.admin.dashboard.needsReview", "Needs your review")}
          </h2>
          <Link href="/admin/submissions" className="min-h-[44px] content-center text-sm font-semibold text-teal underline underline-offset-4">
            {t("components.admin.dashboard.openAll", "Open all →")}
          </Link>
        </div>
        <div className="mt-4 space-y-4">
          {latest === null ? (
            <p className="text-center text-wood/60">{error ? "" : t("components.admin.dashboard.loading", "Loading…")}</p>
          ) : latest.length ? (
            latest.map((p) => (
              <SubmissionCard key={p.id} item={p}>
                <Link href="/admin/submissions" className="mt-3 inline-flex min-h-[48px] items-center rounded-full bg-brick px-6 font-semibold text-cream active:scale-95">
                  {t("components.admin.dashboard.reviewThis", "Review this")}
                </Link>
              </SubmissionCard>
            ))
          ) : (
            <Notice title={t("components.admin.dashboard.emptyTitle", "All caught up")}>
              {t("components.admin.dashboard.emptyBody", "Nothing is waiting.")}
            </Notice>
          )}
        </div>
      </div>
    </>
  );
}
