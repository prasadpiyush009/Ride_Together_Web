import { NextResponse } from "next/server";

/**
 * Receives feedback from the website form and forwards it to a webhook you
 * control (a Google Apps Script that writes to a Google Sheet; see
 * docs/feedback-setup.md). The webhook URL and secret stay on the server and
 * are never sent to the browser.
 */

const ridesInGroups = ["Often", "Sometimes", "Rarely", "Never"];
const facesProblem = ["Yes, often", "Sometimes", "Not really"];
const wouldUse = ["Definitely", "Maybe", "Probably not"];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("invalid_json");
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data = {
    ridesInGroups: str(body.ridesInGroups),
    facesProblem: str(body.facesProblem),
    wouldUse: str(body.wouldUse),
    comment: str(body.comment),
    contact: str(body.contact),
  };

  if (
    !ridesInGroups.includes(data.ridesInGroups) ||
    !facesProblem.includes(data.facesProblem) ||
    !wouldUse.includes(data.wouldUse)
  ) {
    return bad("missing_answers");
  }
  if (data.comment.length > 1000) return bad("comment_too_long");
  if (data.contact && (data.contact.length > 200 || !emailRe.test(data.contact))) {
    return bad("invalid_email");
  }

  const url = process.env.FEEDBACK_WEBHOOK_URL;
  if (!url) return bad("not_configured", 503);

  try {
    const res = await fetch(url, {
      method: "POST",
      // text/plain keeps Google Apps Script happy (no CORS preflight needed).
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: process.env.FEEDBACK_WEBHOOK_SECRET ?? "",
        ...data,
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const result = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !result?.ok) return bad("upstream_failed", 502);
  } catch {
    return bad("upstream_failed", 502);
  }

  return NextResponse.json({ ok: true });
}
