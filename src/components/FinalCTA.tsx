import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const href = site.links.app ?? "#experience";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-ink py-32 sm:py-44"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 105%, rgba(255,138,31,0.55), rgba(120,50,10,0.25) 45%, transparent 75%)",
        }}
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="grid-lines absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_top,black,transparent_70%)]"
      />

      <div className="mx-auto max-w-[90rem] px-5 text-center sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow">{site.support}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            id="cta-title"
            className="font-display-tight mt-8 text-[clamp(3.6rem,13vw,12rem)]"
          >
            Your next ride
            <br />
            starts <span className="text-amber">here.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14} className="mt-12 flex justify-center">
          <Button href={href}>Explore Ride Together</Button>
        </Reveal>
      </div>
    </section>
  );
}
