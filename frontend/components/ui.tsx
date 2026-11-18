"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { Evidence, evidenceMeta } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectionTitleKey } from "@/i18n/dictionaries/en";

/** Seal-style evidence label. */
export function Stamp({ type, size = "sm" }: { type: Evidence; size?: "sm" | "md" }) {
  const { t } = useLanguage();
  const m = evidenceMeta[type];
  const label = t(`evidence.${type}.label`, m.label);
  const hint = t(`evidence.${type}.hint`, m.hint);
  return (
    <span
      title={hint}
      className={`inline-flex items-center gap-1.5 rounded-full border border-wood/20 font-semibold uppercase tracking-wider shadow-sm ${size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs"}`}
      style={{ background: m.bg, color: m.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color, opacity: 0.8 }} />
      {label}
    </span>
  );
}

/** Fade-and-rise on scroll. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts in 3D following finger / pointer. */
export function TiltCard({
  children,
  className = "",
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 16 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 16 });

  const move = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={reset}
        onPointerUp={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Calm accordion, keeps long text from crowding the page. */
export function Accordion({
  items,
  accent = "brick",
}: {
  items: { id: string; title: string; badge?: React.ReactNode; body: React.ReactNode }[];
  accent?: "brick" | "teal";
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const color = accent === "teal" ? "text-teal" : "text-brick";
  return (
    <div className="space-y-3">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="wood-frame overflow-hidden rounded-2xl bg-cream">
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : it.id)}
                aria-expanded={isOpen}
                className="flex min-h-[56px] w-full items-center justify-between gap-3 px-5 py-3 text-left"
              >
                <span className={`font-display text-lg leading-snug ${color}`}>{it.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-marigold text-xl ${color}`}
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 px-5 pb-5">
                    {it.badge}
                    {it.body}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Pagoda-roof skyline divider. */
export function PagodaDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 40" className={`mx-auto w-48 ${className}`} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 30h150M250 30h150" opacity=".5" />
        <path d="M200 3v5M190 14l10-6 10 6M184 22l16-10 16 10M178 30l22-14 22 14" />
        <circle cx="160" cy="30" r="2" fill="currentColor" />
        <circle cx="240" cy="30" r="2" fill="currentColor" />
      </g>
    </svg>
  );
}

/**
 * Bilingual section heading. The pair lives in the dictionaries under
 * `titles.<key>`; which line becomes the big heading follows the active
 * language (English: Devanagari eyebrow + English heading — the original
 * look; Nepali: English eyebrow + Devanagari heading).
 */
export function SectionTitle({
  titleKey,
  center = true,
  light = false,
}: {
  titleKey: SectionTitleKey;
  center?: boolean;
  light?: boolean;
}) {
  const { t, isNepali } = useLanguage();
  const neLine = t(`titles.${titleKey}.ne`);
  const enLine = t(`titles.${titleKey}.en`);
  const heading = isNepali ? neLine : enLine;
  const eyebrow = isNepali ? enLine : neLine;

  return (
    <div className={center ? "text-center" : ""}>
      <p className={`font-deva text-sm font-semibold tracking-wide ${light ? "text-marigold" : "text-vermilion"}`}>{eyebrow}</p>
      <h2 className={`font-display text-3xl leading-tight sm:text-4xl ${light ? "text-cream" : "text-brick"}`}>{heading}</h2>
    </div>
  );
}

/** Dashed "nothing here yet" box. */
export function Notice({ title, children }: { title?: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-marigold bg-paper/70 p-6 text-center">
      {title && <p className="font-display text-xl text-brick">{title}</p>}
      {children && <p className={title ? "mt-1 text-wood/75" : "text-wood/75"}>{children}</p>}
    </div>
  );
}
