/**
 * lib/gallery.ts: all gallery albums and items in one place.
 *
 * PLACEHOLDERS: until real photographs arrive, each album repeats the project's existing photos and
 * video, shown with different crops so the grid looks like a camera roll. Every such item has
 * `placeholder: true` (the viewer then says "Sample"). To go live, replace entries in `media` with
 * real files in /public/media and set `placeholder: false`. Nothing else needs to change.
 */

export type Bi = { en: string; ne: string };
export type AlbumId = "dhara" | "ajima" | "visitors";

export type Album = {
  id: AlbumId;
  title: Bi;
  blurb: Bi;
  /** cover image (none = a drawn cover) */
  cover?: string;
  tone: "teal" | "brick" | "wood" | "marigold";
};

export type MediaItem = {
  id: string;
  album: AlbumId;
  type: "photo" | "video";
  src: string;
  poster?: string;
  caption: Bi;
  /** which part of the picture to show: x/y are percentages, zoom 1 = whole picture */
  crop: { x: number; y: number; zoom: number };
  duration?: string;
  /** show the whole picture uncropped (visitor photos) */
  natural?: boolean;
  placeholder: boolean;
};

export const ALBUM_IDS: AlbumId[] = ["dhara", "ajima", "visitors"];

export const albums: Album[] = [
  {
    id: "dhara",
    title: { en: "22 Dhara", ne: "२२ धारा" },
    blurb: { en: "The stone spouts", ne: "ढुङ्गेधाराहरू" },
    cover: "/media/spouts.jpg",
    tone: "teal",
  },
  {
    id: "ajima",
    title: { en: "Pyatho Ajima", ne: "प्याठो अजिमा" },
    blurb: { en: "The shrine", ne: "मन्दिर" },
    cover: "/media/shrine1.jpg",
    tone: "brick",
  },
  {
    id: "visitors",
    title: { en: "From visitors", ne: "आगन्तुकबाट" },
    blurb: { en: "Approved photos from visitors", ne: "स्वीकृत आगन्तुक तस्बिरहरू" },
    tone: "marigold",
  },
];

// ---- placeholder generation -------------------------------------------------------------

/** Different crops of the same picture, so a repeated photo still looks like many photos. */
const CROPS: MediaItem["crop"][] = [
  { x: 50, y: 50, zoom: 1 },
  { x: 8, y: 20, zoom: 1.7 },
  { x: 92, y: 20, zoom: 1.7 },
  { x: 8, y: 90, zoom: 1.7 },
  { x: 92, y: 90, zoom: 1.7 },
  { x: 50, y: 50, zoom: 2.1 },
  { x: 28, y: 50, zoom: 1.9 },
  { x: 72, y: 50, zoom: 1.9 },
  { x: 50, y: 15, zoom: 1.5 },
  { x: 50, y: 85, zoom: 1.5 },
  { x: 15, y: 60, zoom: 2.3 },
  { x: 85, y: 40, zoom: 2.3 },
  { x: 35, y: 25, zoom: 2.5 },
  { x: 65, y: 75, zoom: 2.5 },
  { x: 50, y: 50, zoom: 1.35 },
  { x: 20, y: 80, zoom: 1.55 },
  { x: 80, y: 15, zoom: 1.45 },
  { x: 45, y: 65, zoom: 2 },
];

const NE_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const ne = (n: number) => String(n).split("").map((d) => NE_DIGITS[Number(d)]).join("");

function photos(album: "dhara" | "ajima", src: string, count: number, name: Bi): MediaItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${album}-photo-${i + 1}`,
    album,
    type: "photo" as const,
    src,
    caption: {
      en: `${name.en}, photo ${i + 1}`,
      ne: `${name.ne}, तस्बिर ${ne(i + 1)}`,
    },
    crop: CROPS[i % CROPS.length],
    placeholder: true,
  }));
}

function clips(album: AlbumId, count: number, name: Bi): MediaItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${album}-video-${i + 1}`,
    album,
    type: "video" as const,
    src: "/media/spouts-walk.mp4",
    poster: "/media/spouts-walk-poster.jpg",
    caption: {
      en: `${name.en}, clip ${i + 1}`,
      ne: `${name.ne}, क्लिप ${ne(i + 1)}`,
    },
    crop: CROPS[(i * 3 + 2) % CROPS.length],
    duration: "0:15",
    placeholder: true,
  }));
}

const dharaName: Bi = { en: "22 Dhara", ne: "२२ धारा" };
const ajimaName: Bi = { en: "Pyatho Ajima", ne: "प्याठो अजिमा" };

/** Photos and clips shown in an album, newest first. Visitor photos are loaded live, not listed here. */
export const media: MediaItem[] = [
  ...photos("dhara", "/media/spouts.jpg", 18, dharaName),
  ...clips("dhara", 4, dharaName),
  ...photos("ajima", "/media/shrine1.jpg", 15, ajimaName),
  ...clips("ajima", 3, ajimaName),
];

export const getAlbum = (id: string) => albums.find((a) => a.id === id);
export const mediaFor = (id: AlbumId) => media.filter((m) => m.album === id);
export const countFor = (id: AlbumId) => mediaFor(id).length;
