"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FESTIVALS_DATA,
  FESTIVAL_CATEGORIES,
  FestivalCategory,
  FestivalEvent,
} from "@/lib/festivalCalendarData";
import { useLanguage } from "@/i18n/LanguageContext";
import AskButton from "@/components/AskButton";
import { toNepaliNum } from "./HamroPatroCalendar";

export default function UpcomingFestivalsShowcase({
  selectedFestivalId,
}: {
  selectedFestivalId?: string | null;
}) {
  const { isNepali } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<FestivalCategory | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>("baisdhara-mela");

  const filtered = FESTIVALS_DATA.filter((fest) => {
    if (activeCategory === "all") return true;
    return fest.category === activeCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="space-y-6">
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FESTIVAL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-brick text-cream shadow-md shadow-brick/20 ring-2 ring-brick/20"
                  : "bg-paper/80 text-wood/80 hover:bg-paper hover:text-wood border border-wood/10"
              }`}
            >
              {isNepali ? cat.label.ne : cat.label.en}
            </button>
          );
        })}
      </div>

      {/* Festival cards grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((fest) => {
          const isHighlighted = selectedFestivalId === fest.id;
          const isExpanded = expandedId === fest.id;

          return (
            <article
              key={fest.id}
              id={`fest-${fest.id}`}
              className={`group flex flex-col justify-between rounded-3xl border transition-all ${
                isHighlighted
                  ? "border-marigold bg-paper/95 shadow-xl ring-2 ring-marigold/50"
                  : "border-wood/15 bg-paper/85 shadow-sm hover:border-marigold/50 hover:shadow-md"
              } p-6`}
            >
              <div>
                {/* Header tags: upcoming countdown & category */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-brick/10 px-3 py-1 font-deva text-xs font-semibold text-brick">
                      {isNepali ? fest.tag.ne : fest.tag.en}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-wood/65">
                      <svg className="h-3.5 w-3.5 text-brick" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {isNepali ? fest.placeName.ne : fest.placeName.en}
                    </span>
                  </div>

                  {fest.isUpcoming ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-vermilion/10 px-2.5 py-0.5 font-deva text-xs font-bold text-vermilion">
                      <span className="h-1.5 w-1.5 rounded-full bg-vermilion animate-pulse" />
                      {isNepali
                        ? `${toNepaliNum(fest.daysRemaining ?? 0)} दिन बाँकी`
                        : `In ${fest.daysRemaining} days`}
                    </span>
                  ) : (
                    <span className="rounded-full bg-wood/10 px-2.5 py-0.5 text-xs text-wood/60">
                      {isNepali ? "भर्खरै सम्पन्न / मौसमी" : "Seasonal / Past"}
                    </span>
                  )}
                </div>

                {/* Festival Title */}
                <h3 className="font-display text-xl font-bold text-wood group-hover:text-brick transition-colors">
                  {isNepali ? fest.name.ne : fest.name.en}
                </h3>
                <p className="font-deva text-xs text-wood/60 mt-0.5">
                  {isNepali ? fest.name.en : fest.name.ne}
                </p>

                {/* Date & Tithi Banner */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-2xl bg-cream/70 px-3.5 py-2.5 text-xs text-wood/85 border border-wood/10">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-brick">📅 {isNepali ? "मिति:" : "Date:"}</span>
                    <span className="font-deva font-medium">{isNepali ? fest.bsDate.ne : fest.bsDate.en}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-teal-deep">🌙 {isNepali ? "तिथि:" : "Tithi:"}</span>
                    <span className="font-deva">{isNepali ? fest.tithi.ne : fest.tithi.en}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-wood/80">
                  {isNepali ? fest.description.ne : fest.description.en}
                </p>


              </div>

            </article>
          );
        })}
      </div>
    </section>
  );
}
