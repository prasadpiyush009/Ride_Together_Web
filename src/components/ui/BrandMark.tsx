/** Ride Together mark: two riders joined by one route. */
export function BrandMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 46 C 14 30, 30 36, 32 26 S 46 20, 50 16"
        stroke="#ff8a1f"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="46" r="7" fill="#f2eee7" />
      <circle cx="50" cy="16" r="7" fill="#ff8a1f" />
    </svg>
  );
}
