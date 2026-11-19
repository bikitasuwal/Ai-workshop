"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { labels, t, type Lang, type QuizQuestion } from "@/lib/quizzes";

type Props = { questions: QuizQuestion[]; lang: Lang; storageKey: string };

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function readBest(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export default function QuizCard({ questions, lang, storageKey }: Props) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);

  const best = useSyncExternalStore(
    subscribe,
    () => readBest(storageKey),
    () => null
  );

  useEffect(() => {
    if (picked !== null) nextRef.current?.focus();
  }, [picked]);

  if (questions.length === 0) return null;

  const total = questions.length;
  const q = questions[index];
  const answered = picked !== null;
  const isLast = index === total - 1;
  const done = index + (answered ? 1 : 0);

  function choose(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function finish(finalScore: number) {
    setFinished(true);
    try {
      const prev = readBest(storageKey);
      if (prev === null || finalScore > Number(prev)) {
        window.localStorage.setItem(storageKey, String(finalScore));
        window.dispatchEvent(new Event("storage"));
      }
    } catch {
      /* saving the score is optional */
    }
  }

  function next() {
    if (isLast) return finish(score);
    setIndex((n) => n + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  // Same frame as the accordions / "Continue" card, and the same marigold pill as the site CTAs
  const card = "wood-frame rounded-3xl bg-cream p-6 sm:p-8";
  const primary =
    "inline-flex min-h-[50px] items-center justify-center rounded-full bg-marigold px-6 font-semibold text-wood transition active:scale-95 hover:brightness-105";

  if (finished) {
    const message =
      score === total
        ? labels.scorePerfect
        : score >= total / 2
          ? labels.scoreGood
          : labels.scoreStart;
    return (
      <div className={`${card} text-center`}>
        <p className="font-display text-4xl text-brick">
          {t(labels.score, lang)}: {score} / {total}
        </p>
        <p className="mt-2 text-wood">{t(message, lang)}</p>
        {best !== null && (
          <p className="mt-1 text-sm text-wood/70">
            {t(labels.best, lang)}: {best} / {total}
          </p>
        )}
        <button type="button" onClick={restart} className={`mt-5 ${primary}`}>
          {t(labels.tryAgain, lang)}
        </button>
      </div>
    );
  }

  return (
    <div className={card}>
      <div className="flex items-center justify-between text-sm font-semibold text-wood/70">
        <span>
          {t(labels.question, lang)} {index + 1} {t(labels.of, lang)} {total}
        </span>
        <span>
          {t(labels.scoreShort, lang)}: {score}/{done}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={t(labels.question, lang)}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-wood/10"
      >
        <div
          className="h-full rounded-full bg-brick transition-all"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      <h4 className="font-display mt-6 text-xl leading-snug text-brick sm:text-2xl">{t(q.question, lang)}</h4>

      <ul className="mt-5 space-y-3">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isPicked = i === picked;
          let row = "border-wood/20 bg-paper/40 hover:border-brick";
          let badge = "border-marigold text-brick";
          if (answered && isAnswer) {
            row = "border-teal bg-teal/10";
            badge = "border-teal bg-teal text-cream";
          } else if (answered && isPicked) {
            row = "border-vermilion bg-vermilion/10";
            badge = "border-vermilion bg-vermilion text-cream";
          } else if (answered) {
            row = "border-wood/15 bg-paper/40 opacity-60";
          }
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => choose(i)}
                disabled={answered}
                aria-pressed={isPicked}
                className={`flex min-h-[56px] w-full items-center gap-4 rounded-2xl border-2 px-4 py-3 text-left text-wood transition active:scale-[0.98] ${row}`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${badge}`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{t(opt, lang)}</span>
                {answered && isAnswer && (
                  <span className="text-sm font-semibold text-teal">{t(labels.correct, lang)}</span>
                )}
                {answered && isPicked && !isAnswer && (
                  <span className="text-sm font-semibold text-vermilion">{t(labels.yourAnswer, lang)}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite" className="mt-4 min-h-[4rem] text-wood">
        {answered && (
          <div className="rounded-2xl border-2 border-dashed border-marigold bg-paper/70 p-4">
            <p>
              <strong className={picked === q.answer ? "text-teal" : "text-vermilion"}>
                {picked === q.answer ? t(labels.right, lang) : t(labels.notQuite, lang)}
              </strong>{" "}
              {t(q.explanation, lang)}
              <span className="mt-1 block text-sm text-wood/70">
                {t(labels.source, lang)}: {q.source}
              </span>
            </p>
          </div>
        )}
      </div>

      {answered && (
        <button ref={nextRef} type="button" onClick={next} className={`mt-2 ${primary}`}>
          {isLast ? t(labels.seeScore, lang) : t(labels.next, lang)}
        </button>
      )}
    </div>
  );
}