"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import AccountMenu from "./AccountMenu";
import { useUser } from "@/lib/useUser";

type IconProps = { className?: string };

const Temple = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2v3M7 9l5-4 5 4M4.5 14 12 8.5l7.5 5.5M3 20h18M6 14v6M18 14v6M10 20v-4h4v4" />
  </svg>
);
const Frame = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m3 16 5-5 4 4 3-3 6 6M15.5 9h.01" />
  </svg>
);
const Lamp = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3c2 2.5 2.5 4 0 6-2.500-2-2-3.500 0-6ZM4 14h16c0 3.500-3.500 6-8 6s-8-2.500-8-6Z" />
  </svg>
);
const Voice = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </svg>
);

export const tabs = [
  { href: "/places", label: "Places", ne: "स्थान", Icon: Temple },
  { href: "/gallery", label: "Gallery", ne: "ग्यालरी", Icon: Frame },
  { href: "/festival", label: "Festival", ne: "पर्व", Icon: Lamp },
  { href: "/reviews", label: "Voices", ne: "आवाज", Icon: Voice },
];

export default function Nav() {
  const path = usePathname();
  const user = useUser();
  const active = (href: string) => path === href || path.startsWith(href + "/");
  if (path.startsWith("/admin") && user?.role === "admin") return <AdminNav path={path} />;

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b-2 border-marigold/60 bg-brick text-cream shadow-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Balaju Living Heritage home">
            <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
              <path d="M16 2v4M8 12l8-6 8 6M4 18l12-9 12 9M3 28h26M7 18v10M25 18v10" fill="none" stroke="#E8A317" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="leading-tight">
              <span className="font-display block text-lg text-marigold">बालाजु सम्पदा</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-cream/80">Balaju Living Heritage</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            {/* Desktop links */}
            <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
              {tabs.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`text-sm tracking-wide transition-colors hover:text-marigold ${active(t.href) ? "text-marigold" : "text-cream"}`}
                >
                  {t.label}
                </Link>
              ))}
              <Link href="/sources" className="text-sm text-cream/80 hover:text-marigold">
                Sources
              </Link>
            </nav>
            <AccountMenu />
          </div>
        </div>
        <div className="lattice h-2 opacity-60" aria-hidden />
      </header>

      {/* Bottom tab bar (phones) */}
      <nav
        aria-label="Main"
        className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t-2 border-marigold/70 bg-brick-deep/95 text-cream backdrop-blur md:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-5">
          {tabs.slice(0, 2).map((t) => (
            <Tab key={t.href} {...t} isActive={active(t.href)} />
          ))}
          <li aria-hidden /> {/* space for the floating lamp (chat) */}
          {tabs.slice(2).map((t) => (
            <Tab key={t.href} {...t} isActive={active(t.href)} />
          ))}
        </ul>
      </nav>
    </>
  );
}

function Tab({
  href,
  label,
  ne,
  Icon,
  isActive,
}: {
  href: string;
  label: string;
  ne: string;
  Icon: (p: IconProps) => React.ReactElement;
  isActive: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`relative flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-1 text-[11px] ${isActive ? "text-marigold" : "text-cream/80"}`}
      >
        {isActive && (
          <motion.span layoutId="tab-glow" className="absolute inset-x-3 top-0 h-[3px] rounded-b bg-marigold" />
        )}
        <Icon className="h-5 w-5" />
        <span className="font-deva text-[12px] leading-none">{ne}</span>
        <span className="text-[9px] uppercase leading-none tracking-wider opacity-70">{label}</span>
      </Link>
    </li>
  );
}

const Chart = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);
const Inbox = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 13h5l1 3h6l1-3h5M5 5h14l2 8v6H3v-6l2-8Z" />
  </svg>
);
const People = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.500 2.700-6 6-6s6 2.500 6 6M16 5a3 3 0 0 1 0 6M18 14c2 .6 3 2.600 3 6" />
  </svg>
);
const Globe = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  </svg>
);

const adminTabs = [
  { href: "/admin", label: "Dashboard", ne: "ड्यासबोर्ड", Icon: Chart, exact: true },
  { href: "/admin/posts", label: "Posts", ne: "पोस्ट", Icon: Inbox, exact: false },
  { href: "/admin/users", label: "Members", ne: "सदस्य", Icon: People, exact: false },
  { href: "/", label: "View site", ne: "साइट", Icon: Globe, exact: true },
];

/** The admin area has its own dark header and tab bar, so it never looks like the visitor site. */
function AdminNav({ path }: { path: string }) {
  const on = (t: (typeof adminTabs)[number]) => (t.exact ? path === t.href : path.startsWith(t.href));
  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-marigold bg-wood text-cream shadow-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-3" aria-label="Admin dashboard">
            <span className="rounded-full bg-marigold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-wood">Admin</span>
            <span className="hidden text-sm text-cream/80 sm:block">Balaju Living Heritage</span>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 md:flex" aria-label="Admin">
              {adminTabs.map((t) => (
                <Link key={t.href} href={t.href} className={`text-sm transition-colors hover:text-marigold ${on(t) ? "text-marigold" : "text-cream"}`}>
                  {t.label}
                </Link>
              ))}
            </nav>
            <AccountMenu />
          </div>
        </div>
      </header>

      <nav aria-label="Admin" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t-2 border-marigold bg-wood/95 text-cream backdrop-blur md:hidden">
        <ul className="mx-auto grid max-w-md grid-cols-4">
          {adminTabs.map((t) => (
            <Tab key={t.href} href={t.href} label={t.label} ne={t.ne} Icon={t.Icon} isActive={on(t)} />
          ))}
        </ul>
      </nav>
    </>
  );
}
