"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Stamp } from "@/components/ui";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  QUIZ_QUESTIONS,
  DETECTIVE_CARDS,
  SPOUT_GROUPS,
  type QuizTopic,
  type Question,
} from "@/lib/quizData";
import { soundEffects } from "@/lib/soundEffects";
import type { Evidence } from "@/lib/content";

type ActiveTab = "quiz" | "detective" | "spouts";

export default function HeritageQuiz({
  initialTopic = "all",
  initialTab = "quiz",
}: {
  initialTopic?: QuizTopic;
  initialTab?: ActiveTab;
}) {
  const { isNepali } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync sound mute state
  const toggleSound = () => {
    const isMuted = soundEffects.toggleMute();
    setSoundEnabled(!isMuted);
  };

  return (
    <div className="w-full">
      {/* Top mode switcher & audio toggle */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-wood/15 pb-6 sm:flex-row">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("quiz")}
            className={`min-h-[44px] rounded-full px-5 py-2 text-sm font-semibold transition active:scale-95 ${
              activeTab === "quiz"
                ? "bg-brick text-cream shadow-md"
                : "border border-wood/25 bg-cream/70 text-wood hover:bg-cream"
            }`}
          >
            {isNepali ? "🎓 ज्ञान प्रश्नोत्तरी" : "🎓 Knowledge Quiz"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("detective")}
            className={`min-h-[44px] rounded-full px-5 py-2 text-sm font-semibold transition active:scale-95 ${
              activeTab === "detective"
                ? "bg-brick text-cream shadow-md"
                : "border border-wood/25 bg-cream/70 text-wood hover:bg-cream"
            }`}
          >
            {isNepali ? "🔍 इतिहास कि विश्वास?" : "🔍 Fact or Lore?"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("spouts")}
            className={`min-h-[44px] rounded-full px-5 py-2 text-sm font-semibold transition active:scale-95 ${
              activeTab === "spouts"
                ? "bg-brick text-cream shadow-md"
                : "border border-wood/25 bg-cream/70 text-wood hover:bg-cream"
            }`}
          >
            {isNepali ? "💧 २२ धारा अन्वेषक" : "💧 22 Spouts Explorer"}
          </button>
        </div>

        {/* Audio effect toggle */}
        <button
          type="button"
          onClick={toggleSound}
          title={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-wood/25 bg-paper/60 px-4 text-xs font-semibold text-wood transition hover:bg-paper"
        >
          <span>{soundEnabled ? "🔊" : "🔇"}</span>
          <span>{soundEnabled ? (isNepali ? "ध्वनि चालु" : "Sound On") : (isNepali ? "ध्वनि बन्द" : "Muted")}</span>
        </button>
      </div>

      {/* Main Tab Views */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <MultipleChoiceQuiz initialTopic={initialTopic} isNepali={isNepali} />
            </motion.div>
          )}

          {activeTab === "detective" && (
            <motion.div
              key="detective"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <HeritageDetective isNepali={isNepali} />
            </motion.div>
          )}

          {activeTab === "spouts" && (
            <motion.div
              key="spouts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <SpoutsExplorer isNepali={isNepali} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. Multiple Choice Knowledge Quiz Component                                */
/* -------------------------------------------------------------------------- */

function MultipleChoiceQuiz({
  initialTopic,
  isNepali,
}: {
  initialTopic: QuizTopic;
  isNepali: boolean;
}) {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic>(initialTopic);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter questions based on selected topic
  const questions: Question[] =
    selectedTopic === "all"
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.topic === selectedTopic);

  const currentQ = questions[currentIndex] || questions[0];

  // Reset quiz when topic changes
  const handleTopicChange = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      soundEffects.playCorrect();
      setScore((s) => s + 1);
      setStreak((st) => {
        const next = st + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      soundEffects.playIncorrect();
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      soundEffects.playCelebration();
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  // Share score
  const handleShare = async () => {
    const text = isNepali
      ? `मैले बालाजु सम्पदा प्रश्नोत्तरीमा ${score}/${questions.length} अंक प्राप्त गरेँ! तपाईं पनि आफ्नो ज्ञान जाँच्नुहोस्:`
      : `I scored ${score}/${questions.length} on the Balaju Living Heritage Quiz! Test your knowledge:`;
    const shareData = {
      title: isNepali ? "बालाजु सम्पदा प्रश्नोत्तरी" : "Balaju Living Heritage Quiz",
      text: `${text}\n${typeof window !== "undefined" ? window.location.href : ""}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to clipboard
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Rank calculation
  const percentage = Math.round((score / questions.length) * 100);
  const rank =
    percentage >= 90
      ? {
          title: isNepali ? "🏆 सम्पदा संरक्षक (Heritage Guardian)" : "🏆 Heritage Guardian",
          desc: isNepali
            ? "उत्कृष्ट! तपाईंले बालाजुका २२ धारा, अजिमा र पर्वबारे गहिरो ज्ञान देखाउनुभयो।"
            : "Outstanding! You possess exceptional understanding of Balaju's architecture, living rituals, and history.",
        }
      : percentage >= 70
        ? {
            title: isNepali ? "📜 सम्पदा अन्वेषक (Heritage Scholar)" : "📜 Heritage Scholar",
            desc: isNepali
              ? "धेरै राम्रो! तपाईंले धेरैजसो ऐतिहासिक विवरण र धार्मिक आस्था स्पष्ट बुझ्नुभएको छ।"
              : "Great job! You clearly distinguish between documented evidence, oral heritage, and local belief.",
          }
        : percentage >= 45
          ? {
              title: isNepali ? "🔍 जिज्ञासु यात्री (Curious Pilgrim)" : "🔍 Curious Pilgrim",
              desc: isNepali
                ? "राम्रो प्रयास! सम्पदा स्थलहरू र स्रोतहरूको अध्ययन गरेर अझै धेरै सिक्न सक्नुहुन्छ।"
                : "Good attempt! Explore our place guides and research notes to deepen your heritage knowledge.",
            }
          : {
              title: isNepali ? "🌱 सम्पदा नवप्रवेशी (Heritage Novice)" : "🌱 Heritage Novice",
              desc: isNepali
                ? "सुरुवात राम्रो छ! २२ धारा र अजिमा मन्दिरको यात्रा गरी फेरि प्रयास गर्नुहोस्।"
                : "A good first step! Browse the photo galleries, map, and facts before trying again.",
            };

  return (
    <div>
      {/* Category Filter Pills */}
      {!isFinished && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: isNepali ? "सम्पूर्ण" : "All Topics" },
              { id: "dhara", label: isNepali ? "२२ धारा" : "22 Dhara" },
              { id: "ajima", label: isNepali ? "प्याठो अजिमा" : "Pyatho Ajima" },
              { id: "festival", label: isNepali ? "पर्व (ल्हुति पुन्हि)" : "Lhuti Festival" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTopicChange(cat.id as QuizTopic)}
                className={`min-h-[38px] rounded-full px-4 text-xs font-semibold transition active:scale-95 ${
                  selectedTopic === cat.id
                    ? "border-2 border-brick bg-brick text-cream"
                    : "border-2 border-wood/20 bg-cream/70 text-wood hover:border-wood/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Streak indicator */}
          {streak > 1 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 rounded-full bg-vermilion/15 px-3 py-1 text-xs font-bold text-vermilion"
            >
              <span>🔥</span>
              <span>
                {streak} {isNepali ? "लगातार सही!" : "streak!"}
              </span>
            </motion.div>
          )}
        </div>
      )}

      {/* Finished Screen */}
      {isFinished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="wood-frame mx-auto max-w-xl rounded-3xl bg-cream p-6 text-center sm:p-8"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-marigold/20 text-4xl">
            {percentage >= 70 ? "🏅" : "📖"}
          </div>

          <h3 className="font-display mt-4 text-3xl text-brick">{rank.title}</h3>
          <p className="mt-2 text-wood/80">{rank.desc}</p>

          <div className="my-6 rounded-2xl border-2 border-wood/15 bg-paper/60 p-5">
            <div className="text-4xl font-black text-brick">
              {score}{" "}
              <span className="text-xl font-normal text-wood/60">/ {questions.length}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-wood/75">
              {percentage}% {isNepali ? "अंक" : "Score"}
              {maxStreak > 1 && ` · ${maxStreak} ${isNepali ? "अधिकतम लगातार" : "best streak"}`}
            </p>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-wood/15">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-marigold to-vermilion"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleRestart}
              className="min-h-[48px] rounded-full bg-brick px-6 font-semibold text-cream transition active:scale-95 hover:bg-brick-deep"
            >
              {isNepali ? "पुनः प्रयास गर्नुहोस्" : "Try Again"}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-marigold bg-marigold/20 px-6 font-semibold text-wood transition active:scale-95 hover:bg-marigold/30"
            >
              <span>{copied ? "✓" : "🔗"}</span>
              <span>
                {copied
                  ? isNepali
                    ? "क्लिपबोर्डमा प्रतिलिपि भयो!"
                    : "Copied!"
                  : isNepali
                    ? "नतिजा सेयर गर्नुहोस्"
                    : "Share Result"}
              </span>
            </button>

            <Link
              href="/sources"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-wood/25 bg-cream px-6 font-semibold text-wood transition active:scale-95 hover:bg-paper"
            >
              {isNepali ? "स्रोतहरू हेर्नुहोस्" : "View Sources"}
            </Link>
          </div>
        </motion.div>
      ) : (
        /* In-Progress Question Card */
        <div className="wood-frame mx-auto max-w-2xl rounded-3xl bg-cream p-5 sm:p-8">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-wood/70">
            <span>
              {isNepali
                ? `प्रश्न ${currentIndex + 1} / ${questions.length}`
                : `Question ${currentIndex + 1} of ${questions.length}`}
            </span>
            <span>
              {isNepali ? `अंक: ${score}` : `Score: ${score}`}
            </span>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-wood/15">
            <div
              className="h-full rounded-full bg-brick transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mt-6">
            <h3 className="font-display text-xl leading-relaxed text-brick sm:text-2xl">
              {isNepali ? currentQ.question.ne : currentQ.question.en}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="mt-6 space-y-3">
            {currentQ.options[isNepali ? "ne" : "en"].map((optText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrectAnswer = optIdx === currentQ.correctIndex;

              let style =
                "border-2 border-wood/20 bg-paper/50 text-wood hover:border-marigold hover:bg-paper/90";

              if (isAnswered) {
                if (isCorrectAnswer) {
                  style = "border-2 border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold";
                } else if (isSelected) {
                  style = "border-2 border-rose-700 bg-rose-50 text-rose-950";
                } else {
                  style = "border-2 border-wood/10 bg-cream/40 text-wood/40";
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`flex min-h-[54px] w-full items-center justify-between gap-3 rounded-2xl px-5 py-3 text-left text-[15px] sm:text-base transition active:scale-[0.99] ${style}`}
                >
                  <span>{optText}</span>
                  {isAnswered && (
                    <span className="shrink-0 font-bold">
                      {isCorrectAnswer ? "✓" : isSelected ? "✗" : ""}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Evidence Tag (shown after answering) */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden rounded-2xl border-2 border-dashed border-wood/25 bg-paper/70 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-brick">
                      {selectedOption === currentQ.correctIndex
                        ? isNepali
                          ? "सटीक उत्तर!"
                          : "Correct!"
                        : isNepali
                          ? "उत्तर विवरण:"
                          : "Explanation:"}
                    </span>
                    <Stamp type={currentQ.evidence} size="sm" />
                  </div>

                  {currentQ.relatedUrl && (
                    <Link
                      href={currentQ.relatedUrl}
                      className="text-xs font-semibold text-teal underline underline-offset-2 hover:text-teal-deep"
                    >
                      {isNepali ? "थप पढ्नुहोस् →" : "Read more →"}
                    </Link>
                  )}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-wood/90">
                  {isNepali ? currentQ.explanation.ne : currentQ.explanation.en}
                </p>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="min-h-[46px] rounded-full bg-brick px-6 font-semibold text-cream shadow transition active:scale-95 hover:bg-brick-deep"
                  >
                    {currentIndex + 1 < questions.length
                      ? isNepali
                        ? "अर्को प्रश्न →"
                        : "Next Question →"
                      : isNepali
                        ? "नतिजा हेर्नुहोस् 🎉"
                        : "Finish Quiz 🎉"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Heritage Detective Component: Fact, Lore, or Belief?                    */
/* -------------------------------------------------------------------------- */

function HeritageDetective({ isNepali }: { isNepali: boolean }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [isClassified, setIsClassified] = useState(false);

  const card = DETECTIVE_CARDS[cardIndex] || DETECTIVE_CARDS[0];

  const handleClassify = (choice: Evidence) => {
    if (isClassified) return;
    setSelectedEvidence(choice);
    setIsClassified(true);

    if (choice === card.correctEvidence) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }
  };

  const handleNext = () => {
    if (cardIndex + 1 < DETECTIVE_CARDS.length) {
      setCardIndex((i) => i + 1);
      setSelectedEvidence(null);
      setIsClassified(false);
    } else {
      soundEffects.playCelebration();
      setCardIndex(0);
      setSelectedEvidence(null);
      setIsClassified(false);
    }
  };

  const evidenceChoices: { type: Evidence; labelEn: string; labelNe: string }[] = [
    { type: "documented", labelEn: "Documented History", labelNe: "प्रमाणित इतिहास" },
    { type: "reported", labelEn: "Commonly Reported", labelNe: "समाचार विवरण" },
    { type: "oral", labelEn: "Oral Tradition", labelNe: "मौखिक परम्परा" },
    { type: "belief", labelEn: "Religious Belief", labelNe: "धार्मिक आस्था" },
  ];

  return (
    <div className="wood-frame mx-auto max-w-2xl rounded-3xl bg-cream p-6 sm:p-8">
      {/* Intro info banner */}
      <div className="flex items-center justify-between border-b border-wood/15 pb-4">
        <div>
          <span className="font-deva text-xs font-bold uppercase tracking-wider text-vermilion">
            {isNepali ? "हामी कसरी तथ्य वर्गीकरण गर्छौँ?" : "How we label what we know"}
          </span>
          <h3 className="font-display text-2xl text-brick">
            {isNepali ? "इतिहास कि विश्वास?" : "Heritage Detective"}
          </h3>
        </div>
        <div className="text-right text-xs font-semibold text-wood/70">
          <span>
            {isNepali
              ? `दाबी ${cardIndex + 1} / ${DETECTIVE_CARDS.length}`
              : `Claim ${cardIndex + 1} of ${DETECTIVE_CARDS.length}`}
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm text-wood/75">
        {isNepali
          ? "तल दिइएको दाबी पढ्नुहोस् र यो कुन श्रेणीमा पर्छ भनी पहिचान गर्नुहोस्:"
          : "Read the heritage claim below and identify its evidence level:"}
      </p>

      {/* Claim Box */}
      <div className="mt-5 rounded-2xl border-2 border-marigold/60 bg-paper/80 p-5 shadow-inner">
        <p className="font-display text-lg leading-relaxed text-wood sm:text-xl">
          &ldquo;{isNepali ? card.claim.ne : card.claim.en}&rdquo;
        </p>
      </div>

      {/* Evidence Category Buttons */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {evidenceChoices.map(({ type, labelEn, labelNe }) => {
          const isSelected = selectedEvidence === type;
          const isCorrect = type === card.correctEvidence;

          let btnStyle =
            "border-2 border-wood/25 bg-cream text-wood hover:border-brick hover:bg-paper/60";

          if (isClassified) {
            if (isCorrect) {
              btnStyle = "border-2 border-emerald-700 bg-emerald-100 text-emerald-950 font-bold";
            } else if (isSelected) {
              btnStyle = "border-2 border-rose-700 bg-rose-100 text-rose-950 line-through";
            } else {
              btnStyle = "border-2 border-wood/10 bg-cream/40 text-wood/40";
            }
          }

          return (
            <button
              key={type}
              type="button"
              disabled={isClassified}
              onClick={() => handleClassify(type)}
              className={`flex min-h-[52px] items-center justify-between rounded-xl px-4 py-3 text-sm transition active:scale-[0.98] ${btnStyle}`}
            >
              <span>{isNepali ? labelNe : labelEn}</span>
              <Stamp type={type} size="sm" />
            </button>
          );
        })}
      </div>

      {/* Detective Explanation */}
      <AnimatePresence>
        {isClassified && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 rounded-2xl border-2 border-wood/20 bg-paper/90 p-5"
          >
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-brick">
                {selectedEvidence === card.correctEvidence
                  ? isNepali
                    ? "✓ उत्कृष्ट विश्लेषण!"
                    : "✓ Excellent analysis!"
                  : isNepali
                    ? "ध्यान दिनुहोस्:"
                    : "Note:"}
              </span>
              <Stamp type={card.correctEvidence} size="sm" />
            </div>

            <p className="mt-2 text-sm leading-relaxed text-wood/90">
              {isNepali ? card.explanation.ne : card.explanation.en}
            </p>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[46px] rounded-full bg-brick px-6 font-semibold text-cream shadow transition active:scale-95 hover:bg-brick-deep"
              >
                {cardIndex + 1 < DETECTIVE_CARDS.length
                  ? isNepali
                    ? "अर्को दाबी →"
                    : "Next Claim →"
                  : isNepali
                    ? "पुनः सुरु गर्नुहोस् ↺"
                    : "Start Over ↺"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Interactive 22 Spouts Explorer                                          */
/* -------------------------------------------------------------------------- */

function SpoutsExplorer({ isNepali }: { isNepali: boolean }) {
  const [selectedSpout, setSelectedSpout] = useState<number>(1);
  const [isWaterFlowing, setIsWaterFlowing] = useState<boolean>(false);

  // Find which group holds the currently selected spout
  const currentGroup =
    SPOUT_GROUPS.find((g) => g.spouts.includes(selectedSpout)) || SPOUT_GROUPS[0];

  const handleSpoutClick = (spoutNum: number) => {
    setSelectedSpout(spoutNum);
    soundEffects.playWaterDrop();
    setIsWaterFlowing(true);
    setTimeout(() => setIsWaterFlowing(false), 900);
  };

  const handleFlowAll = () => {
    soundEffects.playCelebration();
    setIsWaterFlowing(true);
    setTimeout(() => setIsWaterFlowing(false), 2000);
  };

  return (
    <div className="wood-frame mx-auto max-w-4xl rounded-3xl bg-cream p-6 sm:p-8">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-wood/15 pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="font-deva text-xs font-bold uppercase tracking-wider text-teal">
            {isNepali ? "अन्तरक्रियात्मक अन्वेषण" : "Interactive Architecture"}
          </span>
          <h3 className="font-display text-2xl text-brick">
            {isNepali ? "२२ धारा जलप्रवाह अन्वेषक" : "22 Spouts Water Flow Explorer"}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleFlowAll}
          className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-cream shadow transition active:scale-95 hover:bg-teal-deep"
        >
          <span>🌊</span>
          <span>{isNepali ? "सबै धाराबाट जल बगाउनुहोस्" : "Flow All Spouts"}</span>
        </button>
      </div>

      <p className="mt-3 text-sm text-wood/80">
        {isNepali
          ? "कुनै पनि धारा (१ देखि २२) थिचेर जलप्रवाह महसुस गर्नुहोस् र यसको ऐतिहासिक महत्व बुझ्नुहोस्:"
          : "Tap any spout (1 to 22) to release water and reveal its architectural & historical role:"}
      </p>

      {/* 22 Spouts Interactive Grid */}
      <div className="mt-6 rounded-2xl border-2 border-wood/20 bg-gradient-to-b from-paper to-cream p-4 sm:p-6">
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-11 sm:gap-3">
          {Array.from({ length: 22 }, (_, i) => i + 1).map((num) => {
            const isSelected = selectedSpout === num;
            const inCurrentGroup = currentGroup.spouts.includes(num);

            return (
              <button
                key={num}
                type="button"
                onClick={() => handleSpoutClick(num)}
                title={`Spout ${num}`}
                className={`relative flex flex-col items-center justify-center rounded-xl p-2 transition active:scale-95 ${
                  isSelected
                    ? "border-2 border-teal bg-teal text-cream shadow-md"
                    : inCurrentGroup
                      ? "border-2 border-marigold bg-paper text-wood hover:border-teal"
                      : "border border-wood/25 bg-cream/80 text-wood/75 hover:bg-cream"
                }`}
              >
                {/* Spout Number */}
                <span className="font-display text-xs sm:text-sm font-bold">
                  {isNepali ? toDevanagariNumber(num) : num}
                </span>

                {/* Spout Icon with Water Drips */}
                <span className="mt-0.5 text-base sm:text-lg">🚰</span>

                {/* Animated Water Droplet on click / flow */}
                {(isSelected || isWaterFlowing) && (
                  <motion.span
                    initial={{ y: 0, opacity: 0.9, scale: 0.8 }}
                    animate={{ y: 12, opacity: 0, scale: 1.2 }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                    className="pointer-events-none absolute -bottom-2 text-xs text-sky-500"
                  >
                    💧
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Card for the selected spout & group */}
      <motion.div
        key={currentGroup.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 rounded-2xl border-2 border-teal/40 bg-teal/5 p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal text-xs font-bold text-cream">
              {isNepali ? toDevanagariNumber(selectedSpout) : selectedSpout}
            </span>
            <h4 className="font-display text-xl text-teal-deep">
              {isNepali ? currentGroup.title.ne : currentGroup.title.en}
            </h4>
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-marigold bg-wood px-3 py-1 rounded-full">
            {isNepali ? currentGroup.subtitle.ne : currentGroup.subtitle.en}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-wood/90">
          {isNepali ? currentGroup.detail.ne : currentGroup.detail.en}
        </p>

        <div className="mt-3 flex items-start gap-2 rounded-xl bg-paper/70 p-3 text-xs text-wood/80">
          <span className="font-bold text-brick">✦</span>
          <span>{isNepali ? currentGroup.note.ne : currentGroup.note.en}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-wood/10 pt-4">
          <span className="text-xs text-wood/65">
            {isNepali
              ? `यो खण्डमा धारा ${currentGroup.spouts[0]} देखि ${currentGroup.spouts[currentGroup.spouts.length - 1]} सम्म पर्दछन्`
              : `Covers Spouts ${currentGroup.spouts[0]} to ${currentGroup.spouts[currentGroup.spouts.length - 1]}`}
          </span>
          <Link
            href="/dhara"
            className="text-xs font-semibold text-teal underline underline-offset-2 hover:text-teal-deep"
          >
            {isNepali ? "२२ धाराको पूर्ण जानकारी →" : "Explore 22 Dhara →"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function toDevanagariNumber(num: number): string {
  const devDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num
    .toString()
    .split("")
    .map((d) => devDigits[parseInt(d, 10)] || d)
    .join("");
}
