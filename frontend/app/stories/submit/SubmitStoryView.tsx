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

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-wood via-brick-deep to-brick px-5 pb-16 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.07]" aria-hidden />
        <Reveal className="relative mx-auto max-w-2xl">
          <p className="font-deva text-xs font-semibold uppercase tracking-widest text-marigold">
            {isNepali ? "वडा नं. १६ जीवित सम्पदा" : "Balaju Ward 16 Living Heritage"}
          </p>
          <h1 className="font-display mt-2 text-3xl sm:text-5xl">
            {isNepali ? "आफ्नो सम्झना वा इतिहास साझा गर्नुहोस्" : "Share Your Heritage Memory"}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-cream/85 leading-relaxed">
            {isNepali
              ? "प्रत्येक सम्झना, पुरानो पारिवारिक तस्बिर र मौखिक भनाइले हाम्रो सामूहिक सम्पदालाई जीवन्त राख्छ। कृपया तलको फाराम भरेर अभिलेखालयमा योगदान गर्नुहोस्।"
              : "Every memory, family photograph, and spoken recollection adds to our collective tapestry. Please fill out the form below to contribute to the living archive."}
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
            <ContributionForm initialLocation={loc} />
          </Reveal>
        </PageLayout.Section>
      </PageLayout>
    </>
  );
}
