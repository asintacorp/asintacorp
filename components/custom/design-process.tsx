"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
        <div className="space-y-2">
          <h2 className={sectionHeading}>
            Our Design &amp; Construction Strategy
          </h2>

          {/* Our Process placed directly under the main heading (smaller) */}
          <div className="mt-3 mb-3 flex items-center justify-center gap-2">
            <h3 className={`${subHeading} mt-0 mb-0 inline-block`}>
              Our Process:
            </h3>
            <ProcessCycler small />
          </div>

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

          {/* bottom duplicated Our Process removed; kept the inline smaller version above */}
        </div>
      </div>
    </section>
  );
}

function ProcessCycler({ small }: { small?: boolean } = {}) {
  const EASE = [0.22, 1, 0.36, 1] as const;
  const steps = ["RESEARCH", "DESIGN", "FINALIZE", "APPLICATION"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="relative flex items-center">
      {!small && <div className="h-px w-12 bg-muted/30 mr-4 hidden sm:block" />}

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          aria-live="polite"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: EASE }}
          className={`${subHeading} inline-flex items-center justify-center italic ${
            small ? "px-1 w-[12ch] text-left" : "px-1 w-40 sm:w-48 md:w-56"
          } text-center font-bold text-black tracking-normal`}
          style={{ willChange: "transform, opacity" }}>
          {steps[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
