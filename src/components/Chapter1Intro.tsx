"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Chapter1Intro() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.35, once: true });

  const greeting = "Hi Love...";
  const bodyText =
    "Welcome to this little digital scrapbook. I wanted to make something special just for you, to tell a story and share what is inside my heart. Please scroll down, open the memories, and read the promises I hold for us.";

  // Splits string into characters for typewriter effect
  const characters = Array.from(greeting);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      ref={ref}
      className="w-full max-w-lg mx-auto text-center px-6 py-20 flex flex-col items-center justify-center relative min-h-[60vh]"
    >
      {/* Decorative tiny flower doodle at the top */}
      <div className="absolute top-4 opacity-35 text-xl select-none animate-wiggle-doodle">
        🌸
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex justify-center mb-6"
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            className="font-handwritten text-6xl sm:text-7xl font-bold text-[#E74C3C]"
            style={{ display: char === " " ? "inline-block" : "inline-block", width: char === " " ? "1rem" : "auto" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        className="font-handwritten text-3xl text-zinc-600 leading-relaxed font-semibold mt-4"
      >
        {bodyText}
      </motion.p>

      {/* Decorative arrow pointing down */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 0.4, y: [0, 10, 0] } : { opacity: 0 }}
        transition={{
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          opacity: { delay: 2.2, duration: 0.8 },
        }}
        className="mt-12 text-[#2C3E50]"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2" style={{ filter: "url(#crayon-wobble)" }}>
          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
}
