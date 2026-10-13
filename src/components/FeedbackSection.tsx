import { FeedbackForm } from "@/components/FeedbackForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FeedbackSection() {
  return (
    <section
      id="feedback"
      aria-labelledby="feedback-title"
      className="relative overflow-hidden border-t border-white/10 bg-charcoal py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="grid-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[5fr_6fr] lg:gap-24">
          <div>
            <Reveal>
              <SectionLabel index="07">Your turn</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="feedback-title"
                className="font-display-tight mt-8 text-[clamp(3rem,7.5vw,6.5rem)]"
              >
                Does this sound
                <br />
                like <span className="text-amber">your ride?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mute sm:text-lg">
                Ride Together is still being built, and it&apos;s being built
                around real riders. Tell us whether this problem is part of
                your rides and whether you&apos;d actually use something like
                this. It takes about a minute.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-md border-l-2 border-amber pl-5 text-sm leading-relaxed text-bone/80">
                Only the three questions are required. The note and email are
                completely optional, so share only what you&apos;re comfortable
                with.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={40}>
            <FeedbackForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
