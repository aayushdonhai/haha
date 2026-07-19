"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function NotebookLetter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.15, once: true });

  const paragraphs = [
    "My Dearest,",
    "I am writing this because words sometimes fail me in the moment, but my heart is absolutely clear. I know I have failed you, and I know I have hurt you. When I look back at my actions, I truly understand why you feel this way, and how much my mistakes have weighed on you.",
    "I am sorry. I am so deeply and truly sorry for the pain I caused.",
    "I never want to repeat these mistakes. I want to build a safe, solid foundation between us. I am already taking steps to improve, and I will continue working on becoming a better partner every single day.",
    "I am not doing this because I feel forced to, or because I have to. I am doing this because you deserve someone who makes you feel completely safe, loved, and important in every single moment. You deserve a love that is active, reassuring, and absolute.",
    "I know words are easy to say, so I won't just ask you to believe them. I will prove my commitment to you through my actions, day by day, step by step.",
    "Thank you for loving me, even in my imperfect states. Your love is the most precious thing in my life.",
    "I love you endlessly,\nAlways."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5, // 1.5 seconds delay between each paragraph to feel like writing
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 0.95,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" as const },
    },
  };

  return (
    <div ref={ref} className="w-full relative px-6 py-16 bg-[#FDFBF7]">
      {/* Notebook container */}
      <div className="max-w-xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="notebook-sheet p-8 pt-12 pb-16 font-handwritten text-2xl text-[#2C3E50] leading-[2.2rem] min-h-[500px]"
        >
          {/* Paragraphs loop */}
          {paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              variants={paragraphVariants}
              className={`whitespace-pre-line mb-8 indent-8 first:indent-0 ${
                idx === 0 ? "font-bold text-3xl mb-4 text-[#1B365D]" : ""
              } ${idx === paragraphs.length - 1 ? "text-right font-bold mt-12 pr-6" : ""}`}
            >
              {para}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
