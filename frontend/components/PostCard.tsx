/* eslint-disable @next/next/no-img-element */
"use client";

import { kindLabel, placeLabel, photoUrl, when, type Post } from "@/lib/posts";
import { useLanguage } from "@/i18n/LanguageContext";

const kindColor = { review: "bg-teal text-cream", photo: "bg-marigold text-wood", complaint: "bg-vermilion text-cream" } as const;

export default function PostCard({ post, children }: { post: Post; children?: React.ReactNode }) {
  const { t, isNepali } = useLanguage();

  return (
    <article className="wood-frame rounded-2xl bg-cream p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`rounded-full px-3 py-1 font-semibold ${kindColor[post.kind]}`}>
          {isNepali ? (
            <>
              {kindLabel[post.kind].ne} <span className="font-deva opacity-80">· {kindLabel[post.kind].en}</span>
            </>
          ) : (
            <>
              {kindLabel[post.kind].en} <span className="font-deva opacity-80">· {kindLabel[post.kind].ne}</span>
            </>
          )}
        </span>
        <span className="font-semibold text-brick">{t(`postCopy.place.${post.place}`, placeLabel[post.place])}</span>
        {post.rating && (
          <span
            className="text-marigold"
            aria-label={t("components.voices.ratingOut", "{n} out of 5").replace("{n}", String(post.rating))}
          >
            {"★".repeat(post.rating)}
            <span className="text-wood/25">{"★".repeat(5 - post.rating)}</span>
          </span>
        )}
      </div>

      {post.title && <h3 className="mt-2 font-display text-lg leading-snug text-brick">{post.title}</h3>}
      <p className="mt-2 whitespace-pre-line break-words text-[16px] text-wood/90">{post.body}</p>

      {post.photos.length > 0 && (
        <div className={`mt-3 grid gap-2 ${post.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {post.photos.map((id) => (
            <a key={id} href={photoUrl(id)} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl">
              <img
                src={photoUrl(id)}
                alt={t("components.voices.sharedPhoto", "Photo shared by a visitor")}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </a>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-wood/60">
        {post.author} · {when(post.createdAt, isNepali ? "ne-NP" : "en-GB")}
      </p>
      {children}
    </article>
  );
}
