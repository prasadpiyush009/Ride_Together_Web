"use client";

import { useState } from "react";

const riders = [
  { id: "leader", name: "Leader", x: 570, y: 122, lead: true },
  { id: "co", name: "Co-Leader", x: 492, y: 176 },
  { id: "r1", name: "Rider 1", x: 414, y: 203 },
  { id: "r2", name: "Rider 2", x: 332, y: 234 },
  { id: "r3", name: "Rider 3", x: 251, y: 255 },
] as const;

const road = "M-20 360 C140 330 220 250 330 230 S520 140 660 80";

/** Group visibility: pick a rider to find them on the shared map. */
export function StayTogetherVisual() {
  const [active, setActive] = useState<string>("leader");
  const current = riders.find((r) => r.id === active)!;
  const labelW = current.name.length * 8 + 28;

  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
        <svg
          viewBox="0 0 640 440"
          role="img"
          aria-label={`Illustrative group map with five riders along a road. ${current.name} is highlighted.`}
          className="block h-auto w-full"
        >
          {Array.from({ length: 17 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} x2={i * 40} y1="0" y2="440" className="stroke-bone/5" />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`h${i}`} y1={i * 40} y2={i * 40} x1="0" x2="640" className="stroke-bone/5" />
          ))}
          <path d="M120 460 C 160 380, 260 360, 300 300 S 380 330, 470 400" fill="none" className="stroke-steel" strokeWidth="8" strokeLinecap="round" />
          <path d="M-20 130 C 100 150, 220 120, 300 40" fill="none" className="stroke-steel/70" strokeWidth="5" strokeLinecap="round" />
          <path d="M520 460 C 540 380, 600 340, 660 330" fill="none" className="stroke-steel/70" strokeWidth="5" strokeLinecap="round" />
          <path d={road} fill="none" className="stroke-steel" strokeWidth="20" strokeLinecap="round" />
          <path d={road} fill="none" className="stroke-bone/20" strokeWidth="1.5" strokeDasharray="8 10" />

          {/* Group formation line */}
          <polyline
            points={riders.map((r) => `${r.x},${r.y}`).join(" ")}
            fill="none"
            className="stroke-amber/40"
            strokeWidth="1.5"
            strokeDasharray="3 6"
          />

          {riders.map((r) => {
            const isActive = r.id === active;
            return (
              <g key={r.id}>
                <circle
                  cx={r.x}
                  cy={r.y}
                  r="26"
                  className="fill-amber/20"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    transform: isActive ? "scale(1)" : "scale(0)",
                    transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
                <circle cx={r.x} cy={r.y} r="12" className={"lead" in r && r.lead ? "fill-amber" : "fill-bone"} />
                <circle cx={r.x} cy={r.y} r="4" className="fill-ink" />
              </g>
            );
          })}

          {/* Active label */}
          <g
            style={{
              transform: `translate(${Math.min(Math.max(current.x - labelW / 2, 8), 640 - labelW - 8)}px, ${current.y - 56}px)`,
              transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <rect width={labelW} height="28" rx="14" className="fill-ink stroke-amber" />
            <text x={labelW / 2} y="18.5" textAnchor="middle" className="fill-bone" fontSize="12" fontWeight="600">
              {current.name}
            </text>
          </g>

          {/* Compass + scale */}
          <g transform="translate(596 44)">
            <circle r="18" fill="none" className="stroke-bone/20" />
            <path d="M0 -10 L5 6 L0 3 L-5 6 Z" className="fill-amber" />
            <text y="-24" textAnchor="middle" className="fill-mute" fontSize="9" style={{ fontFamily: "var(--font-mono)" }}>
              N
            </text>
          </g>
        </svg>

        <div className="flex flex-wrap gap-2 border-t border-white/10 p-4" role="group" aria-label="Choose a rider to highlight">
          {riders.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={r.id === active}
              onClick={() => setActive(r.id)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                r.id === active
                  ? "border-amber bg-amber text-ink"
                  : "border-white/15 text-bone hover:border-bone"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
        Illustrative map · sample positions, not live data
      </figcaption>
    </figure>
  );
}
