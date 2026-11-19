"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import type { MediaItem } from "@/lib/gallery";

/**
 * Full-screen viewer for photos and videos: swipe or use the arrows, Esc to close,
 * tap a photo to zoom. Items marked as placeholders are labelled "Sample".
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const { t, isNepali } = useLanguage();
  const item = items[index];
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      setZoomed(false);
      onIndex((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  // keyboard, scroll lock, focus
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  if (!item) return null;
  const caption = isNepali ? item.caption.ne : item.caption.en;
  const { x, y, zoom } = item.crop;
  const btn =
    "flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-cream transition hover:bg-white/25 active:scale-90";

  // Rendered on <body> so no page container can stack above it (the header and chat button included).
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      className="fixed inset-0 z-[90] flex flex-col bg-black/95 text-cream"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || zoomed) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-semibold tabular-nums text-cream/80">
          {index + 1} / {items.length}
        </p>
        <button ref={closeRef} onClick={onClose} aria-label={t("pages.albums.close", "Close")} className={btn}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2">
        <button onClick={() => go(-1)} aria-label={t("pages.albums.prev", "Previous")} className={`${btn} absolute left-2 z-10 hidden sm:flex`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        {item.type === "video" ? (
          <video
            key={item.id}
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            autoPlay
            muted
            className="max-h-full w-full max-w-3xl rounded-lg bg-black"
          />
        ) : item.natural ? (
          <img
            key={item.id}
            src={item.src}
            alt={caption}
            onClick={() => setZoomed((z) => !z)}
            className={`max-h-full max-w-full cursor-zoom-in rounded-lg object-contain transition-transform duration-300 ${zoomed ? "scale-[1.8] cursor-zoom-out" : ""}`}
          />
        ) : (
          <div
            className="relative aspect-[4/5] max-h-full w-full max-w-md cursor-zoom-in overflow-hidden rounded-lg bg-wood/40"
            onClick={() => setZoomed((z) => !z)}
          >
            <img
              key={item.id}
              src={item.src}
              alt={caption}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
              style={{
                objectPosition: `${x}% ${y}%`,
                transformOrigin: `${x}% ${y}%`,
                transform: `scale(${zoomed ? zoom * 1.6 : zoom})`,
              }}
            />
          </div>
        )}

        <button onClick={() => go(1)} aria-label={t("pages.albums.next", "Next")} className={`${btn} absolute right-2 z-10 hidden sm:flex`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="px-5 pb-6 pt-3 text-center">
        <p className="font-display text-lg">{caption}</p>
        {item.placeholder && (
          <p className="mt-1 text-xs text-cream/60">
            {t("pages.albums.sample", "Sample picture. Real photographs will replace it.")}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
