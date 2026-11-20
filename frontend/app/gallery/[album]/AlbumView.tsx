"use client";

/**
 * app/gallery/[album]/AlbumView.tsx: one album as a camera roll.
 * Place albums list photos and videos (placeholders for now, see lib/gallery.ts).
 * The visitors album loads live from the API: every photo sent through the share form lands here
 * once an admin approves it (only approved submissions are ever returned).
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/ui/PageLayout";
import { Notice, Reveal } from "@/components/ui";
import MediaGrid from "@/components/gallery/MediaGrid";
import Lightbox from "@/components/gallery/Lightbox";
import { getAlbum, mediaFor, type AlbumId, type MediaItem } from "@/lib/gallery";
import { photoUrl, placeName, type Submission } from "@/lib/submissions";
import { chip } from "@/lib/styles";
import { useLanguage } from "@/i18n/LanguageContext";

type Filter = "all" | "photo" | "video";

export default function AlbumView({ albumId }: { albumId: AlbumId }) {
  const { t, isNepali } = useLanguage();
  const album = getAlbum(albumId)!;
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [posts, setPosts] = useState<Submission[] | null>(null);

  useEffect(() => {
    if (albumId !== "visitors") return;
    let live = true;
    fetch("/api/submissions?type=photo", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { submissions: [] }))
      .then((d) => live && setPosts(d.submissions ?? []))
      .catch(() => live && setPosts([]));
    return () => {
      live = false;
    };
  }, [albumId]);

  const all: MediaItem[] = useMemo(() => {
    if (albumId !== "visitors") return mediaFor(albumId);
    const anon = t("pages.albums.anonymous", "Anonymous");
    return (posts ?? []).flatMap((p) =>
      p.photos.map((id) => {
        const place = isNepali ? placeName[p.place].ne : placeName[p.place].en;
        const label = [p.authorName ?? anon, place, p.body].filter(Boolean).join(" · ");
        return {
          id,
          album: "visitors" as const,
          type: "photo" as const,
          src: photoUrl(id),
          caption: { en: label, ne: label },
          crop: { x: 50, y: 50, zoom: 1 },
          natural: true,
          placeholder: false,
        };
      }),
    );
  }, [albumId, posts, t, isNepali]);

  const hasBoth = all.some((m) => m.type === "photo") && all.some((m) => m.type === "video");
  const items = filter === "all" ? all : all.filter((m) => m.type === filter);
  const loading = albumId === "visitors" && posts === null;

  const chips: [Filter, string][] = [
    ["all", t("pages.albums.all", "All")],
    ["photo", t("pages.albums.photosOnly", "Photos")],
    ["video", t("pages.albums.videosOnly", "Videos")],
  ];

  return (
    <PageLayout variant="default">
      <Reveal>
        <Link href="/gallery" className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-teal underline-offset-4 hover:underline">
          <span aria-hidden>←</span> {t("pages.albums.back", "All albums")}
        </Link>
        <h1 className="font-display mt-2 text-4xl text-brick">{isNepali ? album.title.ne : album.title.en}</h1>
        <p className="mt-1 text-wood/75">
          {isNepali ? album.blurb.ne : album.blurb.en}
          {!loading && (
            <>
              {" · "}
              {t("pages.albums.items", "{n} items").replace("{n}", String(all.length))}
            </>
          )}
        </p>
      </Reveal>

      {hasBoth && (
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label={t("pages.albums.filter", "Filter")}>
          {chips.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)} className={chip(filter === k)}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5">
        {loading ? (
          <div className="h-40" aria-hidden />
        ) : all.length === 0 ? (
          <Notice title={t("components.visitorPhotos.emptyTitle", "No visitor photos yet")}>
            {t("components.visitorPhotos.emptyBody", "Approved photos from visitors will appear here.")}
          </Notice>
        ) : items.length === 0 ? (
          <Notice>{t("pages.albums.emptyFilter", "Nothing here yet.")}</Notice>
        ) : (
          <MediaGrid items={items} onOpen={setOpen} />
        )}
      </div>

      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </PageLayout>
  );
}
