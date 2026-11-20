import type { CommunityStory } from "@/lib/communityStories";

export type SubmissionType = "story" | "photo";
export type PlaceId = "22-dhara" | "pyatho-ajima" | "ward-16";
export type Status = "pending" | "approved" | "rejected";
export type Attribution = "real_name" | "anonymous" | "representative";

export type Submission = {
  id: string;
  type: SubmissionType;
  place: PlaceId;
  title: string | null;
  body: string;
  era: string | null;
  authorName: string | null; // null = anonymous
  authorRole: string | null;
  authorAge: string | null;
  attribution: Attribution;
  createdAt: string;
  photos: string[];
  // admin only
  authorEmail?: string | null;
  status?: Status;
  rejectReason?: string | null;
};

export const placeName: Record<PlaceId, { en: string; ne: string }> = {
  "22-dhara": { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" },
  "pyatho-ajima": { en: "Pyatho Ajima", ne: "प्याठो अजिमा" },
  "ward-16": { en: "Balaju Ward 16 Heritage", ne: "बालाजु वडा १६ सम्पदा" },
};

export const photoUrl = (id: string) => `/api/submissions/photos/${id}`;

export const when = (iso: string, locale = "en-GB") =>
  new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });

const ANON = { en: "Anonymous Resident", ne: "स्थानीय बासिन्दा (गोप्य)" };

/** An approved story from the API, in the shape the Stories page already renders. */
export function toCommunityStory(s: Submission): CommunityStory {
  const name = s.authorName ?? ANON.en;
  const title = s.title ?? "";
  return {
    id: `submission-${s.id}`,
    slug: `submission-${s.id}`,
    title: { en: title, ne: title },
    contributor: {
      name,
      nameNepali: s.authorName ?? ANON.ne,
      role: s.authorRole ? { en: s.authorRole, ne: s.authorRole } : { en: "Community Member", ne: "स्थानीय समुदाय सदस्य" },
      attributionPreference: s.attribution,
    },
    heritageLocation: { id: s.place, name: placeName[s.place], slug: s.place },
    category: "user",
    era: s.era ?? "Recent Recollection",
    publicationDate: s.createdAt.slice(0, 10),
    summary: { en: s.body.slice(0, 160) + "…", ne: s.body.slice(0, 160) + "…" },
    content: { en: s.body, ne: s.body },
    photographs: s.photos.map((id) => ({
      url: photoUrl(id),
      caption: { en: title, ne: title },
      credit: name,
    })),
    tags: ["community", "memory", s.place],
    status: "approved",
  };
}

/** Shrinks a phone photo before upload (keeps data use low and stays under the size limit). */
export async function shrinkImage(file: File, max = 1600): Promise<File> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale);
    const h = Math.round(bmp.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
    bmp.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file; // e.g. a format the browser can't decode; the server will validate it
  }
}
