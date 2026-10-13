import { Mail } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { navLinks, site } from "@/lib/site";

const productLinks = [...navLinks, { label: "Feedback", href: "#feedback" }];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Footer() {
  const { contactEmail, github, linkedin, instagram, privacy, terms } =
    site.links;

  // "Get in touch": each link appears only when its URL is configured.
  const contact = [
    contactEmail && {
      label: "Email",
      href: `mailto:${contactEmail}`,
      icon: <Mail aria-hidden className="size-5" />,
      ext: false,
    },
    linkedin && {
      label: "LinkedIn",
      href: linkedin,
      icon: <LinkedInIcon />,
      ext: true,
    },
    instagram && {
      label: "Instagram",
      href: instagram,
      icon: <InstagramIcon />,
      ext: true,
    },
  ].filter(Boolean) as Array<{
    label: string;
    href: string;
    icon: React.ReactNode;
    ext: boolean;
  }>;

  const extra = [
    github && { label: "GitHub", href: github, ext: true },
    privacy && { label: "Privacy Policy", href: privacy, ext: true },
    terms && { label: "Terms", href: terms, ext: true },
  ].filter(Boolean) as Array<{ label: string; href: string; ext: boolean }>;

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-3" aria-label="Ride Together, back to top">
              <BrandMark className="size-8" />
              <span className="font-display text-2xl font-semibold uppercase tracking-[0.14em]">
                Ride Together
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              {site.tagline} A group-riding app for motorcyclists, currently in
              development.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-10">
            <nav aria-label="Footer">
              <p className="eyebrow mb-4">Product</p>
              <ul className="space-y-3 text-sm">
                {productLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-bone/85 transition-colors hover:text-amber">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {contact.length > 0 && (
              <nav aria-label="Get in touch">
                <p className="eyebrow mb-4">Get in touch</p>
                <ul className="space-y-3 text-sm">
                  {contact.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="flex items-center gap-3 text-bone/85 transition-colors hover:text-amber"
                        {...(l.ext ? external : {})}
                      >
                        {l.icon}
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {extra.length > 0 && (
              <nav aria-label="Project links">
                <p className="eyebrow mb-4">Project</p>
                <ul className="space-y-3 text-sm">
                  {extra.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-bone/85 transition-colors hover:text-amber"
                        {...(l.ext ? external : {})}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.copyrightYear} Ride Together. All rights reserved.</p>
          <a href="#top" className="transition-colors hover:text-amber">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
