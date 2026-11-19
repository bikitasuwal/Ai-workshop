"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import MatchGame from "@/components/ui/MatchGame";
import QuizCard from "@/components/ui/QuizCard";
import { PagodaDivider } from "@/components/ui";
import { chip } from "@/lib/styles";
import { L, pairsFor, quizFor, t, type Lang, type Localized, type PlaceId } from "@/lib/quizzes";

type TabId = "quiz" | "match";

const kicker = L("Interactive heritage", "अन्तरक्रियात्मक सम्पदा");

const tabs: { id: TabId; label: Localized }[] = [
  { id: "quiz", label: L("Heritage Quiz", "सम्पदा प्रश्नोत्तरी") },
  { id: "match", label: L("Match the Meaning", "अर्थ मिलाउनुहोस्") },
];

const copy: Record<
  PlaceId,
  { title: Localized; quizTitle: Localized; quizIntro: Localized; matchTitle: Localized }
> = {
  dhara: {
    title: L("Explore 22 Dhara interactively", "२२ धारालाई अन्तरक्रियात्मक रूपमा चिन्नुहोस्"),
    quizTitle: L("Test your knowledge: 22 Dhara", "आफ्नो ज्ञान जाँच्नुहोस्: २२ धारा"),
    quizIntro: L("Answer questions about the spouts, the forest and how to visit with respect.", "धाराहरू, वन र सम्मानपूर्वक भ्रमण गर्ने तरिकाबारे प्रश्नको उत्तर दिनुहोस्।"),
    matchTitle: L("Match the meaning", "अर्थ मिलाउनुहोस्"),
  },
  ajima: {
    title: L("Explore Pyah Thwam Ajima interactively", "प्याः थ्वँ अजिमालाई अन्तरक्रियात्मक रूपमा चिन्नुहोस्"),
    quizTitle: L("Test your knowledge: Pyah Thwam Ajima", "आफ्नो ज्ञान जाँच्नुहोस्: प्याः थ्वँ अजिमा"),
    quizIntro: L("Answer questions about the shrine, its ritual and how to visit with respect.", "मन्दिर, यसको अनुष्ठान र सम्मानपूर्वक भ्रमण गर्ने तरिकाबारे प्रश्नको उत्तर दिनुहोस्।"),
    matchTitle: L("Match the meaning", "अर्थ मिलाउनुहोस्"),
  },
};

export default function PlaceInteractive({ place, lang }: { place: PlaceId; lang: Lang }) {
  const [active, setActive] = useState<TabId>("quiz");
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = copy[place];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = tabs.findIndex((x) => x.id === active);
    const n = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(tabs[n].id);
    tabRefs.current[n]?.focus();
  }

  return (
    <section aria-labelledby={`${uid}-heading`}>
      {/* Same eyebrow + display heading pattern as SectionTitle */}
      <div className="text-center">
        <p className="font-deva text-sm font-semibold tracking-wide text-vermilion">
          {t(kicker, lang)}
        </p>
        <h2
          id={`${uid}-heading`}
          className="font-display text-3xl leading-tight text-brick sm:text-4xl"
        >
          {t(c.title, lang)}
        </h2>
      </div>
      <PagodaDivider className="mt-3 text-marigold" />

      <div
        role="tablist"
        aria-label={t(c.title, lang)}
        onKeyDown={onKeyDown}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
        {tabs.map((tab, i) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={chip(selected)}
            >
              {t(tab.label, lang)}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel-quiz`}
        aria-labelledby={`${uid}-tab-quiz`}
        hidden={active !== "quiz"}
        className="mt-8"
      >
        <h3 className="font-display text-2xl text-brick">{t(c.quizTitle, lang)}</h3>
        <p className="mt-1 text-wood/75">{t(c.quizIntro, lang)}</p>
        <div className="mt-5">
          <QuizCard questions={quizFor(place)} lang={lang} storageKey={`quiz-best-${place}`} />
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel-match`}
        aria-labelledby={`${uid}-tab-match`}
        hidden={active !== "match"}
        className="mt-8"
      >
        <MatchGame title={t(c.matchTitle, lang)} pairs={pairsFor(place)} lang={lang} />
      </div>
    </section>
  );
}