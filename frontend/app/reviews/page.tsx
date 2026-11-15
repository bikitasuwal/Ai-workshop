import type { Metadata } from "next";
import { Reveal, SectionTitle } from "@/components/ui";
import VoicesBoard from "@/components/VoicesBoard";

export const metadata: Metadata = { title: "Voices | Balaju Living Heritage" };

const steps = [
  { n: "१", t: "Sign in", d: "Only signed-in visitors can post." },
  { n: "२", t: "Share", d: "A review, up to 3 photos, or a complaint about the place." },
  { n: "३", t: "Admin checks", d: "Every post is read by an admin before anyone sees it." },
  { n: "४", t: "Published", d: "Approved posts appear below with your display name." },
];

const rules = [
  "No photos of identifiable worshippers or children without their consent.",
  "No photos or video of restricted rituals.",
  "Complaints should be about the place (litter, damage, access), not about individuals.",
  "Posts that break these rules are not published.",
];

export default function Voices() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-12">
      <Reveal>
        <SectionTitle ne="तपाईंको आवाज" en="Voices of visitors" />
        <p className="mx-auto mt-3 max-w-md text-center text-wood/80">
          Tell us about your visit, share a photo, or report a problem that needs care.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.07}>
            <div className="wood-frame h-full rounded-2xl bg-paper p-4">
              <p className="font-display text-3xl text-brick">{s.n}</p>
              <p className="font-semibold text-wood">{s.t}</p>
              <p className="mt-1 text-sm text-wood/75">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <h2 className="font-display text-xl text-brick">Please keep in mind</h2>
        <ul className="mt-3 space-y-2">
          {rules.map((r) => (
            <li key={r} className="flex gap-3 text-[16px] text-wood/90">
              <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-marigold" aria-hidden />
              {r}
            </li>
          ))}
        </ul>
      </Reveal>

      <VoicesBoard />
    </section>
  );
}
