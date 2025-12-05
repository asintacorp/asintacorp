import Image from "next/image";
import {
  container,
  sectionPadding,
  sectionHeading,
  subHeading,
  sectionLead,
} from "@/components/custom/typography";

export default function DesignProcess({
  leftSrc = "/img/P3.webp",
}: {
  leftSrc?: string;
}) {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-stretch">
        {/* Left narrow image */}
        <div className="flex justify-start md:justify-center">
          <div className="w-full md:h-full">
            <div className="relative w-full pb-[33.333%] md:pb-0 md:h-full">
              <Image
                src={leftSrc}
                alt="Construction blueprint"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 256px, 100vw"
              />
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="space-y-6">
          <h2 className={sectionHeading}>
            Our Design &amp; Construction Strategy
          </h2>

          <div className={"space-y-4 " + sectionLead}>
            <p>
              At Asinta Architects, we uphold a client-centric approach in every
              project — formulating architectural solutions that resonate with
              our clients’ ideologies, culture, and way of living.
            </p>

            <p>
              Each design begins with a deep understanding of our client’s
              preferences, values, and aspirations. We combine these insights
              with our professional expertise and creative direction to produce
              design outcomes that are not only visually compelling but also
              highly functional and meaningful.
            </p>

            <p>
              Our architectural language leans toward minimalist and
              conservative design principles, emphasizing balance between
              functionality and aesthetics — creating spaces that embody both
              clarity and purpose while offering an exceptional client
              experience.
            </p>

            <p>
              Our construction strategy mirrors this commitment to quality and
              precision. We ensure that each project is executed according to
              its specified design, maintaining consistency, integrity, and
              excellence while adhering to established timelines.
            </p>
          </div>

          <div>
            <h3 className="mt-4 mb-2 font-semibold text-base">Our Process</h3>

            <div className="mt-4 relative">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-muted/30" />

              <div className="relative z-10 flex flex-wrap items-center justify-center sm:justify-between gap-4 md:gap-6 lg:gap-8">
                {["RESEARCH", "DESIGN", "FINALIZE", "APPLICATION"].map(
                  (label) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-28 lg:w-28 xl:h-32 xl:w-32 rounded-full border-2 border-foreground flex items-center justify-center text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold tracking-widest text-center px-2 leading-none whitespace-normal wrap-break-word">
                        <span className="block leading-none">{label}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
