import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusBadge } from "@/components/ui/StatusBadge";

const actions = ["Regroup", "Fuel stop", "Break"];

export function SafetySection() {
  return (
    <section
      id="safety"
      aria-labelledby="safety-title"
      className="relative overflow-hidden bg-ink py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_50%,rgba(255,138,31,0.10),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
          <div>
            <Reveal className="flex flex-wrap items-center gap-4">
              <SectionLabel index="03">Safety</SectionLabel>
              <StatusBadge status="planned" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="safety-title"
                className="font-display-tight mt-6 text-[clamp(3rem,8vw,7rem)]"
              >
                Built for
                <br />
                the moment
                <br />
                <span className="text-amber">it matters.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mute sm:text-lg">
                Emergency and quick-action features are part of the Ride
                Together roadmap: one-tap ways to tell the group what you need,
                without typing on the road.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-md border-l-2 border-amber pl-5 text-sm leading-relaxed text-bone/80">
                Ride Together is a coordination aid. It does not replace
                attentive riding, protective gear or local emergency services.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} y={40}>
            <figure>
              <div
                aria-hidden
                className="rounded-3xl border border-white/10 bg-charcoal p-6 sm:p-8"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
                  Quick actions
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {actions.map((a) => (
                    <div
                      key={a}
                      className="grid h-20 place-items-center rounded-2xl border border-white/12 bg-graphite text-sm font-medium"
                    >
                      {a}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex h-24 items-center justify-between rounded-2xl border border-amber/60 bg-amber/[0.08] px-6">
                  <div>
                    <p className="font-display text-3xl font-semibold uppercase tracking-wide text-amber">
                      Emergency
                    </p>
                    <p className="text-xs text-mute">Alert the group</p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-full bg-amber font-display text-2xl font-bold text-ink">
                    !
                  </span>
                </div>
              </div>
              <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
                Concept illustration · planned feature, not yet available
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
