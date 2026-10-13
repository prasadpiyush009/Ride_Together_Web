"use client";

import { createContext, useContext, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { HeroIntro } from "@/components/HeroIntro";
import { HeroScene } from "@/components/HeroScene";
import { Button } from "@/components/ui/Button";
import { RouteLine } from "@/components/ui/RouteLine";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const primaryHref = site.links.app ?? "#experience";

/** True once the opening intro has finished (or was skipped). */
const HeroReady = createContext(true);

function HeadlineLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const ready = useContext(HeroReady);
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        data-reveal
        className="block"
        initial={reduce ? false : { y: "108%" }}
        animate={{ y: ready ? 0 : "108%" }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUp({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ready = useContext(HeroReady);
  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  // Reduced-motion visitors never see the intro, so the hero is ready at once.
  const ready = introDone || !!reduce;

  const { scrollY } = useScroll();
  const skyY = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : 110]);
  const landY = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : 240]);

  return (
    <HeroReady.Provider value={ready}>
      <HeroIntro onDone={() => setIntroDone(true)} />

      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
      >
        {/* Parallax backdrop */}
        <motion.div
          aria-hidden
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-[10%] -z-30 h-[115%]"
        >
          <div
            className="h-full w-full"
            style={{
              background: `
                radial-gradient(55% 34% at 50% 64%, rgba(255,138,31,0.55), transparent 72%),
                radial-gradient(120% 70% at 50% 66%, rgba(130,56,10,0.5), transparent 70%),
                linear-gradient(to bottom, #050506 0%, #0c0807 34%, #26120a 58%, #5a280a 66%, #0a0a0b 100%)`,
            }}
          />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ y: landY }}
          className="absolute inset-x-0 bottom-0 -z-20 h-[76%]"
        >
          <HeroScene />
        </motion.div>

        {/* Readability overlays */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent"
        />
        <div aria-hidden className="grain absolute inset-0 -z-10" />

        {/* Navigation-inspired route graphic */}
        <svg
          aria-hidden
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-amber/80"
        >
          {ready && (
            <RouteLine
              immediate
              delay={1.1}
              duration={3}
              strokeWidth={1.5}
              d="M-20 790 C260 760 380 560 640 600 S980 760 1180 520 S1380 360 1470 330"
            />
          )}
          {[
            { x: 640, y: 600, label: "WPT 01" },
            { x: 1180, y: 520, label: "WPT 02" },
          ].map((p, i) => (
            <motion.g
              key={p.label}
              data-reveal
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ delay: 2 + i * 0.9, duration: 0.8 }}
            >
              <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="currentColor" strokeOpacity="0.4" />
              <circle cx={p.x} cy={p.y} r="4" fill="currentColor" />
              <text
                x={p.x + 20}
                y={p.y - 14}
                className="fill-mute"
                style={{ font: "500 11px var(--font-mono)", letterSpacing: "0.2em" }}
              >
                {p.label}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* Spacer for the fixed navbar */}
        <div className="h-16 shrink-0" />

        <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-end px-5 pb-24 pt-16 sm:px-8 sm:pb-28 lg:px-12">
          <FadeUp delay={0.2} className="mb-6 flex items-center gap-4">
            <span aria-hidden className="h-px w-12 bg-amber" />
            <p className="eyebrow !text-bone/80">Built for the open road</p>
          </FadeUp>

          <h1
            id="hero-title"
            className="font-display-tight text-[clamp(4.6rem,17vw,15rem)] !leading-[0.84] tracking-[-0.01em]"
          >
            <HeadlineLine delay={0.35}>Every Ride.</HeadlineLine>
            <HeadlineLine delay={0.5}>
              Together<span className="text-amber">.</span>
            </HeadlineLine>
          </h1>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[minmax(0,34rem)_1fr]">
            <div>
              <FadeUp delay={0.95}>
                <p className="text-base leading-relaxed text-bone/80 sm:text-lg">
                  Ride Together keeps the whole crew on one shared map, one
                  route and one conversation, so a group ride feels like one
                  ride, not five riders hoping to meet at the next junction.
                </p>
              </FadeUp>
              <FadeUp delay={1.1} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={primaryHref}>Explore the App</Button>
                <Button href="#how-it-works" variant="ghost">
                  See How It Works
                </Button>
              </FadeUp>
            </div>

            <FadeUp
              delay={1.4}
              className="hidden justify-self-end text-right lg:block"
            >
              <ul className="space-y-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mute">
                <li>Ride codes</li>
                <li>Shared map</li>
                <li>Group chat</li>
                <li className="text-amber">One crew</li>
              </ul>
            </FadeUp>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#experience"
          aria-label="Scroll to the experience"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-8"
        >
          <span className="eyebrow !text-[0.6rem]">Scroll</span>
          <span className="scroll-cue relative block h-10 w-px overflow-hidden bg-white/25" />
        </a>
      </section>
    </HeroReady.Provider>
  );
}
