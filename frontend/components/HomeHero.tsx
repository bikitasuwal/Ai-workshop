"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import HeroScene from "./HeroScene";
import AskButton from "./AskButton";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HomeHero() {
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 500], [0, 60]);
  const glow = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-wood via-brick-deep to-brick text-cream">
      <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-marigold/25 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-5 pb-16 pt-10 md:grid-cols-2 md:py-20">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center md:text-left">
          <motion.p variants={item} className="font-deva text-base font-semibold tracking-wide text-marigold">
            बैसधारा · प्याः थ्वँ अजिमा
          </motion.p>
          <motion.h1 variants={item} className="font-display mt-2 text-[2.5rem] leading-[1.08] sm:text-5xl">
            Where <span className="gold-shine">water</span>, worship and memory meet
          </motion.h1>
          <motion.p variants={item} className="mx-auto mt-4 max-w-md text-[17px] text-cream/85 md:mx-0">
            A living archive of two heritage places in Balaju, Kathmandu, kept alive by the Newar communities who
            bathe, pray, paint and gather there.
          </motion.p>
          <motion.div variants={item} className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="/places"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-marigold px-7 font-semibold text-wood shadow-lg shadow-black/30 transition active:scale-95 sm:w-auto"
            >
              Explore the places
            </Link>
            <AskButton className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-marigold/70 px-7 font-semibold text-cream transition active:scale-95 sm:w-auto">
              Ask the guide
            </AskButton>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: sceneY }} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
          <HeroScene />
        </motion.div>
      </div>

      {/* roofline into page */}
      <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="block h-6 w-full text-cream" aria-hidden>
        <path d="M0 24V12l25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10V24Z" fill="currentColor" />
      </svg>
    </section>
  );
}
