"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <footer className="mt-16 bg-wood pb-28 pt-10 text-cream/90 md:pb-10">
      <div className="lattice h-3 opacity-40" aria-hidden />
      <div className="mx-auto mt-8 max-w-3xl space-y-4 px-5 text-center text-sm">
        <p className="font-display text-xl text-marigold">बालाजु सम्पदा</p>
        <p>
          A community archive of 22 Dhara and Pyah Thwam Ajima. Built to record, respect and pass on what Balaju&apos;s
          people already keep alive.
        </p>
        <p className="text-cream/70">
          Please do not photograph or share restricted rituals without the permission of the Guthi and the
          community. Beliefs on this site are recorded as beliefs, not as medical or historical fact.
        </p>
        <p>
          <Link href="/sources" className="underline decoration-marigold underline-offset-4">
            Sources &amp; what still needs confirming
          </Link>
        </p>
      </div>
    </footer>
  );
}
