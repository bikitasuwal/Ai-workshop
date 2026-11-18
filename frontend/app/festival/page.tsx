import type { Metadata } from "next";
import FactAccordion from "@/components/FactAccordion";
import AskButton from "@/components/AskButton";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle, Stamp } from "@/components/ui";
import { byPlace } from "@/lib/content";

export const metadata: Metadata = { title: "Lhuti Punhi & Baisdhara Mela | Balaju Living Heritage" };

export default function Festival() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-deep to-wood px-5 pb-20 pt-24 text-center text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          {[10, 28, 46, 64, 82, 94].map((x, i) => (
            <svg key={x} x={`${x}%`} y="100%" overflow="visible">
              <g className="diya-rise" style={{ animationDelay: `${i * 1.1}s`, animationDuration: "8s" }}>
                <ellipse rx="9" ry="4" fill="#8b2e1f" />
                <path d="M0-3C-3-8 0-11 0-14 3-11 3-8 0-3Z" fill="#e8a317" className="flame" />
              </g>
            </svg>
          ))}
        </svg>
        <Reveal className="relative mx-auto max-w-xl">
          <p className="font-deva text-base font-semibold text-marigold">ल्हुति पुन्हि · बैसधारा मेला</p>
          <h1 className="font-display mt-1 text-4xl sm:text-5xl">Lhuti Punhi</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-cream/85">
            The yearly Baisdhara Mela: bathing at the spouts, lamps for the departed, and worship at the Ajima shrine.
          </p>
        </Reveal>
        <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 block h-6 w-full text-cream" aria-hidden>
          <path d="M0 24V12l25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10 25-10 25 10V24Z" fill="currentColor" />
        </svg>
      </section>

      <PageLayout variant="narrow" underHero>
        {/* date card */}
        <PageLayout.Section>
          <Reveal>
            <div className="wood-frame rounded-3xl bg-paper p-6 text-center">
              <p className="font-deva text-sm font-semibold text-vermilion">मिति</p>
              <h2 className="font-display text-2xl text-brick">This year&apos;s date</h2>
              <div className="mt-3 flex justify-center">
                <Stamp type="verify" size="md" />
              </div>
              <p className="mx-auto mt-3 max-w-md text-[17px] text-wood/85">
                Reports disagree: some say the full moon of Chaitra, one 2024 report says Baisakh. We will publish the
                date only after it is confirmed by the local committee or Guthi.
              </p>
            </div>
          </Reveal>
        </PageLayout.Section>

        <PageLayout.Section>
          <Reveal>
            <SectionTitle ne="पर्वको बारेमा" en="About the festival" />
          </Reveal>
          <div className="mt-6">
            <FactAccordion items={byPlace("festival")} accent="teal" />
          </div>
          <Reveal className="mt-8 text-center">
            <AskButton question="When is Lhuti Punhi?" className="min-h-[52px] rounded-full bg-brick px-7 font-semibold text-cream active:scale-95">
              Ask the guide about the festival
            </AskButton>
          </Reveal>
        </PageLayout.Section>
      </PageLayout>
    </>
  );
}
