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
  const locationName = isNepali ? story.heritageLocation.name.ne : story.heritageLocation.name.en;

  const catObj = ARCHIVE_CATEGORIES.find((c) => c.id === story.category);
  const categoryLabel = catObj ? (isNepali ? catObj.label.ne : catObj.label.en) : story.category;

  const firstPhoto = story.photographs && story.photographs.length > 0 ? story.photographs[0] : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-paper text-wood shadow-sm ring-1 ring-wood/10 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {firstPhoto ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-wood">
          <Image
            src={firstPhoto.url}
            unoptimized={firstPhoto.url.startsWith("/api/")}
            alt={firstPhoto.caption ? (isNepali ? firstPhoto.caption.ne : firstPhoto.caption.en) : title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="h-1.5 w-full bg-gradient-to-r from-marigold via-brick to-teal" aria-hidden />
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold text-teal">
          {locationName}
          <span className="font-normal text-wood/50"> · {categoryLabel}</span>
        </p>

        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-brick transition-colors group-hover:text-vermilion">
          {title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-wood/75">{summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="min-w-0 truncate text-xs font-semibold text-wood">{contributor}</p>
          <button
            type="button"
            onClick={() => onReadMore?.(story)}
            className="shrink-0 text-xs font-bold uppercase tracking-wider text-brick transition-colors hover:text-vermilion"
          >
            {isNepali ? "पढ्नुहोस्" : "Read"} →
          </button>
        </div>
      </div>
    </article>
  );
}
