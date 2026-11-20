"use client";

import { useSearchParams } from "next/navigation";
import ContributionForm from "@/components/archive/ContributionForm";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SubmitStoryView() {
  const { isNepali } = useLanguage();
  const searchParams = useSearchParams();
  const loc = (searchParams.get("location") as "22-dhara" | "pyatho-ajima" | "ward-16") || "22-dhara";
  const type = searchParams.get("type") === "photo" ? "photo" : "story";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-wood via-brick-deep to-brick px-5 pb-16 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
        <Reveal className="relative mx-auto max-w-2xl">
          <p className="font-deva text-xs font-semibold uppercase tracking-widest text-marigold">
            {isNepali ? "वडा नं. १६ जीवित सम्पदा" : "Balaju Ward 16 Living Heritage"}
          </p>
          <h1 className="font-display mt-2 text-3xl sm:text-5xl">
            {isNepali ? "आफ्नो कथा वा तस्बिर साझा गर्नुहोस्" : "Share a Story or Photos"}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-cream/85 leading-relaxed">
            {isNepali
              ? "खाता चाहिँदैन। कथा वा तस्बिर पठाउनुहोस्; एडमिनले जाँचेपछि कथा 'कथा' पृष्ठमा र तस्बिर ग्यालरीमा देखिन्छ।"
              : "No account needed. Send a story or photos below. After an admin approves them, stories appear on the Stories page and photos appear in the Gallery."}
          </p>
        </Reveal>

        <svg
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream"
          aria-hidden
        >
          <path d="M0 24V12q25-14 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0V24Z" fill="currentColor" />
        </svg>
      </section>

      <PageLayout variant="narrow" underHero>
        <PageLayout.Section>
          <Reveal>
            <ContributionForm initialLocation={loc} initialType={type} />
          </Reveal>
        </PageLayout.Section>
      </PageLayout>
    </>
  );
}
