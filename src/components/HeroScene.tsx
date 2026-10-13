/**
 * Cinematic open-road scene, drawn in SVG so it is crisp at any size and
 * costs almost nothing to load. This is a stand-in for photography: to use a
 * licensed photograph instead, swap <HeroScene /> for a next/image in
 * HeroSection (see README).
 *
 * Riders are shown as small silhouettes with tail lights, seen from behind
 * as they ride toward the horizon in a staggered group formation.
 */

const HORIZON = 330;
const BOTTOM = 700;
const CX = 800;

const halfWidth = (y: number) =>
  10 + 520 * ((y - HORIZON) / (BOTTOM - HORIZON));

// Centre-line dashes shrink toward the horizon for perspective.
const dashes = Array.from({ length: 13 }, (_, i) => {
  const t0 = (i + 0.15) / 13;
  const t1 = (i + 0.6) / 13;
  const y0 = HORIZON + (BOTTOM - HORIZON) * t0 ** 1.9;
  const y1 = HORIZON + (BOTTOM - HORIZON) * t1 ** 1.9;
  const w0 = 0.4 + 5 * ((y0 - HORIZON) / (BOTTOM - HORIZON));
  const w1 = 0.4 + 5 * ((y1 - HORIZON) / (BOTTOM - HORIZON));
  return `M${CX - w0} ${y0} L${CX + w0} ${y0} L${CX + w1} ${y1} L${CX - w1} ${y1} Z`;
});

// Group formation: [y, lateral offset as a fraction of half road width]
const riders: Array<[number, number]> = [
  [372, -0.15],
  [380, 0.35],
  [412, -0.45],
  [428, 0.25],
  [470, -0.1],
];

export function HeroScene() {
  return (
    <svg
      viewBox="0 0 1600 700"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2111" />
          <stop offset="0.18" stopColor="#17120f" />
          <stop offset="1" stopColor="#0c0c0d" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a120d" />
          <stop offset="1" stopColor="#070707" />
        </linearGradient>
        <radialGradient id="tail">
          <stop offset="0" stopColor="#ff8a1f" stopOpacity="0.75" />
          <stop offset="0.35" stopColor="#ff6a00" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ff6a00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Distant ranges */}
      <path
        fill="#2a1c14"
        d="M0 332V250l120-35 110 47 150-72 140 60 130-45 150 57 140-62 160 55 150-70 140 60 100-30 100 40v132z"
      />
      <path
        fill="#17110d"
        d="M0 337v-47l170-20 160 30 190-38 180 38 100-5 150-20 200 30 180-37 150 22 120-10v57z"
      />

      {/* Ground and road */}
      <rect y={HORIZON - 4} width="1600" height={BOTTOM - HORIZON + 4} fill="url(#ground)" />
      <path
        fill="url(#road)"
        d={`M${CX - 10} ${HORIZON} L${CX + 10} ${HORIZON} L${CX + 530} ${BOTTOM} L${CX - 530} ${BOTTOM} Z`}
      />
      <path
        d={`M${CX - 10} ${HORIZON} L${CX - 530} ${BOTTOM} M${CX + 10} ${HORIZON} L${CX + 530} ${BOTTOM}`}
        stroke="#f2eee7"
        strokeOpacity="0.14"
        strokeWidth="2"
        fill="none"
      />
      {dashes.map((d, i) => (
        <path key={i} d={d} fill="#ff8a1f" fillOpacity="0.55" />
      ))}

      {/* Riders in formation */}
      {riders.map(([y, f], i) => {
        const x = CX + f * halfWidth(y);
        const k = (y - HORIZON) / (BOTTOM - HORIZON);
        const s = 0.35 + k * 1.3;
        return (
          <g key={i}>
            <circle cx={x} cy={y - 3 * s} r={26 * s} fill="url(#tail)" />
            <rect
              x={x - 5 * s}
              y={y - 15 * s}
              width={10 * s}
              height={14 * s}
              rx={2.5 * s}
              fill="#040404"
            />
            <circle cx={x} cy={y - 17.5 * s} r={3.2 * s} fill="#040404" />
            <circle cx={x} cy={y - 3.5 * s} r={1.5 * s + 0.4} fill="#ffb15e" />
          </g>
        );
      })}
    </svg>
  );
}
