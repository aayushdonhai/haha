"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HugZone() {
  const [isHugging, setIsHugging] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const playHeartbeatSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const playThump = (time: number, freq: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(0.01, time + dur);

        gain.gain.setValueAtTime(0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + dur);
      };

      const now = ctx.currentTime;
      // Double thump "lub-dub"
      playThump(now, 55, 0.2);
      playThump(now + 0.25, 50, 0.24);

      // Second beat cycle
      playThump(now + 0.8, 55, 0.2);
      playThump(now + 1.05, 50, 0.24);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by user gesture:", e);
    }
  };

  const handleHug = () => {
    if (isHugging) return;
    setIsHugging(true);

    // Play heartbeat sounds
    playHeartbeatSound();

    // Trigger phone vibration (150ms thump, 100ms pause, 200ms thump, 400ms pause, and repeat)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([150, 100, 200, 400, 150, 100, 200]);
    }

    // Spawn burst of hearts
    const newHearts = Array.from({ length: 12 }).map((_, idx) => ({
      id: Date.now() + idx,
      x: 20 + Math.random() * 60, // percentage spacing
      y: 40 + Math.random() * 40,
    }));
    setHearts(newHearts);

    // Reset hugging state after animation finishes
    setTimeout(() => {
      setIsHugging(false);
      setHearts([]);
    }, 2500);
  };

  return (
    <div className="w-full relative py-20 overflow-hidden flex flex-col items-center justify-center bg-[#FDFBF7]">
      {/* Visual background squeeze of the zone */}
      <motion.div
        animate={isHugging ? { scaleX: 0.95, scaleY: 0.98 } : { scaleX: 1, scaleY: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-md mx-auto p-8 rounded-3xl bg-[#FEF9E7]/40 border-2 border-dashed border-[#FADBD8] text-center relative flex flex-col items-center"
        style={{ filter: "url(#crayon-wobble)" }}
      >
        {/* Soft floating decoration */}
        <div className="absolute -top-3 left-6 text-xl">🧸</div>
        <div className="absolute -top-2 right-8 text-xl">✨</div>

        <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-[#78281F] mb-3">
          A Virtual Warm Hug
        </h3>
        <p className="text-zinc-600 text-sm mb-8 leading-relaxed font-rounded">
          Since I can't hold you in person yet, tap this button for a virtual warm squeeze. Counting down to doing this for real in September!
        </p>

        {/* Squishy Hug Button */}
        <motion.button
          onClick={handleHug}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="relative z-10 px-8 py-4 bg-[#FADBD8] border-2 border-[#EC7063] rounded-full text-xl font-handwritten font-bold text-[#78281F] shadow-md transition-all active:shadow-sm"
          style={{ filter: "url(#crayon-wobble)" }}
        >
          {isHugging ? "Hugging You... ❤️" : "Hug Me ❤️"}
        </motion.button>
      </motion.div>

      {/* Wrapping Arms Overlays */}
      <AnimatePresence>
        {isHugging && (
          <>
            {/* Left Arm */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="fixed left-0 top-1/4 bottom-1/4 w-32 pointer-events-none z-40 flex items-center"
            >
              <svg
                viewBox="0 0 100 200"
                className="w-full h-full fill-[#FADBD8] stroke-[#EC7063] stroke-[3]"
                style={{ filter: "url(#crayon-wobble)" }}
              >
                {/* Hand Drawn Arm Wrapping from Left */}
                <path d="M 0,40 Q 60,35 80,70 Q 95,95 85,120 Q 65,140 0,130" />
                <circle cx="82" cy="95" r="8" fill="#EC7063" opacity="0.4" /> {/* cute cheek blush details on arm */}
              </svg>
            </motion.div>

            {/* Right Arm */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="fixed right-0 top-1/4 bottom-1/4 w-32 pointer-events-none z-40 flex items-center"
            >
              <svg
                viewBox="0 0 100 200"
                className="w-full h-full fill-[#FADBD8] stroke-[#EC7063] stroke-[3]"
                style={{ filter: "url(#crayon-wobble)" }}
              >
                {/* Hand Drawn Arm Wrapping from Right */}
                <path d="M 100,40 Q 40,35 20,70 Q 5,95 15,120 Q 35,140 100,130" />
                <circle cx="18" cy="95" r="8" fill="#EC7063" opacity="0.4" />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Hearts Burst on Click */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute z-30 pointer-events-none text-2xl select-none"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [1, 1.4, 0.8],
            opacity: [1, 0.8, 0],
            y: -100 - Math.random() * 80,
            x: (Math.random() - 0.5) * 60,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
