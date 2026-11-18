"use client";

import { video } from "@/lib/places";
import { useLanguage } from "@/i18n/LanguageContext";

/** Lightweight video: nothing downloads until the visitor presses play (kind to mobile data). */
export default function VideoWalk() {
  const { t } = useLanguage();

  return (
    <figure>
      <div className="wood-frame overflow-hidden rounded-3xl bg-wood">
        <video
          controls
          playsInline
          muted
          preload="none"
          poster={video.poster}
          className="aspect-video w-full object-cover"
          aria-label={t("videoCopy.title", video.title)}
        >
          <source src={video.src} type="video/mp4" />
          {t("components.video.unsupported", "Your browser can't play this video.")}
        </video>
      </div>
      <figcaption className="mt-3 text-center text-sm text-wood/70">
        {t("videoCopy.caption", video.caption)}
      </figcaption>
    </figure>
  );
}
