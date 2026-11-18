"use client";

import { useLanguage } from "@/i18n/LanguageContext";

/** Accessibility skip link — client-only so it can follow the active language. */
export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-marigold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-wood focus-visible:outline-wood focus:shadow-lg"
    >
      {t("common.skipToContent", "Skip to main content")}
    </a>
  );
}
