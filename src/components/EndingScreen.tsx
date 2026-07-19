"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface EndingScreenProps {
  onTransform: () => void;
  isTransformed: boolean;
}

export default function EndingScreen({ onTransform, isTransformed }: EndingScreenProps) {
  const [clicked, setClicked] = useState(false);

  const triggerEnding = () => {
    if (clicked) return;
    setClicked(true);
    onTransform();

    // Trigger colorful heart confetti
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#FADBD8", "#FDEDEC", "#EC7063", "#FCF3CF"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#FADBD8", "#FDEDEC", "#EC7063", "#FCF3CF"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="w-full relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isTransformed ? (
          <motion.div
            key="button-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center z-10"
          >
            <p className="text-zinc-500 text-sm mb-6 font-rounded select-none">
              Before you go, there is just...
            </p>
            <motion.button
              onClick={triggerEnding}
              whileHover={{ scale: 1.06, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-[#FDEDEC] border-2 border-[#EC7063] rounded-full text-2xl font-handwritten font-bold text-[#78281F] shadow-lg cursor-pointer transition-all hover:shadow-xl"
              style={{ filter: "url(#crayon-wobble)" }}
            >
              One Last Thing ❤️
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="transformed-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center text-center z-10 max-w-lg relative w-full"
          >
            {/* SVG Sun Rising */}
            <motion.div
              initial={{ scale: 0, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.5, type: "spring", stiffness: 50 }}
              className="absolute -top-32 w-48 h-48 pointer-events-none opacity-40"
            >
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#F39C12] stroke-1.5" style={{ filter: "url(#crayon-wobble)" }}>
                <circle cx="50" cy="50" r="22" fill="#FCF3CF" />
                {/* Sun rays */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * Math.PI) / 6;
                  const x1 = 50 + Math.cos(angle) * 26;
                  const y1 = 50 + Math.sin(angle) * 26;
                  const x2 = 50 + Math.cos(angle) * 36;
                  const y2 = 50 + Math.sin(angle) * 36;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2.5" strokeLinecap="round" />;
                })}
              </svg>
            </motion.div>

            {/* Flying Butterflies (animated paths) */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {/* Butterfly 1 */}
              <motion.div
                initial={{ x: -100, y: 50, opacity: 0 }}
                animate={{
                  x: [0, 150, 300],
                  y: [50, -50, -150],
                  opacity: [0, 1, 0],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 absolute left-0"
              >
                <svg viewBox="0 0 40 40" fill="#F4ECF7" stroke="#8E44AD" strokeWidth="1.5">
                  <path d="M 20,20 Q 10,5 5,10 Q 5,20 20,20" />
                  <path d="M 20,20 Q 30,5 35,10 Q 35,20 20,20" />
                  <path d="M 20,20 Q 12,35 15,35 Q 18,30 20,20" />
                  <path d="M 20,20 Q 28,35 25,35 Q 22,30 20,20" />
                </svg>
              </motion.div>

              {/* Butterfly 2 */}
              <motion.div
                initial={{ x: 350, y: 150, opacity: 0 }}
                animate={{
                  x: [350, 100, -100],
                  y: [150, 0, -80],
                  opacity: [0, 1, 0],
                  rotate: [0, -20, 20, 0],
                }}
                transition={{ duration: 7, delay: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 absolute"
              >
                <svg viewBox="0 0 40 40" fill="#EBF5FB" stroke="#2980B9" strokeWidth="1.5">
                  <path d="M 20,20 Q 10,5 5,10 Q 5,20 20,20" />
                  <path d="M 20,20 Q 30,5 35,10 Q 35,20 20,20" />
                  <path d="M 20,20 Q 12,35 15,35 Q 18,30 20,20" />
                  <path d="M 20,20 Q 28,35 25,35 Q 22,30 20,20" />
                </svg>
              </motion.div>
            </div>

            {/* Glowing Message Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", damping: 15 }}
              className="bg-[#FFFFFF] p-8 border-2 border-[#FCF3CF] rounded-3xl shadow-xl w-full rotate-[-1deg] relative z-10"
              style={{ filter: "url(#crayon-wobble)" }}
            >
              {/* Taped details */}
              <div className="absolute -top-3 left-1/4 w-16 h-6 bg-[#FCF3CF]/80 rotate-6 border border-zinc-200/10"></div>
              <div className="absolute -top-3 right-1/4 w-16 h-6 bg-[#E8F8F5]/80 -rotate-3 border border-zinc-200/10"></div>

              {/* Sparkle symbols */}
              <div className="absolute top-4 left-4 text-[#F1C40F] animate-pulse">✦</div>
              <div className="absolute bottom-4 right-4 text-[#F1C40F] animate-pulse">✦</div>

              <h4 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#E74C3C] leading-snug mb-4">
                To New Beginnings
              </h4>
              <p className="font-handwritten text-3xl font-semibold text-[#78281F] leading-relaxed">
                "I'll keep choosing you, and I'll keep choosing to be better, every single day."
              </p>
            </motion.div>

            {/* Hand-drawn flower bed blooming at bottom */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.9 }}
              transition={{ delay: 1.2, duration: 1.0 }}
              className="w-full flex justify-center gap-6 mt-16"
            >
              <div className="text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>🌻</div>
              <div className="text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>🌷</div>
              <div className="text-3xl animate-bounce" style={{ animationDelay: "0.1s" }}>🌹</div>
              <div className="text-3xl animate-bounce" style={{ animationDelay: "0.6s" }}>🌼</div>
              <div className="text-3xl animate-bounce" style={{ animationDelay: "0.3s" }}>🌸</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
