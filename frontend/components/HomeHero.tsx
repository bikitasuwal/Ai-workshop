"use client";

/**
 * components/HomeHero.tsx: the full-screen opening of the home page.
 * A real photograph under a dark overlay, a small gold eyebrow, a two-line headline,
 * a thin divider, one paragraph and two buttons, then a "scroll" cue.
 * The navbar sits transparent over it until the page scrolls.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import AskButton from "./AskButton";
import { useLanguage } from "@/i18n/LanguageContext";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-wood text-cream">
      <Image src="/media/spouts.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-wood/85 via-wood/60 to-wood/95" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 28% 62%, rgba(139,46,31,0.45), transparent 55%), radial-gradient(ellipse at 78% 28%, rgba(232,163,23,0.16), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold/50 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-marigold/30 to-transparent" aria-hidden />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl px-5 pb-28 pt-28 text-center sm:px-8"
      >
        <motion.p variants={item} className="text-[11px] font-semibold uppercase tracking-[0.3em] text-marigold sm:text-xs">
          {t("home.hero.eyebrow")}
        </motion.p>
        <motion.h1 variants={item} className="font-display mt-5 text-[2.5rem] leading-[1.12] sm:text-6xl lg:text-7xl">
          {t("home.hero.line1")}
          <br />
          <span className="gold-shine">{t("home.hero.line2")}</span>
        </motion.h1>
        <motion.div variants={item} className="mx-auto my-7 h-px w-16 bg-marigold" aria-hidden />
        <motion.p variants={item} className="mx-auto max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
          {t("home.hero.subtitle")}
        </motion.p>
        <motion.div variants={item} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#landmarks"
            className="inline-flex min-h-[52px] w-full items-center justify-center border border-brick bg-brick px-8 text-[13px] font-semibold uppercase tracking-[0.15em] text-cream transition hover:bg-brick-deep active:scale-95 sm:w-auto"
          >
            {t("home.hero.exploreCta")}
          </Link>
          <AskButton className="inline-flex min-h-[52px] w-full items-center justify-center border border-marigold/70 px-8 text-[13px] font-semibold uppercase tracking-[0.15em] text-marigold transition hover:bg-marigold hover:text-wood active:scale-95 sm:w-auto">
            {t("home.hero.askCta")}
          </AskButton>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-3 px-5 text-center text-[10px] uppercase tracking-[0.3em] text-cream/60">
        <span className="hidden sm:block">{t("home.hero.tagline")}</span>
        <span>{t("home.hero.scroll")}</span>
        <motion.span
          className="block h-8 w-px bg-marigold/70"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          aria-hidden
        />
      </div>
    </section>
  );
}
