import Link from "next/link";
import Image from "next/image";
import { TiltCard } from "./ui";
import type { Place } from "@/lib/places";

const tone = { teal: "bg-teal-deep", brick: "bg-brick" } as const;

/** Photo card for one of the two places (home page and Places page). */
export default function PlaceCard({ place }: { place: Place }) {
  return (
    <Link href={place.href} className="block h-full">
      <TiltCard className="h-full">
        <article className={`wood-frame relative h-full overflow-hidden rounded-3xl ${tone[place.tone]} p-6 pb-7 text-cream`}>
          <div className="lattice absolute inset-0 opacity-10" aria-hidden />
          <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border-2 border-marigold/70">
            <Image src={place.photo} alt={place.photoAlt} fill sizes="(max-width: 768px) 90vw, 440px" className="object-cover" />
          </div>
          <p className="font-deva relative text-sm font-semibold text-marigold">{place.neLong}</p>
          <h3 className="font-display relative text-3xl">{place.name}</h3>
          <p className="relative mt-2 text-cream/85">{place.summary}</p>
          <span className="relative mt-5 inline-flex items-center gap-2 font-semibold text-marigold">
            Discover <span aria-hidden>→</span>
          </span>
        </article>
      </TiltCard>
    </Link>
  );
}
