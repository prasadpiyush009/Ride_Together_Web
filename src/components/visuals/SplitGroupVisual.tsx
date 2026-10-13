"use client";

import { useState } from "react";
import { Check, MapPin, Phone } from "lucide-react";

const riders = [
  { id: "leader", name: "Leader", x: 540, y: 150, lead: true },
  { id: "r2", name: "Rider 2", x: 440, y: 150 },
  { id: "r3", name: "Rider 3", x: 336, y: 244 },
  { id: "r4", name: "Rider 4", x: 215, y: 150 },
  { id: "r5", name: "Rider 5", x: 70, y: 150 },
] as const;

const calls = [
  { who: "Rider 3", result: "No answer" },
  { who: "Rider 4", result: "Ringing…" },
  { who: "Rider 5", result: "Busy" },
];

/** Toggle between a stretched-out group and the same group on a shared map. */
export function SplitGroupVisual() {
  const [shared, setShared] = useState(false);

  return (
    <figure>
      <div className="rounded-2xl border border-white/10 bg-charcoal p-4 sm:p-6">
        <div
          role="group"
          aria-label="Compare riding without and with Ride Together"
          className="mb-5 flex gap-1 rounded-full bg-ink p-1"
        >
          {[
            { v: false, label: "Without Ride Together" },
            { v: true, label: "With Ride Together" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={shared === o.v}
              onClick={() => setShared(o.v)}
              className={`flex-1 rounded-full px-3 py-2.5 text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                shared === o.v ? "bg-amber text-ink" : "text-mute hover:text-bone"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <svg
          viewBox="0 0 600 290"
          role="img"
          aria-label={
            shared
              ? "Illustration: the same five riders, now all visible and named on one shared map."
              : "Illustration: five riders spread far apart along a road, one on a side road, with question marks over the riders the Leader can't see."
          }
          className="block h-auto w-full"
        >
          {Array.from({ length: 16 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} x2={i * 40} y1="0" y2="290" className="stroke-bone/5" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} y1={i * 40} y2={i * 40} x1="0" x2="600" className="stroke-bone/5" />
          ))}
          <path d="M-10 150 C150 142 250 160 400 150 S560 146 610 150" fill="none" className="stroke-steel" strokeWidth="18" strokeLinecap="round" />
          <path d="M330 152 C342 190 342 216 336 244" fill="none" className="stroke-steel" strokeWidth="12" strokeLinecap="round" />

          {/* Shared-map connection */}
          <polyline
            points={riders.map((r) => `${r.x},${r.y}`).join(" ")}
            fill="none"
            className="stroke-amber/50 transition-opacity duration-700"
            strokeWidth="1.5"
            strokeDasharray="3 7"
            style={{ opacity: shared ? 1 : 0 }}
          />

          {riders.map((r) => {
            const unseen = !("lead" in r) && r.id !== "r2";
            return (
              <g key={r.id}>
                {/* Faded, dashed ring when the rider can't be seen */}
                <circle
                  cx={r.x}
                  cy={r.y}
                  r="19"
                  fill="none"
                  className="stroke-bone/40 transition-opacity duration-700"
                  strokeDasharray="3 4"
                  style={{ opacity: shared ? 0 : unseen ? 1 : 0 }}
                />
                <circle
                  cx={r.x}
                  cy={r.y}
                  r="12"
                  className={`transition-[fill,opacity] duration-700 ${
                    shared ? ("lead" in r ? "fill-amber" : "fill-bone") : "fill-steel"
                  }`}
                  style={{ opacity: shared || !unseen ? 1 : 0.55 }}
                />
                <circle cx={r.x} cy={r.y} r="4" className="fill-ink" />

                {/* "?" when out of sight */}
                <g
                  className="transition-opacity duration-700"
                  style={{ opacity: !shared && unseen ? 1 : 0 }}
                >
                  <circle cx={r.x} cy={r.y - 34} r="11" className="fill-ink stroke-bone/40" />
                  <text x={r.x} y={r.y - 29.5} textAnchor="middle" className="fill-bone" fontSize="13" fontWeight="600">
                    ?
                  </text>
                </g>

                {/* Name when visible on the shared map */}
                <text
                  x={r.x}
                  y={r.y + (r.y > 200 ? 34 : -22)}
                  textAnchor="middle"
                  className="fill-bone transition-opacity duration-700"
                  fontSize="12"
                  fontWeight="600"
                  style={{ opacity: shared ? 1 : 0 }}
                >
                  {r.name}
                </text>
              </g>
            );
          })}
        </svg>

        <div
          aria-live="polite"
          className="mt-4 min-h-[8.5rem] rounded-xl bg-ink p-4"
        >
          {shared ? (
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin aria-hidden className="size-4 text-amber" />
                Everyone is on the same shared map.
              </li>
              <li className="flex items-center gap-3">
                <Check aria-hidden className="size-4 text-amber" />
                The Leader sees who is ahead and who is behind.
              </li>
              <li className="flex items-center gap-3">
                <Check aria-hidden className="size-4 text-amber" />
                No calls. Nobody has to pull over to ask.
              </li>
            </ul>
          ) : (
            <ul className="space-y-3 text-sm">
              {calls.map((c) => (
                <li key={c.who} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <Phone aria-hidden className="size-4 text-mute" />
                    Calling {c.who}…
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute">
                    {c.result}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
        Illustration · sample scenario, not real ride data
      </figcaption>
    </figure>
  );
}
