// components/portfolio/Portfolio.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();

    // Safari fallback
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();

  // Automatic current year (not hardcoded)
  // Using UTC reduces the chance of server/client mismatch around New Year.
  const year = useMemo(() => String(new Date().getUTCFullYear()), []);

  const finePointerHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enableClipReveal = !reduceMotion && finePointerHover;

  const imageWillChange = enableClipReveal
    ? "clip-path, opacity"
    : "transform, opacity";

  return (
    <motion.section
      className="h-screen h-[100svh] overflow-hidden bg-white text-neutral-700 pt-16 sm:pt-20"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: reduceMotion
          ? {}
          : { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
      }}
      style={{ willChange: "transform" }}
    >
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="shrink-0 pt-6 sm:pt-8">
          <motion.h1
            variants={{
              hidden: reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, x: -28, filter: "blur(6px)" },
              show: reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
            }}
            className="font-light text-neutral-500 leading-[0.95] text-[clamp(2rem,5.5vw,3.75rem)]"
            style={{ willChange: "transform, opacity, filter" }}
          >
            architecture
          </motion.h1>

          <motion.h2
            variants={{
              hidden: reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)",
                    letterSpacing: "0.22em",
                  },
              show: reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    clipPath: "inset(0 0% 0 0)",
                    letterSpacing: "0.12em",
                    transition: {
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
            }}
            className="-mt-2 sm:-mt-3 font-extralight text-transparent leading-[0.85] tracking-[0.08em] sm:tracking-[0.12em] text-[clamp(2.75rem,8.5vw,5rem)] [-webkit-text-stroke:1px_#6b7280] [text-stroke:1px_#6b7280]"
            style={{ willChange: "clip-path, opacity, letter-spacing" }}
          >
            PORTFOLIO
          </motion.h2>

          <motion.p
            variants={{
              hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
              show: reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
            }}
            className="mt-2 text-xs sm:text-sm tracking-wide text-neutral-700"
            style={{ willChange: "transform, opacity" }}
          >
            Architecture curated to your style.
          </motion.p>

          {/* Studio + Year row */}
          <motion.div
            variants={{
              hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
              show: reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
            }}
            className="mt-6 sm:mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="text-[10px] sm:text-[11px] leading-5 tracking-[0.2em] text-neutral-700">
              <div>Studio:</div>
              <div className="tracking-normal">asinta architects</div>
            </div>

            {/* 3D “flip-in” year */}
            <div
              className="sm:text-right text-sm font-semibold text-neutral-800 tracking-[0.35em] sm:tracking-[0.5em]"
              style={{ perspective: 900 }}
            >
              <div className="flex sm:flex-col justify-start sm:justify-end gap-2 sm:gap-0 leading-6 sm:leading-7">
                {year.split("").map((digit, i) => (
                  <motion.div
                    key={`${digit}-${i}`}
                    initial={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, rotateX: 80, y: 6 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, rotateX: 0, y: 0 }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            delay: 0.25 + i * 0.07,
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    style={{
                      transformOrigin: "50% 100%",
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                  >
                    {digit}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Image area: full image, "just right" size */}
        <div className="relative flex-1 min-h-0 pb-6 sm:pb-8 flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-[980px] h-[clamp(260px,52svh,640px)] sm:h-[clamp(340px,56svh,720px)]"
            initial={
              reduceMotion
                ? { opacity: 1 }
                : enableClipReveal
                ? { opacity: 0, clipPath: "circle(8% at 50% 45%)" }
                : { opacity: 0, y: 10, scale: 0.99 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : enableClipReveal
                ? {
                    opacity: 1,
                    clipPath: "circle(140% at 50% 45%)",
                    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                  }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            style={{
              willChange: imageWillChange,
              contain: "paint",
              backfaceVisibility: "hidden",
            }}
          >
            <motion.div
              className="absolute inset-0"
              initial={
                reduceMotion ? { y: 0, scale: 1 } : { y: 6, scale: 0.995 }
              }
              animate={{ y: 0, scale: 1 }}
              transition={
                reduceMotion
                  ? undefined
                  : { delay: 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
              whileHover={
                finePointerHover && !reduceMotion ? { scale: 1.01 } : undefined
              }
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src="/portfolio/port.webp"
                alt="Architecture portfolio cover illustration"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 980px"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
