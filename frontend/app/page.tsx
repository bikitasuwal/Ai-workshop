import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import PanoramaViewer from "@/components/PanoramaViewer";
import HeritageMap from "@/components/HeritageMap";
import PlaceCard from "@/components/PlaceCard";
import { places, scenes, WARD } from "@/lib/places";
import AskButton from "@/components/AskButton";
import { Reveal, SectionTitle, Stamp, PagodaDivider } from "@/components/ui";
import { chatSuggestions, evidenceMeta, type Evidence } from "@/lib/content";

const pillars = [
  { ne: "जल", en: "Water", text: "Stone spouts that serve as public water points and places of ritual bathing." },
  { ne: "पूजा", en: "Worship", text: "Shrines, offerings and the tradition of a protective mother goddess." },
  { ne: "कला", en: "Art", text: "Pũ (Chitrakar) artists paint the goddess's eyes in a community ritual." },
  { ne: "गुठी", en: "Community", text: "Guthi groups carry rituals, duties and skills from one generation to the next." },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Intro */}
      <section className="mx-auto max-w-2xl px-5 py-14 text-center">
        <Reveal>
          <PagodaDivider className="text-brick" />
          <p className="font-display mt-6 text-2xl leading-snug text-brick sm:text-3xl">
            Heritage is not only stone. It is what people keep doing.
          </p>
          <p className="mt-4 text-lg text-wood/80">
            This site records two places in Balaju and the living traditions around them, clearly separating what is
            documented from what is belief or oral tradition.
          </p>
        </Reveal>
      </section>

      {/* Two places */}
      <section className="mx-auto max-w-5xl px-5 pb-6">
        <Reveal>
          <SectionTitle ne="दुई स्थान" en="Two places, one story" />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {places.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <PlaceCard place={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Look around */}
      <section className="relative mt-12 overflow-hidden bg-gradient-to-b from-wood to-brick-deep px-5 py-16 text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <SectionTitle ne="चारैतिर हेर्नुहोस्" en="Look around the courtyards" light />
            <p className="mx-auto mt-3 max-w-md text-center text-cream/80">
              Step into the two places from your phone. Drag to look around, pinch to zoom.
            </p>
          </Reveal>
          <Reveal className="mt-8" delay={0.1}>
            <PanoramaViewer scenes={scenes} />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <SectionTitle ne={`${WARD.ne} · नक्सा`} en="Find them in Ward 16" />
          <p className="mx-auto mt-3 max-w-md text-center text-wood/80">
            Both places lie inside the Balaju Baisdhara Park complex. Tap a landmark to open its page.
          </p>
        </Reveal>
        <Reveal className="mt-8" delay={0.1}>
          <HeritageMap />
        </Reveal>
      </section>

      {/* Living heritage rail */}
      <section className="py-14">
        <Reveal>
          <SectionTitle ne="जीवित सम्पदा" en="Living heritage" />
        </Reveal>
        <div className="rail mt-8 flex gap-4 overflow-x-auto px-5 pb-4 md:mx-auto md:max-w-5xl md:grid md:grid-cols-4 md:overflow-visible">
          {pillars.map((p) => (
            <div key={p.en} className="wood-frame w-[72%] shrink-0 rounded-2xl bg-paper p-5 sm:w-[40%] md:w-auto">
              <p className="font-display text-4xl text-brick">{p.ne}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-vermilion">{p.en}</p>
              <p className="mt-3 text-[15px] text-wood/85">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Festival teaser */}
      <section className="relative overflow-hidden bg-teal-deep px-5 py-16 text-cream">
        <div className="lattice absolute inset-0 opacity-[0.06]" aria-hidden />
        <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full" aria-hidden>
          {[12, 30, 52, 74, 90].map((x, i) => (
            <svg key={x} x={`${x}%`} y="100%" overflow="visible">
              <g className="diya-rise" style={{ animationDelay: `${i * 1.3}s`, animationDuration: "9s" }}>
                <ellipse rx="9" ry="4" fill="#8b2e1f" />
                <path d="M0-3C-3-8 0-11 0-14 3-11 3-8 0-3Z" fill="#e8a317" className="flame" />
              </g>
            </svg>
          ))}
        </svg>
        <Reveal className="relative mx-auto max-w-xl text-center">
          <p className="font-deva text-sm font-semibold text-marigold">ल्हुति पुन्हि · बैसधारा मेला</p>
          <h2 className="font-display mt-1 text-3xl sm:text-4xl">The festival of lamps and water</h2>
          <p className="mt-4 text-lg text-cream/85">
            Each year devotees bathe at the spouts, some light lamps for relatives who have passed, and many then
            worship Pyah Thwam Ajima.
          </p>
          <div className="mt-5 flex justify-center">
            <Stamp type="verify" size="md" />
          </div>
          <p className="mx-auto mt-2 max-w-sm text-sm text-cream/70">
            Reports give different dates. Please confirm with the local committee.
          </p>
          <Link
            href="/festival"
            className="mt-6 inline-flex min-h-[52px] items-center rounded-full bg-marigold px-7 font-semibold text-wood transition active:scale-95"
          >
            About the festival
          </Link>
        </Reveal>
      </section>

      {/* How we label */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <SectionTitle ne="हामी कसरी लेख्छौँ" en="How we label what we know" />
          <p className="mx-auto mt-3 max-w-lg text-center text-wood/80">
            Every statement carries a small seal, so you can tell a record from a belief.
          </p>
        </Reveal>
        <div className="mt-8 space-y-3">
          {(["documented", "reported", "oral", "belief"] as Evidence[]).map((t, i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="flex items-center gap-4 rounded-2xl bg-paper/70 p-4">
                <div className="w-40 shrink-0">
                  <Stamp type={t} />
                </div>
                <p className="text-[15px] text-wood/85">{evidenceMeta[t].hint}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ask CTA */}
      <section className="mx-auto max-w-2xl px-5 pb-6">
        <Reveal>
          <div className="wood-frame rounded-3xl bg-brick p-7 text-center text-cream">
            <p className="font-deva text-sm font-semibold text-marigold">सोध्नुहोस्</p>
            <h2 className="font-display text-3xl">Ask the Heritage Guide</h2>
            <p className="mt-2 text-cream/85">Answers come only from the verified notes on this site.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {chatSuggestions.map((q) => (
                <AskButton
                  key={q}
                  question={q}
                  className="min-h-[44px] rounded-full border border-marigold/70 px-4 text-sm text-cream transition active:scale-95 hover:bg-marigold hover:text-wood"
                >
                  {q}
                </AskButton>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
