"use client";

import { useEffect } from "react";
import Image from "next/image";
import { CommunityStory, ARCHIVE_CATEGORIES } from "@/lib/communityStories";
import { useLanguage } from "@/i18n/LanguageContext";

interface StoryDetailModalProps {
  story: CommunityStory | null;
  onClose: () => void;
}

export default function StoryDetailModal({ story, onClose }: StoryDetailModalProps) {
  const { isNepali } = useLanguage();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!story) return null;

  const title = isNepali ? story.title.ne || story.title.en : story.title.en || story.title.ne;
  const content = isNepali ? story.content.ne || story.content.en : story.content.en || story.content.ne;
  const contributor = isNepali ? story.contributor.nameNepali || story.contributor.name : story.contributor.name;
  const role = story.contributor.role ? (isNepali ? story.contributor.role.ne : story.contributor.role.en) : "";
  const locationName = isNepali ? story.heritageLocation.name.ne : story.heritageLocation.name.en;

  const catObj = ARCHIVE_CATEGORIES.find((c) => c.id === story.category);
  const categoryLabel = catObj ? (isNepali ? catObj.label.ne : catObj.label.en) : story.category;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-wood/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="wood-frame relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-paper p-6 text-wood shadow-2xl sm:p-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-wood/20 text-wood/70 transition-colors hover:bg-wood/10 hover:text-wood"
          aria-label="Close story"
        >
          ✕
        </button>

        {/* Top Meta Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
          <span className="rounded-full bg-marigold/30 px-3 py-1 font-mono text-xs font-semibold uppercase text-wood">
            {categoryLabel}
          </span>
          <span className="rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold text-teal-deep">
            📍 {locationName}
          </span>
          {story.era && (
            <span className="rounded-full bg-wood/10 px-3 py-1 font-mono text-xs text-wood/70">
              ⏳ {story.era}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 id="story-modal-title" className="font-display text-2xl font-bold text-brick sm:text-3xl leading-snug">
          {title}
        </h2>

        {/* Contributor Byline */}
        <div className="mt-4 flex items-center gap-3 border-y border-wood/15 py-3 text-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brick text-cream font-display text-lg">
            {contributor.charAt(0)}
          </span>
          <div>
            <p className="font-semibold text-wood">
              {isNepali ? "साझा गर्ने व्यक्ति:" : "Shared by:"} {contributor}
              {story.contributor.age && ` (${story.contributor.age} ${isNepali ? "वर्ष" : "years"})`}
            </p>
            {role && <p className="text-xs text-wood/65 italic">{role}</p>}
          </div>
          <span className="ml-auto text-xs font-mono text-wood/50">
            {story.publicationDate}
          </span>
        </div>

        {/* Archival Photograph if available */}
        {story.photographs && story.photographs.length > 0 && (
          <div className="my-6 space-y-2">
            <div className="wood-frame relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-wood">
              <Image
                src={story.photographs[0].url}
                unoptimized={story.photographs[0].url.startsWith("/api/")}
                alt={story.photographs[0].caption ? (isNepali ? story.photographs[0].caption.ne : story.photographs[0].caption.en) : title}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 800px"
              />
            </div>
            {story.photographs[0].caption && (
              <p className="text-xs text-wood/75 italic">
                {isNepali ? story.photographs[0].caption.ne : story.photographs[0].caption.en}
                {story.photographs[0].credit && ` — 📷 ${story.photographs[0].credit}`}
              </p>
            )}
          </div>
        )}

        {/* Story Narrative Content */}
        <div className="my-6 space-y-4 font-body text-base leading-relaxed text-wood/90 whitespace-pre-line">
          {content}
        </div>

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-wood/10">
            {story.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-cream px-2.5 py-1 text-xs text-wood/65">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Archival Ethics Note */}
        <div className="mt-6 rounded-2xl bg-cream/70 p-4 text-xs text-wood/70 leading-relaxed">
          <p>
            <strong>{isNepali ? "सम्पदा अभिलेखीकरण नीति:" : "Archival Documentation Note:"}</strong>{" "}
            {isNepali
              ? "यो संस्मरण समुदायका सदस्यहरूको प्रत्यक्ष अनुभव र सम्झना हो। यसलाई स्थानीय सांस्कृतिक इतिहास संरक्षणका लागि जस्ताको तस्तै सुरक्षित गरिएको छ।"
              : "This story is preserved as spoken oral history and living community memory for non-commercial educational and cultural stewardship."}
          </p>
        </div>
      </div>
    </div>
  );
}
