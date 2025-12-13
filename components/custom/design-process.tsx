import Image from "next/image";
import {
  container,
  sectionPadding,
  sectionHeading,
  subHeading,
  sectionLead,
} from "@/components/custom/typography";
import { Search, PenTool, CheckCircle, Send } from "lucide-react";

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

              <div className="relative z-10 flex items-center justify-center w-full">
                <div className="w-full max-w-4xl">
                  <div className="relative flex items-center justify-between gap-4 px-4 sm:px-0">
                    {[
                      { label: "RESEARCH", Icon: Search },
                      { label: "DESIGN", Icon: PenTool },
                      { label: "FINALIZE", Icon: CheckCircle },
                      { label: "APPLICATION", Icon: Send },
                    ].map(({ label, Icon }, idx, arr) => (
                      <div key={label} className="flex-1 flex items-center">
                        <div className="relative w-full flex items-center">
                          <div className="flex flex-col items-center w-full">
                            <div className="relative z-20 flex items-center justify-center">
                              <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-18 xl:w-18 rounded-full border-2 border-muted-foreground flex items-center justify-center bg-background">
                                <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-muted-foreground" />
                              </div>
                            </div>

                            <span className="mt-1 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-semibold tracking-widest text-center text-muted-foreground">
                              {label}
                            </span>
                          </div>

                          {/* Connector line between steps */}
                          {idx < arr.length - 1 && (
                            <div className="absolute right-0 left-auto top-1/2 transform translate-x-1/2 -translate-y-1/2 w-1/2">
                              <div className="h-px bg-muted/30 w-full" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
