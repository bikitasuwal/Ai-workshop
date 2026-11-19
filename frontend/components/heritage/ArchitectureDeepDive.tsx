"use client";

import { ArchitectureFeature } from "@/lib/heritageDetailData";
import { useLanguage } from "@/i18n/LanguageContext";
import { Stamp } from "@/components/ui";

interface ArchitectureDeepDiveProps {
  introduction: { en: string; ne: string };
  features: ArchitectureFeature[];
  eyebrow?: string;
  title?: string;
}

export default function ArchitectureDeepDive({
  introduction,
  features,
  eyebrow,
  title,
}: ArchitectureDeepDiveProps) {
  const { isNepali } = useLanguage();

  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <p className="font-deva text-xs font-semibold uppercase tracking-wider text-vermilion">
          {eyebrow || (isNepali ? "वास्तुकला र परम्परागत शिल्पकला" : "Traditional Architecture & Material Craft")}
        </p>
        <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
          {title || (isNepali ? "वास्तुकला तथा भौतिक संरचना" : "Architecture & Spatial Craft")}
        </h3>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-wood/80">
          {isNepali ? introduction.ne : introduction.en}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className="wood-frame flex flex-col justify-between rounded-2xl bg-paper p-6 text-wood shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 border-b border-wood/10 pb-2">
                <span className="font-mono text-xs font-semibold text-marigold-deep text-vermilion">
                  {isNepali ? `विशेषता ०${idx + 1}` : `Feature 0${idx + 1}`}
                </span>
                <Stamp type={feature.status === "verified" ? "documented" : "oral"} size="sm" />
              </div>

              <h4 className="font-display text-lg font-bold text-brick">
                {isNepali ? feature.title.ne : feature.title.en}
              </h4>

              <p className="text-sm leading-relaxed text-wood/85">
                {isNepali ? feature.description.ne : feature.description.en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
