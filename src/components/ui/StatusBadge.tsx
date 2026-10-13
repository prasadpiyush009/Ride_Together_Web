import { statusLabel, type FeatureStatus } from "@/lib/site";

/** Honest labelling: shows whether something is in development or planned. */
export function StatusBadge({ status }: { status: FeatureStatus }) {
  const active = status === "in-development";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute">
      <span
        aria-hidden
        className={
          active
            ? "size-1.5 rounded-full bg-amber"
            : "size-1.5 rounded-full border border-mute"
        }
      />
      {statusLabel[status]}
    </span>
  );
}
