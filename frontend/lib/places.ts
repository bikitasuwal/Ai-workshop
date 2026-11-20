// Places (cards, gallery, map pins) + panorama scenes. Edit this file to add places or swap in real 360° photos.

export const WARD = {
  name: "Ward 16, Kathmandu",
  ne: "वडा नं. १६",
  boundaryUrl: "/data/ward16.json", // OpenStreetMap relation 16110486 (© OpenStreetMap contributors, ODbL)
  // Used for the Google Maps links
  googleQuery: "Baisdhara, Balaju, Kathmandu-16",
};

/** The two places. Home cards, Places page, Gallery and the map all read from this one list. */
export type Place = {
  id: "dhara" | "ajima";
  name: string;
  ne: string;
  /** Nepali line on the home card */
  neLong: string;
  href: string;
  tone: "teal" | "brick";
  /** map pin colour */
  color: string;
  photo: string;
  photoAlt: string;
  /** one-line summary on cards */
  summary: string;
  /** short line on the map */
  mapBlurb: string;
  lat: number;
  lng: number;
  /** true = position is an estimate inside the park complex, not a surveyed point */
  approximate: boolean;
  locationSource: string;
};

export const places: Place[] = [
  {
    id: "dhara",
    name: "22 Dhara",
    ne: "२२ धारा",
    neLong: "२२ धारा · बैसधारा",
    href: "/dhara",
    tone: "teal",
    color: "#1f4e5f",
    photo: "/media/spouts.jpg",
    photoAlt: "Carved stone spouts along the wall at 22 Dhara",
    summary: "Twenty-two stone water spouts beside the Nagarjun forest, a place of bathing, blessing and festival.",
    mapBlurb: "Twenty-two stone water spouts",
    lat: 27.7343705,
    lng: 85.3015573,
    approximate: false,
    locationSource: "OpenStreetMap node 11505220268 (Baisdhara)",
  },
  {
    id: "ajima",
    name: "Pyatho Ajima",
    ne: "प्याठो अजिमा",
    neLong: "प्याठो अजिमा",
    href: "/ajima",
    tone: "brick",
    color: "#8b2e1f",
    photo: "/media/shrine1.jpg",
    photoAlt: "A brick shrine with a tiered red roof in the Baisdhara Park complex",
    summary: "A protective mother-goddess shrine, home of the Dristi Lekhan eye-painting ritual.",
    mapBlurb: "Protective mother-goddess shrine",
    // The shrine is not mapped in OpenStreetMap. Notes place it inside the Baisdhara Park complex,
    // so this pin sits a few metres from the Baisdhara point. Replace with the surveyed position.
    lat: 27.73447,
    lng: 85.30168,
    approximate: true,
    locationSource: "Estimated inside the Baisdhara Park complex",
  },
];

// ---------------------------------------------------------------------------------------------
// Panorama scenes
//
// The supplied photos are ordinary (flat) photographs, not 360° captures, so they are shown as
// PARTIAL panoramas: they sit on the sphere at their real field of view and you can look around
// within the photographed area. When a real 360° photo exists, add it with `equirect: true`
// (a 2:1 equirectangular JPG) and the viewer becomes a full 360° view automatically.
// ---------------------------------------------------------------------------------------------
export type Scene = {
  id: string;
  placeId: string;
  title: string;
  ne: string;
  caption: string;
  src: string;
  width: number;
  height: number;
  /** full 360° equirectangular image (2:1). If false, `hfov` is the photo's horizontal field of view */
  equirect: boolean;
  hfov: number;
};

export const scenes: Scene[] = [
  {
    id: "dhara-spouts",
    placeId: "dhara",
    title: "The spouts",
    ne: "धाराहरू",
    caption: "Carved stone spouts along the wall of 22 Dhara.",
    src: "/media/spouts.jpg",
    width: 1600,
    height: 1200,
    equirect: false,
    hfov: 70,
  },
  {
    id: "ajima-shrine",
    placeId: "ajima",
    title: "The shrine courtyard",
    ne: "मन्दिर चोक",
    caption: "A brick shrine with a tiered red roof in the Balaju Baisdhara Park complex.",
    src: "/media/shrine1.jpg",
    width: 1920,
    height: 1231,
    equirect: false,
    hfov: 70,
  },
];

export const video = {
  src: "/media/spouts-walk.mp4",
  poster: "/media/spouts-walk-poster.jpg",
  title: "A walk along the spouts",
  caption: "A handheld walk along the 22 Dhara wall. Recorded without sound.",
};
