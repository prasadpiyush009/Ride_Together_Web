import { Reveal } from "@/components/ui/Reveal";
import { RouteLine } from "@/components/ui/RouteLine";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { stack } from "@/lib/site";

export function RideStorySection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-charcoal py-28 sm:py-40"
    >
      <svg
        aria-hidden
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full text-amber/35"
      >
        <RouteLine
          strokeWidth={1.5}
          duration={3.2}
          d="M-20 620 C 300 640 420 360 720 400 S 1100 220 1460 80"
        />
      </svg>

      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionLabel index="04">The story</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="about-title"
            className="font-display-tight mt-8 max-w-5xl text-[clamp(3.4rem,10vw,9.5rem)]"
          >
            It&apos;s not just about the{" "}
            <span className="text-amber">destination.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal delay={0.1}>
            <p className="text-xl leading-relaxed text-bone/90 sm:text-2xl">
              The best part of a ride is rarely the arrival. It&apos;s the
              bends you share, the stop where everyone laughs about the last
              hour, the road you&apos;d never have found alone.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="space-y-6 text-base leading-relaxed text-mute sm:text-lg">
              <p>
                But a group on the road easily becomes a string of riders
                wondering who took the wrong turn. Ride Together exists so the
                crew can stay connected without anyone breaking the rhythm of
                the ride.
              </p>
              <p>
                Everyone sees the same route and the same group. The ride stays
                one ride, from the first kilometre to the last.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 border-t border-white/10 pt-8" delay={0.1}>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <StatusBadge status="in-development" />
            <p className="text-sm text-mute">Built with</p>
            <ul className="flex flex-wrap gap-3">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs tracking-wide text-bone/85"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
