import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-6 px-6"
    >
      <p className="eyebrow">404 · Off route</p>
      <h1 className="font-display-tight text-6xl">This road doesn&apos;t go anywhere.</h1>
      <p className="text-mute">The page you were looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-bone"
      >
        Back to the start
      </Link>
    </main>
  );
}
