"use client";

/**
 * app/page.tsx: the home page.
 * Order: full-screen hero, overview, the two landmarks, the map, a look-around band,
 * the living traditions, and a closing call to share.
 */

import HomeHero from "@/components/HomeHero";
import WardOverview from "@/components/home/WardOverview";
import FeaturedLandmarks from "@/components/home/FeaturedLandmarks";
import LivingTraditions from "@/components/home/LivingTraditions";
import ClosingCta from "@/components/home/ClosingCta";
import PanoramaViewer from "@/components/PanoramaViewer";
import HeritageMap from "@/components/HeritageMap";
import { scenes } from "@/lib/places";
import { Reveal, SectionTitle } from "@/components/ui";
import { useLanguage } from "@/i18n/LanguageContext";
import QuizTeaser from "@/components/QuizTeaser";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <HomeHero />
      <WardOverview />
      <FeaturedLandmarks />

      {/* The map */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle titleKey="wardMap" />
            <p className="mx-auto mt-5 max-w-xl text-center text-wood/75">{t("home.mapBody")}</p>
          </Reveal>
          <Reveal className="mt-10" delay={0.1}>
            <HeritageMap />
          </Reveal>
        </div>
      </section>

      {/* Look around */}
      <section className="relative overflow-hidden bg-wood px-5 py-20 text-cream lg:py-28">
        <div className="lattice absolute inset-0 opacity-[0.05]" aria-hidden />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <SectionTitle titleKey="lookAroundCourtyards" light />
            <p className="mx-auto mt-5 max-w-md text-center text-cream/80">{t("home.lookAroundBody")}</p>
          </Reveal>
          <Reveal className="mt-10" delay={0.1}>
            <PanoramaViewer scenes={scenes} />
          </Reveal>
        </div>
      </section>

      <LivingTraditions />
       <Reveal>
        <QuizTeaser />
      </Reveal>
      <ClosingCta />
    </>
  );
}
