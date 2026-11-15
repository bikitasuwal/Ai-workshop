import { video } from "@/lib/places";

/** Lightweight video: nothing downloads until the visitor presses play (kind to mobile data). */
export default function VideoWalk() {
  return (
    <figure>
      <div className="wood-frame overflow-hidden rounded-3xl bg-wood">
        <video
          controls
          playsInline
          muted
          preload="none"
          poster={video.poster}
          className="aspect-video w-full object-cover"
          aria-label={video.title}
        >
          <source src={video.src} type="video/mp4" />
          Your browser can&apos;t play this video.
        </video>
      </div>
      <figcaption className="mt-3 text-center text-sm text-wood/70">{video.caption}</figcaption>
    </figure>
  );
}
