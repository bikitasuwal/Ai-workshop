/**
 * components/layout/Navbar.tsx
 *
 * Site-wide navigation — Server Component wrapper.
 *
 * Architecture (ported from ward-16-heritage):
 * - NavbarShell (Client) — scroll state, transparent/solid chrome, desktop links
 * - MobileMenu  (Client) — hamburger + slide-in drawer below lg
 * - This file   — the NAV_LINKS list, rendered once for both
 */

import NavbarShell, { type NavLink } from "./NavbarShell";

/**
 * `key` maps each tab onto the i18n dictionary (`nav.<key>`); `label` is the
 * English fallback shown if the key is ever missing.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Places", href: "/places", key: "places" },
  { label: "Gallery", href: "/gallery", key: "gallery" },
  { label: "Festival", href: "/festival", key: "festival" },
  { label: "Voices", href: "/reviews", key: "voices" },
  { label: "Sources", href: "/sources", key: "sources" },
];

export default function Navbar() {
  return <NavbarShell links={NAV_LINKS} />;
}
