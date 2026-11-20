"use client";

/**
 * app/page.tsx: the home page.
 * Order: full-screen hero, overview, the two landmarks, the map, a quiz teaser, and a closing call to share.
 */

import HomeHero from "@/components/HomeHero";
import WardOverview from "@/components/home/WardOverview";
import FeaturedLandmarks from "@/components/home/FeaturedLandmarks";
import ClosingCta from "@/components/home/ClosingCta";
import HeritageMap from "@/components/HeritageMap";
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

       <Reveal>
        <QuizTeaser />
      </Reveal>
      <ClosingCta />
    </>
  );
}
