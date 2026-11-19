import type { Metadata } from "next";
import { Suspense } from "react";
import SubmitStoryView from "./SubmitStoryView";

export const metadata: Metadata = {
  title: "Contribute Your Story | Balaju Living Heritage",
  description:
    "Share personal memories, elder oral histories, family photographs, and cultural reflections to preserve the living heritage of Balaju Ward 16.",
};

export default function SubmitStoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream py-32 text-center text-wood">Loading...</div>}>
      <SubmitStoryView />
    </Suspense>
  );
}
