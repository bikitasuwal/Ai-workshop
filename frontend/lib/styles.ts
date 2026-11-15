// Shared Tailwind class strings, so buttons and inputs look the same everywhere.
export const field =
  "w-full rounded-xl border-2 border-wood/25 bg-cream px-4 py-3 text-[16px] text-wood focus:border-brick focus:outline-none";

const chipBase = "min-h-[44px] rounded-full border-2 px-4 text-sm font-semibold transition active:scale-95";
/** Pill toggle (filters, tabs). */
export const chip = (active: boolean) =>
  `${chipBase} ${active ? "border-brick bg-brick text-cream" : "border-brick/40 text-brick"}`;
/** Pill action button on a light surface. */
export const chipAction = `${chipBase} border-marigold bg-cream text-brick`;
