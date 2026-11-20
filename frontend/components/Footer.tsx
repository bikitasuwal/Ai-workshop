"use client";

/**
 * components/Footer.tsx: the dark four-column footer.
 * About the project, the site links, the two places, and a respect note; then a bottom bar.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { places } from "@/lib/places";
import { useLanguage } from "@/i18n/LanguageContext";

const SITE_LINKS = [
  { href: "/", key: "home" },
  { href: "/gallery", key: "gallery" },
  { href: "/festival", key: "festival" },
  { href: "/stories", key: "stories" },
  { href: "/sources", key: "sources" },
] as const;

const head = "text-[11px] font-semibold uppercase tracking-[0.25em] text-marigold";
const link = "inline-flex min-h-[32px] items-center text-sm text-cream/75 transition-colors hover:text-marigold";

export default function Footer() {
  const path = usePathname();
  const { t } = useLanguage();
  if (path.startsWith("/admin")) return null;

  return (
    <footer className="bg-wood text-cream/80" aria-label={t("components.footer.label", "Site footer")}>
      <div className="h-px bg-gradient-to-r from-transparent via-marigold/50 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <p className={head}>{t("home.hero.eyebrow")}</p>
            <Link href="/" className="font-display mt-3 inline-block text-3xl text-cream transition-colors hover:text-marigold">
              {t("common.siteTitle", "बालाजु सम्पदा")}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">{t("components.footer.intro")}</p>
            <div className="mt-6 h-px w-10 bg-marigold/40" aria-hidden />
          </div>

          <nav aria-label={t("components.footer.explore", "Explore")}>
            <p className={head}>{t("components.footer.explore", "Explore")}</p>
            <ul className="mt-4 space-y-1">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {t(`nav.${l.key}`, l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("components.footer.sites", "Heritage sites")}>
            <p className={head}>{t("components.footer.sites", "Heritage sites")}</p>
            <ul className="mt-4 space-y-1">
              {places.map((p) => (
                <li key={p.id}>
                  <Link href={p.href} className={link}>
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/gallery" className={link}>
                  {t("components.footer.allPhotos", "All photographs")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className={head}>{t("components.footer.aboutCol", "About")}</p>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">{t("components.footer.respect")}</p>
            <Link href="/sources" className="mt-3 inline-flex min-h-[32px] items-center text-sm text-marigold underline decoration-marigold/50 underline-offset-4 hover:decoration-marigold">
              {t("components.footer.sourcesLink")}
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row">
          <p>{t("components.footer.copyright", "© Balaju Living Heritage. A community archive.")}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex min-h-[44px] items-center gap-2 uppercase tracking-[0.18em] transition-colors hover:text-marigold"
          >
            {t("components.footer.backToTop", "Back to top")} <span aria-hidden>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
