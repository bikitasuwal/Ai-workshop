"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import type * as LeafletNS from "leaflet";
import { places as landmarks, WARD } from "@/lib/places";
import { chip, chipAction } from "@/lib/styles";

type LMap = LeafletNS.Map;
type LBounds = LeafletNS.LatLngBounds;

const gmapsLink = (lat: number, lng: number) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const gmapsWard = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(WARD.googleQuery)}`;

const loadLeaflet = async () => {
  const mod = await import("leaflet");
  return (mod as unknown as { default?: typeof LeafletNS }).default ?? mod;
};
const pinBounds = (L: typeof LeafletNS) =>
  L.latLngBounds(landmarks.map((l) => [l.lat, l.lng] as [number, number])).pad(0.6);

export default function HeritageMap() {
  const router = useRouter();
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const wardBounds = useRef<LBounds | null>(null);
  const [tab, setTab] = useState<"map" | "google">("map");
  const [unlocked, setUnlocked] = useState(true);
  const [touch, setTouch] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (tab !== "map" || !box.current) return;
    let cancelled = false;
    (async () => {
      const L = await loadLeaflet();
      if (cancelled || !box.current) return;

      const isTouch = L.Browser.mobile;
      setTouch(isTouch);
      setUnlocked(!isTouch); // on phones, one-finger drag scrolls the page until the visitor unlocks the map

      const m = L.map(box.current, {
        zoomSnap: 0.25,
        scrollWheelZoom: false,
        dragging: !isTouch,
        attributionControl: true,
        minZoom: 12,
        maxZoom: 19,
      });
      map.current = m;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(m);

      // Landmarks: the label is the tap target, and opens the detail page.
      landmarks.forEach((lm, i) => {
        const side = i % 2 === 0 ? "left" : "right";
        const icon = L.divIcon({
          className: "lm-wrap",
          iconSize: [0, 0],
          html: `<span class="lm" style="--c:${lm.color}"><span class="lm-dot"></span><span class="lm-label lm-${side}"><b>${lm.name}</b></span></span>`,
        });
        L.marker([lm.lat, lm.lng], { icon, title: `${lm.name} — open details`, keyboard: true, riseOnHover: true })
          .addTo(m)
          .on("click", () => router.push(lm.href));
      });

      m.fitBounds(pinBounds(L), { maxZoom: 17 });

      try {
        const res = await fetch(WARD.boundaryUrl);
        const gj = await res.json();
        if (cancelled) return;
        const layer = L.geoJSON(gj, {
          style: { color: "#8b2e1f", weight: 2.5, dashArray: "6 6", fillColor: "#e8a317", fillOpacity: 0.08 },
          interactive: false,
        }).addTo(m);
        wardBounds.current = layer.getBounds();
        // Show the whole ward first (the overview), so the landmarks sit in context.
        m.fitBounds(wardBounds.current, { padding: [8, 8] });
        m.setMaxBounds(wardBounds.current.pad(0.6));
      } catch {
        /* the map still works without the outline */
      }
    })().catch(() => setFailed(true));

    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, [tab, router]);

  const zoomToLandmarks = async () => {
    const L = await loadLeaflet();
    map.current?.flyToBounds(pinBounds(L), {
      maxZoom: 18,
      duration: 1.2,
    });
  };
  const showWard = () => wardBounds.current && map.current?.flyToBounds(wardBounds.current, { padding: [8, 8], duration: 1.2 });
  const toggleLock = () => {
    const m = map.current;
    if (!m) return;
    if (unlocked) m.dragging.disable();
    else m.dragging.enable();
    setUnlocked(!unlocked);
  };

  const center = landmarks[0];

  return (
    <div>
      <div role="tablist" aria-label="Map type" className="mb-4 flex justify-center gap-2">
        {(
          [
            ["map", "Interactive map"],
            ["google", "Google Maps"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={chip(tab === k)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "map" && (
        <div className="mb-3 flex flex-wrap justify-center gap-2">
          <button onClick={zoomToLandmarks} className={chipAction}>
            Zoom to landmarks
          </button>
          <button onClick={showWard} className={chipAction}>
            Whole ward
          </button>
          {touch && (
            <button onClick={toggleLock} className={chip(true)}>
              {unlocked ? "Lock map (to scroll page)" : "Unlock map to move it"}
            </button>
          )}
        </div>
      )}

      <div className="wood-frame relative isolate overflow-hidden rounded-3xl bg-paper">
        {tab === "map" ? (
          <>
            <div ref={box} className="h-[420px] w-full sm:h-[480px]" aria-label={`Map of ${WARD.name} with landmarks`} />
            {failed && (
              <p role="alert" className="absolute inset-x-4 top-4 z-[500] rounded-xl bg-cream p-3 text-sm text-brick-deep">
                The map couldn&apos;t load. Use the landmark cards below or open Google Maps.
              </p>
            )}
          </>
        ) : (
          <iframe
            title={`Google Map near ${landmarks[0].name}`}
            src={`https://www.google.com/maps?q=${center.lat},${center.lng}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full border-0 sm:h-[480px]"
            allowFullScreen
          />
        )}
      </div>

      <p className="mt-3 text-center text-xs text-wood/65">
        {tab === "map"
          ? "Tap a landmark name to open its page. Map data © OpenStreetMap contributors."
          : "Landmark pins open pages only on the Interactive map. Use the cards below here."}
      </p>

      {/* Landmark cards: always available, also the route to the pages from the Google view */}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {landmarks.map((lm) => (
          <li key={lm.id}>
            <Link
              href={lm.href}
              className="wood-frame flex h-full items-stretch overflow-hidden rounded-2xl bg-cream transition active:scale-[0.98]"
            >
              <span className="relative block w-28 shrink-0">
                <Image src={lm.photo} alt="" fill sizes="112px" className="object-cover" />
              </span>
              <span className="flex flex-col justify-center gap-0.5 p-4">
                <span className="font-deva text-xs font-semibold text-vermilion">{lm.ne}</span>
                <span className="font-display text-lg leading-tight text-brick">{lm.name}</span>
                <span className="text-sm text-wood/75">{lm.mapBlurb}</span>
                {lm.approximate && <span className="mt-1 text-[11px] text-wood/55">Pin position approximate</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
        <a href={gmapsWard} target="_blank" rel="noreferrer" className="font-semibold text-teal underline underline-offset-4">
          Open {WARD.name} in Google Maps ↗
        </a>
        <a
          href={gmapsLink(landmarks[0].lat, landmarks[0].lng)}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-teal underline underline-offset-4"
        >
          Directions to Baisdhara ↗
        </a>
      </div>
    </div>
  );
}
