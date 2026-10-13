"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Phone } from "lucide-react";

const tight = [700, 672, 644, 616, 588];
const spread = [900, 740, 560, 330, 110];
const labels = ["L", "C", "R", "R", "R"];

const calls = [
  { who: "Rider 3", result: "No answer" },
  { who: "Rider 4", result: "Phone on silent" },
  { who: "Rider 5", result: "Out of range" },
];

function Rider({
  x,
  label,
  lead,
  lost,
  p,
}: {
  x: MotionValue<number>;
  label: string;
  lead?: boolean;
  lost?: boolean;
  p: MotionValue<number>;
}) {
  const q = useTransform(p, [0.55, 0.8], [0, lost ? 1 : 0]);
  return (
    <g>
      <motion.circle
        cx={x}
        cy={150}
        r={22}
        className={lead ? "fill-amber" : "fill-bone"}
      />
      <motion.text
        x={x}
        y={158}
        textAnchor="middle"
        className="fill-ink"
        fontSize="22"
        fontWeight="700"
      >
        {label}
      </motion.text>
      <motion.text
        x={x}
        y={100}
        textAnchor="middle"
        className="fill-amber"
        fontSize="38"
        fontWeight="600"
        style={{ opacity: q, fontFamily: "var(--font-display)" }}
      >
        ?
      </motion.text>
    </g>
  );
}

/** The group stretches out as the visitor scrolls, and the calls begin. */
export function GroupSpreadVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 40%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const fixed = useMotionValue(1);
  const p = reduce ? fixed : smooth;

  const x0 = useTransform(p, [0, 0.7], [tight[0], spread[0]]);
  const x1 = useTransform(p, [0, 0.7], [tight[1], spread[1]]);
  const x2 = useTransform(p, [0, 0.7], [tight[2], spread[2]]);
  const x3 = useTransform(p, [0, 0.7], [tight[3], spread[3]]);
  const x4 = useTransform(p, [0, 0.7], [tight[4], spread[4]]);
  const mid = useTransform([x0, x4], ([a, b]: number[]) => (a + b) / 2);
  const gapOpacity = useTransform(p, [0.6, 0.85], [0, 1]);
  const callsOpacity = useTransform(p, [0.65, 0.95], [0, 1]);

  return (
    <figure ref={ref}>
      <div className="grid-lines relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
        <svg
          viewBox="0 0 1000 300"
          role="img"
          aria-label="Illustration: five riders start close together, then the group stretches out along the road and the last riders can no longer be seen."
          className="block h-auto w-full"
        >
          {/* Road */}
          <rect x="-10" y="128" width="1020" height="44" className="fill-steel" />
          <line
            x1="0"
            x2="1000"
            y1="150"
            y2="150"
            className="stroke-bone/25"
            strokeWidth="2"
            strokeDasharray="14 16"
          />

          {/* Gap marker */}
          <motion.g style={{ opacity: gapOpacity }}>
            <motion.line
              x1={x4}
              x2={x0}
              y1={218}
              y2={218}
              className="stroke-amber/60"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <motion.text
              x={mid}
              y={252}
              textAnchor="middle"
              className="fill-mute"
              fontSize="16"
              letterSpacing="3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              GROUP STRETCHED OUT
            </motion.text>
          </motion.g>

          <Rider x={x4} label={labels[4]} lost p={p} />
          <Rider x={x3} label={labels[3]} lost p={p} />
          <Rider x={x2} label={labels[2]} lost p={p} />
          <Rider x={x1} label={labels[1]} p={p} />
          <Rider x={x0} label={labels[0]} lead p={p} />
        </svg>

        <motion.ul
          data-reveal
          style={{ opacity: callsOpacity }}
          className="grid gap-3 border-t border-white/10 p-4 sm:grid-cols-3 sm:p-6"
          aria-label="Calling each rider one by one"
        >
          {calls.map((c) => (
            <li
              key={c.who}
              className="flex items-center gap-3 rounded-xl bg-graphite px-4 py-3"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-steel text-mute">
                <Phone aria-hidden className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold">
                  Calling {c.who}…
                </span>
                <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute">
                  {c.result}
                </span>
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
        Illustrative scenario · the group stretches out as you scroll
      </figcaption>
    </figure>
  );
}
