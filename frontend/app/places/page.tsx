import type { Metadata } from "next";
import PlacesView from "./PlacesView";

export const metadata: Metadata = { title: "Places | Balaju Living Heritage" };

export default function Places() {
  return <PlacesView />;
}
