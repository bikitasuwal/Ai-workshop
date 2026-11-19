import type { Metadata } from "next";
import StoriesView from "./StoriesView";

export const metadata: Metadata = {
  title: "Community Heritage Stories | Balaju Living Heritage",
  description:
    "Explore community memories, oral histories, elder recollections, and historical photographs documenting 22 Dhara and Pyatho Ajima in Balaju Ward 16.",
};

export default function StoriesPage() {
  return <StoriesView />;
}
