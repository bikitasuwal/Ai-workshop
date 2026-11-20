"use client";

import { TimelineEvent } from "@/lib/heritageDetailData";
import { useLanguage } from "@/i18n/LanguageContext";

interface HistoricalTimelineProps {
  timeline: TimelineEvent[];
}

export default function HistoricalTimeline({ timeline }: HistoricalTimelineProps) {
  const { isNepali } = useLanguage();

  return (
    <section className="space-y-10">
      <div className="text-center space-y-2">
        <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
          {isNepali ? "ऐतिहासिक कालक्रम" : "Historical Timeline"}
        </h3>
        <p className="mx-auto max-w-xl text-sm text-wood/80">
          {isNepali
            ? "स्थापना, शाही विस्तार, भूकम्पपछिको संरक्षण र सामुदायिक निरन्तरताका ऐतिहासिक कोसेढुङ्गाहरू।"
            : "Key verified milestones documenting inception, royal additions, and resilient community preservation."}
        </p>
      </div>

      <div className="relative">
        {/* Central spine line */}
        <div
          className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-marigold via-brick to-teal transform sm:-translate-x-1/2 rounded-full opacity-60"
          aria-hidden="true"
        />

        <div className="space-y-5 sm:space-y-0">
          {timeline.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? "sm:flex-row-reverse" : ""
                } ${index > 0 ? "sm:-mt-10" : ""}`}
              >
                {/* Node pin on spine */}
                <div
                  className="absolute left-4 sm:left-1/2 w-5 h-5 rounded-full border-3 border-cream bg-marigold transform -translate-x-1/2 z-10 shadow-md ring-2 ring-wood/20"
                  aria-hidden="true"
                />

                {/* Card Container */}
                <div className="w-full pl-12 sm:w-1/2 sm:px-9">
                  <div className="wood-frame rounded-2xl bg-paper p-5 sm:p-6 text-wood shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-wood/15 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-bold text-brick">
                          {isNepali ? event.yearNepali : event.year}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-display text-base font-bold text-brick mt-3">
                      {isNepali ? event.title.ne : event.title.en}
                    </h4>

                    <p className="mt-1.5 text-sm leading-relaxed text-wood/85">
                      {isNepali ? event.description.ne : event.description.en}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
