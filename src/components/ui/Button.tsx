import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
};

const base =
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-7 text-sm font-semibold tracking-wide transition-colors duration-300";

const variants = {
  primary: "bg-amber text-ink hover:bg-bone",
  ghost:
    "border border-white/20 text-bone hover:border-bone hover:bg-white/[0.06]",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}
