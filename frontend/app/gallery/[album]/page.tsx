import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlbumView from "./AlbumView";
import { ALBUM_IDS, getAlbum } from "@/lib/gallery";

type Params = Promise<{ album: string }>;

export function generateStaticParams() {
  return ALBUM_IDS.map((album) => ({ album }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { album } = await params;
  const a = getAlbum(album);
  return { title: `${a ? a.title.en : "Gallery"} | Balaju Living Heritage` };
}

// The URL-specific part is read inside Suspense, so the shared page shell stays URL-independent.
async function Album({ params }: { params: Params }) {
  const { album } = await params;
  const a = getAlbum(album);
  if (!a) notFound();
  return <AlbumView albumId={a.id} />;
}

export default function AlbumPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden />}>
      <Album params={params} />
    </Suspense>
  );
}
