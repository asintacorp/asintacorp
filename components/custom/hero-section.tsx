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

const fadeUp = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

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
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.5ch]"
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
        initial={{ opacity: 0, y: -24, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* IMPORTANT: make the immediate parent of Image relative */}
        <div
          className="relative w-full h-full"
          style={{ transform: toTransform(left) }}
        >
          <Image
            src={leftSrc}
            alt=""
            fill
            className="object-contain"
            priority
            sizes={`${width}px`}
          />
        </div>
      </motion.div>

      {/* Right piece (from bottom) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 24, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div
          className="relative w-full h-full"
          style={{ transform: toTransform(right) }}
        >
          <Image
            src={rightSrc}
            alt=""
            fill
            className="object-contain"
            priority
            sizes={`${width}px`}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen grid place-items-center"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col items-center text-center">
        <LogoMark
          width={92}
          height={120}
          left={{ x: -18, y: -6.5, rotate: 0, scale: 1 }}
          right={{ x: 12, y: 6.5, rotate: 0, scale: 1 }}
        />

        <h1
          id="hero-heading"
          style={{ fontFamily: "Gothic" }}
          className="mt-5 flex items-baseline gap-1.5"
        >
          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            asinta
          </motion.span>
          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl tracking-tight"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            architects
          </motion.span>
        </h1>

        <AnimatedPhrase
          text="architecture curated to your style."
          delay={0.7}
        />
      </div>
    </section>
  );
}
