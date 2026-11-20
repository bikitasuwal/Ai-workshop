"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { CommunityStory, INITIAL_APPROVED_STORIES } from "@/lib/communityStories";
import { toCommunityStory, type Submission } from "@/lib/submissions";
import StoryCard from "@/components/archive/StoryCard";
import StoryDetailModal from "@/components/archive/StoryDetailModal";
import ArchiveFilters from "@/components/archive/ArchiveFilters";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui";

export default function StoriesView() {
  const { isNepali } = useLanguage();
  // Approved visitor stories come from the API; the built-in archive stories are always shown too.
  const [submitted, setSubmitted] = useState<CommunityStory[]>([]);
  const stories = useMemo<CommunityStory[]>(() => [...submitted, ...INITIAL_APPROVED_STORIES], [submitted]);
  const [selectedStory, setSelectedStory] = useState<CommunityStory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    let live = true;
    fetch("/api/submissions?type=story", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { submissions: [] }))
      .then((d) => live && setSubmitted((d.submissions as Submission[]).map(toCommunityStory)))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // 1. Category
      if (selectedCategory !== "all" && story.category !== selectedCategory) {
        return false;
      }
      // 2. Location
      if (selectedLocation !== "all" && story.heritageLocation.id !== selectedLocation) {
        return false;
      }
      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleEn = story.title?.en?.toLowerCase() || "";
        const titleNe = story.title?.ne?.toLowerCase() || "";
        const summaryEn = story.summary?.en?.toLowerCase() || "";
        const summaryNe = story.summary?.ne?.toLowerCase() || "";
        const contentEn = story.content?.en?.toLowerCase() || "";
        const contentNe = story.content?.ne?.toLowerCase() || "";
        const author = story.contributor?.name?.toLowerCase() || "";
        const authorNe = story.contributor?.nameNepali?.toLowerCase() || "";
        const tags = (story.tags || []).join(" ").toLowerCase();

        const match =
          titleEn.includes(q) ||
          titleNe.includes(q) ||
          summaryEn.includes(q) ||
          summaryNe.includes(q) ||
          contentEn.includes(q) ||
          contentNe.includes(q) ||
          author.includes(q) ||
          authorNe.includes(q) ||
          tags.includes(q);

        if (!match) return false;
      }
      return true;
    });
  }, [stories, selectedCategory, selectedLocation, searchQuery]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLocation("all");
  };

  return (
    <>
      {/* Hero: kept short on purpose */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wood via-brick-deep to-brick px-5 pb-16 pt-28 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
        <Reveal className="relative mx-auto max-w-xl">
          <h1 className="font-display text-4xl sm:text-5xl">
            {isNepali ? "सामुदायिक कथा तथा मौखिक इतिहास" : "Community Stories"}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-cream/80">
            {isNepali
              ? "अग्रजहरू र स्थानीय बासिन्दाका सम्झना।"
              : "Memories and testimonies from the people of Balaju."}
          </p>
          <Link
            href="/stories/submit"
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-marigold px-7 font-semibold text-wood shadow-lg transition hover:brightness-105 active:scale-95"
          >
            <span>+ {isNepali ? "आफ्नो कथा थप्नुहोस्" : "Share your story"}</span>
          </Link>
        </Reveal>

        <svg
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream"
          aria-hidden
        >
          <path d="M0 24V12q25-14 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0V24Z" fill="currentColor" />
        </svg>
      </section>

      <PageLayout variant="default" underHero>
        <ArchiveFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          totalResults={filteredStories.length}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-10">
          {filteredStories.length > 0 ? (
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStories.map((story, i) => (
                <Reveal key={story.id} delay={Math.min(i, 5) * 0.05}>
                  <StoryCard story={story} onReadMore={(s) => setSelectedStory(s)} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-md rounded-3xl bg-paper p-10 text-center text-wood">
                <h3 className="font-display text-xl font-bold text-brick">
                  {isNepali ? "कुनै कथा फेला परेन" : "No stories found"}
                </h3>
                <p className="mt-2 text-sm text-wood/75">
                  {isNepali ? "खोजी शब्द वा फिल्टर परिवर्तन गर्नुहोस्।" : "Try a different search or clear the filters."}
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-5 rounded-full bg-marigold px-6 py-2 text-xs font-semibold text-wood shadow-sm active:scale-95"
                >
                  {isNepali ? "फिल्टरहरू हटाउनुहोस्" : "Clear filters"}
                </button>
              </div>
            </Reveal>
          )}
        </div>

        <p className="mx-auto mt-14 max-w-xl text-center text-xs leading-relaxed text-wood/60">
          {isNepali
            ? "यहाँका कथाहरू मौखिक सम्झना र व्यक्तिगत अनुभव हुन्; ती ऐतिहासिक अभिलेखको विकल्प होइनन्। सबै योगदान प्रकाशन अघि एडमिनले जाँच्छन्।"
            : "These are spoken memories and personal accounts, not a substitute for historical records. Every contribution is reviewed by an admin before it is published."}
        </p>
      </PageLayout>

      <StoryDetailModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </>
  );
}
