"use client";

/**
 * app/places/PlacesView.tsx — client body of /places.
 * The server wrapper (page.tsx) owns the `metadata` export.
 */

import PlaceCard from "@/components/PlaceCard";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import { places } from "@/lib/places";
import { useLanguage } from "@/i18n/LanguageContext";

export default function PlacesView() {
  const { t } = useLanguage();

  return (
    <PageLayout variant="narrow">
      <Reveal>
        <SectionTitle titleKey="thePlaces" />
        <p className="mx-auto mt-3 max-w-md text-center text-wood/80">
          {t("pages.places.intro")}
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
