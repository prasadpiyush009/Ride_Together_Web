"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/** Scroll-triggered fade and rise. Plays once; skipped for reduced motion. */
export function Reveal({
  delay = 0,
  y = 28,
  className,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
