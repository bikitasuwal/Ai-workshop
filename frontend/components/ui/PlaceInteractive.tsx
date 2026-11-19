"use client";

import { useId } from "react";
import QuizCard from "@/components/ui/QuizCard";
import { PagodaDivider } from "@/components/ui";
import { L, quizFor, t, type Lang, type Localized, type PlaceId } from "@/lib/quizzes";

const kicker = L("Interactive heritage", "अन्तरक्रियात्मक सम्पदा");

const copy: Record<
  PlaceId,
  { title: Localized; quizTitle: Localized; quizIntro: Localized }
> = {
  dhara: {
    title: L("Explore 22 Dhara interactively", "२२ धारालाई अन्तरक्रियात्मक रूपमा चिन्नुहोस्"),
    quizTitle: L("Test your knowledge: 22 Dhara", "आफ्नो ज्ञान जाँच्नुहोस्: २२ धारा"),
    quizIntro: L(
      "Answer questions about the spouts, the forest and how to visit with respect.",
      "धाराहरू, वन र सम्मानपूर्वक भ्रमण गर्ने तरिकाबारे प्रश्नको उत्तर दिनुहोस्।"
    ),
  },
  ajima: {
    title: L("Explore Pyah Thwam Ajima interactively", "प्याः थ्वँ अजिमालाई अन्तरक्रियात्मक रूपमा चिन्नुहोस्"),
    quizTitle: L("Test your knowledge: Pyah Thwam Ajima", "आफ्नो ज्ञान जाँच्नुहोस्: प्याः थ्वँ अजिमा"),
    quizIntro: L(
      "Answer questions about the shrine, its ritual and how to visit with respect.",
      "मन्दिर, यसको अनुष्ठान र सम्मानपूर्वक भ्रमण गर्ने तरिकाबारे प्रश्नको उत्तर दिनुहोस्।"
    ),
  },
};

export default function PlaceInteractive({ place, lang }: { place: PlaceId; lang: Lang }) {
  const uid = useId();
  const c = copy[place];

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

      <div className="mt-8 max-w-2xl mx-auto">
        <h3 className="font-display text-2xl text-brick">{t(c.quizTitle, lang)}</h3>
        <p className="mt-1 text-wood/75">{t(c.quizIntro, lang)}</p>
        <div className="mt-5">
          <QuizCard questions={quizFor(place)} lang={lang} storageKey={`quiz-best-${place}`} />
        </div>
      </div>
    </section>
  );
}
