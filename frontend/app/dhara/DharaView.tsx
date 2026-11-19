"use client";

/**
 * app/dhara/DharaView.tsx — client body of /dhara.
 * Comprehensive living heritage archive for 22 Dhara (Balaju Baisdhara).
 */

import Link from "next/link";
import FactAccordion from "@/components/FactAccordion";
import AskButton from "@/components/AskButton";
import PanoramaViewer from "@/components/PanoramaViewer";
import VideoWalk from "@/components/VideoWalk";
import PageLayout from "@/components/ui/PageLayout";
import InteractiveSuite from "@/components/interactive/InteractiveSuite";
import HistoricalTimeline from "@/components/heritage/HistoricalTimeline";
import ArchitectureDeepDive from "@/components/heritage/ArchitectureDeepDive";
import Ward16Description from "@/components/heritage/Ward16Description";
import StoryCard from "@/components/archive/StoryCard";
import StreetViewEmbed from "@/components/StreetViewEmbed";
import { scenes } from "@/lib/places";
import { Reveal, SectionTitle } from "@/components/ui";
import { byPlace } from "@/lib/content";
import { HERITAGE_SITES_DATA } from "@/lib/heritageDetailData";
import { INITIAL_APPROVED_STORIES } from "@/lib/communityStories";
import { useLanguage } from "@/i18n/LanguageContext";

export default function DharaView() {
  const { t, isNepali } = useLanguage();
  const siteData = HERITAGE_SITES_DATA["22-dhara"];

  // Stories specifically linked to 22 Dhara
  const dharaStories = INITIAL_APPROVED_STORIES.filter(
    (s) => s.heritageLocation.id === "22-dhara"
  );

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

      {/* Video Tour & Ward 16 Overview */}
      <PageLayout variant="wide" underHero>
        <PageLayout.Section>
          <Reveal>
            <SectionTitle titleKey="dharaWalk" />
          </Reveal>
          <Reveal className="mt-6">
            <VideoWalk />
          </Reveal>
        </PageLayout.Section>

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
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-cream/80">
              {isNepali
                ? "बाइसधारा परिसरको ३६० डिग्री भर्चुअल दृश्य अवलोकन गर्नुहोस्।"
                : "Explore 360-degree panoramic views of the water spouts and surrounding promenade."}
            </p>
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
      <PageLayout variant="wide" underHero>
        <PageLayout.Section>
          <Reveal>
            <InteractiveSuite siteData={siteData} />
          </Reveal>
        </PageLayout.Section>

        {/* Historical Chronicles */}
        <PageLayout.Section>
          <Reveal>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="font-deva text-xs font-semibold uppercase tracking-wider text-vermilion">
                  {isNepali ? "शाही वंशावली तथा अभिलेख" : "Royal Chronicles & Historical Inception"}
                </p>
                <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
                  {isNepali ? "इतिहास र निर्माण पृष्ठभूमि" : "Chronicle of the 22 Spouts"}
                </h3>
                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-wood/80">
                  {isNepali ? siteData.history.summary.ne : siteData.history.summary.en}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 pt-2">
                {siteData.history.chronicles.map((ch, idx) => (
                  <div
                    key={idx}
                    className="wood-frame rounded-2xl bg-paper p-5 sm:p-6 text-wood shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-wood/10 pb-2">
                        <span className="font-mono text-xs text-marigold-deep text-vermilion font-semibold">
                          0{idx + 1}
                        </span>
                        <span className="rounded-full bg-wood/10 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase text-wood">
                          Documented
                        </span>
                      </div>
                      <h4 className="font-display text-base font-bold text-brick">
                        {isNepali ? ch.heading.ne : ch.heading.en}
                      </h4>
                      <p className="text-sm leading-relaxed text-wood/85">
                        {isNepali ? ch.text.ne : ch.text.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
              eyebrow={isNepali ? "नेवारी जल इन्जिनियरिङ" : "Hydraulic Engineering & Stone Craft"}
              title={isNepali ? "२२ धाराको वास्तुकला र जलप्रणाली" : "Hydraulic Architecture & Masonry"}
            />
          </Reveal>
        </PageLayout.Section>

        {/* Living Cultural Significance */}
        <PageLayout.Section>
          <Reveal>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="font-deva text-xs font-semibold uppercase tracking-wider text-vermilion">
                  {isNepali ? "जीवन्त परम्परा र आस्था" : "Living Traditions & Pilgrimage"}
                </p>
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
                    <span className="rounded-full bg-marigold/30 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-wood uppercase">
                      {item.traditionType}
                    </span>
                    <h4 className="font-display text-lg font-bold text-brick mt-2">
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

        {/* Community Stories on 22 Dhara with Form CTA */}
        <PageLayout.Section>
          <Reveal>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-wood/15 pb-4">
                <div>
                  <p className="font-deva text-xs font-semibold uppercase tracking-wider text-vermilion">
                    {isNepali ? "वडा १६ का स्वरहरू" : "Community Voices & Lived Memories"}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
                    {isNepali ? "२२ धाराका सामुदायिक सम्झनाहरू" : "Memories of the 22 Waters"}
                  </h3>
                </div>

                <Link
                  href="/stories/submit?location=22-dhara"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brick px-5 py-2.5 text-xs font-semibold text-cream shadow-sm hover:bg-brick-deep active:scale-95"
                >
                  <span>+</span>
                  <span>{isNepali ? "२२ धाराबारे कथा थप्नुहोस्" : "Share a 22 Dhara Story"}</span>
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {dharaStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </div>
          </Reveal>
        </PageLayout.Section>

        {/* Fact Accordion */}
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
