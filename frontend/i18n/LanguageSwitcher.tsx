"use client";

/**
 * i18n/LanguageSwitcher.tsx
 *
 * Reusable bilingual language switcher component (English | नेपाली).
 * Ported from ward-16-heritage/src/components/ui/LanguageSwitcher.js and
 * restyled with Ai-workshop's brick / marigold / cream palette.
 *
 * Features:
 * - Direct toggle between English (en) and Nepali (ne).
 * - Fully accessible keyboard controls.
 * - Dynamic styling based on transparent header vs scrolled/solid header.
 * - Supports compact mode for the mobile drawer.
 */

import { useLanguage } from "./LanguageContext";

type Variant = "header" | "mobile" | "inline";

export default function LanguageSwitcher({
  variant = "header",
  scrolled = false,
  className = "",
}: {
  variant?: Variant;
  scrolled?: boolean;
  className?: string;
}) {
  const { language, setLanguage, t } = useLanguage();

  if (variant === "mobile") {
    return (
      <div
        className={`flex items-center gap-2 ${className}`}
        role="group"
        aria-label={t("nav.langSelection", "Language selection")}
      >
        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
          className={[
            "rounded px-2.5 py-1 text-sm font-medium transition-colors",
            language === "en"
              ? "bg-brick font-semibold text-cream shadow-xs"
              : "text-wood/70 hover:bg-paper/40 hover:text-wood",
          ].join(" ")}
        >
          English
        </button>
        <span className="text-xs text-marigold/50">|</span>
        <button
          type="button"
          onClick={() => setLanguage("ne")}
          aria-pressed={language === "ne"}
          className={[
            "font-deva rounded px-2.5 py-1 text-sm transition-colors",
            language === "ne"
              ? "bg-brick font-semibold text-cream shadow-xs"
              : "text-wood/70 hover:bg-paper/40 hover:text-wood",
          ].join(" ")}
        >
          नेपाली
        </button>
      </div>
    );
  }

  // Desktop / header variant — always sits on a dark surface
  // (solid brick bar, or transparent over the dark hero).
  return (
    <div
      role="group"
      aria-label={t("nav.langSelector", "Language selector")}
      className={[
        "flex items-center rounded-sm border text-xs font-medium transition-colors duration-200",
        scrolled
          ? "border-marigold/50 bg-cream/10 text-cream shadow-xs"
          : "border-cream/25 bg-wood/40 text-cream backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        title={t("nav.switchToEn", "Switch to English")}
        className={[
          "rounded-l-sm px-2.5 py-1.5 transition-all duration-150 focus-visible:ring-1 focus-visible:ring-marigold focus-visible:outline-none",
          language === "en"
            ? "bg-marigold font-semibold text-wood"
            : "hover:bg-cream/10 hover:text-marigold",
        ].join(" ")}
      >
        EN
      </button>

      <span className={scrolled ? "text-marigold/50" : "text-cream/30"} aria-hidden="true">
        /
      </span>

      <button
        type="button"
        onClick={() => setLanguage("ne")}
        aria-pressed={language === "ne"}
        title={t("nav.switchToNe", "नेपाली भाषामा हेर्नुहोस्")}
        className={[
          "font-deva rounded-r-sm px-2.5 py-1.5 transition-all duration-150 focus-visible:ring-1 focus-visible:ring-marigold focus-visible:outline-none",
          language === "ne"
            ? "bg-marigold font-semibold text-wood"
            : "hover:bg-cream/10 hover:text-marigold",
        ].join(" ")}
      >
        नेपाली
      </button>
    </div>
  );
}
