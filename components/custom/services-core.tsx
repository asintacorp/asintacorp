import React from "react";
import Image from "next/image";
import {
  container,
  sectionHeading,
  sectionLead,
} from "@/components/custom/typography";

const sectionPadding = "pt-12 md:pt-16 pb-12";

function IconPlaceholder({
  children,
  src,
}: {
  children?: React.ReactNode;
  src?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt="service icon"
        width={80}
        height={80}
        className="object-contain"
      />
    );
  }

  return (
    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
      <div className="h-10 w-10 text-muted-foreground">{children}</div>
    </div>
  );
}

const coreValues = [
  {
    letter: "A",
    label: "Accessibility",
    description:
      "We believe that architecture is for everyone — design should be inclusive, practical, and responsive to the needs of all.",
  },
  {
    letter: "S",
    label: "Sustainability",
    description:
      "We promote efficient and responsible design solutions that ensure long-term value and environmental harmony.",
  },
  {
    letter: "I",
    label: "Innovation",
    description:
      "We embrace progressive ideas, tools, and methodologies to deliver creative and exceptional results.",
  },
  {
    letter: "N",
    label: "Nobility",
    description:
      "We uphold integrity, professionalism, and excellence in both service and workmanship.",
  },
  {
    letter: "T",
    label: "Teamwork",
    description:
      "We value collaboration — every project is built on shared effort, trust, and a unified vision.",
  },
  {
    letter: "A",
    label: "Adaptability",
    description:
      "We design with flexibility and foresight, ensuring that our solutions evolve with context, function, and time.",
  },
];

export default function ServicesCore() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <div className="space-y-8">
        <div>
          <h2 className={sectionHeading}>Our Services</h2>

          <div className={"mt-3 " + sectionLead}>
            <p>
              Asinta Architects offers comprehensive design and build services
              that integrate creativity, functionality, and craftsmanship in
              every stage of a project. Our expertise covers a diverse range of
              works — including architectural design, renovation, restoration,
              façade enhancement, interior remodeling, fit-outs, and demolition
              projects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          <div className="flex flex-col items-center text-center gap-3">
            <IconPlaceholder src="/img/s1.webp" />
            <div className="text-sm font-semibold">
              Construction Safety Programs
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <IconPlaceholder src="/img/s2.webp" />
            <div className="text-sm font-semibold">Construction Management</div>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <IconPlaceholder src="/img/s3.webp" />
            <div className="text-sm font-semibold">Architectural Interiors</div>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <IconPlaceholder src="/img/s4.webp" />
            <div className="text-sm font-semibold">Set Designs</div>
          </div>
        </div>

        <div className="pt-6">
          <h3 className={sectionHeading}>Our Core Values</h3>

          <div className={"mt-3 " + sectionLead}>
            <p>
              Our core values reflect the principles that guide our practice —
              the foundation of how we think, create, and build. Together, they
              form A.S.I.N.T.A., the name that defines who we are and what we
              stand for.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {coreValues.map(({ letter, label, description }, index) => (
              <div
                key={letter + label + index}
                className="group relative pl-14 border-l border-border hover:border-foreground transition-colors">
                <span className="absolute left-4 top-0 text-3xl font-bold text-foreground/40 group-hover:text-foreground/70 transition-colors">
                  {letter}
                </span>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold tracking-wide">
                    {label}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
