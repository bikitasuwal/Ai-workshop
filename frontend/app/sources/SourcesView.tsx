"use client";

/**
 * app/sources/SourcesView.tsx — client body of /sources.
 * The server wrapper (page.tsx) owns the `metadata` export.
 */

import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import { limitations, sources } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SourcesView() {
  const { t } = useLanguage();

  return (
    <PageLayout variant="narrow">
      <Reveal>
        <SectionTitle titleKey="sources" />
        <p className="mx-auto mt-3 max-w-md text-center text-wood/80">
          {t("pages.sources.intro")}
        </p>
      </Reveal>

      <div className="mt-8 space-y-3">
        {Object.entries(sources).map(([k, s], i) => (
          <Reveal key={k} delay={i * 0.04}>
            <a href={s.url} target="_blank" rel="noreferrer" className="wood-frame flex gap-4 rounded-2xl bg-paper p-4 transition active:scale-[0.99]">
              <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brick text-lg text-cream">
                {k}
              </span>
              <span>
                <span className="block font-semibold text-wood">{s.title}</span>
                <span className="mt-0.5 block text-sm text-wood/70">{t(`sourceNotes.${k}`, s.note)}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <h2 className="font-display text-2xl text-brick">{t("pages.sources.stillToConfirm")}</h2>
        <ol className="mt-4 space-y-3">
          {limitations.map((l, i) => (
            <li key={i} className="flex gap-3 text-[16px] text-wood/90">
              <span className="font-display text-lg text-vermilion">{i + 1}.</span>
              {t(`limitations.${i}`, l)}
            </li>
          ))}
        </ol>
      </Reveal>
    </PageLayout>
  );
}
