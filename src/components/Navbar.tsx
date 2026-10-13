"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { navLinks, site } from "@/lib/site";

const ctaHref = site.links.app ?? "#experience";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Close with Escape and lock page scroll only while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
          aria-label="Ride Together, back to top"
        >
          <BrandMark />
          <span className="font-display text-xl font-semibold uppercase tracking-[0.14em]">
            Ride Together
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative py-2 text-sm text-mute transition-colors duration-300 hover:text-bone"
              >
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[var(--ease-cinema)] group-hover:scale-x-100" />
              </a>
            </li>
          ))}
          <li>
            <a
              href={ctaHref}
              className="inline-flex h-10 items-center rounded-full bg-amber px-5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-bone"
              {...(/^https?:/.test(ctaHref)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Explore the App
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full text-bone md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-amber"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-ink px-5 pb-10 pt-6 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  className="border-b border-white/10"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-4xl font-semibold uppercase tracking-wide"
                  >
                    {l.label}
                    <span className="font-mono text-xs text-dim">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-8 flex h-12 items-center justify-center rounded-full bg-amber text-sm font-semibold text-ink"
              {...(/^https?:/.test(ctaHref)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Explore the App
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
