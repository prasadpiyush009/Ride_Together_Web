"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-6 px-6"
    >
      <p className="eyebrow">Something went wrong</p>
      <h1 className="font-display-tight text-6xl">The road got rough.</h1>
      <p className="text-mute">
        The page failed to load. Try again, and if it keeps happening, come back
        a little later.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-bone"
      >
        Try again
      </button>
    </main>
  );
}
