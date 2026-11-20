/**
 * components/ui/PagodaLogo.tsx
 *
 * Authentic 3-tiered Newari Pagoda Temple emblem used in the brand header.
 * Stylized with traditional brick, marigold gold, cream, and wood accents.
 */

export default function PagodaLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Finial / Gajur */}
      <path d="M32 2L30.5 6H33.5L32 2Z" fill="#E8A317" />
      <circle cx="32" cy="7.5" r="1.5" fill="#E8A317" />
      <path d="M31.2 9H32.8V11H31.2V9Z" fill="#E8A317" />

      {/* Tier 1 (Top Pagoda Roof) */}
      <path d="M24 16L32 11L40 16L43 17.5L41.5 19H22.5L21 17.5L24 16Z" fill="#8B2E1F" />
      <path d="M22.5 19L24.5 22H39.5L41.5 19H22.5Z" fill="#A33827" />
      {/* Top Chamber Walls */}
      <rect x="27" y="19" width="10" height="4" fill="#FAF3E3" stroke="#8B2E1F" strokeWidth="0.5" />

      {/* Tier 2 (Middle Pagoda Roof) */}
      <path d="M17 26L32 20L47 26L50 28L48 29.5H16L14 28L17 26Z" fill="#8B2E1F" />
      <path d="M16 29.5L18.5 32H45.5L48 29.5H16Z" fill="#A33827" />
      {/* Middle Chamber Walls */}
      <rect x="23" y="29.5" width="18" height="6" fill="#FAF3E3" stroke="#8B2E1F" strokeWidth="0.5" />
      {/* Carved strut lines */}
      <line x1="26" y1="29.5" x2="25" y2="35.5" stroke="#E8A317" strokeWidth="0.8" />
      <line x1="38" y1="29.5" x2="39" y2="35.5" stroke="#E8A317" strokeWidth="0.8" />
      <rect x="30" y="31" width="4" height="4.5" fill="#8B2E1F" rx="0.5" />

      {/* Tier 3 (Main Bottom Pagoda Roof) */}
      <path d="M8 38L32 30L56 38L60 41L57.5 43H6.5L4 41L8 38Z" fill="#8B2E1F" />
      <path d="M6.5 43L10 46H54L57.5 43H6.5Z" fill="#5C1D13" />

      {/* Lower Temple Chamber */}
      <rect x="16" y="44" width="32" height="12" fill="#FAF3E3" stroke="#8B2E1F" strokeWidth="0.8" />
      {/* Carved Doorway with Torana */}
      <path d="M28 47C28 45.5 30 44.5 32 44.5C34 44.5 36 45.5 36 47V56H28V47Z" fill="#8B2E1F" />
      <path d="M30 47.5C30 46.5 31 46 32 46C33 46 34 46.5 34 47.5V56H30V47.5Z" fill="#E8A317" />
      {/* Latticed Window Panels */}
      <rect x="20" y="47" width="4.5" height="5" fill="#5C1D13" rx="0.5" />
      <rect x="39.5" y="47" width="4.5" height="5" fill="#5C1D13" rx="0.5" />

      {/* Plinth / Stone Pedestal Base */}
      <path d="M11 56H53L56 59.5H8L11 56Z" fill="#E8A317" />
      <rect x="5" y="59.5" width="54" height="3" fill="#3B2416" />
    </svg>
  );
}
