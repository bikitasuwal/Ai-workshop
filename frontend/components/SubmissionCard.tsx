/* eslint-disable @next/next/no-img-element */
"use client";

import { photoUrl, placeName, when, type Submission } from "@/lib/submissions";
import { useLanguage } from "@/i18n/LanguageContext";

const typeColor = { story: "bg-teal text-cream", photo: "bg-marigold text-wood" } as const;

/** One visitor submission as the admin sees it (real name and email included). */
export default function SubmissionCard({ item, children }: { item: Submission; children?: React.ReactNode }) {
  const { t, isNepali } = useLanguage();
  const typeLabel =
    item.type === "story" ? t("components.admin.card.story", "Story") : t("components.admin.card.photo", "Photos");
  const place = placeName[item.place];

  return (
    <article className="wood-frame rounded-2xl bg-cream p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`rounded-full px-3 py-1 font-semibold ${typeColor[item.type]}`}>{typeLabel}</span>
        <span className="font-semibold text-brick">{isNepali ? place.ne : place.en}</span>
        <span className="text-wood/60">
          {item.type === "story"
            ? t("components.admin.card.goesToStories", "→ Stories page")
            : t("components.admin.card.goesToGallery", "→ Gallery (From visitors)")}
        </span>
      </div>

      {item.title && <h3 className="mt-2 font-display text-lg leading-snug text-brick">{item.title}</h3>}
      {item.body && <p className="mt-2 whitespace-pre-line break-words text-[16px] text-wood/90">{item.body}</p>}

      {item.photos.length > 0 && (
        <div className={`mt-3 grid gap-2 ${item.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {item.photos.map((id) => (
            <a key={id} href={photoUrl(id)} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl">
              <img
                src={photoUrl(id)}
                alt={t("components.admin.card.photoAlt", "Photo sent by a visitor")}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </a>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-wood/60">
        {item.authorName}
        {item.authorRole ? ` (${item.authorRole})` : ""}
        {item.attribution === "anonymous" && ` · ${t("components.admin.card.showAnonymous", "will be shown as anonymous")}`}
        {item.attribution === "representative" && ` · ${t("components.admin.card.showRepresentative", "on behalf of an elder")}`}
        {" · "}
        {when(item.createdAt, isNepali ? "ne-NP" : "en-GB")}
      </p>
      {item.authorEmail && <p className="mt-1 break-all text-xs text-wood/55">{item.authorEmail}</p>}
      {item.status === "rejected" && item.rejectReason && (
        <p className="mt-1 text-xs text-vermilion">{item.rejectReason}</p>
      )}
      {children}
    </article>
  );
}
