"use client";

/**
 * app/reviews/ReviewsView.tsx — client body of /reviews.
 * The server wrapper (page.tsx) owns the `metadata` export.
 */

import PageLayout from "@/components/ui/PageLayout";
import { Reveal, SectionTitle } from "@/components/ui";
import VoicesBoard from "@/components/VoicesBoard";
import { useLanguage } from "@/i18n/LanguageContext";

const STEP_NUMERALS = ["१", "२", "३", "४"];
const STEP_FALLBACKS = [
  { t: "Sign in", d: "Only signed-in visitors can post." },
  { t: "Share", d: "A review, up to 3 photos, or a complaint about the place." },
  { t: "Admin checks", d: "Every post is read by an admin before anyone sees it." },
  { t: "Published", d: "Approved posts appear below with your display name." },
];
const RULE_FALLBACKS = [
  "No photos of identifiable worshippers or children without their consent.",
  "No photos or video of restricted rituals.",
  "Complaints should be about the place (litter, damage, access), not about individuals.",
  "Posts that break these rules are not published.",
];

export default function ReviewsView() {
  const { t } = useLanguage();

  const steps = STEP_FALLBACKS.map((s, i) => ({
    n: STEP_NUMERALS[i],
    t: t(`pages.reviews.steps.${i}.t`, s.t),
    d: t(`pages.reviews.steps.${i}.d`, s.d),
  }));
  const rules = RULE_FALLBACKS.map((r, i) => t(`pages.reviews.rules.${i}`, r));

  return (
    <PageLayout variant="narrow">
      <Reveal>
        <SectionTitle titleKey="voices" />
        <p className="mx-auto mt-3 max-w-md text-center text-wood/80">
          {t("pages.reviews.intro")}
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
        <h2 className="font-display text-xl text-brick">{t("pages.reviews.rulesTitle")}</h2>
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
    </PageLayout>
  );
}
