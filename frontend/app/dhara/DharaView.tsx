"use client";

/**
 * app/dhara/DharaView.tsx — client body of /dhara.
 * The server wrapper (page.tsx) owns the `metadata` export.
 */

import Link from "next/link";
import FactAccordion from "@/components/FactAccordion";
import SpoutGrid from "@/components/SpoutGrid";
import AskButton from "@/components/AskButton";
import PanoramaViewer from "@/components/PanoramaViewer";
import VideoWalk from "@/components/VideoWalk";
import PageLayout from "@/components/ui/PageLayout";
import { scenes } from "@/lib/places";
import { Reveal, SectionTitle } from "@/components/ui";
import { byPlace } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageContext";

export default function DharaView() {
  const { t } = useLanguage();

  return (
    <>
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
          <path d="M0 24V12q25-14 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0V24Z" fill="currentColor" />
        </svg>
      </section>

      <PageLayout variant="narrow" underHero>
        <PageLayout.Section>
          <Reveal>
            <SectionTitle titleKey="dharaSpouts" />
          </Reveal>
          <Reveal className="mt-6">
            <SpoutGrid />
          </Reveal>
        </PageLayout.Section>

        <PageLayout.Section>
          <Reveal>
            <SectionTitle titleKey="dharaWalk" />
          </Reveal>
          <Reveal className="mt-6">
            <VideoWalk />
          </Reveal>
        </PageLayout.Section>
      </PageLayout>

      {/* Full-bleed panorama band */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wood to-teal-deep px-5 py-14 text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <SectionTitle titleKey="lookAround" light />
          </Reveal>
          <Reveal className="mt-6" delay={0.1}>
            <PanoramaViewer scenes={scenes.filter((s) => s.placeId === "dhara")} />
          </Reveal>
        </div>
      </section>

      <PageLayout variant="narrow" underHero>
        <PageLayout.Section>
          <Reveal>
            <SectionTitle titleKey="dharaStory" />
            <p className="mx-auto mt-2 max-w-md text-center text-wood/75">{t("pages.dhara.storyIntro")}</p>
          </Reveal>
          <div className="mt-6">
            <FactAccordion items={byPlace("dhara")} accent="teal" />
          </div>
        </PageLayout.Section>

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
