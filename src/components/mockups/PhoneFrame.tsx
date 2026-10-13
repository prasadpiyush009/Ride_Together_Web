/**
 * Smartphone frame. Screens are authored as SVG on a 280 x 600 canvas so they
 * scale crisply with the frame and stay legible at any width.
 */
export function PhoneFrame({
  label,
  children,
  className = "",
}: {
  /** Accessible description of the screen. */
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] ${className}`}>
      <div className="rounded-[2.6rem] bg-steel p-[7px] shadow-[0_40px_70px_-35px_rgba(0,0,0,0.95)] ring-1 ring-white/15">
        <svg
          viewBox="0 0 280 600"
          role="img"
          aria-label={label}
          className="block h-auto w-full overflow-hidden rounded-[2.1rem] bg-ink"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="280" height="600" className="fill-ink" />
          {children}
          {/* Dynamic island + home indicator */}
          <rect x="105" y="10" width="70" height="20" rx="10" fill="#000" />
          <rect x="100" y="588" width="80" height="4" rx="2" className="fill-bone/40" />
        </svg>
      </div>
    </div>
  );
}
