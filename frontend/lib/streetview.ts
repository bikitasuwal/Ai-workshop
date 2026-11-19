import type { PlaceId } from "@/lib/quizzes";

type Spot = {
  /** Option A: paste the src="…" URL from Google Maps → Share → Embed a map. No API key needed. */
  embedUrl?: string;
  /** Option B: coordinates for the official Embed API (needs NEXT_PUBLIC_GOOGLE_MAPS_API_KEY). */
  lat?: number;
  lng?: number;
  heading?: number; // 0–360, compass direction the view starts facing
  pitch?: number; // -90 to 90
  fov?: number; // zoom, 10–100
};

const spots: Record<PlaceId, Spot> = {
  dhara: {
    embedUrl: "", // ← paste the Google embed URL here
    lat: 27.7357, // approximate — confirm in Google Maps before using
    lng: 85.3048,
    heading: 0,
    pitch: 0,
    fov: 90,
  },
  ajima: {
    embedUrl: "",
    lat: 27.7355, // approximate — confirm in Google Maps before using
    lng: 85.3046,
    heading: 0,
    pitch: 0,
    fov: 90,
  },
};

export function streetViewSrc(place: PlaceId): string | null {
  const s = spots[place];
  if (s.embedUrl) return s.embedUrl;

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key || s.lat == null || s.lng == null) return null;

  const q = new URLSearchParams({
    key,
    location: `${s.lat},${s.lng}`,
    heading: String(s.heading ?? 0),
    pitch: String(s.pitch ?? 0),
    fov: String(s.fov ?? 90),
  });
  return `https://www.google.com/maps/embed/v1/streetview?${q.toString()}`;
}