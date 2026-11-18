"use client";

import { Accordion, Stamp } from "./ui";
import { sources, type Fact } from "@/lib/content";
import { useLanguage } from "@/i18n/LanguageContext";

export default function FactAccordion({ items, accent }: { items: Fact[]; accent: "brick" | "teal" }) {
  const { t } = useLanguage();

  return (
    <Accordion
      accent={accent}
      items={items.map((f) => ({
        id: f.id,
        title: t(`facts.${f.id}.title`, f.title),
        body: (
          <>
            <Stamp type={f.evidence} size="md" />
            <p className="text-[17px] leading-[1.75] text-wood/90">{t(`facts.${f.id}.text`, f.text)}</p>
            <p className="flex flex-wrap items-center gap-2 pt-1 text-xs text-wood/60">
              {t("common.sourcesLabel", "Sources:")}
              {f.sources.map((s) => (
                <a
                  key={s}
                  href={sources[s].url}
                  target="_blank"
                  rel="noreferrer"
                  title={sources[s].title}
                  className="rounded-full border border-teal/40 px-2 py-0.5 font-semibold text-teal hover:underline"
                >
                  {s}
                </a>
              ))}
            </p>
          </>
        ),
      }))}
    />
  );
}
