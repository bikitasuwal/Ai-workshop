"use client";

import Image from "next/image";
import { CommunityStory, ARCHIVE_CATEGORIES } from "@/lib/communityStories";
import { useLanguage } from "@/i18n/LanguageContext";

interface StoryCardProps {
  story: CommunityStory;
  onReadMore?: (story: CommunityStory) => void;
}

export default function StoryCard({ story, onReadMore }: StoryCardProps) {
  const { isNepali } = useLanguage();

  const title = isNepali ? story.title.ne || story.title.en : story.title.en || story.title.ne;
  const summary = isNepali ? story.summary.ne || story.summary.en : story.summary.en || story.summary.ne;
  const contributor = isNepali ? story.contributor.nameNepali || story.contributor.name : story.contributor.name;
  const role = story.contributor.role ? (isNepali ? story.contributor.role.ne : story.contributor.role.en) : "";
  const locationName = isNepali ? story.heritageLocation.name.ne : story.heritageLocation.name.en;

  const catObj = ARCHIVE_CATEGORIES.find((c) => c.id === story.category);
  const categoryLabel = catObj ? (isNepali ? catObj.label.ne : catObj.label.en) : story.category;

  const firstPhoto = story.photographs && story.photographs.length > 0 ? story.photographs[0] : null;

  return (
    <article className="wood-frame group flex flex-col overflow-hidden rounded-3xl bg-paper text-wood shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Optional Photo Header */}
      {firstPhoto ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-wood">
          <Image
            src={firstPhoto.url}
            alt={firstPhoto.caption ? (isNepali ? firstPhoto.caption.ne : firstPhoto.caption.en) : title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wood/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-cream/90 font-mono">
            <span className="truncate max-w-[70%]">
              📷 {firstPhoto.credit || contributor}
            </span>
            {story.era && <span className="rounded-full bg-wood/70 px-2 py-0.5">{story.era}</span>}
          </div>
        </div>
      ) : (
        <div className="relative h-24 w-full overflow-hidden bg-gradient-to-r from-wood via-brick to-teal p-4 text-cream">
          <div className="lattice absolute inset-0 opacity-15" aria-hidden />
          <div className="relative z-10 flex h-full items-end justify-between text-xs font-mono">
            <span className="rounded-full bg-cream/20 px-2.5 py-0.5 text-cream">
              {story.era || (isNepali ? "मौखिक सम्झना" : "Living Memory")}
            </span>
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Category & Date */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="rounded-full bg-marigold/25 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-wood font-mono">
            {categoryLabel}
          </span>
          <span className="text-[11px] font-mono text-wood/60">
            {story.publicationDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-brick leading-snug group-hover:text-vermilion transition-colors">
          {title}
        </h3>

        {/* Location Badge */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-teal font-medium">
          <span>📍</span>
          <span>{locationName}</span>
        </div>

        {/* Summary Narrative */}
        <p className="mt-3.5 text-sm leading-relaxed text-wood/80 font-body line-clamp-3">
          {summary}
        </p>

        {/* Footer Contributor Info & Action */}
        <div className="mt-auto pt-5 border-t border-wood/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-wood">
              {contributor}
            </p>
            {role && <p className="text-[11px] text-wood/60 italic">{role}</p>}
          </div>

          <button
            type="button"
            onClick={() => onReadMore?.(story)}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brick hover:text-vermilion transition-colors"
          >
            <span>{isNepali ? "कथा पढ्नुहोस्" : "Read Story"}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
