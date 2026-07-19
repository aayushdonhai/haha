"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RainyApologyProps {
  onRainActive: (active: boolean) => void;
}

export default function RainyApology({ onRainActive }: RainyApologyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.35 });

  // Propagate rain state to dim/restore music volume
  useEffect(() => {
    onRainActive(isInView);
  }, [isInView, onRainActive]);

  // Rain canvas animation
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const rainCount = 45;
    const drops: Array<{ x: number; y: number; length: number; speed: number; opacity: number }> = [];

    for (let i = 0; i < rainCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        length: 10 + Math.random() * 15,
        speed: 4 + Math.random() * 4,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw cloudy gradient background overlay
      if (isInView) {
        ctx.fillStyle = "rgba(224, 231, 238, 0.2)"; // Soft bluish grey cloud tint
        ctx.fillRect(0, 0, width, height);
      }

      ctx.strokeStyle = "rgba(174, 214, 241, 0.4)"; // Pastel blue droplets
      ctx.lineWidth = 1.5;

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 1, drop.y + drop.length);
        ctx.stroke();

        // Update drop positions
        drop.y += drop.speed;
        drop.x += 0.2; // slight diagonal drift

        // Reset drop to top if it goes off bottom
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  const sentences = [
    "I know I hurt you.",
    "I know the distance makes everything feel harder, and I made you feel unimportant.",
    "I know my actions didn't match how much I love you, even through a screen.",
    "I'm sorry.",
    "I'm truly sorry.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.2, // reveal each line after 1.2s
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[70vh] flex flex-col items-center justify-center py-16 transition-colors duration-1000 ${
        isInView ? "bg-[#ECEFF1]/50 border-y border-zinc-200" : "bg-[#FDFBF7]"
      }`}
    >
      {/* Canvas Rain Element */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Cloudy Sky doodle */}
      <div className="absolute top-8 opacity-25 w-28 h-12 text-[#90A4AE] animate-wiggle-doodle">
        <svg viewBox="0 0 100 40" fill="currentColor">
          <path d="M10 30c-3 0-6-3-6-6 0-3 3-5 5-6 1-4 4-7 8-7 3 0 6 1 8 3 2-2 5-3 8-3 5 0 9 4 9 9 2 0 4 2 4 4 0 3-3 5-6 5l-27 1z" />
        </svg>
      </div>

      {/* Apology Text Lines */}
      <div className="relative z-10 max-w-lg px-6 text-center select-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6"
        >
          {sentences.map((sentence, idx) => (
            <motion.p
              key={idx}
              variants={lineVariants}
              className={`font-handwritten text-3xl font-semibold leading-relaxed ${
                idx >= 3 ? "text-[#E74C3C] text-4xl" : "text-[#546E7A]"
              }`}
            >
              {sentence}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
