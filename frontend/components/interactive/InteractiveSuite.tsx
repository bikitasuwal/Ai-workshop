"use client";

import { useState } from "react";
import ComparisonSlider from "./ComparisonSlider";
import AudioNarrationPlayer from "./AudioNarrationPlayer";
import QuizCard from "@/components/ui/QuizCard";
import { quizFor } from "@/lib/quizzes";
import { HeritageSiteDetail } from "@/lib/heritageDetailData";
import { useLanguage } from "@/i18n/LanguageContext";

interface InteractiveSuiteProps {
  siteData: HeritageSiteDetail;
}

export default function InteractiveSuite({ siteData }: InteractiveSuiteProps) {
  const { isNepali } = useLanguage();
  const [activeTab, setActiveTab] = useState<"quiz" | "comparison" | "audio">("quiz");

  const tabs = [
    {
      id: "quiz" as const,
      label: isNepali ? "सम्पदा क्विज" : "Heritage Quiz",
      icon: "💡",
    },
    {
      id: "comparison" as const,
      label: isNepali ? "विगत र वर्तमान" : "Then & Now",
      icon: "⚖️",
    },
    {
      id: "audio" as const,
      label: isNepali ? "मौखिक अडियो" : "Audio Tour",
      icon: "🎧",
    },
  ];

  const placeKey = siteData.id === "22-dhara" ? "dhara" : "ajima";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-cream/70 p-6 sm:p-10 border border-marigold/30">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <p className="font-deva text-sm font-semibold uppercase tracking-wider text-vermilion">
          {isNepali ? "डिजिटल अन्तरक्रियात्मक अनुभव" : "Interactive Heritage Suite"}
        </p>
        <h2 className="font-display text-3xl font-bold text-brick sm:text-4xl">
          {isNepali
            ? `${siteData.name.ne} अन्तरक्रियात्मक अन्वेषण`
            : `Explore ${siteData.name.en} Interactively`}
        </h2>
        <p className="mx-auto max-w-xl text-sm sm:text-base text-wood/80">
          {isNepali
            ? "वास्तुकला, जल इन्जिनियरिङ, विगतका अभिलेख र परम्परालाई विभिन्न डिजिटल माध्यमबाट अन्वेषण गर्नुहोस्।"
            : "Engage with architectural craft, historical transformation, and living oral memory through immersive interactive tools."}
        </p>
      </div>

      {/* Tabs Switcher Navigation */}
      <div className="mt-8 flex justify-center overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex rounded-full bg-paper p-1.5 border border-wood/15 shadow-inner">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold sm:px-5 sm:text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-marigold text-wood font-bold shadow-md scale-102"
                    : "text-wood/75 hover:bg-cream hover:text-wood"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Pane */}
      <div className="mt-8">
        {activeTab === "quiz" && (
          <div className="max-w-2xl mx-auto">
            <QuizCard
              questions={quizFor(placeKey)}
              lang={isNepali ? "ne" : "en"}
              storageKey={`quiz-best-${placeKey}`}
            />
          </div>
        )}
        {activeTab === "comparison" && <ComparisonSlider comparisonData={siteData.comparison} />}
        {activeTab === "audio" && <AudioNarrationPlayer audioData={siteData.audio} />}
      </div>
    </section>
  );
}
