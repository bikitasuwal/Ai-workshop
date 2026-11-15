"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Notice } from "./ui";
import { photoUrl, placeLabel, type Post } from "@/lib/posts";

/** Photos from visitors. Only admin-approved posts are ever returned by the API. */
export default function VisitorPhotos() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/posts", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => live && setPosts(d.posts ?? []))
      .catch(() => live && setPosts([]));
    return () => {
      live = false;
    };
  }, []);

  const photos = (posts ?? []).flatMap((p) => p.photos.map((id) => ({ id, post: p })));
  if (posts === null) return <div className="mt-4 h-32" aria-hidden />;
  if (!photos.length) {
    return (
      <div className="mt-4">
        <Notice title="No visitor photos yet">Approved photos from visitors will appear here.</Notice>
      </div>
    );
  }
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.map(({ id, post }) => (
        <Link key={id} href="/reviews" className="wood-frame group block overflow-hidden rounded-2xl bg-cream">
          <img
            src={photoUrl(id)}
            alt={"Visitor photo, " + placeLabel[post.place]}
            loading="lazy"
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="block px-3 py-2 text-xs text-wood/70">
            {post.author} · {placeLabel[post.place]}
          </span>
        </Link>
      ))}
    </div>
  );
}
