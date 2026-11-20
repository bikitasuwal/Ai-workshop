"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Stamp, PagodaDivider } from "@/components/ui";
import { useLanguage } from "@/i18n/LanguageContext";
import { soundEffects } from "@/lib/soundEffects";

export default function QuizTeaser() {
  const { isNepali } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Fast interactive teaser question:
  const teaser = {
    question: {
      en: "Quick Heritage Check: Who is Pyatho Ajima inside Balaju Park?",
      ne: "द्रुत ज्ञान परीक्षण: बालाजु पार्कभित्र रहेको प्याठो अजिमा को हुन्?",
    },
    options: {
      en: [
        "A 20th-century political leader",
        "A divine protective mother-goddess in Newar religion",
        "A Malla palace cook",
        "A modern decorative statue",
      ],
      ne: [
        "बीसौँ शताब्दीका राजनीतिक नेता",
        "नेवार धर्म र संस्कृतिमा पुजिने रक्षक मातृदेवी",
        "मल्लकालीन राजदरबारका भान्छे",
        "आधुनिक सजावटी मूर्ति",
      ],
    },
    correctIndex: 1,
    evidence: "documented" as const,
    explanation: {
      en: "'Ajima' signifies a protective maternal deity in Newar culture, worshipped for community protection and health.",
      ne: "नेवार संस्कृतिमा 'अजिमा' भन्नाले रक्षक मातृदेवीलाई बुझाउँछ, जसलाई समुदायको रक्षा र आरोग्यका लागि श्रद्धापूर्वक पुजिन्छ।",
    },
  };

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedIdx(idx);
    setAnswered(true);
    if (idx === teaser.correctIndex) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper via-cream to-paper px-5 py-16">
      <div className="lattice absolute inset-0 opacity-[0.05]" aria-hidden />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <PagodaDivider className="text-brick" />
          <p className="font-deva mt-4 text-xs font-bold uppercase tracking-widest text-vermilion">
            {isNepali ? "सम्पदा प्रश्नोत्तरी र खेलहरू" : "Interactive Heritage Quiz & Challenges"}
          </p>
          <h2 className="font-display mt-1 text-3xl text-brick sm:text-4xl">
            {isNepali ? "तपाईं बालाजुलाई कत्तिको चिन्नुहुन्छ?" : "How Well Do You Know Balaju?"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-wood/80 sm:text-base">
            {isNepali
              ? "२२ धारा, प्याठो अजिमा र ल्हुति पुन्हिबारे अन्तरक्रियात्मक प्रश्नोत्तरी मार्फत आफ्नो ज्ञान जाँच्नुहोस्।"
              : "Challenge yourself with interactive quizzes and discover how historians separate facts from folk traditions."}
          </p>
        </div>

        {/* Interactive Teaser Box */}
        <div className="wood-frame mt-8 rounded-3xl bg-cream p-5 sm:p-7">
          <div className="flex items-center justify-between border-b border-wood/10 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brick">
              {isNepali ? "नमुना प्रश्न" : "Sample Challenge"}
            </span>
            <span className="text-xs font-semibold text-wood/60">
              {isNepali ? "१ प्रश्न द्रुत परीक्षण" : "1-Question Instant Check"}
            </span>
          </div>

          <h3 className="font-display mt-4 text-lg text-wood sm:text-xl">
            {isNepali ? teaser.question.ne : teaser.question.en}
          </h3>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {teaser.options[isNepali ? "ne" : "en"].map((optText, i) => {
              const isSelected = selectedIdx === i;
              const isCorrect = i === teaser.correctIndex;

              let style =
                "border-2 border-wood/20 bg-paper/60 text-wood hover:border-marigold hover:bg-paper";

              if (answered) {
                if (isCorrect) {
                  style = "border-2 border-emerald-700 bg-emerald-100 text-emerald-950 font-bold";
                } else if (isSelected) {
                  style = "border-2 border-rose-700 bg-rose-100 text-rose-950";
                } else {
                  style = "border-2 border-wood/10 bg-cream/30 text-wood/40";
                }
              }

              return (
                <button
                  key={i}
                  type="button"
                  disabled={answered}
                  onClick={() => handleSelect(i)}
                  className={`flex min-h-[50px] items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition active:scale-[0.98] ${style}`}
                >
                  <span>{optText}</span>
                  {answered && (
                    <span className="font-bold">
                      {isCorrect ? "✓" : isSelected ? "✗" : ""}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 rounded-xl border border-wood/20 bg-paper p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brick">
                    {selectedIdx === teaser.correctIndex
                      ? isNepali
                        ? "✓ सही उत्तर!"
                        : "✓ Correct!"
                      : isNepali
                        ? "उत्तर:"
                        : "Answer:"}
                  </span>
                  <Stamp type={teaser.evidence} size="sm" />
                </div>
                <p className="mt-1 text-xs text-wood/85 leading-relaxed">
                  {isNepali ? teaser.explanation.ne : teaser.explanation.en}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-wood/10 pt-4 sm:flex-row">
            <span className="text-xs text-wood/75">
              {isNepali
                ? "१०+ बहुविकल्पीय प्रश्नहरू, प्रमाण जासूस र धारा अन्वेषक समावेश"
                : "Includes 10+ questions, Fact or Lore detective, & 22 spouts explorer"}
            </span>

            <Link
              href="/quiz"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-brick px-6 text-sm font-semibold text-cream shadow transition active:scale-95 hover:bg-brick-deep"
            >
              <span>{isNepali ? "पूर्ण प्रश्नोत्तरी खेल्नुहोस् →" : "Play Full Quiz →"}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
