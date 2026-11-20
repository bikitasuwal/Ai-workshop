"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { chatSuggestions, type Evidence } from "@/lib/content";
import { Stamp } from "./ui";
import { useLanguage } from "@/i18n/LanguageContext";

type Ref = { id: string; title: string; evidence: Evidence; sources: { key: string; title: string; url: string }[] };
type Msg = { role: "user" | "bot"; text: string; refs?: Ref[] };

const WELCOME_TEXT =
  "Namaste! I'm the Heritage Guide. Ask me about 22 Dhara, Pyatho Ajima, or the Lhuti Punhi festival. I answer only from the verified notes on this site.";

export default function ChatWidget() {
  const path = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const send = async (q: string) => {
    const text = q.trim();
    if (!text || busy) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const d = await r.json();
      setMsgs((m) => [
        ...m,
        { role: "bot", text: d.answer ?? t("components.chat.errorFallback", "Sorry, something went wrong."), refs: d.refs },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "bot", text: t("components.chat.netError", "I couldn't connect. Please check your network and try again.") },
      ]);
    } finally {
      setBusy(false);
    }
  };

  // open from anywhere (hero button, suggestion chips)
  useEffect(() => {
    const h = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent).detail?.question;
      if (q) send(q);
    };
    window.addEventListener("open-chat", h);
    return () => window.removeEventListener("open-chat", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, busy, open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (path.startsWith("/admin")) return null; // admins work in their own area

  return (
    <>
      {/* Floating guide button, bottom right: a lamp, plus a label from the sm breakpoint up */}
      <button
        aria-label={t("components.chat.openLabel", "Ask the Heritage Guide")}
        onClick={() => setOpen(true)}
        className="safe-bottom group fixed bottom-4 right-4 z-50 flex h-14 items-center gap-2 rounded-full border-2 border-marigold bg-brick pl-2 pr-2 text-cream shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition hover:bg-brick-deep active:scale-95 sm:bottom-6 sm:right-6 sm:pr-5"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-wood/40">
          <span className="absolute inset-0 animate-ping rounded-full bg-marigold/30 [animation-duration:3s]" aria-hidden />
          <svg viewBox="0 0 40 40" className="relative h-7 w-7" aria-hidden>
            <path d="M20 5c4 4 5 7 0 11-5-4-4-7 0-11Z" fill="#E8A317" className="flame" />
            <path d="M6 22h28c0 7-6 12-14 12S6 29 6 22Z" fill="#FAF3E3" />
            <path d="M6 22h28" stroke="#E8A317" strokeWidth="2" />
          </svg>
        </span>
        <span className="hidden text-[12px] font-semibold uppercase tracking-[0.15em] text-marigold sm:inline">
          {t("components.chat.openLabel", "Ask the Heritage Guide")}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-wood/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.section
              role="dialog"
              aria-label={t("components.chat.dialogLabel", "Heritage Guide chat")}
              className="fixed inset-x-0 bottom-0 z-[70] mx-auto flex h-[88dvh] max-w-xl flex-col overflow-hidden rounded-t-[28px] border-x-2 border-t-2 border-marigold bg-cream shadow-2xl md:bottom-6 md:h-[640px] md:rounded-[28px] md:border-2"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, i) => i.offset.y > 120 && setOpen(false)}
              dragListener={false}
            >
              <header className="relative bg-brick px-5 pb-3 pt-4 text-cream">
                <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-cream/40" aria-hidden />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-deva text-xs font-semibold text-marigold">{t("components.chat.headerNe", "सम्पदा मार्गदर्शक")}</p>
                    <h2 className="font-display text-xl leading-tight">{t("components.chat.headerEn", "Heritage Guide")}</h2>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label={t("components.chat.closeLabel", "Close chat")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="lattice absolute inset-x-0 bottom-0 h-2 opacity-70" aria-hidden />
              </header>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
                {[{ role: "bot", text: t("components.chat.welcome", WELCOME_TEXT) } as Msg, ...msgs].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${m.role === "user" ? "rounded-br-sm bg-brick text-cream" : "wood-frame rounded-bl-sm bg-paper text-wood"}`}
                    >
                      <p className="whitespace-pre-wrap">{m.text}</p>
                      {m.refs && m.refs.length > 0 && (
                        <div className="mt-3 space-y-2 border-t border-wood/15 pt-2">
                          {m.refs.map((r) => (
                            <div key={r.id} className="space-y-1">
                              <Stamp type={r.evidence} />
                              <div className="flex flex-wrap gap-1.5">
                                {r.sources.map((s) => (
                                  <a
                                    key={s.key}
                                    href={s.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={s.title}
                                    className="rounded-full border border-teal/40 px-2 py-0.5 text-[11px] font-semibold text-teal underline-offset-2 hover:underline"
                                  >
                                    {t("components.chat.sourceLabel", "Source")} {s.key}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {busy && (
                  <div className="flex gap-1.5 pl-2" aria-label={t("components.chat.typingLabel", "Typing")}>
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-2.5 w-2.5 rounded-full bg-marigold"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.9, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="border-t border-wood/15 bg-cream px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3">
                {msgs.length === 0 && (
                  <div className="rail -mx-4 mb-3 flex gap-2 overflow-x-auto px-4">
                    {chatSuggestions.map((q, i) => {
                      const question = t(`chatSuggestions.${i}`, q);
                      return (
                        <button
                          key={q}
                          onClick={() => send(question)}
                          className="min-h-[44px] shrink-0 rounded-full border border-brick/50 bg-paper px-4 text-sm text-brick active:scale-95"
                        >
                          {question}
                        </button>
                      );
                    })}
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("components.chat.placeholder", "Ask in English or नेपाली…")}
                    maxLength={400}
                    enterKeyHint="send"
                    className="min-h-[50px] flex-1 rounded-full border-2 border-wood/25 bg-white px-5 text-base outline-none focus:border-marigold"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    aria-label={t("components.chat.sendLabel", "Send")}
                    className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-brick text-cream disabled:opacity-40 active:scale-90"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m4 12 16-8-6 16-2-6-8-2Z" />
                    </svg>
                  </button>
                </form>
                <p className="mt-2 text-center text-[11px] text-wood/60">
                  {t("components.chat.disclaimer", "Answers come only from verified local sources. Beliefs are not medical advice.")}
                </p>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
