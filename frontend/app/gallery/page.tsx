import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import VideoWalk from "@/components/VideoWalk";
import VisitorPhotos from "@/components/VisitorPhotos";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import { places } from "@/lib/places";

export const metadata: Metadata = { title: "Gallery | Balaju Living Heritage" };

export default function Gallery() {
  return (
    <PageLayout variant="narrow">
      <Reveal>
        <SectionTitle ne="ग्यालरी" en="Gallery" />
        <p className="mx-auto mt-3 max-w-md text-center text-wood/80">
          Photographs and video, shown with the care these living places deserve.
        </p>
      </Reveal>

      <h2 className="font-display mt-10 text-2xl text-brick">Photographs</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {places.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <Link href={p.href} className="wood-frame group block overflow-hidden rounded-2xl bg-cream">
              <span className="relative block aspect-[4/3]">
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="block p-4">
                <span className="font-deva block text-xs font-semibold text-vermilion">{p.ne}</span>
                <span className="font-display block text-xl text-brick">{p.name}</span>
                <span className="mt-1 block text-sm text-wood/75">{p.photoAlt}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <h2 className="font-display mt-12 text-2xl text-brick">Video</h2>
      <Reveal className="mt-4">
        <VideoWalk />
      </Reveal>

      <h2 className="font-display mt-12 text-2xl text-brick">From visitors</h2>
      <VisitorPhotos />

      <Reveal className="mt-12">
        <div className="rounded-3xl border-2 border-dashed border-marigold bg-paper/70 p-6 text-center">
          <h2 className="font-display text-2xl text-brick">More is on the way</h2>
          <p className="mx-auto mt-2 max-w-md text-[17px] text-wood/85">
            Every item carries its place, date and a consent note. Restricted rituals and identifiable worshippers are
            not published without permission.
          </p>
          <Link
            href="/reviews"
            className="mt-5 inline-flex min-h-[50px] items-center rounded-full bg-brick px-7 font-semibold text-cream active:scale-95"
          >
            Share a photo of your visit
          </Link>
        </div>
      </Reveal>
    </PageLayout>
  );
}
