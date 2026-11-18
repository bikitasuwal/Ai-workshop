"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "@photo-sphere-viewer/core/index.css";
import type { Viewer } from "@photo-sphere-viewer/core";
import type { Scene } from "@/lib/places";
import { useLanguage } from "@/i18n/LanguageContext";

/** Partial-panorama data: place a flat photo on the sphere at its real field of view. */
function panoDataFor(s: Scene) {
  if (s.equirect) return undefined;
  const fullWidth = Math.round((s.width * 360) / s.hfov);
  const fullHeight = Math.round(fullWidth / 2);
  return {
    isEquirectangular: true as const,
    fullWidth,
    fullHeight,
    croppedWidth: s.width,
    croppedHeight: s.height,
    croppedX: Math.round((fullWidth - s.width) / 2),
    croppedY: Math.round((fullHeight - s.height) / 2),
  };
}

/** Widest view allowed. A flat photo is limited so the view never drifts onto the empty black sphere. */
const maxFovFor = (s: Scene) => (s.equirect ? 100 : Math.round(s.hfov * 0.62));

export default function PanoramaViewer({
  scenes,
  className = "",
}: {
  scenes: Scene[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false); // viewer requested (poster tapped)
  const [error, setError] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const viewer = useRef<Viewer | null>(null);
  const { t } = useLanguage();
  const scene = scenes[Math.min(index, scenes.length - 1)];
  const sceneTitle = t(`sceneCopy.${scene.id}.title`, scene.title);
  const sceneCaption = t(`sceneCopy.${scene.id}.caption`, scene.caption);
  const partial = !scene.equirect;

  // Create the viewer once the user asks for it; load the 3D library only then.
  useEffect(() => {
    if (!active || !box.current) return;
    let cancelled = false;
    (async () => {
      try {
        const [{ Viewer }, { GyroscopePlugin }] = await Promise.all([
          import("@photo-sphere-viewer/core"),
          import("@photo-sphere-viewer/gyroscope-plugin"),
        ]);
        if (cancelled || !box.current) return;
        viewer.current = new Viewer({
          container: box.current,
          panorama: scene.src,
          panoData: panoDataFor(scene),
          defaultYaw: 0,
          defaultPitch: 0,
          defaultZoomLvl: partial ? 0 : 40,
          maxFov: maxFovFor(scene),
          minFov: 20,
          mousewheelCtrlKey: true, // keep normal page scrolling; ctrl + wheel zooms
          touchmoveTwoFingers: false,
          caption: sceneCaption,
          navbar: ["zoom", "gyroscope", "fullscreen"],
          loadingTxt: t("components.panorama.loading", "Loading…"),
          plugins: [GyroscopePlugin],
        });
      } catch (e) {
        console.error("Panorama failed to start", e);
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
      viewer.current?.destroy();
      viewer.current = null;
    };
    // The viewer is created once; scene changes are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Switch scene inside an already-running viewer.
  useEffect(() => {
    const v = viewer.current;
    if (!v) return;
    v.setPanorama(scene.src, {
      panoData: panoDataFor(scene),
      caption: sceneCaption,
      transition: false,
      position: { yaw: 0, pitch: 0 },
      zoom: partial ? 0 : 40,
    }).catch(() => setError(true));
    v.setOption("maxFov", maxFovFor(scene));
  }, [scene, partial, sceneCaption]);

  return (
    <div className={className}>
      {scenes.length > 1 && (
        <div role="tablist" aria-label={t("components.panorama.chooseLabel", "Choose a place to look around")} className="mb-4 flex justify-center gap-2">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              onClick={() => {
                setError(false);
                setIndex(i);
              }}
              className={`min-h-[44px] rounded-full border-2 px-5 text-sm font-semibold transition active:scale-95 ${
                i === index ? "border-marigold bg-marigold text-wood" : "border-marigold/60 text-cream"
              }`}
            >
              {t(`sceneCopy.${s.id}.title`, s.title)}
            </button>
          ))}
        </div>
      )}

      <div className="wood-frame relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-wood">
        {/* poster shown until the visitor asks to explore */}
        {!active && (
          <>
            <Image
              src={scene.src}
              alt={sceneCaption}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wood/80 via-wood/10 to-transparent" aria-hidden />
            <button
              onClick={() => setActive(true)}
              className="absolute inset-0 flex flex-col items-center justify-end gap-3 pb-6 text-cream"
              aria-label={t("components.panorama.lookAroundPrefix", "Look around: ") + sceneTitle}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-marigold bg-brick/90 shadow-xl">
                <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="#E8A317" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <ellipse cx="24" cy="24" rx="19" ry="8" />
                  <path d="M24 5c-7 5-7 33 0 38M24 5c7 5 7 33 0 38" />
                </svg>
              </span>
              <span className="font-display text-lg">
                {t("components.panorama.tapToLook", "Tap to look around")}
              </span>
            </button>
          </>
        )}
        <div ref={box} className={`absolute inset-0 ${active ? "" : "pointer-events-none opacity-0"}`} />
        {error && (
          <p role="alert" className="absolute inset-x-4 bottom-4 rounded-xl bg-cream p-3 text-sm text-brick-deep">
            {t("components.panorama.error", "The viewer couldn't start on this device. The photo is still shown in the gallery.")}
          </p>
        )}
      </div>

      <p className="mt-3 text-center text-sm text-cream/80">
        {active ? t("components.panorama.dragHint", "Drag to look around · pinch to zoom") : sceneCaption}
      </p>
      {partial && (
        <p className="mt-1 text-center text-xs text-cream/60">
          {t("components.panorama.photoView", "Photo view (about {hfov}° wide). A full 360° capture will replace it when available.").replace(
            "{hfov}",
            String(scene.hfov),
          )}
        </p>
      )}
    </div>
  );
}
