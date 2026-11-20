"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";
import AskButton from "@/components/AskButton";
import { useLanguage } from "@/i18n/LanguageContext";

/** The dark closing band of the home page: invite a memory, or a question for the guide. */
export default function ClosingCta() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-wood px-5 py-24 text-center text-cream sm:py-28">
      <div className="lattice absolute inset-0 opacity-[0.05]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold/40 to-transparent" aria-hidden />
      <Reveal className="relative mx-auto max-w-3xl">
        <div className="mx-auto mb-8 flex items-center justify-center gap-3 text-marigold" aria-hidden>
          <span className="h-px w-12 bg-marigold/60" />
          <span className="block h-2.5 w-2.5 rotate-45 bg-marigold" />
          <span className="h-px w-12 bg-marigold/60" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-marigold">{t("home.cta.eyebrow")}</p>
        <h2 className="font-display mt-5 text-3xl leading-tight sm:text-5xl">
          {t("home.cta.lead")}
          <br />
          <span className="text-marigold">{t("home.cta.accent")}</span>
        </h2>
        <div className="mx-auto my-7 h-px w-16 bg-marigold" aria-hidden />
        <p className="mx-auto max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">{t("home.cta.body")}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/stories/submit"
            className="inline-flex min-h-[52px] w-full items-center justify-center border border-brick bg-brick px-8 text-[13px] font-semibold uppercase tracking-[0.15em] text-cream transition hover:bg-brick-deep active:scale-95 sm:w-auto"
          >
            {t("home.cta.share")}
          </Link>
          <AskButton className="inline-flex min-h-[52px] w-full items-center justify-center border border-marigold/70 px-8 text-[13px] font-semibold uppercase tracking-[0.15em] text-marigold transition hover:bg-marigold hover:text-wood active:scale-95 sm:w-auto">
            {t("home.cta.ask")}
          </AskButton>
        </div>
      </Reveal>
    </section>
  );
}
