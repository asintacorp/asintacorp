"use client";

import Image from "next/image";
import { motion } from "motion/react";
import React from "react";

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
    hidden: { opacity: 0, y: 8, "--blur": "2px" },
    show: { opacity: 1, y: 0, "--blur": "0px" },
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
          style={{
            filter: "blur(var(--blur))",
            WebkitFilter: "blur(var(--blur))",
            willChange: "filter, transform, opacity",
          }}
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
            filter: "blur(var(--blur))",
            WebkitFilter: "blur(var(--blur))",
            willChange: "filter, transform",
          }}
          initial={{ "--blur": "6px" }}
          animate={{ "--blur": "0px" }}
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
            filter: "blur(var(--blur))",
            WebkitFilter: "blur(var(--blur))",
            willChange: "filter, transform",
          }}
          initial={{ "--blur": "6px" }}
          animate={{ "--blur": "0px" }}
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
  // How far the logo should shift up after initial entry (in px)
  const logoShiftY = 10;

  return (
    <section
      className="relative w-full min-h-screen grid place-items-start pt-[290px] md:pt-[260px] lg:pt-[200px]"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col items-center text-center w-full">
        {/* Logo: enter centered, then shift up to make space */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [90, 90, logoShiftY] }}
          transition={{
            duration: 2.15,
            times: [0, 0.55, 1],
            ease: EASE,
          }}
          className="will-change-transform"
        >
          <LogoMark
            width={92}
            height={120}
            left={{ x: -18, y: -6.5, rotate: 0, scale: 1 }}
            right={{ x: 12, y: 6.5, rotate: 0, scale: 1 }}
          />
        </motion.div>

        {/* Heading appears after logo settles */}
        <motion.h1
          id="hero-heading"
          style={{ fontFamily: "Gothic" }}
          className="mt-5 flex items-baseline gap-1.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
        >
          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl tracking-tight"
            style={{ fontWeight: 950 }}
            initial={{ opacity: 0, y: 12, "--blur": "2px" }}
            animate={{ opacity: 1, y: 0, "--blur": "0px" }}
            transition={{ duration: 0.5, delay: 1.25, ease: EASE }}
            aria-label="asinta"
          >
            <span
              style={{
                filter: "blur(var(--blur))",
                WebkitFilter: "blur(var(--blur))",
                willChange: "filter, transform, opacity",
              }}
            >
              asinta
            </span>
          </motion.span>

          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl tracking-tight"
            initial={{ opacity: 0, y: 12, "--blur": "2px" }}
            animate={{ opacity: 1, y: 0, "--blur": "0px" }}
            transition={{ duration: 0.5, delay: 1.33, ease: EASE }}
          >
            <span
              style={{
                filter: "blur(var(--blur))",
                WebkitFilter: "blur(var(--blur))",
                willChange: "filter, transform, opacity",
              }}
            >
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

      {/* Smooth scroll-hint (outside content stack, pinned to section bottom) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground text-xs sm:text-sm select-none"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
      >
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
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
            className="opacity-70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
