"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { roles } from "@/lib/site";

type RoleId = (typeof roles)[number]["id"];

const roster: Array<{ name: string; role: RoleId; status: string }> = [
  { name: "Rider 1", role: "leader", status: "Riding" },
  { name: "Rider 2", role: "co-leader", status: "Riding" },
  { name: "Rider 3", role: "rider", status: "Riding" },
  { name: "Rider 4", role: "rider", status: "Stopped" },
  { name: "Rider 5", role: "rider", status: "Riding" },
];

/** Explore the group roles and see where each one sits in the roster. */
export function LeadVisual() {
  const [active, setActive] = useState<RoleId>("leader");
  const current = roles.find((r) => r.id === active)!;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = roles.findIndex((r) => r.id === active);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % roles.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + roles.length) % roles.length;
    else return;
    e.preventDefault();
    setActive(roles[next].id);
    document.getElementById(`role-tab-${roles[next].id}`)?.focus();
  };

  return (
    <figure>
      <div className="rounded-2xl border border-white/10 bg-charcoal p-5 sm:p-7">
        <div
          role="tablist"
          aria-label="Group roles"
          onKeyDown={onKeyDown}
          className="flex gap-1 rounded-full bg-ink p-1"
        >
          {roles.map((r) => (
            <button
              key={r.id}
              id={`role-tab-${r.id}`}
              role="tab"
              type="button"
              aria-selected={r.id === active}
              aria-controls="role-panel"
              tabIndex={r.id === active ? 0 : -1}
              onClick={() => setActive(r.id)}
              className={`flex-1 rounded-full px-3 py-2.5 text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                r.id === active ? "bg-amber text-ink" : "text-mute hover:text-bone"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${active}`} className="mt-6 min-h-[7.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-display text-3xl font-semibold uppercase tracking-wide">
                {current.label}
              </p>
              <p className="mt-1 text-sm font-medium text-amber">{current.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{current.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mb-3 mt-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
          Ride overview
        </p>
        <ul className="space-y-2">
          {roster.map((r) => {
            const on = r.role === active;
            const label = roles.find((x) => x.id === r.role)!.label;
            return (
              <li
                key={r.name}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors duration-500 ${
                  on ? "border-amber/60 bg-amber/[0.07]" : "border-transparent bg-graphite"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                      r.role === "leader" ? "bg-amber text-ink" : "bg-steel text-bone"
                    }`}
                  >
                    {r.name.slice(-1)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{r.name}</span>
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute">
                      {label}
                    </span>
                  </span>
                </span>
                <span className="flex items-center gap-2 text-xs text-mute">
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${r.status === "Riding" ? "bg-amber" : "bg-dim"}`}
                  />
                  {r.status}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
        Illustrative roster · sample riders and states
      </figcaption>
    </figure>
  );
}
