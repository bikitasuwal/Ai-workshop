"use client";

/**
 * components/layout/NavbarShell.tsx
 *
 * Client half of the site navbar — it has to read the scroll position and the
 * current path to pick between two looks:
 *
 *   - transparent while sitting over a dark hero (until the page scrolls >20px)
 *   - solid brick with a marigold hairline everywhere else (and always, on the
 *     pages whose first screen is light)
 *
 * Navbar.tsx (Server Component) owns the NAV_LINKS list and renders this.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { useUser } from "@/lib/useUser";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Dictionary } from "@/i18n/dictionaries/en";

export type NavLink = {
  label: string;
  href: string;
  /** i18n key under `nav.*` — translated via t(); falls back to `label`. */
  key?: keyof Dictionary["nav"];
};

/** Routes whose first screen is a dark hero, so the navbar may start transparent. */
const DARK_HERO_ROUTES = ["/", "/dhara", "/ajima", "/festival", "/quiz"];

export default function NavbarShell({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const user = useUser();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll(); // the page may already be scrolled when we mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const path = pathname ?? "/";

  // The admin area renders its own dark chrome (AdminNav) — never two headers.
  if (path.startsWith("/admin") && user?.role === "admin") return null;

  const hasDarkHero = DARK_HERO_ROUTES.includes(path);
  const isSolid = scrolled || !hasDarkHero;
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full transition-colors duration-300 ${
        isSolid ? "bg-brick/95 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        aria-label={t("nav.mainNav", "Main")}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Wordmark: Devanagari name over the English eyebrow */}
        <Link
          href="/"
          aria-label={t("nav.homeLink", "Balaju Living Heritage — go to the homepage")}
          className="group flex shrink-0 flex-col leading-none"
        >
          <span className="font-display text-xl text-marigold transition-colors duration-200 group-hover:text-cream">
            बालाजु सम्पदा
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/75 transition-colors duration-200 group-hover:text-cream">
            Balaju Living Heritage
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-sm px-3 py-2 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold ${
                  isActive(link.href)
                    ? "text-marigold"
                    : "text-cream/90 hover:bg-cream/10 hover:text-marigold"
                }`}
              >
                {link.key ? t(`nav.${link.key}`, link.label) : link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3">
          {/* Bilingual language selector — hidden on the smallest screens,
              where the mobile drawer offers it instead */}
          <LanguageSwitcher scrolled={isSolid} className="hidden sm:flex" />
          <div className="lg:hidden">
            <MobileMenu links={links} />
          </div>
        </div>
      </nav>

      {/* Marigold hairline — only once the bar has a solid background */}
      {isSolid && (
        <div
          className="h-px bg-gradient-to-r from-transparent via-marigold/70 to-transparent"
          aria-hidden
        />
      )}
    </header>
  );
}
