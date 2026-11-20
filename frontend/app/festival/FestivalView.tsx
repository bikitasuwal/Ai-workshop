"use client";

/**
 * app/festival/FestivalView.tsx — client body of /festival.
 * Features:
 * - Prominent spotlight on the Most Recent Upcoming Festival & its verified description right in the hero
 * - Hamro Patro-style Bikram Sambat dual calendar
 * - Interactive Upcoming and Associated Festivals showcase with category filters
 */

import { useState } from "react";
import FactAccordion from "@/components/FactAccordion";
import AskButton from "@/components/AskButton";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import { byPlace } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageContext";
import UpcomingFestivalsShowcase from "@/components/festival/UpcomingFestivalsShowcase";
import {
  FestivalEvent,
  getMostRecentUpcomingFestival,
} from "@/lib/festivalCalendarData";


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

          {/* Main Title: Most Recent Festival Name */}
          <h1 className="font-display mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream drop-shadow-sm">
            {isNepali ? recentFest.name.ne : recentFest.name.en}
          </h1>
        </Reveal>

        {/* Decorative Wave Divider */}
        <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream" aria-hidden>
          <path d="M0 24V12l25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10V24Z" fill="currentColor" />
        </svg>
      </section>

      <PageLayout underHero>
    
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
