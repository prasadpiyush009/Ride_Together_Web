import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GroupSpreadVisual } from "@/components/visuals/GroupSpreadVisual";

const oldWay = [
  "Pull over just to find out who's where",
  "Call rider after rider, one by one",
  "The ride loses its rhythm, and everyone loses patience",
];

const newWay = [
  "One shared map shows where every rider is",
  "See who's ahead and who's behind, without a single call",
  "Keep your attention on the road, not on your phone",
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className="relative overflow-hidden bg-charcoal py-28 sm:py-36"
    >
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionLabel index="00">The problem</SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal delay={0.05}>
            <h2
              id="problem-title"
              className="font-display-tight text-[clamp(3.2rem,9vw,8rem)]"
            >
              Ten minutes in,
              <br />
              the group is
              <br />
              <span className="text-amber">everywhere.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-base leading-relaxed text-mute sm:text-lg">
              If you&apos;ve ridden in a group, you know this moment. A slow
              truck, a missed turn, a patch of no signal, and suddenly the
              crew is stretched across the road. Who&apos;s ahead? Who took
              the wrong turn? The only fix is to pull over and call everyone,
              one by one.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16" y={40}>
          <GroupSpreadVisual />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-ink p-7 sm:p-9">
              <p className="eyebrow">The usual fix</p>
              <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
                Call everyone, one by one.
              </h3>
              <ul className="mt-6 space-y-4">
                {oldWay.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-mute sm:text-base">
                    <X aria-hidden className="mt-1 size-4 shrink-0 text-dim" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-amber/40 bg-amber/[0.05] p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow !text-amber">The Ride Together fix</p>
                <StatusBadge status="in-development" />
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
                See everyone at once.
              </h3>
              <ul className="mt-6 space-y-4">
                {newWay.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-bone/90 sm:text-base">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-amber" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
