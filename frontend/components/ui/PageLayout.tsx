/**
 * components/ui/PageLayout.tsx
 *
 * Standard page wrapper used by most content pages.
 *
 * Provides:
 *  - A consistent max-width container
 *  - Standard horizontal padding (responsive)
 *  - Top clearance for the fixed navbar, plus vertical breathing room
 *
 * Variants:
 *  - "default" → max-w-7xl  (index pages, dashboards)
 *  - "wide"    → wider content (galleries, maps)
 *  - "narrow"  → max-w-3xl  (long-form reading)
 *
 * Usage:
 *   <PageLayout variant="narrow">
 *     <PageLayout.Section>…</PageLayout.Section>
 *     <PageLayout.Section>…</PageLayout.Section>
 *   </PageLayout>
 */

type Variant = "default" | "wide" | "narrow";

const MAX_WIDTHS: Record<Variant, string> = {
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
  narrow: "max-w-3xl",
};

/**
 * Top padding clears the fixed navbar: 64px everywhere, ~100px on phones
 * where the admin chrome adds a second row of links.
 */
const STANDARD = "pt-32 pb-14 md:pt-24 lg:pt-32 lg:pb-24";
/** Use when a full-bleed hero already sits directly above the content. */
const UNDER_HERO = "pt-10 pb-14 sm:pt-12 lg:pb-24";

export default function PageLayout({
  children,
  variant = "default",
  className = "",
  underHero = false,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** The page renders its own full-bleed hero above this content. */
  underHero?: boolean;
}) {
  return (
    <div
      className={`${MAX_WIDTHS[variant]} mx-auto px-4 sm:px-6 lg:px-8 ${
        underHero ? UNDER_HERO : STANDARD
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * PageLayout.Section — a vertical section inside a page.
 * Adds consistent top spacing between sections.
 */
function PageLayoutSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`mt-16 sm:mt-20 lg:mt-28 first:mt-0 ${className}`}>{children}</section>;
}

PageLayout.Section = PageLayoutSection;
