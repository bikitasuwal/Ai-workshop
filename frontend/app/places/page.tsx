import type { Metadata } from "next";
import PlaceCard from "@/components/PlaceCard";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import { places } from "@/lib/places";

export const metadata: Metadata = { title: "Places | Balaju Living Heritage" };

export default function Places() {
  return (
    <PageLayout variant="narrow">
      <Reveal>
        <SectionTitle ne="स्थानहरू" en="The places" />
        <p className="mx-auto mt-3 max-w-md text-center text-wood/80">
          Two places inside the Balaju Baisdhara Park complex. They are best understood together.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {places.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <PlaceCard place={p} />
          </Reveal>
        ))}
      </div>
    </PageLayout>
  );
}
