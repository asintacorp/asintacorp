import Image from "next/image";
import {
  Calendar,
  Eye,
  Wrench,
  Package,
  DollarSign,
  Users,
  Archive,
  PenTool,
  Mail,
  Layers,
  FileText,
  Clipboard,
  ShieldCheck,
} from "lucide-react";
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
          <p className="mx-auto text-center text-sm md:text-base text-muted-foreground max-w-xl">
            Meet the architects behind Asinta Corp., leading the firm&apos;s
            design, client relations, and project execution.
          </p>
        </header>

        {/* --- AR. JUNEL D. BUYAGON --- */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-stretch">
          {/* Left: Image */}
          <div className="flex justify-center md:justify-center items-start md:items-stretch">
            <div className="w-full md:w-[220px] md:h-full max-w-[220px] mx-auto md:mx-0">
              <div className="relative w-full pb-[120%] md:pb-0 md:h-full">
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
            <hr />
            <ul className="mt-2 grid gap-1 text-sm md:text-base text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>Project Management &amp; Scheduling</span>
              </li>
              <li className="flex items-center gap-2">
                <Eye className="h-4 w-4 shrink-0" />
                <span>Quality Monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="h-4 w-4 shrink-0" />
                <span>Construction Supervision</span>
              </li>
              <li className="flex items-center gap-2">
                <Package className="h-4 w-4 shrink-0" />
                <span>Materials &amp; Procurement</span>
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 shrink-0" />
                <span>Financial Management</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 shrink-0" />
                <span>Contractor &amp; Supplier Coordination</span>
              </li>
              <li className="flex items-center gap-2">
                <Archive className="h-4 w-4 shrink-0" />
                <span>Back-End Operations (document control, archiving)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- AR. REI VIVIENE ALDOVINO-BUYAGON --- */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-stretch">
          {/* Left: Content */}
          <div className="order-2 md:order-1 space-y-4">
            <div>
              <h3 className={nameHeading}>AR. REI VIVIENE ALDOVINO-BUYAGON</h3>
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
            <hr />
            <ul className="mt-2 grid gap-1 text-sm md:text-base text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <PenTool className="h-4 w-4 shrink-0" />
                <span>Design Development &amp; Creative Direction</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>Client Communications &amp; Updates</span>
              </li>
              <li className="flex items-center gap-2">
                <Layers className="h-4 w-4 shrink-0" />
                <span>Interior Design &amp; Material Curation</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 shrink-0" />
                <span>Proposal Writing &amp; Bid Packaging</span>
              </li>
              <li className="flex items-center gap-2">
                <Clipboard className="h-4 w-4 shrink-0" />
                <span>Permit Application Oversight</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>Contracts &amp; Legal Compliance</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 shrink-0" />
                <span>Office &amp; Staff Management</span>
              </li>
            </ul>
          </div>

          {/* Right: Image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-center items-start md:items-stretch">
            <div className="w-full md:w-[220px] md:h-full max-w-[220px] mx-auto md:mx-0">
              <div className="relative w-full pb-[120%] md:pb-0 md:h-full">
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
