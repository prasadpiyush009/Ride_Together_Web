"use client";

import { motion, useReducedMotion } from "motion/react";

type RouteLineProps = {
  d: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  className?: string;
  /** Draw as soon as mounted instead of waiting to scroll into view. */
  immediate?: boolean;
};

/** An SVG path that draws itself once. Must be rendered inside an <svg>. */
export function RouteLine({
  d,
  delay = 0,
  duration = 2.4,
  strokeWidth = 2,
  className,
  immediate = false,
}: RouteLineProps) {
  const reduce = useReducedMotion();
  const transition = {
    duration: reduce ? 0 : duration,
    delay: reduce ? 0 : delay,
    ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
  };
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={className}
      initial={{ pathLength: reduce ? 1 : 0 }}
      {...(immediate
        ? { animate: { pathLength: 1 } }
        : {
            whileInView: { pathLength: 1 },
            viewport: { once: true, amount: 0.2 },
          })}
      transition={transition}
    />
  );
}
