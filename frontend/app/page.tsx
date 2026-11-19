"use client";

import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import PanoramaViewer from "@/components/PanoramaViewer";
import HeritageMap from "@/components/HeritageMap";
import PlaceCard from "@/components/PlaceCard";
import QuizTeaser from "@/components/QuizTeaser";
import { places, scenes } from "@/lib/places";
import AskButton from "@/components/AskButton";
import { Reveal, SectionTitle, Stamp, PagodaDivider } from "@/components/ui";
import { chatSuggestions, evidenceMeta, type Evidence } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageContext";

const PILLAR_KEYS = ["water", "worship", "art", "community"] as const;

export default function Home() {
  const { t, dict } = useLanguage();

  return (
    <>
      <HomeHero />

      {/* Intro */}
      <section className="mx-auto max-w-2xl px-5 py-14 text-center">
        <Reveal>
          <PagodaDivider className="text-brick" />
          <p className="font-display mt-6 text-2xl leading-snug text-brick sm:text-3xl">
            {t("home.intro.quote")}
          </p>
          <p className="mt-4 text-lg text-wood/80">{t("home.intro.body")}</p>
        </Reveal>
      </section>

      {/* Two places */}
      <section className="mx-auto max-w-5xl px-5 pb-6">
        <Reveal>
          <SectionTitle titleKey="twoPlaces" />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {places.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <PlaceCard place={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Look around */}
      <section className="relative mt-12 overflow-hidden bg-gradient-to-b from-wood to-brick-deep px-5 py-16 text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <SectionTitle titleKey="lookAroundCourtyards" light />
            <p className="mx-auto mt-3 max-w-md text-center text-cream/80">{t("home.lookAroundBody")}</p>
          </Reveal>
          <Reveal className="mt-8" delay={0.1}>
            <PanoramaViewer scenes={scenes} />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <SectionTitle titleKey="wardMap" />
          <p className="mx-auto mt-3 max-w-md text-center text-wood/80">{t("home.mapBody")}</p>
        </Reveal>
        <Reveal className="mt-8" delay={0.1}>
          <HeritageMap />
        </Reveal>
      </section>

      {/* Living heritage rail */}
      <section className="py-14">
        <Reveal>
          <SectionTitle titleKey="livingHeritage" />
        </Reveal>
        <div className="rail mt-8 flex gap-4 overflow-x-auto px-5 pb-4 md:mx-auto md:max-w-5xl md:grid md:grid-cols-4 md:overflow-visible">
          {PILLAR_KEYS.map((key) => {
            const p = dict.home.pillars[key];
            return (
              <div key={key} className="wood-frame w-[72%] shrink-0 rounded-2xl bg-paper p-5 sm:w-[40%] md:w-auto">
                <p className="font-display text-4xl text-brick">{p.ne}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-vermilion">{p.en}</p>
                <p className="mt-3 text-[15px] text-wood/85">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Festival teaser */}
      <section className="relative overflow-hidden bg-teal-deep px-5 py-16 text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
        <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full" aria-hidden>
          {[12, 30, 52, 74, 90].map((x, i) => (
            <svg key={x} x={`${x}%`} y="100%" overflow="visible">
              <g className="diya-rise" style={{ animationDelay: `${i * 1.3}s`, animationDuration: "9s" }}>
                <ellipse rx="9" ry="4" fill="#8b2e1f" />
                <path d="M0-3C-3-8 0-11 0-14 3-11 3-8 0-3Z" fill="#e8a317" className="flame" />
              </g>
            </svg>
          ))}
        </svg>
        <Reveal className="relative mx-auto max-w-xl text-center">
          <p className="font-deva text-sm font-semibold text-marigold">{t("home.festival.eyebrow")}</p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl">{t("home.festival.title")}</h2>
          <p className="mt-4 text-lg text-cream/85">{t("home.festival.body")}</p>
          <div className="mt-5 flex justify-center">
            <Stamp type="verify" size="md" />
          </div>
          <p className="mx-auto mt-2 max-w-sm text-sm text-cream/70">{t("home.festival.note")}</p>
          <Link
            href="/festival"
            className="mt-6 inline-flex min-h-[52px] items-center rounded-full bg-marigold px-7 font-semibold text-wood transition active:scale-95"
          >
            {t("home.festival.cta")}
          </Link>
        </Reveal>
      </section>

      {/* How we label */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <SectionTitle titleKey="howWeLabel" />
          <p className="mx-auto mt-3 max-w-lg text-center text-wood/80">{t("home.labelsBody")}</p>
        </Reveal>
        <div className="mt-8 space-y-3">
          {(["documented", "reported", "oral", "belief"] as Evidence[]).map((type, i) => (
            <Reveal key={type} delay={i * 0.06}>
              <div className="flex items-center gap-4 rounded-2xl bg-paper/70 p-4">
                <div className="w-40 shrink-0">
                  <Stamp type={type} />
                </div>
                <p className="text-[15px] text-wood/85">
                  {t(`evidence.${type}.hint`, evidenceMeta[type].hint)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interactive Quiz Teaser */}
      <Reveal>
        <QuizTeaser />
      </Reveal>

      {/* Ask CTA */}
      <section className="mx-auto max-w-2xl px-5 pb-6">
        <Reveal>
          <div className="wood-frame rounded-3xl bg-brick p-7 text-center text-cream">
            <p className="font-deva text-sm font-semibold text-marigold">{t("home.ask.eyebrow")}</p>
            <h2 className="font-display text-3xl">{t("home.ask.title")}</h2>
            <p className="mt-2 text-cream/85">{t("home.ask.body")}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {chatSuggestions.map((q, i) => {
                const question = t(`chatSuggestions.${i}`, q);
                return (
                  <AskButton
                    key={q}
                    question={question}
                    className="min-h-[44px] rounded-full border border-marigold/70 px-4 text-sm text-cream transition active:scale-95 hover:bg-marigold hover:text-wood"
                  >
                    {question}
                  </AskButton>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
