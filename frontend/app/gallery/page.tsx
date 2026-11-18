import type { Metadata } from "next";
import GalleryView from "./GalleryView";

export const metadata: Metadata = { title: "Gallery | Balaju Living Heritage" };

export default function Gallery() {
  return <GalleryView />;
}
