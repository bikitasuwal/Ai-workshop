"use client";

import { useState } from "react";
import { evidenceLabels, labels, t, type Lang, type MatchPair } from "@/lib/quizzes";
import { chipAction } from "@/lib/styles";

function startOrder(pairs: MatchPair[]) {
  return [...pairs.slice(2), ...pairs.slice(0, 2)].reverse();
}

function shuffle(pairs: MatchPair[]) {
  const a = [...pairs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Props = { title: string; pairs: MatchPair[]; lang: Lang };
type Feedback = { kind: "match"; id: string } | { kind: "wrong" } | null;

// Same look as the evidence Stamp used in the accordions
const chip =
  "inline-block rounded-full border border-wood/20 bg-cream px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-wood shadow-sm";

export default function MatchGame({ title, pairs, lang }: Props) {
  const [order, setOrder] = useState(() => startOrder(pairs));
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const done = matched.length === pairs.length;
  const last = feedback?.kind === "match" ? pairs.find((p) => p.id === feedback.id) : undefined;

  function pickTerm(id: string) {
    if (matched.includes(id)) return;
    setSelected(id);
    setFeedback(null);
  }

  function pickMeaning(id: string) {
    if (!selected || matched.includes(id)) return;
    if (selected === id) {
      setMatched((m) => [...m, id]);
      setFeedback({ kind: "match", id });
    } else {
      setMistakes((n) => n + 1);
      setFeedback({ kind: "wrong" });
    }
    setSelected(null);
  }

  function restart() {
    setOrder(shuffle(pairs));
    setSelected(null);
    setMatched([]);
    setMistakes(0);
    setFeedback(null);
  }

  const cell = (state: "idle" | "selected" | "matched") =>
    `min-h-[52px] w-full rounded-2xl border-2 px-4 py-3 text-left text-wood transition active:scale-[0.98] ${
      state === "matched"
        ? "border-teal bg-teal/10 text-teal opacity-80"
        : state === "selected"
          ? "border-brick bg-marigold/25"
          : "border-wood/20 bg-paper/40 hover:border-brick"
    }`;

  return (
    <section className="wood-frame rounded-3xl bg-cream p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl text-brick">{title}</h3>
        <p className="text-sm font-semibold text-wood/70">
          {t(labels.mistakes, lang)}: {mistakes}
        </p>
      </div>
      <p className="mt-2 text-sm text-wood/70">{t(labels.matchHelp, lang)}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ul className="space-y-3">
          {pairs.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => pickTerm(p.id)}
                disabled={matched.includes(p.id)}
                aria-pressed={selected === p.id}
                className={cell(matched.includes(p.id) ? "matched" : selected === p.id ? "selected" : "idle")}
              >
                {t(p.term, lang)}
              </button>
            </li>
          ))}
        </ul>
        <ul className="space-y-3">
          {order.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => pickMeaning(p.id)}
                disabled={matched.includes(p.id)}
                className={cell(matched.includes(p.id) ? "matched" : "idle")}
              >
                {t(p.meaning, lang)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div aria-live="polite" className="mt-4 min-h-[6rem] text-wood">
        {last && (
          <div className="rounded-2xl border-2 border-dashed border-marigold bg-paper/70 p-4">
            <span className={chip}>{t(evidenceLabels[last.evidence], lang)}</span>
            <p className="mt-2">
              <strong>{t(last.term, lang)}.</strong> {t(last.detail, lang)}
            </p>
            <p className="mt-1 text-xs text-wood/70">
              {t(labels.source, lang)}: {last.source}
            </p>
          </div>
        )}
        {feedback?.kind === "wrong" && <p className="font-semibold text-vermilion">{t(labels.wrong, lang)}</p>}
      </div>

      {done && (
        <div className="mt-4">
          <p className="font-display text-lg text-brick">
            {t(labels.allMatched, lang)} {t(labels.studyNotes, lang)}
          </p>
          <ul className="mt-3 space-y-3">
            {pairs.map((p) => (
              <li key={p.id} className="text-sm text-wood">
                <span className={chip}>{t(evidenceLabels[p.evidence], lang)}</span>{" "}
                <strong>{t(p.term, lang)}</strong>: {t(p.detail, lang)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="button" onClick={restart} className={`mt-4 ${chipAction}`}>
        {done ? t(labels.tryAgain, lang) : t(labels.shuffle, lang)}
      </button>
    </section>
  );
}