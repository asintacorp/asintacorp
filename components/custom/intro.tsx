import Image from "next/image";
import Link from "next/link";

const container = "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8";
const sectionHeading =
  "text-center text-2xl md:text-3xl font-semibold tracking-tight";
const sectionLead =
  "space-y-4 text-sm md:text-base leading-relaxed text-muted-foreground";
const subHeading = "text-xl md:text-2xl font-semibold";
const imageSquare =
  "overflow-hidden relative w-full pb-[100%] md:pb-0 md:h-1/2";

type AboutIntroProps = {
  heroSrc?: string;
  founder1Src?: string;
  founder2Src?: string;
  className?: string;
};

export default function AboutIntro({
  heroSrc = "/img/P0.png",
  founder1Src = "/img/P1.png",
  founder2Src = "/img/P2.png",
  className,
}: AboutIntroProps) {
  // using shared `container` from typography helper

  return (
    <section className={className ? `${container} ${className}` : container}>
      <div className="space-y-8 md:space-y-10">
        {/* Introduction */}
        <h1 className={sectionHeading}>Introduction</h1>

        {/* Header banner (3:1) - no border/frame */}
        <div className="overflow-hidden">
          <div
            className="relative w-full"
            style={{ aspectRatio: "3 / 1" }} // ensures 3:1 even without Tailwind aspect utilities
          >
            <Image
              src={heroSrc}
              alt="Architecture banner"
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </div>

        <div className={sectionLead}>
          <p>
            <Link
              href="#"
              className="font-semibold underline underline-offset-2"
            >
              Asinta
            </Link>{" "}
            Architects is a design &amp; build firm founded through the
            partnership of two young Filipino architects united by a shared
            vision — to deliver contemporary architectural solutions that are
            both efficient and deeply personal. Each project is crafted with
            thoughtful attention to the client’s lifestyle, aspirations, and
            perception of design, ensuring that every space reflects purpose and
            identity.
          </p>
          <p>
            Rooted in collaboration and adaptability, the firm continues to
            evolve alongside the ever‑changing methodologies and innovations in
            the construction industry, bridging design creativity with practical
            execution.
          </p>
        </div>

        {/* Our Company History */}
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-8 items-stretch">
          {/* Founders column: on small screens show 2 across, on md+ stack and stretch to match text height */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:flex md:flex-col md:gap-4 md:h-full">
            <div className={imageSquare}>
              <Image
                src={founder1Src}
                alt="Founder 1 portrait"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 512px, 50vw"
              />
            </div>

            <div className={imageSquare}>
              <Image
                src={founder2Src}
                alt="Founder 2 portrait"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 512px, 50vw"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className={subHeading}>Our Company History</h2>
            <div className={"space-y-3 " + sectionLead}>
              <p>
                Founded in 2023 by Ar.{" "}
                <Link href="#" className="underline underline-offset-2">
                  Junel
                </Link>{" "}
                and Ar.{" "}
                <Link href="#" className="underline underline-offset-2">
                  Rei Viviene
                </Link>
                , both Laguna‑based Registered and Licensed Architects (RLA) of
                the Philippines,{" "}
                <Link href="#" className="underline underline-offset-2">
                  Asinta
                </Link>{" "}
                Architects is the product of their shared vision and partnership
                — serving as their primary platform for the practice of their
                profession, specializing in both architectural design and
                construction.
              </p>
              <p>
                Having gained diversified experience in the industry, the
                founders established{" "}
                <Link href="#" className="underline underline-offset-2">
                  Asinta
                </Link>{" "}
                Architects with the aspiration to contribute to the flourishing
                field of architecture in the Philippines, while building a
                legacy of their own through thoughtful and purposeful design.
              </p>
              <p>
                Now husband and wife, the duo continues to turn their fondness
                for creativity and service into a professional platform — the
                very foundation that brought{" "}
                <Link href="#" className="underline underline-offset-2">
                  Asinta
                </Link>{" "}
                Architects into fruition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
