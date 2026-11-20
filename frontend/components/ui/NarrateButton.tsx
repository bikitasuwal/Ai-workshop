"use client";

/**
 * components/ui/NarrateButton.tsx
 *
 * A speaker button that reads a piece of text aloud, using the browser's own
 * text-to-speech (the Web Speech API). Nothing is uploaded and no audio files are needed.
 * Click once to listen, click again to stop.
 *
 * The voice comes from the visitor's device, so how it sounds (and whether a Nepali voice
 * exists at all) depends on their browser and operating system.
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type Props = {
  /** What to read. Headings can be ended with a full stop so the voice pauses. */
  text: string;
  className?: string;
};

/** Browsers cut off long utterances, so the text is read a sentence or two at a time. */
function toChunks(text: string, max = 220): string[] {
  const sentences = text.replace(/\s+/g, " ").trim().match(/[^.!?।]+[.!?।]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > max && cur) {
      chunks.push(cur.trim());
      cur = s;
    } else {
      cur += s;
    }
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks;
}

/** Best available voice for a language code like "en-US" or "ne-NP". */
function pickVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | undefined {
  const base = lang.split("-")[0].toLowerCase();
  return (
    voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase()) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(base))
  );
}

export default function NarrateButton({ text, className = "" }: Props) {
  const { isNepali } = useLanguage();
  const [speaking, setSpeaking] = useState(false);
  const [note, setNote] = useState("");
  // False on the server and on browsers without speech support, so the button simply does not appear there.
  const supported = useSyncExternalStore(
    () => () => {},
    () => "speechSynthesis" in window,
    () => false,
  );
  const token = useRef(0); // lets an old reading be ignored once the visitor stops or changes language

  const stop = useCallback(() => {
    token.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  // Stop when the page is left, or when the language (and so the text) changes.
  useEffect(() => stop, [stop, text]);

  const start = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    setNote("");

    const lang = isNepali ? "ne-NP" : "en-US";
    const voices = synth.getVoices();
    let voice = pickVoice(voices, lang);
    let spokenLang = lang;
    if (!voice && isNepali) {
      // Many devices have no Nepali voice. Hindi shares the Devanagari script and reads it reasonably.
      voice = pickVoice(voices, "hi-IN");
      if (voice) {
        spokenLang = "hi-IN";
        setNote("नेपाली आवाज फेला परेन, हिन्दी आवाज प्रयोग गरियो।");
      } else if (voices.length) {
        setNote("यो उपकरणमा नेपाली आवाज उपलब्ध छैन।");
        return;
      }
    }

    const mine = ++token.current;
    const chunks = toChunks(text);
    setSpeaking(true);
    chunks.forEach((chunk, i) => {
      const u = new SpeechSynthesisUtterance(chunk);
      u.lang = voice?.lang ?? spokenLang;
      if (voice) u.voice = voice;
      u.rate = 0.95;
      if (i === chunks.length - 1) {
        u.onend = () => token.current === mine && setSpeaking(false);
      }
      u.onerror = () => token.current === mine && setSpeaking(false);
      synth.speak(u);
    });
  };

  if (!supported) return null;

  const label = speaking
    ? isNepali ? "सुन्न रोक्नुहोस्" : "Stop listening"
    : isNepali ? "सुन्नुहोस्" : "Listen";

  return (
    <div className={`flex flex-col items-end gap-1 ${className}`}>
      <button
        type="button"
        onClick={speaking ? stop : start}
        aria-pressed={speaking}
        aria-label={label}
        title={label}
        className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold transition active:scale-95 ${
          speaking ? "border-brick bg-brick text-cream" : "border-brick/40 bg-cream text-brick hover:border-brick"
        }`}
      >
        {speaking ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
        <span>{label}</span>
        {speaking && (
          <span className="flex h-4 items-end gap-0.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-0.5 animate-pulse rounded-full bg-cream" style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }} />
            ))}
          </span>
        )}
      </button>
      {note && (
        <p role="status" className="max-w-[16rem] text-right text-[11px] leading-snug text-wood/60">
          {note}
        </p>
      )}
    </div>
  );
}
