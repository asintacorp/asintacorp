// components/portfolio/Portfolio.tsx
"use client";

import Image from "next/image";

export default function Portfolio() {
  return (
    <section className="h-dvh overflow-hidden bg-white text-neutral-700 pt-16 sm:pt-20">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="shrink-0 pt-6 sm:pt-8">
          <h1 className="font-light text-neutral-500 leading-[0.95] text-[clamp(2rem,5.5vw,3.75rem)]">
            architecture
          </h1>

          <h2 className="-mt-2 sm:-mt-3 font-extralight text-transparent leading-[0.85] tracking-[0.08em] sm:tracking-[0.12em] text-[clamp(2.75rem,8.5vw,5rem)] [-webkit-text-stroke:1px_#6b7280] [text-stroke:1px_#6b7280]">
            PORTFOLIO
          </h2>

          <p className="mt-2 text-xs sm:text-sm tracking-wide text-neutral-700">
            Architecture curated to your style.
          </p>

          {/* Studio + Year row */}
          <div className="mt-6 sm:mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-[10px] sm:text-[11px] leading-5 tracking-[0.2em] text-neutral-700">
              <div>Studio:</div>
              <div className="tracking-normal">asinta architects</div>
            </div>

            <div className="sm:text-right text-sm font-semibold text-neutral-800 tracking-[0.35em] sm:tracking-[0.5em]">
              <div className="flex sm:flex-col justify-start sm:justify-end gap-2 sm:gap-0 leading-6 sm:leading-7">
                <div>2</div>
                <div>0</div>
                <div>2</div>
                <div>5</div>
              </div>
            </div>
          </div>
        </div>

        {/* Image fills the remaining space and stays fully visible (no cropping) */}
        <div className="relative flex-1 min-h-0 pb-6 sm:pb-8">
          <Image
            src="/portfolio/port.webp"
            alt="Architecture portfolio cover illustration"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>
    </section>
  );
}
