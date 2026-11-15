"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { announceAuthChange, useUser } from "@/lib/useUser";

export default function AccountMenu() {
  const user = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (user === undefined) return <span className="h-10 w-20" aria-hidden />;

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex min-h-[40px] items-center rounded-full border border-marigold/70 px-4 text-sm font-semibold text-marigold transition active:scale-95"
      >
        Sign in
      </Link>
    );
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    announceAuthChange();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Account menu"
        className="flex h-10 items-center gap-2 rounded-full bg-marigold pl-1 pr-3 text-sm font-semibold text-wood"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brick-deep text-cream">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className="max-w-[88px] truncate">{user.name}</span>
      </button>
      {open && (
        <>
          <button className="fixed inset-0 z-40 cursor-default" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border-2 border-marigold bg-cream text-wood shadow-xl">
            <p className="truncate px-4 pt-3 text-xs text-wood/60">{user.email}</p>
            {user.role === "admin" && (
              <p className="px-4 pb-1 text-xs font-bold uppercase tracking-wider text-vermilion">Admin</p>
            )}
            {user.role === "admin" && (
              <Link href="/admin" onClick={() => setOpen(false)} className="flex min-h-[48px] w-full items-center px-4 font-semibold text-brick hover:bg-paper">
                Admin dashboard
              </Link>
            )}
            <button onClick={logout} className="min-h-[48px] w-full px-4 text-left font-semibold text-brick hover:bg-paper">
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
