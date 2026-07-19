"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GrowthPlant() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to SVG path length & element scales
  const stemLength = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const leaf1Scale = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const leaf2Scale = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const flowerScale = useTransform(scrollYProgress, [0.55, 0.75], [0, 1.2]);

  // Map progress to text bubble opacities
  const opacityText1 = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);
  const opacityText2 = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const opacityText3 = useTransform(scrollYProgress, [0.62, 0.72], [0, 1]);
  const opacityText4 = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[140vh] flex flex-col items-center py-20 bg-[#FDFBF7]"
    >
      {/* Chapter Title */}
      <div className="text-center mb-16 px-4">
        <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-2">
          Growing Together
        </h2>
        <p className="text-sm text-zinc-500 font-rounded select-none">
          Scroll down to watch our garden grow...
        </p>
      </div>

      <div className="flex w-full max-w-lg mx-auto px-6 relative h-[90vh]">
        {/* SVG Plant Graphic (Left Column) */}
        <div className="w-1/3 flex justify-center h-full relative">
          <svg
            viewBox="0 0 100 400"
            className="w-full h-full stroke-linecap-round fill-none"
            style={{ filter: "url(#crayon-wobble)" }}
          >
            {/* Main Stem */}
            <motion.path
              d="M 50,380 C 40,320 60,240 50,180 C 40,130 55,90 50,60"
              stroke="#2ECC71"
              strokeWidth="4"
              style={{ pathLength: stemLength }}
            />

            {/* Left Leaf (Lower) */}
            <motion.g
              style={{ scale: leaf1Scale, originX: "48px", originY: "280px" }}
              className="origin-bottom-right"
            >
              <path
                d="M 48,280 C 20,270 20,240 48,255"
                fill="#A2D9CE"
                stroke="#2ECC71"
                strokeWidth="2"
              />
              <path d="M 48,280 C 35,270 30,260 45,257" stroke="#16A085" strokeWidth="1" />
            </motion.g>

            {/* Right Leaf (Middle) */}
            <motion.g
              style={{ scale: leaf2Scale, originX: "52px", originY: "190px" }}
              className="origin-bottom-left"
            >
              <path
                d="M 52,190 C 80,180 80,150 52,165"
                fill="#A2D9CE"
                stroke="#2ECC71"
                strokeWidth="2"
              />
              <path d="M 52,190 C 65,180 70,170 55,167" stroke="#16A085" strokeWidth="1" />
            </motion.g>

            {/* Blooming Flower (Top) */}
            <motion.g
              style={{ scale: flowerScale, originX: "50px", originY: "60px" }}
              className="origin-center"
            >
              {/* Petals */}
              <circle cx="50" cy="46" r="10" fill="#FDEDEC" stroke="#EC7063" strokeWidth="2" />
              <circle cx="50" cy="74" r="10" fill="#FDEDEC" stroke="#EC7063" strokeWidth="2" />
              <circle cx="36" cy="60" r="10" fill="#FDEDEC" stroke="#EC7063" strokeWidth="2" />
              <circle cx="64" cy="60" r="10" fill="#FDEDEC" stroke="#EC7063" strokeWidth="2" />
              {/* Center */}
              <circle cx="50" cy="60" r="8" fill="#FCF3CF" stroke="#F1C40F" strokeWidth="2" />
            </motion.g>
          </svg>
        </div>

        {/* Growth Statements (Right Column) */}
        <div className="w-2/3 flex flex-col justify-between py-12 relative">
          {/* Statement 1 */}
          <motion.div
            style={{ opacity: opacityText1 }}
            className="bg-[#FFFFFF]/90 p-4 border border-[#E8F8F5] rounded-2xl shadow-sm relative left-2"
          >
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFFFFF] border-l border-b border-[#E8F8F5] rotate-45"></div>
            <h4 className="font-handwritten text-2xl font-bold text-[#16A085] mb-1">I'm learning.</h4>
            <p className="text-xs text-zinc-600 leading-relaxed font-rounded">
              I am taking standard time to reflect on where I went wrong and how I can be more mindful.
            </p>
          </motion.div>

          {/* Statement 2 */}
          <motion.div
            style={{ opacity: opacityText2 }}
            className="bg-[#FFFFFF]/90 p-4 border border-[#FDEDEC] rounded-2xl shadow-sm relative left-2"
          >
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFFFFF] border-l border-b border-[#FDEDEC] rotate-45"></div>
            <h4 className="font-handwritten text-2xl font-bold text-[#E74C3C] mb-1">I'm improving.</h4>
            <p className="text-xs text-zinc-600 leading-relaxed font-rounded">
              Every day is an opportunity to fix my habits and show you the care you deserve.
            </p>
          </motion.div>

          {/* Statement 3 */}
          <motion.div
            style={{ opacity: opacityText3 }}
            className="bg-[#FFFFFF]/90 p-4 border border-[#EBF5FB] rounded-2xl shadow-sm relative left-2"
          >
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFFFFF] border-l border-b border-[#EBF5FB] rotate-45"></div>
            <h4 className="font-handwritten text-2xl font-bold text-[#3498DB] mb-1">
              I'm communicating better.
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed font-rounded">
              Expressing feelings clearly, listening with focus, and keeping no doubts between us.
            </p>
          </motion.div>

          {/* Statement 4 */}
          <motion.div
            style={{ opacity: opacityText4 }}
            className="bg-[#FFFFFF]/90 p-4 border border-[#FCF3CF] rounded-2xl shadow-sm relative left-2"
          >
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFFFFF] border-l border-b border-[#FCF3CF] rotate-45"></div>
            <h4 className="font-handwritten text-2xl font-bold text-[#F39C12] mb-1">
              Actions over words.
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed font-rounded">
              I want my day-to-day actions to prove my love, consistency, and dedication to you.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
