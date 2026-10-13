"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const questions = [
  {
    name: "ridesInGroups",
    legend: "Do you ride in a group?",
    options: ["Often", "Sometimes", "Rarely", "Never"],
  },
  {
    name: "facesProblem",
    legend: "Does your group get spread out, leaving you unsure who's where?",
    options: ["Yes, often", "Sometimes", "Not really"],
  },
  {
    name: "wouldUse",
    legend: "Would an app that shows your whole crew on one map help you?",
    options: ["Definitely", "Maybe", "Probably not"],
  },
] as const;

type Status = "idle" | "sending" | "done" | "error";

const messages: Record<string, string> = {
  not_configured:
    "Feedback isn't switched on yet. Please try again a little later.",
  invalid_email: "That email address doesn't look right. You can also leave it empty.",
  missing_answers: "Please answer the three quick questions.",
  comment_too_long: "Your note is a bit long. Please keep it under 1000 characters.",
};

export function FeedbackForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [comment, setComment] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, comment, contact, website }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(
          messages[data.error ?? ""] ??
            "Something went wrong while sending. Please try again.",
        );
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-amber/40 bg-amber/[0.06] p-8 sm:p-10"
      >
        <CheckCircle2 aria-hidden className="size-9 text-amber" />
        <h3 className="mt-5 font-display text-4xl font-semibold uppercase tracking-wide">
          Thanks, rider.
        </h3>
        <p className="mt-3 max-w-md text-mute">
          Your answers help shape what Ride Together becomes. Ride safe out
          there.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-ink p-6 sm:p-9"
    >
      <div className="space-y-8">
        {questions.map((q, i) => (
          <fieldset key={q.name}>
            <legend className="text-base font-medium leading-snug">
              <span className="mr-3 font-mono text-xs text-amber">
                0{i + 1}
              </span>
              {q.legend}
            </legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <label key={opt} className="cursor-pointer">
                  <input
                    type="radio"
                    name={q.name}
                    value={opt}
                    required
                    checked={answers[q.name] === opt}
                    onChange={() =>
                      setAnswers((a) => ({ ...a, [q.name]: opt }))
                    }
                    className="peer sr-only"
                  />
                  <span className="block rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-bone peer-checked:border-amber peer-checked:bg-amber peer-checked:font-semibold peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <div>
          <label htmlFor="fb-comment" className="text-base font-medium">
            Anything you&apos;d want in the app?{" "}
            <span className="text-sm font-normal text-mute">(optional)</span>
          </label>
          <textarea
            id="fb-comment"
            rows={4}
            maxLength={1000}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="A feature, a worry, a story from your last group ride…"
            className="mt-3 w-full resize-y rounded-2xl border border-white/15 bg-charcoal px-4 py-3 text-sm placeholder:text-dim focus:border-amber focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="fb-contact" className="text-base font-medium">
            Email{" "}
            <span className="text-sm font-normal text-mute">(optional)</span>
          </label>
          <input
            id="fb-contact"
            type="email"
            autoComplete="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Only if you'd like to hear back"
            className="mt-3 w-full rounded-full border border-white/15 bg-charcoal px-5 py-3 text-sm placeholder:text-dim focus:border-amber focus:outline-none"
          />
        </div>

        {/* Honeypot: hidden from people, tempting to bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 rounded-xl border border-amber/40 bg-amber/[0.07] px-4 py-3 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-amber px-8 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-bone disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" && (
          <Loader2 aria-hidden className="size-4 animate-spin" />
        )}
        {status === "sending" ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}
