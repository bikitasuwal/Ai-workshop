"use client";

import { useEffect, useState } from "react";
import { Notice } from "./ui";
import { when } from "@/lib/posts";

type Member = { id: string; email: string; name: string; role: "user" | "admin"; banned: boolean; posts: number; createdAt: string };

export default function AdminUsers() {
  const [users, setUsers] = useState<Member[] | null>(null);
  const [tick, setTick] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    fetch("/api/admin/users", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => live && (setUsers(d.users), setError("")))
      .catch(() => live && setError("Could not load members."));
    return () => {
      live = false;
    };
  }, [tick]);

  async function setBanned(u: Member, banned: boolean) {
    if (banned && !confirm(`Suspend ${u.name}? They will be signed out and cannot post.`)) return;
    const r = await fetch(`/api/admin/users/${u.id}/ban`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ banned }),
    });
    if (!r.ok) return setError((await r.json().catch(() => ({}))).error ?? "Action failed.");
    setTick((n) => n + 1);
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-4 rounded-xl bg-vermilion/10 px-4 py-3 text-sm font-semibold text-brick-deep">
          {error}
        </p>
      )}
      {users === null ? (
        <p className="text-center text-wood/60">{error ? "" : "Loading…"}</p>
      ) : users.length === 0 ? (
        <Notice>No members yet.</Notice>
      ) : (
        <ul className="space-y-3">
          {users.map((u) => (
            <li key={u.id} className="wood-frame rounded-2xl bg-cream p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-brick">{u.name}</span>
                {u.role === "admin" && <span className="rounded-full bg-wood px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-marigold">Admin</span>}
                {u.banned && <span className="rounded-full bg-vermilion/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brick-deep">Suspended</span>}
              </div>
              <p className="break-all text-sm text-wood/70">{u.email}</p>
              <p className="mt-1 text-xs text-wood/55">
                Joined {when(u.createdAt)} · {u.posts} post{u.posts === 1 ? "" : "s"}
              </p>
              {u.role === "user" && (
                <button
                  onClick={() => setBanned(u, !u.banned)}
                  className={`mt-3 min-h-[44px] rounded-full border-2 px-5 text-sm font-semibold active:scale-95 ${u.banned ? "border-teal text-teal" : "border-vermilion text-vermilion"}`}
                >
                  {u.banned ? "Restore access" : "Suspend"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
