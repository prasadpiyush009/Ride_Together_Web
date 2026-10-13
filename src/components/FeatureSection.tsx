import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { FeatureStatus } from "@/lib/site";

type Layout = "split" | "split-reverse" | "wide" | "panel";

type FeatureSectionProps = {
  id?: string;
  letter: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  points: readonly string[];
  status: FeatureStatus;
  visual: React.ReactNode;
  layout: Layout;
  tone?: "ink" | "charcoal";
};

function Copy({
  letter,
  eyebrow,
  title,
  body,
  points,
  status,
  headingId,
}: Pick<
  FeatureSectionProps,
  "letter" | "eyebrow" | "title" | "body" | "points" | "status"
> & { headingId: string }) {
  return (
    <div>
      <Reveal className="flex flex-wrap items-center gap-4">
        <p className="eyebrow flex items-center gap-4">
          <span className="text-amber">{letter}</span>
          <span aria-hidden className="h-px w-8 bg-white/20" />
          <span>{eyebrow}</span>
        </p>
        <StatusBadge status={status} />
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          id={headingId}
          className="font-display-tight mt-6 text-[clamp(3rem,7vw,6.5rem)]"
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-6 max-w-md text-base leading-relaxed text-mute sm:text-lg">
          {body}
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm text-bone/85">
              <span aria-hidden className="mt-[0.55em] h-px w-5 shrink-0 bg-amber" />
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function FeatureSection({
  id,
  letter,
  layout,
  tone = "ink",
  visual,
  ...copy
}: FeatureSectionProps) {
  const headingId = `feature-${letter.toLowerCase()}-title`;
  const text = <Copy letter={letter} headingId={headingId} {...copy} />;
  const vis = (
    <Reveal delay={0.1} y={40}>
      {visual}
    </Reveal>
  );

  const ghost = (
    <span
      aria-hidden
      className="ghost-letter absolute -right-4 top-6 text-[clamp(14rem,34vw,34rem)]"
    >
      {letter}
    </span>
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative overflow-hidden py-24 sm:py-32 ${
        tone === "charcoal" ? "bg-charcoal" : "bg-ink"
      }`}
    >
      {layout !== "panel" && ghost}

      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {layout === "split" && (
          <div className="grid items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
            {text}
            {vis}
          </div>
        )}

        {layout === "split-reverse" && (
          <div className="grid items-center gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
            <div className="order-2 lg:order-1">{vis}</div>
            <div className="order-1 lg:order-2">{text}</div>
          </div>
        )}

        {layout === "wide" && (
          <div className="space-y-14">
            {text}
            {vis}
          </div>
        )}

        {layout === "panel" && (
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-graphite/60 p-6 sm:p-10 lg:p-16">
            {ghost}
            <div className="relative grid items-center gap-14 lg:grid-cols-[6fr_5fr] lg:gap-20">
              <div className="order-2 lg:order-1">{vis}</div>
              <div className="order-1 lg:order-2">{text}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
