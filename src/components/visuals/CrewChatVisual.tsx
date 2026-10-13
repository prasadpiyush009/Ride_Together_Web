"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Message = { id: number; who: string; text: string; mine?: boolean };

const initial: Message[] = [
  { id: 1, who: "Leader", text: "Leaving in five. Fuel stop at the next town." },
  { id: 2, who: "Co-Leader", text: "I'll stay at the back of the group." },
  { id: 3, who: "You", text: "Copy that.", mine: true },
];

const quick = [
  { label: "Regroup", text: "Let's regroup at the next stop." },
  { label: "Fuel stop", text: "I need a fuel stop." },
  { label: "Break", text: "Taking a short break." },
];

/** Interactive sample conversation: quick actions add a message locally. */
export function CrewChatVisual() {
  const reduce = useReducedMotion();
  const nextId = useRef(initial.length + 1);
  const [messages, setMessages] = useState<Message[]>(initial);

  const send = (text: string) =>
    setMessages((m) =>
      [...m, { id: nextId.current++, who: "You", text, mine: true }].slice(-6),
    );

  return (
    <figure className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-charcoal">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="font-display text-2xl font-semibold uppercase tracking-wide">
            Ride chat
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
            Sample
          </p>
        </div>

        <div className="relative mx-4 mt-4 rounded-xl bg-graphite py-3 pl-5 pr-4">
          <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] rounded-l-xl bg-amber" />
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber">
            Pinned by Leader
          </p>
          <p className="mt-1 text-sm font-medium">Regroup at the next stop</p>
        </div>

        <ul
          aria-live="polite"
          aria-label="Sample group conversation"
          className="flex min-h-[19rem] flex-col justify-end gap-4 px-4 py-5"
        >
          {messages.map((m) => (
            <motion.li
              key={m.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${m.mine ? "items-end" : "items-start"}`}
            >
              {!m.mine && (
                <span className="mb-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-dim">
                  {m.who}
                </span>
              )}
              <span
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.mine ? "bg-amber font-medium text-ink" : "bg-graphite text-bone"
                }`}
              >
                {m.text}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="border-t border-white/10 px-4 py-4">
          <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
            Quick actions
          </p>
          <div className="flex flex-wrap gap-2">
            {quick.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => send(q.text)}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium transition-colors duration-300 hover:border-amber hover:text-amber"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
        Interactive sample · messages stay on this page
      </figcaption>
    </figure>
  );
}
