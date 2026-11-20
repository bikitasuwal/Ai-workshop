"use client";

/**
 * app/gallery/GalleryView.tsx: client body of /gallery.
 * Shows the albums; each opens a camera-roll page at /gallery/[album].
 * The server wrapper (page.tsx) owns the `metadata` export.
 */

import Link from "next/link";
import AlbumCard from "@/components/gallery/AlbumCard";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import { albums } from "@/lib/gallery";
import { useLanguage } from "@/i18n/LanguageContext";

export default function GalleryView() {
  const { t } = useLanguage();

  return (
    <PageLayout variant="narrow">
      <Reveal>
        <SectionTitle titleKey="gallery" />
        <p className="mx-auto mt-3 max-w-md text-center text-wood/80">
          {t("pages.gallery.intro")}
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {albums.map((a, i) => (
          <div key={a.id} className={a.id === "visitors" ? "col-span-2 sm:col-span-1" : ""}>
            <Reveal delay={i * 0.06}>
              <AlbumCard album={a} wideOnPhone={a.id === "visitors"} />
            </Reveal>
          </div>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="rounded-3xl border-2 border-dashed border-marigold bg-paper/70 p-6 text-center">
          <h2 className="font-display text-2xl text-brick">{t("pages.gallery.moreTitle")}</h2>
          <p className="mx-auto mt-2 max-w-md text-[17px] text-wood/85">
            {t("pages.gallery.moreBody")}
          </p>
          <Link
            href="/stories/submit"
            className="mt-5 inline-flex min-h-[50px] items-center rounded-full bg-brick px-7 font-semibold text-cream active:scale-95"
          >
            {t("pages.gallery.shareCta")}
          </Link>
        </div>
      </Reveal>
    </PageLayout>
  );
}
