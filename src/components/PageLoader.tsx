"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [stage, setStage] = useState(0); // 0: Heart beat, 1: Flower grow, 2: Sketching borders, 3: Completed

  useEffect(() => {
    // Stage triggers
    const t1 = setTimeout(() => setStage(1), 1800); // 1.8s heart beat, then flower grow
    const t2 = setTimeout(() => setStage(2), 3500); // 3.5s grow flower, then sketch borders
    const t3 = setTimeout(() => {
      setStage(3);
      setTimeout(onComplete, 800); // Fade out loader and trigger completion
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Sketching Canvas Effect - Border lines drawing themselves around the screen */}
      {stage >= 2 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M 2,2 L 98,2 L 98,98 L 2,98 Z"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="0.4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{ filter: "url(#crayon-wobble)" }}
          />
          <motion.path
            d="M 4,4 L 96,4 L 96,96 L 4,96 Z"
            fill="none"
            stroke="#F2D7D5"
            strokeWidth="0.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.0, ease: "easeInOut", delay: 0.2 }}
            style={{ filter: "url(#crayon-wobble)" }}
          />
        </svg>
      )}

      {/* Growing Flower & Beating Heart Centerpiece */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full fill-none stroke-[#4A4A4A] stroke-linecap-round"
          style={{ filter: "url(#crayon-wobble)" }}
        >
          {/* Flower Stem (Chapter 4 style) */}
          {stage >= 1 && (
            <motion.path
              d="M 50,110 C 45,90 55,70 50,55"
              stroke="#2ECC71"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}

          {/* Leaves growing on sides */}
          {stage >= 1 && (
            <>
              <motion.path
                d="M 49,85 C 35,80 38,70 49,75"
                fill="#D5F5E3"
                stroke="#2ECC71"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              />
              <motion.path
                d="M 51,75 C 65,70 62,60 51,65"
                fill="#D5F5E3"
                stroke="#2ECC71"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              />
            </>
          )}

          {/* Flower Petals Outlines */}
          {stage >= 1 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "backOut" }}
            >
              <circle cx="50" cy="50" r="14" fill="#FEF9E7" stroke="#F1C40F" strokeWidth="2" />
              {/* Petals */}
              <path d="M 50,36 C 44,22 56,22 50,36" fill="#FADBD8" stroke="#E74C3C" strokeWidth="1.5" />
              <path d="M 50,64 C 44,78 56,78 50,64" fill="#FADBD8" stroke="#E74C3C" strokeWidth="1.5" />
              <path d="M 36,50 C 22,44 22,56 36,50" fill="#FADBD8" stroke="#E74C3C" strokeWidth="1.5" />
              <path d="M 64,50 C 78,44 78,56 64,50" fill="#FADBD8" stroke="#E74C3C" strokeWidth="1.5" />
            </motion.g>
          )}
        </svg>

        {/* Beating Heart (Always visible in center) */}
        <motion.div
          className="absolute w-12 h-12 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.25, 1.1, 1.3, 1] }}
          transition={{
            duration: 1.2,
            repeat: stage < 2 ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{ top: "40%", left: "37.5%" }}
        >
          <svg viewBox="0 0 24 24" fill="#E74C3C" className="w-12 h-12 drop-shadow-md">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </div>

      {/* Cute Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-[#A0A0A0] text-center"
      >
        <span className="font-handwritten text-2xl font-semibold text-[#EC7063] block">
          {stage === 0 && "sketching a heartbeat..."}
          {stage === 1 && "growing a small flower..."}
          {stage === 2 && "drawing a storybook..."}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider block mt-2 text-zinc-400 font-rounded">
          Please wait a moment
        </span>
      </motion.div>
    </motion.div>
  );
}
