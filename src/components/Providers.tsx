"use client";

import { MotionConfig } from "motion/react";

/** Honour the visitor's reduced-motion preference across every animation. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
