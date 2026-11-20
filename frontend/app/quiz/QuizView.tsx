"use client";

/**
 * app/quiz/QuizView.tsx — client body of /quiz.
 * Dedicated interactive quiz, detective, and spout explorer page.
 */

import Link from "next/link";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, PagodaDivider } from "@/components/ui";
import HeritageQuiz from "@/components/HeritageQuiz";
import { useLanguage } from "@/i18n/LanguageContext";

export default function QuizView() {
  const { isNepali } = useLanguage();

  return (
    <>
      {/* Hero header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wood via-brick-deep to-brick px-5 pb-20 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
        <Reveal className="relative mx-auto max-w-xl">
          <p className="font-deva text-base font-semibold text-marigold">
            {isNepali ? "सम्पदा प्रश्नोत्तरी तथा चुनौती" : "Interactive Knowledge & Challenges"}
          </p>
          <h1 className="font-display mt-1 text-4xl sm:text-5xl">
            {isNepali ? "सम्पदा प्रश्नोत्तरी" : "Balaju Heritage Quiz"}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base sm:text-lg text-cream/85">
            {isNepali
              ? "२२ धारा, प्याठो अजिमा र ल्हुति पुन्हिबारे आफ्नो ज्ञान जाँच्नुहोस्, र इतिहास र धार्मिक आस्था छुट्याउन सिक्नुहोस्।"
              : "Test your understanding of Balaju's 22 spouts, sacred shrines, and festivals while learning to distinguish history from living belief."}
          </p>
        </Reveal>
        <svg
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream"
          aria-hidden
        >
          <path
            d="M0 24V12l25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10V24Z"
            fill="currentColor"
          />
        </svg>
      </section>

      {/* Main Interactive Quiz Container */}
      <PageLayout variant="default" underHero>
        <PageLayout.Section>
          <Reveal>
            <HeritageQuiz />
          </Reveal>
        </PageLayout.Section>

        {/* Explore more resources footer banner */}
        <PageLayout.Section>
          <Reveal>
            <div className="wood-frame mx-auto max-w-2xl rounded-3xl bg-paper/80 p-6 sm:p-8 text-center text-wood">
              <PagodaDivider className="text-brick" />
              <h2 className="font-display mt-4 text-2xl text-brick">
                {isNepali ? "सम्पदा थप जान्न चाहनुहुन्छ?" : "Want to Dive Deeper into the History?"}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-wood/80">
                {isNepali
                  ? "हाम्रो अनुसन्धान नोटहरू, ३६०° दृश्य र स्रोतहरूको सूची हेरी बालाजुको जीवित सम्पदा बुझ्नुहोस्।"
                  : "Explore our research notes, primary source evaluations, and 360° virtual tours of both sacred places."}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link
                  href="/dhara"
                  className="min-h-[44px] inline-flex items-center rounded-full bg-teal px-5 text-sm font-semibold text-cream transition active:scale-95 hover:bg-teal-deep"
                >
                  {isNepali ? "२२ धारा हेर्नुहोस्" : "Explore 22 Dhara"}
                </Link>
                <Link
                  href="/ajima"
                  className="min-h-[44px] inline-flex items-center rounded-full bg-brick px-5 text-sm font-semibold text-cream transition active:scale-95 hover:bg-brick-deep"
                >
                  {isNepali ? "प्याठो अजिमा" : "Pyatho Ajima"}
                </Link>
                <Link
                  href="/sources"
                  className="min-h-[44px] inline-flex items-center rounded-full border border-wood/25 bg-cream px-5 text-sm font-semibold text-wood transition active:scale-95 hover:bg-paper"
                >
                  {isNepali ? "स्रोत र खुला प्रश्नहरू" : "Sources & Open Questions"}
                </Link>
              </div>
            </div>
          </Reveal>
        </PageLayout.Section>
      </PageLayout>
    </>
  );
}
