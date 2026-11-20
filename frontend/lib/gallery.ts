/**
 * lib/gallery.ts: authentic gallery albums and media items.
 *
 * Media items are sourced directly from public/images/22-dhara and
 * public/images/pyatho-ajima, presenting genuine photographs of the sites
 * with natural scaling and bilingual captions.
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
  /** show the whole picture uncropped (visitor photos & authentic photos) */
  natural?: boolean;
  placeholder: boolean;
};

export const ALBUM_IDS: AlbumId[] = ["dhara", "ajima", "visitors"];

export const albums: Album[] = [
  {
    id: "dhara",
    title: { en: "22 Dhara", ne: "२२ धारा" },
    blurb: { en: "The 22 stone spouts and sacred water complex", ne: "२२ ढुङ्गेधारा र ऐतिहासिक जल परिसर" },
    cover: "/images/22-dhara/hero.jpg",
    tone: "teal",
  },
  {
    id: "ajima",
    title: { en: "Pyatho Ajima", ne: "प्याठो अजिमा" },
    blurb: { en: "The mother-goddess shrine and courtyard", ne: "मातृदेवी मन्दिर र प्रांगण" },
    cover: "/images/pyatho-ajima/hero.jpg",
    tone: "brick",
  },
  {
    id: "visitors",
    title: { en: "From visitors", ne: "आगन्तुकबाट" },
    blurb: { en: "Approved photos from visitors", ne: "स्वीकृत आगन्तुक तस्बिरहरू" },
    tone: "marigold",
  },
];

const centerCrop = { x: 50, y: 50, zoom: 1 };

// ---- 22 Dhara authentic media -------------------------------------------------------------
const dharaMedia: MediaItem[] = [
  {
    id: "dhara-hero",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/hero.jpg",
    caption: {
      en: "22 Dhara Spouts Complex Overview",
      ne: "२२ धारा जल परिसरको अवलोकन",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-spouts-row",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/spouts-row.jpg",
    caption: {
      en: "Linear alignment of the 22 stone spouts",
      ne: "२२ वटा ढुङ्गेधाराको लहर",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-vibrant-spouts",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/vibrant-spouts.jpg",
    caption: {
      en: "Continuous spring water flowing from sacred hitis",
      ne: "ढुङ्गेधाराबाट अविरल बग्ने प्राकृतिक मूलको पानी",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-spouts-detail",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/spouts-detail.jpg",
    caption: {
      en: "Detail of stone spouts and drainage basin",
      ne: "ढुङ्गेधाराको निकास र जलप्रणालीको विवरण",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-makara-carving",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/makara-carving.jpg",
    caption: {
      en: "Intricate Makara (Hitimanga) aquatic beast stone carving",
      ne: "मकर (हितिमंगः) को कलात्मक ढुङ्गे बुट्टा",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-architecture-overview",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/architecture-overview.jpg",
    caption: {
      en: "Architectural layout of the sunken hiti-gah courtyard",
      ne: "हिति-गाः (गहिरो ढुङ्गे चोक) को वास्तुकला संरचना",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-baisdhara-mela",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/baisdhara-mela.jpg",
    caption: {
      en: "Baisdhara Mela festival gathering and ritual bathing",
      ne: "बाइसधारा मेलामा भेला भएका भक्तजन र स्नान",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-heritage-garden",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/heritage-garden.jpg",
    caption: {
      en: "Surrounding historic Balaju heritage gardens and ponds",
      ne: "ऐतिहासिक बालाजु सम्पदा बगैँचा र पोखरी",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-historic-archival",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/historic-archival.jpg",
    caption: {
      en: "Archival record of pilgrims and bathers at Baisdhara",
      ne: "२२ धारा तीर्थयात्राको ऐतिहासिक अभिलेख तस्बिर",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-comparison-historic",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/comparison-historic.jpg",
    caption: {
      en: "Historic black & white archival photograph of the spouts",
      ne: "बालाजु धाराको ऐतिहासिक पुरानो श्यामश्वेत तस्बिर",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-comparison-contemporary",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/comparison-contemporary.jpg",
    caption: {
      en: "Contemporary restored layout of 22 Dhara",
      ne: "२२ धाराको हालको समकालीन स्वरूप",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-360-gardens",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/360-gardens.jpg",
    caption: {
      en: "Panoramic garden vista overlooking Nagarjun foothills",
      ne: "नागार्जुन फेदीतर्फ फैलिएको बगैँचाको विस्तृत दृश्य",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-360-spouts",
    album: "dhara",
    type: "photo",
    src: "/images/22-dhara/360-spouts.jpg",
    caption: {
      en: "Wide panoramic view across the water spouts courtyard",
      ne: "ढुङ्गेधारा परिसरको विस्तृत ३६०° परिदृश्य",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "dhara-video-walk",
    album: "dhara",
    type: "video",
    src: "/media/spouts-walk.mp4",
    poster: "/media/spouts-walk-poster.jpg",
    caption: {
      en: "Video walkthrough alongside the 22 spouts",
      ne: "२२ धारा परिसरको भिडियो यात्रा",
    },
    crop: centerCrop,
    duration: "0:15",
    natural: true,
    placeholder: false,
  },
];

// ---- Pyatho Ajima authentic media ------------------------------------------------------
const ajimaMedia: MediaItem[] = [
  {
    id: "ajima-hero",
    album: "ajima",
    type: "photo",
    src: "/images/pyatho-ajima/hero.jpg",
    caption: {
      en: "Pyatho Ajima shrine and pagoda facade",
      ne: "प्याठो अजिमा मन्दिरको मुख्य स्वरूप",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "ajima-temple-front",
    album: "ajima",
    type: "photo",
    src: "/images/pyatho-ajima/temple-front.jpg",
    caption: {
      en: "Front threshold and entrance to the sanctum",
      ne: "मन्दिरको मूल प्रवेश द्वार र प्रांगण",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "ajima-ritual-worship",
    album: "ajima",
    type: "photo",
    src: "/images/pyatho-ajima/ritual-worship.jpg",
    caption: {
      en: "Devotees making morning offerings and performing rituals",
      ne: "नित्यपूजा र अनुष्ठानमा सहभागी भक्तजनहरू",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
  {
    id: "ajima-360-threshold",
    album: "ajima",
    type: "photo",
    src: "/images/pyatho-ajima/360-threshold.jpg",
    caption: {
      en: "Threshold view toward the inner sanctum",
      ne: "गर्भगृह प्रवेशको ३६०° दृश्य",
    },
    crop: centerCrop,
    natural: true,
    placeholder: false,
  },
];

/** Photos and clips shown in an album, newest first. Visitor photos are loaded live from API. */
export const media: MediaItem[] = [
  ...dharaMedia,
  ...ajimaMedia,
];

export const getAlbum = (id: string) => albums.find((a) => a.id === id);
export const mediaFor = (id: AlbumId) => media.filter((m) => m.album === id);
export const countFor = (id: AlbumId) => mediaFor(id).length;
