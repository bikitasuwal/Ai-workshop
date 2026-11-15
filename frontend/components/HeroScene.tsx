import { TiltCard } from "./ui";

const N = 22;
const xs = Array.from({ length: N }, (_, i) => 24 + (i * 252) / (N - 1));

/** An arch-shaped "peacock window" opening onto the 22 spouts, with a pagoda skyline and rising lamps. */
export default function HeroScene({ className = "" }: { className?: string }) {
  return (
    <TiltCard className={className} max={7}>
      <svg
        viewBox="0 0 300 390"
        role="img"
        aria-label="Illustration: twenty-two stone spouts pouring water beneath a pagoda skyline at dawn, with butter lamps floating up"
        className="mx-auto h-auto w-full max-w-[340px] drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#12303b" />
            <stop offset="0.45" stopColor="#5e1d13" />
            <stop offset="0.72" stopColor="#d8421e" />
            <stop offset="1" stopColor="#e8a317" />
          </linearGradient>
          <linearGradient id="pool" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2d6f84" />
            <stop offset="1" stopColor="#12303b" />
          </linearGradient>
          <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff2b8" stopOpacity="0.95" />
            <stop offset="1" stopColor="#e8a317" stopOpacity="0" />
          </radialGradient>
          <clipPath id="arch">
            <path d="M12 390V152a138 138 0 0 1 276 0v238Z" />
          </clipPath>
          <pattern id="lat" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M7 .5 13.500 7 7 13.500.5 7Z" fill="none" stroke="#e8a317" strokeWidth=".7" />
          </pattern>
        </defs>

        {/* outer carved frame */}
        <path d="M2 390V152a148 148 0 0 1 296 0v238Z" fill="#3b2416" />
        <path d="M2 390V152a148 148 0 0 1 296 0v238Z" fill="url(#lat)" opacity=".85" />
        <path d="M9 390V152a141 141 0 0 1 282 0v238Z" fill="none" stroke="#e8a317" strokeWidth="2" />

        <g clipPath="url(#arch)">
          <rect width="300" height="390" fill="url(#sky)" />
          <circle cx="150" cy="215" r="90" fill="url(#sun)" />

          {/* stars */}
          {[[60, 60], [95, 38], [210, 52], [245, 90], [40, 110], [180, 30], [130, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 1 : 1.5} fill="#fff2b8" opacity=".75" />
          ))}

          {/* pagoda skyline */}
          <g fill="#3b2416" stroke="#3b2416" strokeLinejoin="round">
            <path d="M150 88v20" strokeWidth="2" />
            <circle cx="150" cy="86" r="3" />
            <path d="M124 130 150 108 176 130Z" />
            <path d="M112 152 150 128 188 152Z" />
            <path d="M98 176 150 150 202 176Z" />
            <rect x="118" y="174" width="64" height="44" />
            <rect x="140" y="188" width="20" height="30" fill="#e8a317" opacity=".85" />
            <path d="M72 218 96 196 120 218ZM180 218 204 196 228 218Z" opacity=".9" />
          </g>

          {/* stone wall with spouts */}
          <rect x="0" y="216" width="300" height="44" fill="#3b2416" />
          <rect x="0" y="216" width="300" height="5" fill="#e8a317" opacity=".6" />
          {xs.map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y="240" width="8" height="8" rx="1.500" fill="#d9b779" />
              <rect x={x - 2.500} y="247" width="5" height="4" rx="1" fill="#8b6a3d" />
              <path
                d={`M${x} 252V334`}
                stroke="#bfe6ef"
                strokeWidth="2.200"
                strokeLinecap="round"
                className="stream"
                style={{ animationDelay: `${(i % 7) * 0.22}s` }}
              />
            </g>
          ))}

          {/* pool */}
          <rect y="326" width="300" height="70" fill="url(#pool)" />
          {[60, 150, 240].map((x, i) => (
            <ellipse
              key={x}
              cx={x}
              cy="340"
              rx="34"
              ry="6"
              fill="none"
              stroke="#bfe6ef"
              strokeWidth="1"
              className="ripple"
              style={{ animationDelay: `${i * 1}s` }}
            />
          ))}

          {/* floating butter lamps (diyo) */}
          {[48, 100, 170, 222, 262].map((x, i) => (
            <g key={x} className="diya-rise" style={{ animationDelay: `${i * 1.4}s` }}>
              <g transform={`translate(${x} 352)`}>
                <ellipse cx="0" cy="0" rx="8" ry="3.500" fill="#8b2e1f" />
                <path d="M0-3C-3-8 0-11 0-14 3-11 3-8 0-3Z" fill="#e8a317" className="flame" />
                <circle cx="0" cy="-8" r="9" fill="#e8a317" opacity=".18" />
              </g>
            </g>
          ))}
        </g>

        {/* top finial */}
        <path d="M150 -2c-6 6-6 12 0 16 6-4 6-10 0-16Z" fill="#e8a317" transform="translate(0 4)" />
      </svg>
    </TiltCard>
  );
}
