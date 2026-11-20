"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, SectionTitle } from "@/components/ui";
import { places } from "@/lib/places";
import { useLanguage } from "@/i18n/LanguageContext";

/** Home section 2: the two places as large alternating photo-and-text cards. */
export default function FeaturedLandmarks() {
  const { t, isNepali } = useLanguage();

  return (
    <section id="landmarks" className="scroll-mt-16 bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionTitle titleKey="homeLandmarks" />
          <p className="mx-auto mt-5 max-w-xl text-center text-wood/75">{t("home.landmarks.sub")}</p>
        </Reveal>

        <div className="mt-12 space-y-6">
          {places.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <article className="group relative grid overflow-hidden border border-wood/10 bg-cream shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-2">
                  <div className={`relative aspect-[4/3] overflow-hidden bg-wood lg:aspect-auto lg:min-h-[440px] ${flip ? "lg:order-2" : ""}`}>
                    <Image
                      src={p.photo}
                      alt={t(`placeCopy.${p.id}.photoAlt`, p.photoAlt)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood/70 via-transparent to-wood/20" aria-hidden />
                    <span className="absolute left-4 top-4 bg-wood/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-marigold backdrop-blur-sm">
                      {t(`home.landmarks.${p.id}Tag`)}
                    </span>
                    <span className="font-display absolute bottom-3 left-5 text-7xl leading-none text-cream/40" aria-hidden>
                      {isNepali ? (i === 0 ? "०१" : "०२") : `0${i + 1}`}
                    </span>
                  </div>

                  <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                    <span className="font-display absolute right-6 top-4 text-6xl leading-none text-marigold/25" aria-hidden>
                      {isNepali ? (i === 0 ? "०१" : "०२") : `0${i + 1}`}
                    </span>
                    <p className="font-deva text-sm font-semibold text-vermilion">{p.neLong}</p>
                    <h3 className="font-display mt-1 text-3xl text-wood sm:text-4xl">{p.name}</h3>
                    <p className="mt-1 text-sm font-medium text-wood/55">{t(`home.landmarks.${p.id}Sub`)}</p>
                    <div className="my-5 h-px w-12 bg-marigold" aria-hidden />
                    <p className="text-[17px] leading-[1.75] text-wood/80">{t(`placeCopy.${p.id}.summary`, p.summary)}</p>
                    <Link
                      href={p.href}
                      className="mt-7 inline-flex min-h-[44px] items-center gap-2 self-start text-[13px] font-semibold uppercase tracking-[0.18em] text-brick transition-colors after:absolute after:inset-0 hover:text-brick-deep"
                    >
                      {t("home.landmarks.explore")} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
