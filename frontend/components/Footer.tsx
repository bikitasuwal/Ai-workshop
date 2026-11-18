"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const path = usePathname();
  const { t } = useLanguage();
  if (path.startsWith("/admin")) return null;
  return (
    <footer className="mt-16 bg-wood pb-28 pt-10 text-cream/90 md:pb-10">
      <div className="lattice h-3 opacity-40" aria-hidden />
      <div className="mx-auto mt-8 max-w-3xl space-y-4 px-5 text-center text-sm">
        <p className="font-display text-xl text-marigold">बालाजु सम्पदा</p>
        <p>{t("components.footer.intro")}</p>
        <p className="text-cream/70">{t("components.footer.respect")}</p>
        <p>
          <Link href="/sources" className="underline decoration-marigold underline-offset-4">
            {t("components.footer.sourcesLink")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
