// components/portfolio/Portfolio.tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

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

type ProjectSection = "Exterior" | "Interior";

type Project = {
  id: string; // unique even if same image appears in both
  imageNo: number; // 1..19
  title: string;
  section: ProjectSection;
  src: string;
};

function SectionWall({
  title,
  subtitle,
  projects,
  accent,
  onOpen,
  reduceMotion,
  finePointerHover,
}: {
  title: ProjectSection;
  subtitle: string;
  projects: Project[];
  accent: string;
  onOpen: (id: string) => void;
  reduceMotion: boolean;
  finePointerHover: boolean;
}) {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:items-start">
          {/* Left header */}
          <div className="lg:sticky lg:top-24">
            <div className="relative pt-12">
              <div
                aria-hidden
                className={[
                  "pointer-events-none absolute left-0 top-0 select-none",
                  "text-transparent [-webkit-text-stroke:1px_rgba(17,24,39,0.14)]",
                  "font-semibold leading-[0.9]",
                  "text-[44px] sm:text-[52px] tracking-[0.08em]",
                ].join(" ")}>
                {title.toUpperCase()}
              </div>

              <div className="text-[11px] tracking-[0.32em] text-neutral-500">
                SECTION
              </div>

              <h3 className="mt-3 text-3xl sm:text-4xl font-light tracking-tight text-neutral-900">
                {title} Projects
              </h3>

              <div
                className="mt-4 h-[2px] w-16"
                style={{ background: accent }}
              />

              <p className="mt-5 text-sm leading-6 text-neutral-600">
                {subtitle}
              </p>

              <div className="mt-7 text-[11px] tracking-[0.22em] text-neutral-500 tabular-nums">
                {projects.length} SHEETS • A4 ASPECT
              </div>
            </div>
          </div>

          {/* Right wall (clamped width so tablet doesn’t become huge) */}
          <div className="w-full max-w-[980px] mx-auto lg:mx-0 rounded-3xl border border-neutral-200 bg-white shadow-[0_25px_70px_rgba(17,24,39,0.08)] overflow-hidden">
            {/* hanging rail */}
            <div className="relative h-12 border-b border-neutral-200/80 bg-white">
              <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-neutral-200/90" />
              <div className="absolute inset-x-6 top-1/2 h-[1px] -translate-y-1/2 bg-neutral-900/5" />
              <div className="absolute left-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-neutral-200" />
              <div className="absolute right-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-neutral-200" />
            </div>

            {/* Columns:
                - Mobile: 2
                - Tablet (md): 3 (prevents tiles getting too big)
                - Desktop (lg): 2 (easy to view) */}
            <motion.ul
              className="p-4 sm:p-6 lg:p-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5 sm:gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: reduceMotion
                  ? {}
                  : {
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.03,
                      },
                    },
              }}>
              {projects.map((p) => (
                <motion.li
                  key={p.id}
                  variants={{
                    hidden: reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 14, filter: "blur(6px)" },
                    show: reduceMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                  }}>
                  <motion.button
                    type="button"
                    onClick={() => onOpen(p.id)}
                    aria-label={`Open preview for ${p.title}`}
                    className="group block w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25"
                    whileHover={
                      finePointerHover && !reduceMotion
                        ? { y: -2, transition: { duration: 0.2 } }
                        : undefined
                    }
                    style={{ willChange: "transform" }}>
                    <div className="rounded-2xl bg-white p-2 ring-1 ring-neutral-200 shadow-[0_18px_40px_rgba(17,24,39,0.10)] transition-shadow duration-300 group-hover:shadow-[0_26px_60px_rgba(17,24,39,0.14)]">
                      <div className="rounded-xl bg-neutral-50 p-2">
                        <div className="relative overflow-hidden rounded-lg aspect-[210/297]">
                          <Image
                            src={p.src}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 460px"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const reduceMotion = !!useReducedMotion();

  const year = useMemo(() => String(new Date().getUTCFullYear()), []);
  const finePointerHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enableClipReveal = !reduceMotion && finePointerHover;

  const imageWillChange = enableClipReveal
    ? "clip-path, opacity"
    : "transform, opacity";

  const imageWrapperInitialInline = enableClipReveal
    ? { opacity: 0, clipPath: "circle(8% at 50% 45%)" as const }
    : { opacity: 0, transform: "translateY(10px) scale(0.99)" };

  // Your real images: public/portfolio/1.webp ... 19.webp
  // Grouping (as provided)
  const exteriorNos = useMemo(
    () => [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 15, 18],
    []
  );
  const interiorNos = useMemo(() => [8, 9, 12, 13, 14, 16, 17, 19], []);

  const { exteriorProjects, interiorProjects, allProjects } = useMemo(() => {
    const makeProject = (section: ProjectSection, n: number): Project => ({
      id: `${section.toLowerCase()}-${String(n).padStart(2, "0")}`, // unique per section
      imageNo: n,
      title: `${section} ${String(n).padStart(2, "0")}`,
      section,
      src: `/portfolio/${n}.webp`,
    });

    const exterior = exteriorNos.map((n) => makeProject("Exterior", n));
    const interior = interiorNos.map((n) => makeProject("Interior", n));

    return {
      exteriorProjects: exterior,
      interiorProjects: interior,
      allProjects: [...exterior, ...interior],
    };
  }, [exteriorNos, interiorNos]);

  // Lightbox
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeIndex = useMemo(() => {
    if (activeId == null) return -1;
    return allProjects.findIndex((p) => p.id === activeId);
  }, [activeId, allProjects]);

  const activeProject = activeIndex >= 0 ? allProjects[activeIndex] : null;

  const openProject = useCallback((id: string) => setActiveId(id), []);
  const closeProject = useCallback(() => setActiveId(null), []);

  const goNext = useCallback(() => {
    if (activeIndex < 0) return;
    setActiveId(allProjects[(activeIndex + 1) % allProjects.length].id);
  }, [activeIndex, allProjects]);

  const goPrev = useCallback(() => {
    if (activeIndex < 0) return;
    setActiveId(
      allProjects[(activeIndex - 1 + allProjects.length) % allProjects.length]
        .id
    );
  }, [activeIndex, allProjects]);

  // Esc / arrows + scroll lock
  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeProject, closeProject, goNext, goPrev]);

  return (
    <div className="bg-white text-neutral-700">
      {/* HERO */}
      <motion.section
        className="h-svh overflow-hidden bg-white text-neutral-700 pt-16 sm:pt-20"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: reduceMotion
            ? {}
            : { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
        }}
        style={{ willChange: "transform" }}>
        <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
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
              style={{ willChange: "transform, opacity, filter" }}>
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
                      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                    },
              }}
              className="-mt-2 sm:-mt-3 font-extralight text-transparent leading-[0.85] tracking-[0.08em] sm:tracking-[0.12em] text-[clamp(2.75rem,8.5vw,5rem)] [-webkit-text-stroke:1px_#6b7280] [text-stroke:1px_#6b7280]"
              style={{ willChange: "clip-path, opacity, letter-spacing" }}>
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
              style={{ willChange: "transform, opacity" }}>
              Architecture curated to your style.
            </motion.p>

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
              style={{ willChange: "transform, opacity" }}>
              <div className="text-[10px] sm:text-[11px] leading-5 tracking-[0.2em] text-neutral-700">
                <div>Studio:</div>
                <div className="tracking-normal">asinta architects</div>
              </div>

              <div
                className="sm:text-right text-sm font-semibold text-neutral-800 tracking-[0.35em] sm:tracking-[0.5em]"
                style={{ perspective: 900 }}>
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
                      }}>
                      {digit}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cover image */}
          <div className="relative flex-1 min-h-0 pb-6 sm:pb-8 flex items-center justify-center">
            <motion.div
              className="relative w-full max-w-245 h-[clamp(260px,52svh,640px)] sm:h-[clamp(340px,56svh,720px)]"
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
                ...imageWrapperInitialInline,
                willChange: imageWillChange,
                contain: "paint",
                backfaceVisibility: "hidden",
              }}>
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
                  finePointerHover && !reduceMotion
                    ? { scale: 1.01 }
                    : undefined
                }
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}>
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

      {/* EXTERIOR */}
      <SectionWall
        title="Exterior"
        subtitle="Facades, massing studies, site integration, and envelope expression."
        projects={exteriorProjects}
        accent="#0ea5e9"
        onOpen={openProject}
        reduceMotion={reduceMotion}
        finePointerHover={finePointerHover}
      />

      {/* INTERIOR */}
      <SectionWall
        title="Interior"
        subtitle="Spatial sequences, material palettes, lighting, and human-scale detail."
        projects={interiorProjects}
        accent="#a78bfa"
        onOpen={openProject}
        reduceMotion={reduceMotion}
        finePointerHover={finePointerHover}
      />

      {/* LIGHTBOX (smaller A4 preview + fixed controls + next/back) */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {/* overlay */}
            <motion.button
              type="button"
              aria-label="Close preview"
              className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProject}
            />

            {/* fixed controls (never covered) */}
            <button
              type="button"
              onClick={closeProject}
              aria-label="Close"
              className="fixed right-4 top-4 z-[60] grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white shadow-lg ring-1 ring-white/15 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
              <span className="text-2xl leading-none">×</span>
            </button>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="fixed left-3 sm:left-5 top-1/2 z-[60] -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white shadow-lg ring-1 ring-white/10 hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
              <span className="text-xl leading-none">‹</span>
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="fixed right-3 sm:right-5 top-1/2 z-[60] -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white shadow-lg ring-1 ring-white/10 hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
              <span className="text-xl leading-none">›</span>
            </button>

            {/* A4 image box constrained by height */}
            <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
              <motion.div
                className="relative h-[80svh] max-h-[640px] max-w-[92vw] aspect-[210/297] overflow-hidden rounded-xl bg-white shadow-2xl"
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { y: 10, scale: 0.985, opacity: 0 }
                }
                animate={
                  reduceMotion ? { opacity: 1 } : { y: 0, scale: 1, opacity: 1 }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { y: 8, scale: 0.99, opacity: 0 }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                }
                onClick={(e) => e.stopPropagation()}>
                <Image
                  src={activeProject.src}
                  alt={`${activeProject.title} preview`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 88vw, 520px"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
