"use client";

import { useState } from "react";
import { QuizData } from "@/lib/heritageDetailData";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeritageQuizProps {
  quizData: QuizData;
}

export default function HeritageQuiz({ quizData }: HeritageQuizProps) {
  const { isNepali } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { title, description, questions = [] } = quizData;
  const currentQ = questions[currentIndex];
  const total = questions.length;

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);
    if (optionId === currentQ.correctOptionId) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (!questions.length) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="font-deva text-xs font-semibold uppercase tracking-wider text-marigold">
          {isNepali ? "ज्ञान परीक्षण · क्विज" : "Interactive Knowledge Quiz"}
        </p>
        <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
          {isNepali ? title.ne : title.en}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-wood/80">
          {isNepali ? description.ne : description.en}
        </p>
      </div>

      {/* Main Quiz Box */}
      <div className="wood-frame relative rounded-3xl bg-paper p-6 text-wood shadow-lg sm:p-8">
        {!isFinished ? (
          <div className="space-y-6">
            {/* Progress Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold font-mono text-wood/70">
                <span>
                  {isNepali ? `प्रश्न ०${currentIndex + 1} / ०${total}` : `Question 0${currentIndex + 1} of 0${total}`}
                </span>
                <span className="text-marigold-deep font-bold">
                  {isNepali ? `अंक: ${score}` : `Score: ${score}`}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-wood/10">
                <div
                  className="h-full bg-gradient-to-r from-marigold to-vermilion transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h4 className="font-display text-xl font-bold text-brick leading-snug sm:text-2xl">
              {isNepali ? currentQ.question.ne : currentQ.question.en}
            </h4>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQ.correctOptionId;

                let optClass = "border-wood/20 bg-cream/70 text-wood hover:bg-cream hover:border-marigold";
                if (isAnswered) {
                  if (isCorrect) {
                    optClass = "border-teal bg-teal/15 text-teal-deep font-semibold ring-2 ring-teal/50";
                  } else if (isSelected && !isCorrect) {
                    optClass = "border-vermilion bg-vermilion/15 text-brick-deep font-semibold";
                  } else {
                    optClass = "border-wood/10 bg-cream/40 text-wood/50 opacity-60";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    disabled={isAnswered}
                    className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 text-left text-sm transition active:scale-[0.99] ${optClass}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current font-mono text-xs uppercase">
                        {opt.id}
                      </span>
                      <span>{isNepali ? opt.text.ne : opt.text.en}</span>
                    </span>
                    {isAnswered && (
                      <span className="font-display text-lg">
                        {isCorrect ? "✓" : isSelected ? "✗" : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation Box */}
            {isAnswered && (
              <div
                className={`animate-in fade-in rounded-2xl p-5 text-sm ${
                  selectedOptionId === currentQ.correctOptionId
                    ? "border border-teal/40 bg-teal/10 text-teal-deep"
                    : "border border-vermilion/40 bg-vermilion/10 text-brick-deep"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-lg">
                    {selectedOptionId === currentQ.correctOptionId ? "🎉" : "💡"}
                  </span>
                  <div className="space-y-1">
                    <p className="font-display font-semibold">
                      {selectedOptionId === currentQ.correctOptionId
                        ? isNepali
                          ? "सटीक उत्तर!"
                          : "Correct!"
                        : isNepali
                        ? "अझै जानिराखौँ:"
                        : "Historical Context:"}
                    </p>
                    <p className="leading-relaxed opacity-95">
                      {isNepali ? currentQ.explanation.ne : currentQ.explanation.en}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 rounded-full bg-marigold px-6 py-2.5 font-semibold text-wood shadow-md transition hover:brightness-105 active:scale-95"
                  >
                    <span>{currentIndex + 1 < total ? (isNepali ? "अर्को प्रश्न" : "Next Question") : (isNepali ? "नतिजा हेर्नुहोस्" : "See Final Score")}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Final Results State */
          <div className="py-8 text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-marigold/30 border-2 border-marigold text-4xl">
              {score >= 4 ? "🏆" : score >= 2 ? "🌟" : "📖"}
            </div>

            <div className="space-y-2">
              <h4 className="font-display text-3xl font-bold text-brick">
                {score === total
                  ? isNepali
                    ? "अद्भूत! उत्कृष्ट ज्ञान!"
                    : "Outstanding Mastery!"
                  : score >= 3
                  ? isNepali
                    ? "उत्कृष्ट नतिजा!"
                    : "Great Job!"
                  : isNepali
                  ? "सम्पदा अध्ययन सफल!"
                  : "Good Effort!"}
              </h4>
              <p className="text-lg text-wood/80">
                {isNepali
                  ? `तपाईंले ${total} मध्ये ${score} प्रश्नहरूको सही उत्तर दिनुभयो।`
                  : `You answered ${score} out of ${total} questions correctly.`}
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 rounded-full bg-brick px-7 py-3 font-semibold text-cream shadow-md transition hover:bg-brick-deep active:scale-95"
              >
                <span>↺</span>
                <span>{isNepali ? "फेरि क्विज खेल्नुहोस्" : "Retake Quiz"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
