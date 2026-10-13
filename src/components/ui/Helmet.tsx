"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Motorcycle helmet used in place of the "O" in the intro headline.
 * Amber shell with a dark visor, so it stands apart from the off-white
 * letters. It rolls in like a wheel while the word slides into place, then
 * gives a small nod once. Sized in em so it matches the surrounding letters.
 */
export function Helmet({ delay = 0.35 }: { delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 110 110"
      aria-hidden
      className="inline-block h-[0.8em] w-[0.8em] align-baseline"
      style={{ verticalAlign: "-0.02em", transformOrigin: "50% 55%" }}
      initial={reduce ? false : { rotate: -360 }}
      animate={reduce ? { rotate: 0 } : { rotate: [-360, 0, -9, 0] }}
      transition={{
        duration: 1.7,
        delay,
        times: [0, 0.6, 0.8, 1],
        ease: "easeInOut",
      }}
    >
      {/* Shell */}
      <path
        d="M18 96C4 84 2 52 14 34C26 14 48 4 70 6C92 8 104 26 104 48L105 64C109 72 109 86 104 94C102 99 98 101 92 101L40 101C30 101 22 99 18 96Z"
        fill="#ff8a1f"
      />
      {/* Lower shading for volume */}
      <path
        d="M12 80C30 90 70 92 105 84C106 88 105 91 104 94C102 99 98 101 92 101L40 101C30 101 22 99 18 96C14 92 12 86 12 80Z"
        fill="#d96a00"
      />
      {/* Stripe */}
      <path
        d="M10 68C30 60 56 60 82 67"
        stroke="#f2eee7"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Visor */}
      <path
        d="M56 30C76 26 98 34 104 50L105 62C86 57 68 58 52 64C49 52 50 38 56 30Z"
        fill="#0a0a0b"
        stroke="#0a0a0b"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M62 38C78 35 92 40 99 48"
        stroke="#f2eee7"
        strokeOpacity="0.75"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Visor pivot */}
      <circle cx="42" cy="50" r="5.5" fill="#0a0a0b" />
      <circle cx="42" cy="50" r="2.2" fill="#f2eee7" />
      {/* Chin vents */}
      <path
        d="M88 80H100M88 85H101M88 90H100"
        stroke="#0a0a0b"
        strokeOpacity="0.45"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
