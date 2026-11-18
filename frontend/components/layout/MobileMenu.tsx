"use client";

/**
 * components/layout/MobileMenu.tsx
 *
 * Hamburger + slide-in drawer for screens below the lg breakpoint.
 * The panel is always mounted (so it can animate in and out) and made
 * inert while closed, so its links never take keyboard focus.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountMenu from "@/components/AccountMenu";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import type { NavLink } from "./NavbarShell";

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  // Close the drawer when the route changes (a link was followed, the back
  // button was pressed, or navigation happened elsewhere in the app).
  // Adjusting state during render is the React-recommended way to react to
  // a changed value without an extra effect pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes the drawer, and the page behind it stops scrolling.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      {/* Hamburger → X */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={
          open ? t("nav.closeMenu", "Close navigation menu") : t("nav.openMenu", "Open navigation menu")
        }
        className="rounded-sm p-2 text-cream transition-colors duration-150 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold"
      >
        <span className="flex w-5 flex-col gap-1.5" aria-hidden>
          <span
            className={`block h-px origin-center bg-current transition-all duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px bg-current transition-all duration-300 ${
              open ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px origin-center bg-current transition-all duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Scrim behind the drawer */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-wood/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-marigold/30 px-5">
          <span className="font-display text-lg text-brick">बालाजु सम्पदा</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-sm p-2 text-wood transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <div className="lattice h-3 shrink-0 opacity-70" aria-hidden />

        <ul className="flex flex-col overflow-y-auto">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`block border-b border-marigold/20 px-5 py-4 text-base font-semibold transition-colors duration-150 hover:bg-paper ${
                  isActive(link.href) ? "border-l-4 border-l-marigold text-brick" : "text-wood"
                }`}
              >
                {link.key ? t(`nav.${link.key}`, link.label) : link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language selector + sign-in / account, kept reachable while the drawer is open */}
        <div className="space-y-3 border-t border-marigold/25 p-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-wood/60">
              {t("nav.language", "Language")}
            </p>
            <LanguageSwitcher variant="mobile" />
          </div>
          <AccountMenu />
        </div>
      </div>
    </>
  );
}
