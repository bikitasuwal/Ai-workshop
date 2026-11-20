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

  const select =
    "w-full rounded-full border border-wood/15 bg-cream px-4 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none";

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-3xl bg-paper p-3 shadow-sm sm:flex-row sm:items-center sm:rounded-full sm:p-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-wood/45" aria-hidden>
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={isNepali ? "खोज्नुहोस्" : "Search stories"}
            placeholder={isNepali ? "कथा वा व्यक्ति खोज्नुहोस्…" : "Search stories…"}
            className="w-full rounded-full border border-transparent bg-transparent py-2.5 pl-11 pr-9 text-sm text-wood placeholder:text-wood/50 focus:border-marigold focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label={isNepali ? "खोज हटाउनुहोस्" : "Clear search"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-wood/50 hover:text-wood"
            >
              ✕
            </button>
          )}
        </div>

        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          aria-label={isNepali ? "स्थान" : "Place"}
          className={`${select} sm:w-52`}
        >
          <option value="all">{isNepali ? "सबै स्थान" : "All places"}</option>
          <option value="22-dhara">{isNepali ? "२२ धारा" : "22 Dhara"}</option>
          <option value="pyatho-ajima">{isNepali ? "प्याः थ्वँ अजिमा" : "Pyah Thwam Ajima"}</option>
          <option value="ward-16">{isNepali ? "वडा १६" : "Ward 16"}</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label={isNepali ? "विधा" : "Category"}
          className={`${select} sm:w-52`}
        >
          <option value="all">{isNepali ? "सबै विधा" : "All categories"}</option>
          {ARCHIVE_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {isNepali ? cat.label.ne : cat.label.en}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between px-3 text-xs text-wood/60">
        <span>
          {isNepali ? `${totalResults} कथा` : `${totalResults} ${totalResults === 1 ? "story" : "stories"}`}
        </span>
        {isFiltered && (
          <button type="button" onClick={onClearFilters} className="font-semibold text-vermilion hover:underline">
            {isNepali ? "फिल्टर हटाउनुहोस् ✕" : "Clear filters ✕"}
          </button>
        )}
      </div>
    </div>
  );
}
