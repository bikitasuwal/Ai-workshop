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

export const NAV_LINKS: NavLink[] = [
  { label: "Places", href: "/places" },
  { label: "Gallery", href: "/gallery" },
  { label: "Festival", href: "/festival" },
  { label: "Voices", href: "/reviews" },
  { label: "Sources", href: "/sources" },
];

export default function Navbar() {
  return <NavbarShell links={NAV_LINKS} />;
}
