export type Kind = "review" | "photo" | "complaint";
export type PlaceKey = "dhara" | "ajima" | "general";
export type Status = "pending" | "approved" | "rejected";

export type Post = {
  id: string;
  kind: Kind;
  place: PlaceKey;
  rating: number | null;
  title: string | null;
  body: string;
  status: Status;
  rejectReason: string | null;
  author: string;
  authorEmail?: string;
  createdAt: string;
  photos: string[];
};

export const kindLabel: Record<Kind, { en: string; ne: string }> = {
  review: { en: "Review", ne: "समीक्षा" },
  photo: { en: "Photo", ne: "तस्वीर" },
  complaint: { en: "Complaint", ne: "गुनासो" },
};

export const placeLabel: Record<PlaceKey, string> = {
  dhara: "22 Dhara",
  ajima: "Pyah Thwam Ajima",
  general: "Both / general",
};

export const photoUrl = (id: string) => `/api/posts/photos/${id}`;

export const when = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

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
