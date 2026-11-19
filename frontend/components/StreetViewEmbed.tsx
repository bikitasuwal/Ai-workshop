"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { streetViewSrc } from "@/lib/streetview";
import type { PlaceId } from "@/lib/quizzes";

/** Click-to-load Google Street View, styled like the rest of the site.
 *  Renders nothing until a view is configured for the place. */
export default function StreetViewEmbed({ place }: { place: PlaceId }) {
  const { isNepali } = useLanguage();
  const [open, setOpen] = useState(false);
  const src = streetViewSrc(place);

  if (!src) return null;

  const title = isNepali ? "गुगल स्ट्रिट भ्यू ३६°" : "Google Street View 360°";

  return (
    <div className="wood-frame overflow-hidden rounded-3xl bg-cream">
      {open ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[360px] w-full border-0 sm:h-[460px]"
        />
      ) : (
        <div className="flex h-[360px] flex-col items-center justify-center gap-4 bg-gradient-to-b from-paper to-cream px-6 text-center sm:h-[460px]">
          <p className="font-display text-2xl text-brick">{title}</p>
          <p className="max-w-sm text-wood/75">
            {isNepali
              ? "गुगलको स्ट्रिट-लेभल तस्बिरमा ठाउँ वरिपरि घुमेर हेर्नुहोस्। यसले गुगलबाट सामग्री लोड गर्छ।"
              : "Look around the place using Google's street-level imagery. This loads content from Google."}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-marigold px-6 font-semibold text-wood active:scale-95"
          >
            {isNepali ? "३६° दृश्य खोल्नुहोस्" : "Open 360° view"}
          </button>
        </div>
      )}
    </div>
  );
}