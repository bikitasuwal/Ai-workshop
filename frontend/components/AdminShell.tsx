"use client";

import Link from "next/link";
import { useUser } from "@/lib/useUser";

/** Everything under /admin: only admins get in. */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const user = useUser();

  if (user === undefined) return <div className="min-h-[60vh]" aria-hidden />;
  if (!user || user.role !== "admin") {
    return (
      <section className="mx-auto max-w-md px-5 py-16 text-center">
        <div className="rounded-3xl bg-paper p-6">
          <p className="font-display text-2xl text-brick">Admins only</p>
          <p className="mt-1 text-wood/75">Sign in with the admin account to open the dashboard.</p>
          <Link href="/login" className="mt-4 inline-flex min-h-[52px] items-center rounded-full bg-brick px-7 font-semibold text-cream">
            Sign in
          </Link>
        </div>
      </section>
    );
  }
  return (
    <div className="min-h-[70vh] bg-paper/60">
      <section className="mx-auto max-w-3xl px-5 py-10">{children}</section>
    </div>
  );
}
