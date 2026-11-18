"use client";

/**
 * i18n/LanguageContext.tsx
 *
 * Central React Context and Hook providing bilingual state across the application.
 * Ported from ward-16-heritage/src/i18n/LanguageContext.js and converted to TypeScript.
 *
 * Features:
 * - Powered by React's useSyncExternalStore for tear-free, concurrent-safe synchronization.
 * - Persists language in localStorage and cookie (NEXT_LOCALE).
 * - Multi-tab synchronization via window 'storage' listener.
 * - Updates document.documentElement.lang dynamically ('en' / 'ne').
 * - Provides dictionary lookup: t(path, fallback).
 * - Exposes easy toggle/set functions.
 */

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { en, type Dictionary } from "./dictionaries/en";
import { ne } from "./dictionaries/ne";
import { DEFAULT_LOCALE, STORAGE_KEY, COOKIE_KEY, type Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, ne };

let currentLanguage: Locale = DEFAULT_LOCALE;

if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ne" || saved === "en") {
      currentLanguage = saved;
      document.documentElement.lang = saved;
    }
  } catch {
    // LocalStorage restricted (incognito/sandboxed)
  }
}

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((callback) => {
    try {
      callback();
    } catch {
      // ignore listener error
    }
  });
}

function subscribe(callback: () => void) {
  listeners.add(callback);

  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === STORAGE_KEY &&
      (event.newValue === "en" || event.newValue === "ne") &&
      event.newValue !== currentLanguage
    ) {
      currentLanguage = event.newValue;
      document.documentElement.lang = currentLanguage;
      notifyListeners();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getSnapshot(): Locale {
  return currentLanguage;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export type TranslateFn = (path: string, fallback?: string) => string;

export interface LanguageValue {
  /** Active locale ('en' | 'ne'). */
  language: Locale;
  /** Persist the visitor's choice (localStorage + cookie + <html lang>). */
  setLanguage: (lang: Locale) => void;
  /** Nested dictionary lookup: t('nav.home', 'Home'). */
  t: TranslateFn;
  /** The full active dictionary (useful for structured entries like title pairs). */
  dict: Dictionary;
  /** Shorthand for language === 'ne'. */
  isNepali: boolean;
  /** Always true on the client; the server snapshot is always the default locale. */
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageValue>({
  language: DEFAULT_LOCALE,
  setLanguage: () => {},
  t: (path, fallback) => fallback || path,
  dict: en,
  isNepali: false,
  isHydrated: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((lang: Locale) => {
    if (lang !== "en" && lang !== "ne") return;
    currentLanguage = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    } catch {
      // LocalStorage access restricted
    }

    notifyListeners();
  }, []);

  const dict = useMemo(() => {
    return dictionaries[language] || en;
  }, [language]);

  /**
   * Helper function to look up nested dictionary keys.
   * Example: t('nav.places', 'Places')
   */
  const t = useCallback<TranslateFn>(
    (path, fallback = "") => {
      if (!path) return fallback;
      const parts = path.split(".");
      let current: unknown = dict;

      for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
          current = (current as Record<string, unknown>)[part];
        } else {
          return fallback || path;
        }
      }

      return typeof current === "string" ? current : fallback || path;
    },
    [dict],
  );

  const value = useMemo<LanguageValue>(
    () => ({
      language,
      setLanguage,
      t,
      dict,
      isNepali: language === "ne",
      isHydrated: true,
    }),
    [language, setLanguage, t, dict],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
