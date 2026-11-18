/**
 * i18n/config.ts
 *
 * Central configuration for the bilingual (English / नेपाली) system.
 * Ported from ward-16-heritage/src/i18n/config.js and converted to TypeScript.
 */

export const SUPPORTED_LOCALES = ["en", "ne"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<
  Locale,
  { code: Locale; label: string; nativeLabel: string; dir: "ltr" }
> = {
  en: { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  ne: { code: "ne", label: "Nepali", nativeLabel: "नेपाली", dir: "ltr" },
};

/** localStorage key for the visitor's language choice (per-tab safe). */
export const STORAGE_KEY = "balaju_preferred_language";

/** Cookie name, matching Next.js' conventional locale cookie. */
export const COOKIE_KEY = "NEXT_LOCALE";
