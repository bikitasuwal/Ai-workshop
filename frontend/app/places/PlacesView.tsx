"use client";

/**
 * app/places/PlacesView.tsx — client body of /places.
 * The two places as photo cards; each opens its own page (/dhara, /ajima).
 * The server wrapper (page.tsx) owns the `metadata` export.
 */

import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import { places } from "@/lib/places";
import { useLanguage } from "@/i18n/LanguageContext";

const toneAccent = {
  teal: "bg-teal",
  brick: "bg-brick",
} as const;

export default function PlacesView() {
  const { t } = useLanguage();

  return (
    <PageLayout variant="default">
      <Reveal>
        <SectionTitle titleKey="twoPlaces" />
        <p className="mx-auto mt-3 max-w-xl text-center text-wood/80">
          {t("pages.places.intro")}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
        {places.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <Link
              href={p.href}
              className="wood-frame group relative flex h-full flex-col overflow-hidden rounded-2xl bg-cream transition-shadow hover:shadow-lg active:scale-[0.99]"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-wood">
                <Image
                  src={p.photo}
                  alt={t(`placeCopy.${p.id}.photoAlt`, p.photoAlt)}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-wood/70 via-transparent to-wood/20"
                  aria-hidden
                />
                <span
                  className={`absolute left-4 top-4 ${toneAccent[p.tone]} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-sm`}
                >
                  {t(`home.landmarks.${p.id}Tag`)}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="font-deva text-sm font-semibold text-vermilion">{p.neLong}</p>
                <h2 className="font-display mt-1 text-2xl text-wood sm:text-3xl">{p.name}</h2>
                <div className="my-4 h-px w-12 bg-marigold" aria-hidden />
                <p className="flex-1 text-[17px] leading-[1.75] text-wood/80">
                  {t(`placeCopy.${p.id}.summary`, p.summary)}
                </p>
                <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start text-[13px] font-semibold uppercase tracking-[0.18em] text-brick transition-colors group-hover:text-brick-deep">
                  {t("components.placeCard.discover", "Discover")} <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </PageLayout>
  );
}
