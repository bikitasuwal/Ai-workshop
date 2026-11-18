"use client";

import { useEffect, useState } from "react";
import { Notice } from "./ui";
import { when } from "@/lib/posts";
import { useLanguage } from "@/i18n/LanguageContext";

type Member = { id: string; email: string; name: string; role: "user" | "admin"; banned: boolean; posts: number; createdAt: string };

/** Token set when the fetch itself fails; translated at render time. */
const LOAD_FAIL = "__load_fail__";

export default function AdminUsers() {
  const { t, isNepali } = useLanguage();
  const [users, setUsers] = useState<Member[] | null>(null);
  const [tick, setTick] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    fetch("/api/admin/users", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => live && (setUsers(d.users), setError("")))
      .catch(() => live && setError(LOAD_FAIL));
    return () => {
      live = false;
    };
  }, [tick]);

  async function setBanned(u: Member, banned: boolean) {
    if (
      banned &&
      !confirm(
        t("components.admin.users.confirmSuspend", "Suspend {name}? They will be signed out and cannot post.").replace(
          "{name}",
          u.name,
        ),
      )
    )
      return;
    const r = await fetch(`/api/admin/users/${u.id}/ban`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ banned }),
    });
    if (!r.ok)
      return setError((await r.json().catch(() => ({}))).error ?? t("components.admin.users.actionFailed", "Action failed."));
    setTick((n) => n + 1);
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-4 rounded-xl bg-vermilion/10 px-4 py-3 text-sm font-semibold text-brick-deep">
          {error === LOAD_FAIL ? t("components.admin.users.loadError", "Could not load members.") : error}
        </p>
      )}
      {users === null ? (
        <p className="text-center text-wood/60">{error ? "" : t("components.admin.users.loading", "Loading…")}</p>
      ) : users.length === 0 ? (
        <Notice>{t("components.admin.users.emptyTitle", "No members yet.")}</Notice>
      ) : (
        <ul className="space-y-3">
          {users.map((u) => (
            <li key={u.id} className="wood-frame rounded-2xl bg-cream p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-brick">{u.name}</span>
                {u.role === "admin" && (
                  <span className="rounded-full bg-wood px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-marigold">
                    {t("components.admin.users.badgeAdmin", "Admin")}
                  </span>
                )}
                {u.banned && (
                  <span className="rounded-full bg-vermilion/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brick-deep">
                    {t("components.admin.users.badgeSuspended", "Suspended")}
                  </span>
                )}
              </div>
              <p className="break-all text-sm text-wood/70">{u.email}</p>
              <p className="mt-1 text-xs text-wood/55">
                {t("components.admin.users.joined", "Joined {date}").replace("{date}", when(u.createdAt, isNepali ? "ne-NP" : "en-GB"))} ·{" "}
                {t(u.posts === 1 ? "components.admin.users.postOne" : "components.admin.users.postMany", u.posts === 1 ? "{n} post" : "{n} posts").replace(
                  "{n}",
                  String(u.posts),
                )}
              </p>
              {u.role === "user" && (
                <button
                  onClick={() => setBanned(u, !u.banned)}
                  className={`mt-3 min-h-[44px] rounded-full border-2 px-5 text-sm font-semibold active:scale-95 ${u.banned ? "border-teal text-teal" : "border-vermilion text-vermilion"}`}
                >
                  {u.banned
                    ? t("components.admin.users.restore", "Restore access")
                    : t("components.admin.users.suspend", "Suspend")}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
