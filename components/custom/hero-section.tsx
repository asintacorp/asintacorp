"use client";

import Image from "next/image";
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Layer = {
  x?: number; // translateX in %
  y?: number; // translateY in %
  rotate?: number; // deg
  scale?: number; // 1 = 100%
};

type LogoMarkProps = {
  width?: number; // px
  height?: number; // px
  left?: Layer;
  right?: Layer;
  leftSrc?: string;
  rightSrc?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const toTransform = ({ x = 0, y = 0, rotate = 0, scale = 1 }: Layer = {}) =>
  `translate(${x}%, ${y}%) rotate(${rotate}deg) scale(${scale})`;

function AnimatedPhrase({
  text,
  delay = 0.7,
}: {
  text: string;
  delay?: number;
}) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.08,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 8, filter: "blur(2px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.p
      className="font-serif italic mt-3 text-xs sm:text-sm text-muted-foreground tracking-[0.2em]"
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={child}
          transition={{ duration: 0.4, ease: EASE }}
          className="inline-block mr-[0.5ch]"
          style={{ willChange: "filter, transform, opacity" }}
        >
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
}

function LogoMark({
  width = 88,
  height = 112,
  left = { x: -10, y: 0, rotate: 0, scale: 1 },
  right = { x: 10, y: 0, rotate: 0, scale: 1 },
  leftSrc = "/left.png",
  rightSrc = "/right.png",
}: LogoMarkProps) {
  const wrapStyle: React.CSSProperties = { width, height };

  return (
    <div className="relative" style={wrapStyle} aria-hidden="true">
      {/* Left piece (from top) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ willChange: "opacity, transform" }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transform: toTransform(left),
            willChange: "filter, transform",
          }}
          initial={{ filter: "blur(6px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Image
            src={leftSrc}
            alt=""
            fill
            className="object-contain"
            priority
            sizes={`${width}px`}
          />
        </motion.div>
      </motion.div>

      {/* Right piece (from bottom) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        style={{ willChange: "opacity, transform" }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transform: toTransform(right),
            willChange: "filter, transform",
          }}
          initial={{ filter: "blur(6px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <Image
            src={rightSrc}
            alt=""
            fill
            className="object-contain"
            priority
            sizes={`${width}px`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const logoShiftY = 10;

  // Frame config for centering while allowing right-side bleed
  const logoW = 92;
  const logoH = 120;
  const bleedX = 24; // adjust this to fine-tune the visual center

  // Fade the "Scroll Down" hint after ~20px of scroll
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 20], [1, 0]);
  const hintY = useTransform(scrollY, [0, 20], [0, 6]);

  return (
    <section
      // Stable viewport on mobile (no jump when browser UI hides)
      className="relative w-full pb-20 h-svh md:h-dvh grid place-items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col items-center text-center w-full">
        {/* Logo: enter centered, then shift up to make space */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [90, 90, logoShiftY] }}
          transition={{
            duration: 1.55,
            times: [0, 0.55, 1],
            ease: EASE,
          }}
          className="will-change-transform"
        >
          {/* Centered frame to compensate for right-side bleed */}
          <div
            className="relative mx-auto"
            style={{ width: logoW + bleedX * 2, height: logoH }}
          >
            <div className="absolute inset-0 grid place-items-center">
              <LogoMark
                width={logoW}
                height={logoH}
                left={{ x: -18, y: -6.5, rotate: 0, scale: 1 }}
                right={{ x: 12, y: 6.5, rotate: 0, scale: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Heading appears after logo settles */}
        <motion.h1
          id="hero-heading"
          style={{ fontFamily: "Gothic" }}
          className="mt-5 flex items-baseline gap-0.2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
        >
          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl tracking-tight"
            style={{ fontWeight: 950 }}
            initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 1.25, ease: EASE }}
            aria-label="asinta"
          >
            <span style={{ willChange: "filter, transform, opacity" }}>
              asinta
            </span>
          </motion.span>

          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl tracking-tight"
            initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 1.33, ease: EASE }}
          >
            <span style={{ willChange: "filter, transform, opacity" }}>
              architects
            </span>
          </motion.span>
        </motion.h1>

        {/* Phrase appears after the heading */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.45, ease: EASE }}
        >
          <AnimatedPhrase
            text="architecture curated to your style."
            delay={0.15}
          />
        </motion.div>
      </div>

      {/* Fixed scroll-hint at viewport bottom; perfectly centered; fades out after ~20px */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center text-center text-muted-foreground text-xs sm:text-sm select-none"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 5.5rem)",
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
      >
        <motion.div style={{ opacity: hintOpacity, y: hintY }}>
          <motion.span
            className="mb-2 tracking-widest uppercase"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Scroll Down
          </motion.span>

          {/* Smooth mirrored bounce */}
          <motion.div
            animate={{ y: 8 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              className="opacity-70 block mx-auto"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
