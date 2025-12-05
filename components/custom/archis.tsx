import Image from "next/image";
import {
  container,
  sectionPadding,
  sectionHeading,
  subHeading,
} from "@/components/custom/typography";
const nameHeading = subHeading;
const roleHeading = "text-sm md:text-base font-medium text-muted-foreground";
const bodyText =
  "mt-3 space-y-3 text-sm md:text-base leading-relaxed text-muted-foreground";

export default function FoundersSection() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <div className="space-y-12">
        {/* Section heading */}
        <header className="space-y-2">
          <h2 className={sectionHeading}>Our Founders</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
            Meet the architects behind Asinta Corp., leading the firm&apos;s
            design, client relations, and project execution.
          </p>
        </header>

        {/* --- AR. JUNEL D. BUYAGON --- */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
          {/* Left: Image */}
          <div className="flex justify-start md:justify-center">
            <div className="w-full md:w-[220px]">
              <div className="relative w-full pb-[133%] md:pb-[135%]">
                <Image
                  src="/img/junel.webp"
                  alt="Ar. Junel D. Buyagon"
                  fill
                  className="object-cover object-top rounded-md shadow-sm"
                  sizes="(min-width: 768px) 220px, 100vw"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-4">
            <div>
              <h3 className={nameHeading}>AR. JUNEL D. BUYAGON</h3>
              <p className={roleHeading}>
                Co-founder / Principal Architect &amp; Operations Lead
              </p>
            </div>

            <div className={bodyText}>
              <p>
                Ar. Junel earned his Bachelor&apos;s Degree in Architecture from
                Mapúa–Malayan Colleges Laguna in 2019. Shortly after, he began
                his professional journey as a Quality Assurance Architect in an
                Australian-based real estate marketing firm, where he gained
                valuable experience collaborating with a diverse and
                international team.
              </p>

              <p>
                Motivated by a growing passion for the construction field, he
                transitioned into a private architectural practice in Laguna,
                where he deepened his understanding of design implementation and
                project execution.
              </p>

              <p>
                In 2023, after obtaining his professional license in
                Architecture, he co-founded Asinta Corp., now working alongside
                his wife and partner, Ar. Rei Viviene, in leading the
                firm&apos;s design and build projects.
              </p>
            </div>

            <ul className="mt-2 grid gap-1 text-sm md:text-base text-muted-foreground sm:grid-cols-2">
              <li>• Project Management &amp; Scheduling</li>
              <li>• Quality Monitoring</li>
              <li>• Construction Supervision</li>
              <li>• Materials &amp; Procurement</li>
              <li>• Financial Management</li>
              <li>• Contractor &amp; Supplier Coordination</li>
              <li>• Back-End Operations (document control, archiving)</li>
            </ul>
          </div>
        </div>

        {/* --- AR. REI VIVIENE ALODVINO-BUYAGON --- */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-start">
          {/* Left: Content */}
          <div className="order-2 md:order-1 space-y-4">
            <div>
              <h3 className={nameHeading}>AR. REI VIVIENE ALODVINO-BUYAGON</h3>
              <p className={roleHeading}>
                Co-founder / Design Director &amp; Client Lead
              </p>
            </div>

            <div className={bodyText}>
              <p>
                Ar. Rei Viviene earned her Bachelor&apos;s Degree in
                Architecture from Batangas State University in 2018. Soon after,
                she began her professional journey through an apprenticeship
                program at a private firm in Batangas City, where she developed
                her foundation in architectural practice and project
                coordination.
              </p>

              <p>
                After obtaining her professional license in Architecture in
                2022, she joined a design firm in Laguna as an Associate
                Architect, further refining her design sensibilities and client
                management skills.
              </p>

              <p>
                Today, Ar. Rei Viviene serves as the Co-founder, Design
                Director, and Client Lead of Asinta Corp., where she continues
                to translate ideas into purposeful and enduring architecture.
              </p>
            </div>

            <ul className="mt-2 grid gap-1 text-sm md:text-base text-muted-foreground sm:grid-cols-2">
              <li>• Design Development &amp; Creative Direction</li>
              <li>• Client Communications &amp; Updates</li>
              <li>• Interior Design &amp; Material Curation</li>
              <li>• Proposal Writing &amp; Bid Packaging</li>
              <li>• Permit Application Oversight</li>
              <li>• Contracts &amp; Legal Compliance</li>
              <li>• Office &amp; Staff Management</li>
            </ul>
          </div>

          {/* Right: Image */}
          <div className="order-1 md:order-2 flex justify-start md:justify-center">
            <div className="w-full md:w-[220px]">
              <div className="relative w-full pb-[133%] md:pb-[135%]">
                <Image
                  src="/img/viv.webp"
                  alt="Ar. Rei Viviene Aldovino-Buyagon"
                  fill
                  className="object-cover object-top rounded-md shadow-sm"
                  sizes="(min-width: 768px) 220px, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
