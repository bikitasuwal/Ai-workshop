"use client";

import { Reveal } from "@/components/ui";
import ImageFrame from "@/components/ui/ImageFrame";
import { useLanguage } from "@/i18n/LanguageContext";

/** Home section 1: a heading, one paragraph about Ward 16, and a framed photograph. */
export default function WardOverview() {
  const { t } = useLanguage();

  return (
    <section className="bg-cream py-20 lg:py-28 ">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-vermilion">{t("home.overview.eyebrow")}</p>
          <h2 className="font-display mt-3 text-3xl leading-tight text-wood sm:text-4xl lg:text-5xl">
            {t("home.overview.headingLead")} <span className="block text-brick">{t("home.overview.headingAccent")}</span>
          </h2>
          <div className="my-6 h-px w-12 bg-marigold" aria-hidden />
          <p className="text-[17px] leading-[1.8] text-wood/80 text-justify">{t("home.overview.p1")}</p>
          <p className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-wood/50">
            <span className="h-px w-8 bg-wood/25" aria-hidden />
            {t("home.overview.place")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ImageFrame
            src="/media/ward16.jpg"
            alt={t("home.overview.place")}
            aspect="portrait"
            sizes="(max-width: 1024px) 100vw, 520px"
          />
        </Reveal>
      </div>
    </section>
  );
}
