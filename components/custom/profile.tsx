import React, { memo, useId } from "react";

const container = "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8";
const smallCaps =
  "text-[10px] sm:text-xs tracking-widest uppercase text-muted-foreground";

const DEFAULT_SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/asintarchs",
    display: "www.facebook.com/asintarchs",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/asintarchs",
    display: "www.instagram.com/asintarchs",
  },
];

// Full-bleed without widening the page: center a viewport-wide box via transform
function FullBleed({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative left-1/2 -translate-x-1/2 w-[100vw] max-w-[100vw] supports-[width:100svw]:w-[100svw] supports-[width:100svw]:max-w-[100svw]">
      {children}
    </div>
  );
}

function CompanyProfile({
  date = "October 2025",
  email = "asinta.corp@gmail.com",
  socials = DEFAULT_SOCIALS,
  companyName = "Asinta Architects",
}) {
  const headingId = useId();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    sameAs: socials.map((s) => s.href),
    contactPoint: [
      { "@type": "ContactPoint", email, contactType: "customer service" },
    ],
  };

  return (
    <section
      id="company-profile"
      aria-labelledby={headingId}
      className="relative w-full min-w-0 bg-background overflow-x-hidden supports-[overflow:clip]:overflow-x-clip"
    >
      <FullBleed>
        <div className={`${container} w-full py-16 sm:py-24 md:py-32`}>
          <div className={smallCaps}>{date}</div>

          <h2 id={headingId} className="sr-only">
            Company Profile
          </h2>

          <div
            className="relative mt-2 sm:mt-3 leading-[0.85] select-none"
            aria-hidden="true"
          >
            <div className="text-[clamp(3.5rem,18vw,9rem)] font-light tracking-tight text-muted-foreground/70">
              COMPANY
            </div>
            <div className="-mt-[0.22em] text-[clamp(3.5rem,18vw,9rem)] font-black tracking-tight text-foreground">
              PROFILE
            </div>
          </div>

          {/* Intro copy */}
          <div className="font-sans mt-6 sm:mt-8 md:mt-10 w-full border-t border-muted/30 pt-4 sm:pt-6">
            <p className="font-bold text-foreground/70 leading-relaxed">
              Architecture curated to your style — built with quality and
              precision.
            </p>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              A partnership founded on purpose and craftsmanship, {companyName}{" "}
              creates spaces that reflect individuality, embody integrity, and
              endure through thoughtful design and execution.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 grid gap-10 sm:gap-16 md:gap-20 sm:grid-cols-2">
            <div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Email
              </div>
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${companyName}`}
                className="mt-2 block text-sm sm:text-base text-foreground hover:underline underline-offset-4 break-words"
              >
                {email}
              </a>
            </div>

            <div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Socials
              </div>
              <div className="mt-2 space-y-1">
                {socials.map(({ label, href, display }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${companyName} on ${label}`}
                    className="block text-sm sm:text-base text-foreground hover:underline underline-offset-4 break-words"
                  >
                    {display || href}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
          />
        </div>
      </FullBleed>
    </section>
  );
}

export default memo(CompanyProfile);
