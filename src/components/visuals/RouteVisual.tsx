"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

const route =
  "M190 410 C300 410 330 250 430 270 S560 400 640 300 S700 120 810 100";

/** Route progress that follows the visitor's scroll through the section. */
export function RouteVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 45%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const fixed = useMotionValue(0.62);
  const progress = reduce ? fixed : smooth;

  const cx = useMotionValue(190);
  const cy = useMotionValue(410);

  const place = useCallback(
    (p: number) => {
      const path = pathRef.current;
      if (!path) return;
      const pt = path.getPointAtLength(path.getTotalLength() * p);
      cx.set(pt.x);
      cy.set(pt.y);
    },
    [cx, cy],
  );

  useEffect(() => place(progress.get()), [place, progress]);
  useMotionValueEvent(progress, "change", place);

  return (
    <figure ref={ref}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink md:aspect-[2/1]">
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Illustrative route map: a route from the start, through a regroup point, to the destination, with progress shown along the way."
          className="absolute inset-0 h-full w-full"
        >
          {Array.from({ length: 26 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} x2={i * 40} y1="0" y2="500" className="stroke-bone/5" />
          ))}
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`h${i}`} y1={i * 40} y2={i * 40} x1="0" x2="1000" className="stroke-bone/5" />
          ))}
          {/* Context roads */}
          <path d="M-20 90 C 200 130, 330 60, 520 70 S 900 30, 1020 90" fill="none" className="stroke-steel" strokeWidth="6" />
          <path d="M-20 470 C 160 440, 400 500, 600 470 S 900 440, 1020 480" fill="none" className="stroke-steel" strokeWidth="6" />
          <path d="M470 -10 C 460 120, 520 160, 500 260" fill="none" className="stroke-steel/70" strokeWidth="4" />

          {/* Road bed, remaining route, travelled route */}
          <path d={route} fill="none" className="stroke-steel" strokeWidth="22" strokeLinecap="round" />
          <path
            ref={pathRef}
            d={route}
            fill="none"
            className="stroke-bone/30"
            strokeWidth="3"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
          <motion.path
            d={route}
            fill="none"
            className="stroke-amber"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />

          {/* Waypoints */}
          {[
            { x: 190, y: 410, label: "START" },
            { x: 640, y: 300, label: "REGROUP POINT" },
            { x: 810, y: 100, label: "DESTINATION" },
          ].map((w) => (
            <g key={w.label}>
              <circle cx={w.x} cy={w.y} r="10" className="fill-ink stroke-bone" strokeWidth="2.5" />
              <text
                x={w.x + 20}
                y={w.y + 4}
                className="fill-mute"
                fontSize="12"
                letterSpacing="2.4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {w.label}
              </text>
            </g>
          ))}

          {/* Rider marker */}
          <motion.circle cx={cx} cy={cy} r="26" className="fill-amber/20" />
          <motion.circle cx={cx} cy={cy} r="11" className="fill-amber stroke-ink" strokeWidth="3" />
        </svg>

        {/* Next-turn card */}
        <div className="absolute left-3 top-3 flex items-center gap-3 rounded-2xl border border-white/12 bg-ink/90 p-3 pr-5 sm:left-6 sm:top-6">
          <span className="grid size-10 place-items-center rounded-xl bg-amber text-ink">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 20V6M12 6l-6 6M12 6l6 6" />
            </svg>
          </span>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
              Next
            </p>
            <p className="text-sm font-semibold">Keep left at the fork</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6">
          <div className="mb-2 flex justify-between font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
            <span>Route progress</span>
            <span>Scroll to ride</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/12">
            <motion.div
              className="h-full origin-left bg-amber"
              style={{ scaleX: progress }}
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
        Illustrative route · progress follows your scroll, not a real ride
      </figcaption>
    </figure>
  );
}
