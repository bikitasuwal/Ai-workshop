"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { countFor, type Album } from "@/lib/gallery";

const tone = {
  teal: "from-teal to-teal-deep",
  brick: "from-brick to-brick-deep",
  wood: "from-wood to-brick-deep",
  marigold: "from-marigold to-brick",
} as const;

/** One album on the gallery home: a big cover, the title and how many items it holds. */
export default function AlbumCard({ album, wideOnPhone = false }: { album: Album; wideOnPhone?: boolean }) {
  const { t, isNepali } = useLanguage();
  const n = album.id === "visitors" ? null : countFor(album.id);

  return (
    <Link
      href={`/gallery/${album.id}`}
      className={`wood-frame group relative block overflow-hidden rounded-2xl bg-wood transition active:scale-[0.98] ${wideOnPhone ? "aspect-[16/9] sm:aspect-[4/5]" : "aspect-[4/5]"}`}
    >
      {album.cover ? (
        <img
          src={album.cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${tone[album.tone]}`}>
          <div className="lattice absolute inset-0 opacity-20" aria-hidden />
          <svg viewBox="0 0 24 24" className="absolute left-1/2 top-[38%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-cream/80" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <circle cx="12" cy="13" r="3.5" />
            <path d="M8 6l1.5-2h5L16 6" />
          </svg>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-14 text-cream">
        <p className="font-display text-xl leading-tight">{isNepali ? album.title.ne : album.title.en}</p>
        <p className="mt-0.5 text-sm text-cream/80">
          {isNepali ? album.blurb.ne : album.blurb.en}
          {n !== null && (
            <>
              {" · "}
              {t("pages.albums.items", "{n} items").replace("{n}", String(n))}
            </>
          )}
        </p>
      </div>
    </Link>
  );
}
