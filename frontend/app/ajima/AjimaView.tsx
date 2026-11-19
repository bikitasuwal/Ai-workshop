"use client";

/**
 * app/ajima/AjimaView.tsx — client body of /ajima.
 * The server wrapper (page.tsx) owns the `metadata` export.
 */

import Link from "next/link";
import FactAccordion from "@/components/FactAccordion";
import AskButton from "@/components/AskButton";
import PanoramaViewer from "@/components/PanoramaViewer";
import PageLayout from "@/components/ui/PageLayout";
import { scenes } from "@/lib/places";
import { Reveal, SectionTitle } from "@/components/ui";
import { byPlace } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageContext";
import PlaceInteractive from "@/components/ui/PlaceInteractive";
import StreetViewEmbed from "@/components/StreetViewEmbed";

export default function AjimaView() {
  const { t, language: lang } = useLanguage();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-wood via-brick-deep to-brick px-5 pb-20 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
        <Reveal className="relative mx-auto max-w-xl">
          <svg viewBox="0 0 120 70" className="mx-auto mb-3 h-16" aria-hidden>
            <path d="M8 68V36a52 52 0 0 1 104 0v32" fill="none" stroke="#e8a317" strokeWidth="2" />
            <path d="M20 68V38a40 40 0 0 1 80 0v30" fill="none" stroke="#e8a317" strokeWidth="1" opacity=".6" />
            <path d="M60 58c-7-8-1-14 0-21 1 7 7 13 0 21Z" fill="#e8a317" className="flame" style={{ transformOrigin: "60px 58px" }} />
            <ellipse cx="60" cy="60" rx="14" ry="4" fill="#faf3e3" opacity=".9" />
          </svg>
          <p className="font-deva text-lg font-semibold text-marigold">प्याः थ्वँ अजिमा</p>
          <h1 className="font-display mt-1 text-4xl sm:text-5xl">Pyah Thwam Ajima</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-cream/85">
            {t("pages.ajima.subtitle", "A protective mother-goddess shrine inside Balaju Baisdhara Park, also known as Shitala Mai.")}
          </p>
        </Reveal>
        <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream" aria-hidden>
          <path d="M0 24V12l25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10V24Z" fill="currentColor" />
        </svg>
      </section>

      {/* Respect note */}
      <PageLayout variant="narrow" underHero>
        <PageLayout.Section>
          <Reveal>
            <aside className="flex gap-4 rounded-2xl border-2 border-dashed border-marigold bg-paper/80 p-5">
              <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden>
                <path d="M20 4c4 4 5 7 0 11-5-4-4-7 0-11Z" fill="#e8a317" className="flame" />
                <path d="M6 21h28c0 7-6 12-14 12S6 28 6 21Z" fill="#8b2e1f" />
              </svg>
              <p className="text-[15px] text-wood/90">
                <strong>{t("pages.ajima.respectStrong", "Please be respectful.")}</strong>{" "}
                {t(
                  "pages.ajima.respectBody",
                  "This is a living place of worship. Some rituals may be private or restricted, so ask the Guthi before photographing or recording.",
                )}
              </p>
            </aside>
          </Reveal>
        </PageLayout.Section>
      </PageLayout>

      {/* Full-bleed panorama band */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wood to-brick-deep px-5 py-14 text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <SectionTitle titleKey="lookAroundShrine" light />
          </Reveal>
          <Reveal className="mt-6" delay={0.1}>
            <PanoramaViewer scenes={scenes.filter((s) => s.placeId === "ajima")} />
          </Reveal>
           <Reveal className="mt-6" delay={0.2}>
            <StreetViewEmbed place="ajima" />
          </Reveal>
        </div>
      </section>

      <PageLayout variant="narrow" underHero>
        <PageLayout.Section>
          <Reveal>
            <SectionTitle titleKey="ajimaStory" />
            <p className="mx-auto mt-2 max-w-md text-center text-wood/75">
              {t("pages.ajima.storyIntro")}
            </p>
          </Reveal>
          <div className="mt-6">
            <FactAccordion items={byPlace("ajima")} accent="brick" />
          </div>
        </PageLayout.Section>
        
      <PageLayout.Section>
          <Reveal>
            <PlaceInteractive place="ajima" lang={lang} />
          </Reveal>
        </PageLayout.Section>
        <PageLayout.Section>
          <Reveal>
            <div className="wood-frame rounded-3xl bg-teal-deep p-6 text-center text-cream">
              <h2 className="font-display text-2xl">{t("pages.ajima.waterTitle")}</h2>
              <p className="mt-2 text-cream/85">{t("pages.ajima.waterBody")}</p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/dhara" className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-marigold px-6 font-semibold text-wood active:scale-95">
                  {t("pages.ajima.visitCta")}
                </Link>
                <AskButton
                  question={t("chatSuggestions.2", "What is Dristi Lekhan?")}
                  className="min-h-[50px] rounded-full border-2 border-marigold/70 px-6 font-semibold active:scale-95"
                >
                  {t("pages.ajima.askCta")}
                </AskButton>
              </div>
            </div>
          </Reveal>
        </PageLayout.Section>
      </PageLayout>
    </>
  );
}
