"use client";

/**
 * components/layout/AdminNav.tsx
 *
 * The admin area keeps its own dark chrome so it never looks like the
 * visitor site. Rendered by AdminShell for signed-in admins only; the
 * site Navbar steps aside on /admin at the same time.
 *
 * Desktop: one fixed row (badge + links + account).
 * Below md: the links move into a scrollable second row — there is no
 * bottom tab bar anywhere on the site any more.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountMenu from "@/components/AccountMenu";
import { useLanguage } from "@/i18n/LanguageContext";

type AdminLinkKey = "dashboard" | "posts" | "members" | "viewSite";

const ADMIN_LINKS: { href: string; key: AdminLinkKey; label: string; exact: boolean }[] = [
  { href: "/admin", key: "dashboard", label: "Dashboard", exact: true },
  { href: "/admin/posts", key: "posts", label: "Posts", exact: false },
  { href: "/admin/users", key: "members", label: "Members", exact: false },
  { href: "/", key: "viewSite", label: "View site", exact: true },
];

export default function AdminNav() {
  const path = usePathname();
  const { t } = useLanguage();
  const isActive = (link: (typeof ADMIN_LINKS)[number]) =>
    link.exact ? path === link.href : path.startsWith(link.href);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-marigold bg-wood text-cream shadow-md">
      <nav
        aria-label={t("components.admin.nav.ariaAdmin", "Admin")}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/admin"
          className="flex shrink-0 items-center gap-3"
          aria-label={t("components.admin.nav.ariaDashboard", "Admin dashboard")}
        >
          <span className="rounded-full bg-marigold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-wood">
            {t("components.admin.nav.badge", "Admin")}
          </span>
          <span className="hidden text-sm text-cream/80 sm:block">
            {t("components.admin.nav.siteName", "Balaju Living Heritage")}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {ADMIN_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link) ? "page" : undefined}
                className={`rounded-sm px-3 py-2 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold ${
                  isActive(link)
                    ? "text-marigold"
                    : "text-cream/90 hover:bg-cream/10 hover:text-marigold"
                }`}
              >
                {t(`components.admin.nav.${link.key}`, link.label)}
              </Link>
            </li>
          ))}
        </ul>

        <AccountMenu />
      </nav>

      {/* Phones: the same links as a scrollable strip under the main row */}
      <nav
        aria-label={t("components.admin.nav.ariaSections", "Admin sections")}
        className="rail flex gap-1 overflow-x-auto border-t border-marigold/30 px-3 py-1 md:hidden"
      >
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link) ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
              isActive(link) ? "bg-marigold text-wood" : "text-cream/80 hover:bg-cream/10 hover:text-marigold"
            }`}
          >
            {t(`components.admin.nav.${link.key}`, link.label)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
