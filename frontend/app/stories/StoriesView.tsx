"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { CommunityStory, getStoredStories } from "@/lib/communityStories";
import StoryCard from "@/components/archive/StoryCard";
import StoryDetailModal from "@/components/archive/StoryDetailModal";
import ArchiveFilters from "@/components/archive/ArchiveFilters";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";

export default function StoriesView() {
  const { isNepali } = useLanguage();
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<CommunityStory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    setStories(getStoredStories());
  }, []);

  const featuredStory = useMemo(() => {
    return stories.find((s) => s.featured) || stories[0] || null;
  }, [stories]);

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
      {/* Editorial Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wood via-brick-deep to-brick px-5 pb-20 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
        <Reveal className="relative mx-auto max-w-2xl">
          <p className="font-deva text-base font-semibold text-marigold">
            {isNepali ? "वडा नं. १६ का कथाहरू · जीवित संस्मरण" : "Ward 16 Living Heritage Archive"}
          </p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl">
            {isNepali ? "सामुदायिक कथा तथा मौखिक इतिहास" : "Community Stories & Living Memories"}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-cream/85">
            {isNepali
              ? "नागार्जुनका मूल, ढुङ्गेधाराका तीर्थ, अजिमाको पूजा र टोलको फेरिँदो परिवेशबारे स्थानीय बासिन्दा तथा अग्रजहरूका सम्झना।"
              : "Spoken testimonies, elder recollections, historic photographs, and traditions preserved by the community."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/stories/submit"
              className="inline-flex min-h-[50px] items-center rounded-full bg-marigold px-7 font-semibold text-wood shadow-lg transition hover:brightness-105 active:scale-95"
            >
              <span>+ {isNepali ? "तपाईंको कथा थप्नुहोस्" : "Share Your Story"}</span>
            </Link>
          </div>
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

      <PageLayout variant="wide" underHero>
        {/* Archival Ethics & Policy Notice */}
        <PageLayout.Section>
          <Reveal>
            <div className="wood-frame rounded-2xl border-2 border-dashed border-marigold bg-paper/85 p-5 sm:p-6 text-wood">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl text-marigold">📜</span>
                <div className="space-y-1 text-sm leading-relaxed">
                  <p className="font-display font-semibold text-brick">
                    {isNepali ? "अभिलेखालय नीति तथा मर्यादा" : "Living Heritage Archival Code"}
                  </p>
                  <p className="text-wood/85">
                    {isNepali
                      ? "यस खण्डमा संकलित कथाहरू स्थानीय अग्रजहरू र तीर्थालुहरूको प्रत्यक्ष अनुभूति हुन्। हामी ऐतिहासिक अभिलेख र मौखिक सम्झनालाई स्पष्ट रूपमा छुट्याउँदै दुवैको महत्त्वलाई सम्मान गर्दछौं। सबै योगदानहरू समीक्षापछि सुरक्षित गरिन्छ।"
                      : "These stories preserve spoken memories, family photographs, and devotional traditions. We strictly distinguish archival documentary records from personal oral memory, honoring both. Anyone wishing to add a story fills out our respectful submission form."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </PageLayout.Section>

        {/* Featured Story Banner (when no search filter is active) */}
        {!searchQuery && selectedCategory === "all" && selectedLocation === "all" && featuredStory && (
          <PageLayout.Section>
            <Reveal>
              <div className="space-y-4">
                <p className="font-deva text-xs font-semibold uppercase tracking-wider text-vermilion">
                  {isNepali ? "विशेष सम्पादकीय संस्मरण" : "Featured Oral History"}
                </p>
                <div className="wood-frame overflow-hidden rounded-3xl bg-paper p-6 sm:p-8 text-wood shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-wood/15 pb-3">
                    <span className="rounded-full bg-brick px-3 py-1 font-mono text-xs font-semibold text-cream">
                      {isNepali ? "विशेष कथा" : "Featured Story"}
                    </span>
                    <span className="text-xs font-mono text-wood/60">
                      {featuredStory.publicationDate}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-6 md:grid-cols-2 md:items-center">
                    <div className="space-y-3">
                      <span className="text-xs font-semibold text-teal uppercase tracking-wider">
                        📍 {isNepali ? featuredStory.heritageLocation.name.ne : featuredStory.heritageLocation.name.en}
                      </span>
                      <h2 className="font-display text-2xl font-bold text-brick sm:text-3xl leading-snug">
                        {isNepali ? featuredStory.title.ne : featuredStory.title.en}
                      </h2>
                      <p className="text-sm leading-relaxed text-wood/85">
                        {isNepali ? featuredStory.summary.ne : featuredStory.summary.en}
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedStory(featuredStory)}
                          className="inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-wood shadow-sm hover:brightness-105 active:scale-95"
                        >
                          <span>{isNepali ? "पूर्ण कथा पढ्नुहोस्" : "Read Full Story"}</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    {featuredStory.photographs && featuredStory.photographs.length > 0 && (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-wood shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={featuredStory.photographs[0].url}
                          alt={featuredStory.title.en}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-2 left-3 right-3 text-[11px] text-cream/90 bg-wood/75 px-3 py-1 rounded-md backdrop-blur-xs truncate font-mono">
                          📷 {featuredStory.photographs[0].credit}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </PageLayout.Section>
        )}

        {/* Filter and Stories List */}
        <PageLayout.Section>
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brick">
                  {isNepali ? "कथाहरू र मौखिक संस्मरणहरू" : "Community Archive & Testimonies"}
                </h2>
                <p className="text-xs sm:text-sm text-wood/70 mt-1">
                  {isNepali
                    ? "स्थानीय बासिन्दा र अध्येताहरूद्वारा साझा गरिएका कथाहरू"
                    : "Living memories and oral records contributed by elders and visitors"}
                </p>
              </div>

              <Link
                href="/stories/submit"
                className="inline-flex items-center gap-2 rounded-full bg-brick px-5 py-2.5 text-xs font-semibold text-cream shadow-sm hover:bg-brick-deep active:scale-95"
              >
                <span>+</span>
                <span>{isNepali ? "नयाँ कथा थप्नुहोस्" : "Submit Your Story"}</span>
              </Link>
            </div>

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
          </Reveal>

          {/* Stories Grid */}
          <div className="mt-8">
            {filteredStories.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredStories.map((story, i) => (
                  <Reveal key={story.id} delay={i * 0.06}>
                    <StoryCard story={story} onReadMore={(s) => setSelectedStory(s)} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="wood-frame rounded-3xl bg-paper p-12 text-center text-wood">
                  <span className="font-display text-4xl text-marigold block mb-3">◈</span>
                  <h3 className="font-display text-xl font-bold text-brick">
                    {isNepali ? "कुनै कथा फेला परेन" : "No Stories Found"}
                  </h3>
                  <p className="mt-2 text-sm text-wood/75 max-w-md mx-auto">
                    {isNepali
                      ? "कृपया खोजी शब्द वा फिल्टर परिवर्तन गर्नुहोस् वा सबै फिल्टर हटाउनुहोस्।"
                      : "Try adjusting your search terms or clearing the selected category and location filters."}
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
        </PageLayout.Section>

        {/* Closing Contribution Banner */}
        <PageLayout.Section>
          <Reveal>
            <div className="wood-frame rounded-3xl bg-gradient-to-r from-wood via-brick to-teal-deep p-8 sm:p-12 text-center text-cream shadow-xl">
              <span className="font-display text-3xl text-marigold">◈</span>
              <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold">
                {isNepali
                  ? "तपाईंसँग पनि बालाजु वडा १६ को पुरानो सम्झना वा तस्बिर छ?"
                  : "Do you have an elder's memory, family photo, or personal reflection?"}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-cream/85 leading-relaxed">
                {isNepali
                  ? "भावी पुस्ताका लागि जीवित सम्पदा जोगाउन सहयोग गर्नुहोस्। तपाईंको कथा समीक्षापछि अभिलेखालयमा सुरक्षित गरिनेछ।"
                  : "Every story matters. Help us document the human tapestry of Ward 16. Fill out the contribution form to preserve your story with respectful attribution."}
              </p>
              <div className="mt-6">
                <Link
                  href="/stories/submit"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-marigold px-8 font-semibold text-wood shadow-md hover:brightness-105 active:scale-95"
                >
                  <span>{isNepali ? "कथा फाराम भर्नुहोस्" : "Fill Story Contribution Form"}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </PageLayout.Section>
      </PageLayout>

      {/* Story Detail Modal */}
      <StoryDetailModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </>
  );
}
