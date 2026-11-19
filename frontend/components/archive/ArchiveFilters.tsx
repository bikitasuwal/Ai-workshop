"use client";

import { ARCHIVE_CATEGORIES } from "@/lib/communityStories";
import { useLanguage } from "@/i18n/LanguageContext";

interface ArchiveFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  totalResults: number;
  onClearFilters: () => void;
}

export default function ArchiveFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  totalResults,
  onClearFilters,
}: ArchiveFiltersProps) {
  const { isNepali } = useLanguage();

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "all" || selectedLocation !== "all";

  return (
    <div className="space-y-4 rounded-3xl border border-wood/15 bg-paper/85 p-5 sm:p-6 shadow-sm">
      {/* Top Search Bar & Location Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-wood/50">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              isNepali
                ? "कथा, व्यक्ति वा मूल शब्द खोजी गर्नुहोस्…"
                : "Search memories, contributors, or topics…"
            }
            className="w-full rounded-full border border-wood/20 bg-cream py-2.5 pl-10 pr-4 text-sm text-wood placeholder:text-wood/50 focus:border-marigold focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-wood/50 hover:text-wood"
            >
              ✕
            </button>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="w-full sm:w-60">
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full rounded-full border border-wood/20 bg-cream px-4 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
          >
            <option value="all">{isNepali ? "सबै सम्पदा स्थलहरू" : "All Heritage Sites"}</option>
            <option value="22-dhara">{isNepali ? "२२ धारा (बाइसधारा)" : "22 Dhara (Baisdhara)"}</option>
            <option value="pyatho-ajima">{isNepali ? "प्याठो अजिमा मन्दिर" : "Pyatho Ajima Temple"}</option>
            <option value="ward-16">{isNepali ? "वडा १६ (समग्र)" : "Ward 16 (General)"}</option>
          </select>
        </div>
      </div>

      {/* Category Pills Rail */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
            selectedCategory === "all"
              ? "bg-brick text-cream shadow-xs"
              : "bg-cream text-wood/80 hover:bg-cream/80"
          }`}
        >
          {isNepali ? "सबै विधा" : "All Categories"}
        </button>

        {ARCHIVE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? "bg-brick text-cream shadow-xs"
                : "bg-cream text-wood/80 hover:bg-cream/80"
            }`}
          >
            {isNepali ? cat.label.ne : cat.label.en}
          </button>
        ))}
      </div>

      {/* Results status and clear button */}
      <div className="flex items-center justify-between border-t border-wood/10 pt-2 text-xs text-wood/70">
        <span>
          {isNepali ? `भेटिएका कथाहरू: ${totalResults}` : `Showing ${totalResults} documented stories`}
        </span>

        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="font-semibold text-vermilion hover:underline"
          >
            {isNepali ? "फिल्टरहरू हटाउनुहोस् ✕" : "Clear all filters ✕"}
          </button>
        )}
      </div>
    </div>
  );
}
