"use client";

/**
 * app/festival/FestivalView.tsx — client body of /festival.
 * Features:
 * - Prominent spotlight on the Most Recent Upcoming Festival & its verified description right in the hero
 * - Hamro Patro-style Bikram Sambat dual calendar
 * - Interactive Upcoming and Associated Festivals showcase with category filters
 */

import { useState } from "react";
import Link from "next/link";
import FactAccordion from "@/components/FactAccordion";
import AskButton from "@/components/AskButton";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import { byPlace } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageContext";
import HamroPatroCalendar from "@/components/festival/HamroPatroCalendar";
import UpcomingFestivalsShowcase from "@/components/festival/UpcomingFestivalsShowcase";
import {
  FestivalEvent,
  getMostRecentUpcomingFestival,
} from "@/lib/festivalCalendarData";
import { toNepaliNum } from "@/components/festival/HamroPatroCalendar";

export default function FestivalView() {
  const { t, isNepali } = useLanguage();
  const [selectedFestival, setSelectedFestival] = useState<FestivalEvent | null>(null);

  // Get the most recent upcoming festival (Baisdhara Mela / Lhuti Punhi)
  const recentFest = getMostRecentUpcomingFestival();

  const handleSelectFestival = (fest: FestivalEvent) => {
    setSelectedFestival(fest);
    // Smooth scroll down to the festival card if selected
    if (typeof window !== "undefined") {
      const el = document.getElementById(`fest-${fest.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const scrollToCalendar = () => {
    if (typeof window !== "undefined") {
      const el = document.getElementById("nepali-patro-calendar");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Hero Section — Featuring Most Recent Coming Festival & Description */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-deep via-wood to-wood px-5 pb-20 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />

        {/* Rising ceremonial Diyas */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          {[10, 28, 46, 64, 82, 94].map((x, i) => (
            <svg key={x} x={`${x}%`} y="100%" overflow="visible">
              <g className="diya-rise" style={{ animationDelay: `${i * 1.1}s`, animationDuration: "8s" }}>
                <ellipse rx="9" ry="4" fill="#8b2e1f" />
                <path d="M0-3C-3-8 0-11 0-14 3-11 3-8 0-3Z" fill="#e8a317" className="flame" />
              </g>
            </svg>
          ))}
        </svg>

        <Reveal className="relative mx-auto max-w-3xl">
          {/* Eyebrow: Most Recent Upcoming Festival Badge + Live Countdown */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-vermilion/20 px-4 py-1.5 text-xs font-semibold text-marigold border border-marigold/30 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-marigold animate-pulse" />
            <span className="font-deva tracking-wide">
              {isNepali ? "आउँदो प्रमुख चाडपर्व" : "Next Upcoming Festival"}
            </span>
            <span className="text-cream/50">•</span>
            <span className="font-deva text-cream">
              {isNepali ? recentFest.bsDate.ne : recentFest.bsDate.en}
            </span>
            {recentFest.daysRemaining !== undefined && (
              <span className="rounded-full bg-vermilion px-2 py-0.5 font-bold text-cream">
                {isNepali
                  ? `${toNepaliNum(recentFest.daysRemaining)} दिन बाँकी`
                  : `In ${recentFest.daysRemaining} days`}
              </span>
            )}
          </div>

          {/* Main Title: Most Recent Festival Name */}
          <h1 className="font-display mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream drop-shadow-sm">
            {isNepali ? recentFest.name.ne : recentFest.name.en}
          </h1>
          <p className="font-deva text-sm sm:text-base text-marigold/90 mt-1 font-medium">
            {isNepali ? recentFest.name.en : recentFest.name.ne}
          </p>

          {/* Description of the Most Recent Coming Festival */}
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-cream/90 font-sans">
            {isNepali ? recentFest.description.ne : recentFest.description.en}
          </p>

          {/* Key Quick Details Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 rounded-full bg-cream/10 px-3.5 py-1.5 backdrop-blur-sm border border-cream/15 text-cream/90">
              <span>📅</span>
              <span className="font-deva font-medium">
                {isNepali ? recentFest.bsDate.ne : recentFest.bsDate.en}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-cream/10 px-3.5 py-1.5 backdrop-blur-sm border border-cream/15 text-cream/90">
              <span>🌙</span>
              <span className="font-deva font-medium">
                {isNepali ? recentFest.tithi.ne : recentFest.tithi.en}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-cream/10 px-3.5 py-1.5 backdrop-blur-sm border border-cream/15 text-cream/90">
              <span>📍</span>
              <span className="font-deva font-medium">
                {isNepali ? recentFest.placeName.ne : recentFest.placeName.en}
              </span>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToCalendar}
              className="rounded-full bg-marigold px-6 py-2.5 text-sm font-bold text-wood shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              {isNepali ? "📅 हाम्रो पात्रो क्यालेन्डर हेर्नुहोस्" : "📅 View in Patro Calendar"}
            </button>
            <AskButton
              question={
                isNepali
                  ? `${recentFest.name.ne} को ऐतिहासिक तथा धार्मिक विधि के-के हुन्?`
                  : `What are the core rituals and history of ${recentFest.name.en}?`
              }
              className="rounded-full bg-brick px-6 py-2.5 text-sm font-semibold text-cream shadow-lg hover:bg-brick/90 transition-transform hover:scale-105 active:scale-95"
            >
              {isNepali ? "मार्गदर्शकलाई सोध्नुहोस्" : "Ask Heritage Guide"}
            </AskButton>
          </div>
        </Reveal>

        {/* Decorative Wave Divider */}
        <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream" aria-hidden>
          <path d="M0 24V12l25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10V24Z" fill="currentColor" />
        </svg>
      </section>

      <PageLayout underHero>
        {/* Spotlight Card: Rituals & Cultural Merit of the Upcoming Festival */}
        <PageLayout.Section>
          <Reveal>
            <div className="wood-frame relative overflow-hidden rounded-3xl bg-paper p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-wood/10 pb-4">
                <div>
                  <span className="font-deva text-xs font-bold uppercase tracking-wider text-vermilion">
                    {isNepali ? "नजिकिँदै गरेको मुख्य आकर्षण" : "Upcoming Feature Highlight"}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-brick mt-0.5">
                    {isNepali ? recentFest.name.ne : recentFest.name.en}
                  </h2>
                  <p className="text-xs text-wood/65 mt-0.5">
                    {isNepali ? recentFest.placeName.ne : recentFest.placeName.en} · {isNepali ? recentFest.tithi.ne : recentFest.tithi.en}
                  </p>
                </div>
                {recentFest.link && (
                  <Link
                    href={recentFest.link}
                    className="self-start md:self-auto rounded-full bg-brick px-5 py-2 text-xs font-semibold text-cream shadow hover:bg-brick/90 transition-colors"
                  >
                    {isNepali ? "बालाजु २२ धारा अन्वेषण गर्नुहोस् →" : "Explore 22 Dhara Landmark →"}
                  </Link>
                )}
              </div>

              {/* Core Rituals Grid */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentFest.rituals.map((r, idx) => (
                  <div key={idx} className="rounded-2xl bg-cream/70 p-4 border border-wood/10">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brick/10 font-deva text-xs font-bold text-brick mb-2">
                      {isNepali ? toNepaliNum(idx + 1) : idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-wood/85 leading-relaxed">
                      {isNepali ? r.ne : r.en}
                    </p>
                  </div>
                ))}
              </div>

              {/* Significance footer */}
              <div className="mt-5 rounded-2xl bg-marigold/10 p-4 border border-marigold/30 text-xs sm:text-sm text-wood/90 flex items-start gap-2.5">
                <span className="text-base text-marigold">☸</span>
                <div>
                  <strong className="text-wood font-display">
                    {isNepali ? "धार्मिक तथा सांस्कृतिक महत्त्व: " : "Spiritual Merit: "}
                  </strong>
                  <span>{isNepali ? recentFest.significance.ne : recentFest.significance.en}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </PageLayout.Section>

        {/* Hamro Patro-style Nepali Calendar Section */}
        <PageLayout.Section>
          <Reveal>
            <div id="nepali-patro-calendar" className="text-center mb-6 pt-2">
              <span className="font-deva text-sm font-semibold uppercase tracking-wider text-brick">
                {isNepali ? "नेपाली पात्रो (विक्रम संवत्)" : "Nepali Patro (Bikram Sambat)"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-wood mt-1">
                {isNepali ? "तिथिमिति तथा चाडपर्व क्यालेन्डर" : "Lunar Tithi & Heritage Calendar"}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-wood/75">
                {isNepali
                  ? "हाम्रो पात्रो शैलीमा महिना, तिथि, बिदा र चाडपर्वहरूको सहज अवलोकन।"
                  : "Browse months, lunar tithis, Saturdays, and heritage festival dates in Hamro Patro format."}
              </p>
            </div>
            <HamroPatroCalendar onSelectFestival={handleSelectFestival} />
          </Reveal>
        </PageLayout.Section>

        {/* Featured Upcoming & Recent Festivals Showcase with Filter Tabs */}
        <PageLayout.Section>
          <Reveal>
            <div className="text-center mb-6">
              <span className="font-deva text-sm font-semibold uppercase tracking-wider text-vermilion">
                {isNepali ? "सम्पदा चाडपर्व सङ्ग्रह" : "All Associated Heritage Observances"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-wood mt-1">
                {isNepali ? "२२ धारा, प्याठो अजिमा र वडा १६ का चाडपर्व" : "22 Dhara, Pyatho Ajima & Ward 16 Festivals"}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-wood/75">
                {isNepali
                  ? "नजिकिँदै गरेका र मौसमी जात्रा तथा अनुष्ठानहरूको विस्तृत विवरण र विधि।"
                  : "Upcoming and seasonal jatras, holy baths, and tantric processions across the area."}
              </p>
            </div>
          </Reveal>

          <UpcomingFestivalsShowcase selectedFestivalId={selectedFestival?.id} />
        </PageLayout.Section>

        {/* Verified Cultural Heritage Facts & Questions */}
        <PageLayout.Section>
          <Reveal>
            <SectionTitle titleKey="festivalAbout" />
          </Reveal>
          <div className="mt-6">
            <FactAccordion items={byPlace("festival")} accent="teal" />
          </div>
          <Reveal className="mt-8 text-center">
            <AskButton
              question={
                isNepali
                  ? "बाइसधारा मेला (ल्हुति पुन्हि) कहिले मनाइन्छ र यसको महत्त्व के हो?"
                  : "When is Lhuti Punhi celebrated and what is its religious significance?"
              }
              className="min-h-[52px] rounded-full bg-brick px-7 font-semibold text-cream active:scale-95 shadow-md hover:bg-brick/90"
            >
              {t("pages.festival.askCta")}
            </AskButton>
          </Reveal>
        </PageLayout.Section>
      </PageLayout>
    </>
  );
}
