"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Helmet } from "@/components/ui/Helmet";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const HOLD_MS = 2400;

function SlideWord({
  children,
  from,
  delay,
}: {
  children: React.ReactNode;
  from: "left" | "right";
  delay: number;
}) {
  const left = from === "left";
  return (
    <span
      className={`block overflow-hidden pb-[0.06em] ${left ? "text-left" : "text-right"}`}
    >
      <motion.span
        className="inline-block whitespace-nowrap"
        initial={{ x: left ? "-115%" : "115%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1.2, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Opening animation, shown once on load: "Ride" slides in from the left,
 * "Together" from the right with a helmet for the "o", then the curtain lifts
 * to reveal the hero. Skippable, and never shown for reduced motion.
 */
export function HeroIntro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const finish = useCallback(() => {
    setVisible(false);
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(finish, HOLD_MS);
    return () => clearTimeout(t);
  }, [reduce, finish]);

  // Keep the page still while the intro is on screen.
  useEffect(() => {
    if (!visible || reduce) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible, reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-intro
          key="intro"
          role="presentation"
          className="fixed inset-0 z-[90] overflow-hidden bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 100%, rgba(255,138,31,0.28), transparent 70%)",
            }}
          />
          <div aria-hidden className="grain absolute inset-0" />

          <p className="sr-only">Ride Together</p>
          <div
            aria-hidden
            className="font-display-tight relative mx-auto flex h-full max-w-[90rem] flex-col justify-center px-5 text-[clamp(4.6rem,20vw,18rem)] !leading-[0.84] tracking-[-0.01em] sm:px-8 lg:px-12"
          >
            <SlideWord from="left" delay={0.15}>
              Ride
            </SlideWord>
            <SlideWord from="right" delay={0.35}>
              T<Helmet delay={0.35} />
              gether
            </SlideWord>
          </div>

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-6 right-5 rounded-full border border-white/20 px-5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mute transition-colors hover:border-bone hover:text-bone sm:bottom-8 sm:right-8"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
