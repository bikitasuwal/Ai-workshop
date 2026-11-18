import type { Metadata } from "next";
import SourcesView from "./SourcesView";

export const metadata: Metadata = { title: "Sources | Balaju Living Heritage" };

export default function Sources() {
  return <SourcesView />;
}
