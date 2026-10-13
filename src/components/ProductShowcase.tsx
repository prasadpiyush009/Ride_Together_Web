import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";
import {
  ChatScreen,
  CommandScreen,
  JoinScreen,
  MapScreen,
} from "@/components/mockups/screens";
import { experienceSteps } from "@/lib/site";

const phones = [
  {
    label:
      "Ride Together join screen with a ride code entry field and Join ride button",
    screen: <JoinScreen />,
    offset: "lg:mt-0",
  },
  {
    label:
      "Ride Together group map showing five riders on a highlighted route with the next turn at the top",
    screen: <MapScreen />,
    offset: "lg:mt-16",
  },
  {
    label:
      "Ride Together group chat with a pinned note from the Leader and quick replies",
    screen: <ChatScreen />,
    offset: "lg:mt-6",
  },
  {
    label:
      "Ride Together ride command screen listing the crew with roles and ride status",
    screen: <CommandScreen />,
    offset: "lg:mt-20",
  },
];

export function ProductShowcase() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative overflow-hidden bg-ink py-28 sm:py-36"
    >
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionLabel index="02">The experience</SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal delay={0.05}>
            <h2
              id="experience-title"
              className="font-display-tight text-[clamp(3.2rem,9vw,8rem)]"
            >
              One code.
              <br />
              One map.
              <br />
              <span className="text-amber">One ride.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-base leading-relaxed text-mute sm:text-lg">
              Ride Together is built around a simple idea: everyone in the group
              should see the same ride. From joining with a code to following
              the route together, here is how it comes together.
            </p>
          </Reveal>
        </div>

        <div id="how-it-works" className="mt-20 sm:mt-28">
          <ol className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {phones.map((p, i) => (
              <li key={i} className={p.offset}>
                <Reveal delay={i * 0.08} y={48}>
                  <PhoneFrame label={p.label}>{p.screen}</PhoneFrame>
                  <div className="mx-auto mt-8 max-w-[280px]">
                    <p className="font-mono text-xs tracking-[0.2em] text-amber">
                      {experienceSteps[i].n}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide">
                      {experienceSteps[i].title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mute">
                      {experienceSteps[i].body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-24 border-t border-white/10 pt-6">
          <p className="max-w-2xl text-sm leading-relaxed text-dim">
            <span className="font-mono uppercase tracking-[0.18em] text-mute">
              Note ·{" "}
            </span>
            Ride Together is in active development. The screens above are
            illustrative interface concepts with sample content, not live data
            or screenshots of a released product.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
