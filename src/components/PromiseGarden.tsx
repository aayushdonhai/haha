"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PromiseFlower {
  id: number;
  name: string;
  promise: string;
  colorPetal: string;
  colorCenter: string;
  svgType: "tulip" | "sunflower" | "daisy" | "rose" | "lily" | "bluebell";
}

const PROMISES: PromiseFlower[] = [
  {
    id: 1,
    name: "Rose of Patience",
    promise: "I promise to listen to you, always, with my whole heart and endless patience.",
    colorPetal: "#FDEDEC",
    colorCenter: "#E74C3C",
    svgType: "rose",
  },
  {
    id: 2,
    name: "Sun of Action",
    promise: "I promise to match my words with consistent, daily, loving actions.",
    colorPetal: "#FCF3CF",
    colorCenter: "#F39C12",
    svgType: "sunflower",
  },
  {
    id: 3,
    name: "Lily of Safety",
    promise: "I promise to always make you feel secure, valued, and safe in my arms.",
    colorPetal: "#EBF5FB",
    colorCenter: "#3498DB",
    svgType: "lily",
  },
  {
    id: 4,
    name: "Tulip of Honesty",
    promise: "I promise to communicate with transparency and share my vulnerabilities.",
    colorPetal: "#F4ECF7",
    colorCenter: "#8E44AD",
    svgType: "tulip",
  },
  {
    id: 5,
    name: "Daisy of Joy",
    promise: "I promise to protect your smile and bring lighthearted joy into your days.",
    colorPetal: "#E8F8F5",
    colorCenter: "#16A085",
    svgType: "daisy",
  },
  {
    id: 6,
    name: "Bell of Forever",
    promise: "I promise to choose you, every single day, through every season of life.",
    colorPetal: "#EAECEE",
    colorCenter: "#2C3E50",
    svgType: "bluebell",
  },
];

export default function PromiseGarden() {
  const [bloomedFlower, setBloomedFlower] = useState<number | null>(null);

  const handleFlowerClick = (id: number) => {
    if (bloomedFlower === id) {
      setBloomedFlower(null);
    } else {
      setBloomedFlower(id);
    }
  };

  return (
    <div className="w-full relative px-4 bg-[#FDFBF7] py-16 border-t border-dashed border-zinc-200">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-2">
          The Promise Garden
        </h2>
        <p className="text-sm text-zinc-500 font-rounded select-none">
          Tap a bud to watch it bloom and reveal a promise...
        </p>
      </div>

      {/* Flower Bed Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 max-w-3xl mx-auto items-end justify-items-center">
        {PROMISES.map((flower) => {
          const isOpen = bloomedFlower === flower.id;

          return (
            <div
              key={flower.id}
              onClick={() => handleFlowerClick(flower.id)}
              className="flex flex-col items-center cursor-pointer select-none group w-32"
            >
              {/* Dynamic SVG Flower */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full stroke-[#4D5656] stroke-2 fill-none"
                  style={{ filter: "url(#crayon-wobble)" }}
                  animate={{
                    rotate: isOpen ? [0, 5, -5, 0] : [0, 1, -1, 0],
                    scale: isOpen ? 1.15 : 1,
                  }}
                  transition={{
                    rotate: {
                      duration: isOpen ? 0.5 : 4,
                      repeat: isOpen ? 0 : Infinity,
                      ease: "easeInOut",
                    },
                    scale: { type: "spring", stiffness: 150, damping: 12 },
                  }}
                >
                  {/* Stem and soil base */}
                  <path d="M 50,70 L 50,100" stroke="#27AE60" strokeWidth="3" />
                  <path d="M 50,85 Q 38,78 45,72" stroke="#27AE60" fill="#2ECC71" />
                  <path d="M 50,90 Q 62,83 55,77" stroke="#27AE60" fill="#2ECC71" />

                  {/* Dynamic Bloom Shapes */}
                  {flower.svgType === "rose" && (
                    <g>
                      <motion.circle
                        cx="50"
                        cy="50"
                        r={isOpen ? 22 : 12}
                        fill={flower.colorPetal}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.path
                        d="M 50,50 Q 38,40 50,30 Q 62,40 50,50 Z"
                        fill={flower.colorCenter}
                        animate={{ scale: isOpen ? 1 : 0.4 }}
                      />
                      <motion.path
                        d="M 50,50 Q 38,60 50,70 Q 62,60 50,50 Z"
                        fill={flower.colorCenter}
                        animate={{ scale: isOpen ? 0.9 : 0.3 }}
                      />
                    </g>
                  )}

                  {flower.svgType === "sunflower" && (
                    <g>
                      <motion.circle
                        cx="50"
                        cy="50"
                        r={isOpen ? 12 : 6}
                        fill={flower.colorCenter}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Petals rings */}
                      {Array.from({ length: 8 }).map((_, idx) => {
                        const angle = (idx * Math.PI) / 4;
                        const px = 50 + Math.cos(angle) * (isOpen ? 18 : 8);
                        const py = 50 + Math.sin(angle) * (isOpen ? 18 : 8);
                        return (
                          <motion.circle
                            key={idx}
                            cx={px}
                            cy={py}
                            r={isOpen ? 8 : 4}
                            fill={flower.colorPetal}
                            transition={{ duration: 0.5 }}
                          />
                        );
                      })}
                    </g>
                  )}

                  {flower.svgType === "lily" && (
                    <g>
                      {/* Star-like sharp petals blooming */}
                      <motion.path
                        d="M 50,50 L 50,25 L 35,38 L 50,50 Z"
                        fill={flower.colorPetal}
                        animate={{ scale: isOpen ? 1 : 0.5 }}
                      />
                      <motion.path
                        d="M 50,50 L 50,75 L 65,62 L 50,50 Z"
                        fill={flower.colorPetal}
                        animate={{ scale: isOpen ? 1 : 0.5 }}
                      />
                      <motion.path
                        d="M 50,50 L 75,50 L 62,35 L 50,50 Z"
                        fill={flower.colorPetal}
                        animate={{ scale: isOpen ? 1 : 0.5 }}
                      />
                      <motion.path
                        d="M 50,50 L 25,50 L 38,65 L 50,50 Z"
                        fill={flower.colorPetal}
                        animate={{ scale: isOpen ? 1 : 0.5 }}
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r={isOpen ? 8 : 4}
                        fill={flower.colorCenter}
                        transition={{ duration: 0.5 }}
                      />
                    </g>
                  )}

                  {flower.svgType === "tulip" && (
                    <g>
                      <motion.path
                        d="M 30,55 C 30,35 40,25 50,45 C 60,25 70,35 70,55 C 70,70 30,70 30,55 Z"
                        fill={flower.colorPetal}
                        animate={{ scale: isOpen ? 1 : 0.6 }}
                      />
                      <motion.path
                        d="M 45,55 C 45,45 50,40 50,45 C 50,40 55,45 55,55 Z"
                        fill={flower.colorCenter}
                        animate={{ scale: isOpen ? 0.9 : 0.2 }}
                      />
                    </g>
                  )}

                  {flower.svgType === "daisy" && (
                    <g>
                      <motion.circle
                        cx="50"
                        cy="50"
                        r={isOpen ? 10 : 5}
                        fill={flower.colorCenter}
                      />
                      {/* Simple round petals */}
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const angle = (idx * 2 * Math.PI) / 5;
                        const px = 50 + Math.cos(angle) * (isOpen ? 16 : 7);
                        const py = 50 + Math.sin(angle) * (isOpen ? 16 : 7);
                        return (
                          <motion.circle
                            key={idx}
                            cx={px}
                            cy={py}
                            r={isOpen ? 10 : 4}
                            fill={flower.colorPetal}
                            transition={{ duration: 0.5 }}
                          />
                        );
                      })}
                    </g>
                  )}

                  {flower.svgType === "bluebell" && (
                    <g>
                      {/* Hanging downward cup flower */}
                      <motion.path
                        d="M 35,40 C 35,60 45,70 50,60 C 55,70 65,60 65,40 C 65,30 35,30 35,40 Z"
                        fill={flower.colorPetal}
                        animate={{ scale: isOpen ? 1.1 : 0.6 }}
                      />
                      <motion.circle
                        cx="50"
                        cy="55"
                        r={isOpen ? 6 : 2}
                        fill={flower.colorCenter}
                      />
                    </g>
                  )}
                </motion.svg>
              </div>

              {/* Title of flower */}
              <span className="font-handwritten text-lg font-bold text-zinc-500 mt-2 group-hover:text-zinc-700 transition-colors">
                {flower.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Promise Description Box */}
      <div className="h-28 max-w-md mx-auto mt-10 flex flex-col justify-center px-4 relative">
        <AnimatePresence mode="wait">
          {bloomedFlower && (
            <motion.div
              key={bloomedFlower}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFFFF]/90 p-4 border border-[#F9E79F] rounded-2xl shadow-sm text-center font-handwritten text-2xl text-[#78281F] rotate-1 relative"
              style={{ filter: "url(#crayon-wobble)" }}
            >
              {/* Little tape visual */}
              <div className="absolute -top-2 left-1/4 w-12 h-4 bg-[#FCF3CF]/60 border border-zinc-200/10"></div>
              {PROMISES.find((f) => f.id === bloomedFlower)?.promise}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
