"use client";
/* eslint-disable @next/next/no-img-element */

import { useLanguage } from "@/i18n/LanguageContext";
import type { MediaItem } from "@/lib/gallery";

/** Square thumbnail style for one item (shared with nothing else; kept here so the grid owns its look). */
function thumbStyle(m: MediaItem): React.CSSProperties {
  const { x, y, zoom } = m.crop;
  return {
    objectPosition: `${x}% ${y}%`,
    transformOrigin: `${x}% ${y}%`,
    transform: zoom > 1 ? `scale(${zoom})` : undefined,
  };
}

/** A phone-camera-roll grid: tight square tiles, play badge and length on videos. */
export default function MediaGrid({ items, onOpen }: { items: MediaItem[]; onOpen: (index: number) => void }) {
  const { t, isNepali } = useLanguage();

  return (
    <ul className="grid grid-cols-3 gap-0.5 sm:grid-cols-4 sm:gap-1 lg:grid-cols-5" role="list">
      {items.map((m, i) => {
        const caption = isNepali ? m.caption.ne : m.caption.en;
        return (
          <li key={m.id}>
            <button
              onClick={() => onOpen(i)}
              aria-label={t("pages.albums.open", "Open {caption}").replace("{caption}", caption)}
              className="group relative block aspect-square w-full overflow-hidden bg-wood/15 focus-visible:z-10"
            >
              <img
                src={m.type === "video" ? (m.poster ?? m.src) : m.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                style={m.natural ? undefined : thumbStyle(m)}
              />
              {m.type === "video" && (
                <>
                  <span className="absolute inset-0 bg-black/10" aria-hidden />
                  <span className="absolute bottom-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-cream" aria-hidden>
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {m.duration && (
                    <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-cream">
                      {m.duration}
                    </span>
                  )}
                </>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
