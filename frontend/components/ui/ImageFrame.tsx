import Image from "next/image";

const ASPECT = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  wide: "aspect-[21/9]",
  square: "aspect-square",
} as const;

/**
 * A photograph in a thin gold frame with corner brackets, and an optional caption.
 * Used for the large photographs on the home and place pages.
 */
export default function ImageFrame({
  src,
  alt,
  caption,
  aspect = "landscape",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 560px",
  objectPosition,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: keyof typeof ASPECT;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  className?: string;
}) {
  const corner = "pointer-events-none absolute h-4 w-4 border-marigold";
  return (
    <figure className={className}>
      <div className="relative border border-marigold/40 p-1.5">
        <span className={`${corner} -left-px -top-px border-l-2 border-t-2`} aria-hidden />
        <span className={`${corner} -right-px -top-px border-r-2 border-t-2`} aria-hidden />
        <span className={`${corner} -bottom-px -left-px border-b-2 border-l-2`} aria-hidden />
        <span className={`${corner} -bottom-px -right-px border-b-2 border-r-2`} aria-hidden />
        <div className={`relative overflow-hidden bg-paper ${ASPECT[aspect]}`}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition }} />
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-sm italic text-wood/60">{caption}</figcaption>}
    </figure>
  );
}
