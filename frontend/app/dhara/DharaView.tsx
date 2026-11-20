"use client";

/**
 * app/dhara/DharaView.tsx — client body of /dhara.
 * Comprehensive living heritage archive for 22 Dhara (Balaju Baisdhara).
 */

import Link from "next/link";
import AskButton from "@/components/AskButton";
import FactAccordion from "@/components/FactAccordion";
import PanoramaViewer from "@/components/PanoramaViewer";
import PageLayout from "@/components/ui/PageLayout";
import InteractiveSuite from "@/components/interactive/InteractiveSuite";
import HistoricalTimeline from "@/components/heritage/HistoricalTimeline";
import ArchitectureDeepDive from "@/components/heritage/ArchitectureDeepDive";
import Ward16Description from "@/components/heritage/Ward16Description";
import StreetViewEmbed from "@/components/StreetViewEmbed";
import { scenes } from "@/lib/places";
import { Reveal, SectionTitle } from "@/components/ui";
import { byPlace } from "@/lib/content";
import { HERITAGE_SITES_DATA } from "@/lib/heritageDetailData";
import { useLanguage } from "@/i18n/LanguageContext";

export default function DharaView() {
  const { t, isNepali } = useLanguage();
  const siteData = HERITAGE_SITES_DATA["22-dhara"];


  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-deep to-teal px-5 pb-20 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
        <Reveal className="relative mx-auto max-w-xl">
          <p className="font-deva text-base font-semibold text-marigold">२२ धारा · बैसधारा</p>
          <h1 className="font-display mt-1 text-5xl">22 Dhara</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-cream/85">{t("pages.dhara.subtitle")}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            {["22 stone spouts", "Balaju, Kathmandu", "Lhuti Punhi festival"].map((c, i) => (
              <li key={c} className="rounded-full border border-marigold/60 px-3 py-1.5 text-cream/90">
                {t(`pages.dhara.badges.${i}`, c)}
              </li>
            ))}
          </ul>
        </Reveal>
        <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream" aria-hidden>
          <path d="M0 24V12q25-14 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0V24Z" fill="currentColor" />
        </svg>
      </section>

      {/* Ward 16 overview */}
      <PageLayout variant="default" underHero>

        {/* Ward 16 Description */}
        <PageLayout.Section>
          <Reveal>
            <Ward16Description variant="dhara" />
          </Reveal>
        </PageLayout.Section>
      </PageLayout>

      {/* Full-bleed 360 panorama band */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wood to-teal-deep px-5 py-14 text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <SectionTitle titleKey="lookAround" light />
          </Reveal>
          <Reveal className="mt-6" delay={0.1}>
            <PanoramaViewer scenes={scenes.filter((s) => s.placeId === "dhara")} />
          </Reveal>
          <Reveal className="mt-6" delay={0.2}>
            <StreetViewEmbed place="dhara" />
          </Reveal>
        </div>
      </section>

      {/* Interactive Suite: Hotspots, Comparison Slider, Spoken Audio Narration, Quiz (with friend's quiz) */}
      <PageLayout variant="default" underHero>
        <PageLayout.Section>
          <Reveal>
            <InteractiveSuite siteData={siteData} />
          </Reveal>
        </PageLayout.Section>


        {/* Chronological Timeline */}
        <PageLayout.Section>
          <Reveal>
            <HistoricalTimeline timeline={siteData.timeline} />
          </Reveal>
        </PageLayout.Section>

        {/* Hydraulic & Architectural Deep-Dive */}
        <PageLayout.Section>
          <Reveal>
            <ArchitectureDeepDive
              introduction={siteData.architecture.introduction}
              features={siteData.architecture.features}
              title={isNepali ? "२२ धाराको वास्तुकला र जलप्रणाली" : "Hydraulic Architecture & Masonry"}
            />
          </Reveal>
        </PageLayout.Section>

        {/* Living Cultural Significance */}
        <PageLayout.Section>
          <Reveal>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
                  {isNepali ? "सांस्कृतिक महत्त्व र जनविश्वास" : "Cultural & Spiritual Significance"}
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {siteData.culturalSignificance.map((item, idx) => (
                  <div
                    key={idx}
                    className="wood-frame rounded-2xl bg-cream p-5 sm:p-6 text-wood shadow-sm"
                  >
                    <h4 className="font-display text-lg font-bold text-brick">
                      {isNepali ? item.title.ne : item.title.en}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-wood/85">
                      {isNepali ? item.description.ne : item.description.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </PageLayout.Section>



        {/* The story, in short pieces */}
        <PageLayout.Section>
          <Reveal>
            <SectionTitle titleKey="dharaStory" />
            <p className="mx-auto mt-2 max-w-md text-center text-wood/75">{t("pages.dhara.storyIntro")}</p>
          </Reveal>
          <div className="mt-6 max-w-3xl mx-auto">
            <FactAccordion items={byPlace("dhara")} accent="teal" />
          </div>
        </PageLayout.Section>
        {/* Sources & Citations */}
        <PageLayout.Section>
          <Reveal>
            <div className="rounded-2xl border border-wood/15 bg-paper/60 p-6 text-xs text-wood/75 space-y-2">
              <p className="font-semibold text-brick font-display text-sm">
                {isNepali ? "प्रमाणित ऐतिहासिक स्रोत तथा सन्दर्भ सामग्री:" : "Archival Sources & References:"}
              </p>
              <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
                {siteData.sources.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </PageLayout.Section>

        {/* Continue to Ajima CTA */}
        <PageLayout.Section>
          <Reveal>
            <div className="wood-frame rounded-3xl bg-brick p-6 text-center text-cream">
              <h2 className="font-display text-2xl">{t("pages.dhara.continueTitle")}</h2>
              <p className="mt-2 text-cream/85">{t("pages.dhara.continueBody")}</p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/ajima" className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-marigold px-6 font-semibold text-wood active:scale-95">
                  {t("pages.dhara.visitCta")}
                </Link>
                <AskButton
                  question={t("chatSuggestions.0", "What is 22 Dhara?")}
                  className="min-h-[50px] rounded-full border-2 border-marigold/70 px-6 font-semibold active:scale-95"
                >
                  {t("pages.dhara.askCta")}
                </AskButton>
              </div>
            </div>
          </Reveal>
        </PageLayout.Section>
      </PageLayout>
    </>
  );
}
