import type { Metadata } from "next";
import ReviewsView from "./ReviewsView";

export const metadata: Metadata = { title: "Voices | Balaju Living Heritage" };

export default function Voices() {
  return <ReviewsView />;
}
