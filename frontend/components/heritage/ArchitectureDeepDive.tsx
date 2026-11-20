"use client";

import { ArchitectureFeature } from "@/lib/heritageDetailData";
import { useLanguage } from "@/i18n/LanguageContext";

interface ArchitectureDeepDiveProps {
  introduction: { en: string; ne: string };
  features: ArchitectureFeature[];
  title?: string;
}

export default function ArchitectureDeepDive({
  introduction,
  features,
  title,
}: ArchitectureDeepDiveProps) {
  const { isNepali } = useLanguage();

  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
          {title || (isNepali ? "वास्तुकला तथा भौतिक संरचना" : "Architecture & Spatial Craft")}
        </h3>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-wood/80">
          {isNepali ? introduction.ne : introduction.en}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="wood-frame flex flex-col justify-between rounded-2xl bg-paper p-6 text-wood shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="space-y-2.5">

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
