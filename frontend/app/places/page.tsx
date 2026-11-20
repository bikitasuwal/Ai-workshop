import type { Metadata } from "next";
import PlacesView from "./PlacesView";

export const metadata: Metadata = {
  title: "Places — 22 Dhara & Pyah Thwam Ajima | Balaju Living Heritage",
  description:
    "The two heritage places inside the Balaju Baisdhara Park complex: the 22 stone spouts of Baisdhara and the Pyah Thwam Ajima shrine.",
};

export default function Places() {
  return <PlacesView />;
}
