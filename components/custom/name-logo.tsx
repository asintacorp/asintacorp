import Image from "next/image";
import {
  container,
  sectionPadding,
  sectionHeading,
  sectionLead,
} from "@/components/custom/typography";
const coverImageWrap = "mt-12 w-full overflow-hidden shadow-lg";

export default function NameAndLogo() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <div className="space-y-8 md:space-y-10">
        <h1 className={sectionHeading}>Our Name &amp; Logo</h1>

        <div className="flex justify-center">
          <div className="relative w-36 h-36">
            <Image
              src="/logo.png"
              alt="Asinta Architects logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className={sectionLead}>
          <p>
            The Filipino vernacular term &ldquo;asinta&rdquo; directly
            translates to &ldquo;masonry wall&rdquo; — a symbol of foundation,
            structure, and alignment. Closely related to &ldquo;asintado,&rdquo;
            meaning precision or true alignment, the word embodies the
            discipline and intention that guide every architectural endeavor.
          </p>

          <p>
            The logo of Asinta Architects draws inspiration from the form of the
            concrete hollow block, the most common and enduring building unit in
            the Philippines. This form represents both the simplicity and
            strength that anchor the firm’s philosophy — that every design
            begins with a solid foundation, built with clarity of purpose and
            thoughtful detail.
          </p>
        </div>
      </div>

      {/* Full-width cover image beneath the two-column */}
      <div className={coverImageWrap}>
        <Image
          src="/img/P2.webp"
          alt="Cover building"
          width={1400}
          height={700}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Vision & Mission placed just below the cover image */}
      <div className="mt-10 space-y-6">
        <h2 className={sectionHeading}>Our Vision & Mission</h2>
        <p className="text-base text-muted-foreground">
          Our mission is to create architecture that is thoughtfully designed
          around the people who will inhabit it — reflecting their personal
          preferences, background, culture, and way of life. We are committed to
          producing work that balances design integrity with construction
          excellence, adapting to the evolving trends and technologies of the
          building industry while ensuring quality and craftsmanship in every
          project.
        </p>

        <p className="text-base text-muted-foreground">
          We aspire to be recognized as one of the leading names in the
          architectural design and construction industry — known for our
          unwavering commitment to authenticity, precision, and design
          excellence. Guided by the founding principles of architecture —
          firmitas, utilitas, venustas — we aim to continually build spaces of
          enduring value through meaningful collaborations with clients, allied
          professionals, subcontractors, and suppliers.
        </p>
      </div>
    </section>
  );
}
