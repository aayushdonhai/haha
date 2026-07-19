"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: "heart" | "petal";
  delay: number;
  duration: number;
  sway: number;
}

export default function PaperTexture() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate a fixed number of floating elements to preserve performance
    const newParticles: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of viewport width
      y: 100 + Math.random() * 20, // start below screen
      size: 10 + Math.random() * 14,
      type: Math.random() > 0.5 ? "heart" : "petal",
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 15,
      sway: 30 + Math.random() * 50,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden paper-grain">
      {/* Global Hand-drawn Crayon Wobble SVG Filter */}
      <svg className="hidden">
        <defs>
          <filter id="crayon-wobble" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Floating Particles (Hearts and Petals) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-opacity-60"
          style={{
            left: `${p.x}%`,
            top: `${p.y}vh`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, p.sway, -p.sway, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          {p.type === "heart" ? (
            <svg
              viewBox="0 0 24 24"
              fill="#EC7063"
              className="w-full h-full opacity-30 filter drop-shadow-[0_2px_4px_rgba(236,112,99,0.2)]"
              style={{ filter: "url(#crayon-wobble)" }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="#FADBD8"
              className="w-full h-full opacity-40 filter drop-shadow-[0_2px_4px_rgba(250,219,216,0.2)]"
              style={{ filter: "url(#crayon-wobble)" }}
            >
              <path d="M12 2C8 6 6 12 12 22c6-10 4-16 0-20z" />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Background Illustrated Static/Wiggling Doodles */}
      {/* Top Left Cloud */}
      <div className="absolute top-[8%] left-[5%] opacity-15 w-24 h-16 animate-wiggle-doodle" style={{ animationDelay: "1s" }}>
        <svg viewBox="0 0 100 60" fill="none" stroke="#5D6D7E" strokeWidth="2" strokeLinecap="round" style={{ filter: "url(#crayon-wobble)" }}>
          <path d="M 10,45 C 5,30 20,15 35,25 C 45,10 65,15 75,25 C 90,20 95,35 85,45 C 95,55 75,60 65,55 C 55,65 35,60 25,55 C 10,60 5,50 10,45 Z" fill="#F2F4F4" />
        </svg>
      </div>

      {/* Top Right Smiling Sun/Star */}
      <div className="absolute top-[12%] right-[6%] opacity-20 w-16 h-16 animate-wiggle-doodle" style={{ animationDelay: "3s" }}>
        <svg viewBox="0 0 100 100" fill="none" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round" style={{ filter: "url(#crayon-wobble)" }}>
          <path d="M 50,10 L 60,35 L 85,40 L 65,58 L 70,85 L 50,70 L 30,85 L 35,58 L 15,40 L 40,35 Z" fill="#FCF3CF" />
          <circle cx="43" cy="48" r="2.5" fill="#5D6D7E" />
          <circle cx="57" cy="48" r="2.5" fill="#5D6D7E" />
          <path d="M 45,56 Q 50,60 55,56" stroke="#5D6D7E" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Left Center Flower */}
      <div className="absolute top-[45%] left-[3%] opacity-10 w-14 h-14 animate-wiggle-doodle" style={{ animationDelay: "0.5s" }}>
        <svg viewBox="0 0 100 100" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" style={{ filter: "url(#crayon-wobble)" }}>
          <path d="M 50,50 Q 48,80 50,95" />
          <path d="M 50,70 Q 30,65 40,55" fill="#D5F5E3" />
          <path d="M 50,80 Q 70,75 60,65" fill="#D5F5E3" />
          <circle cx="50" cy="50" r="10" fill="#FCF3CF" stroke="#F39C12" />
          <circle cx="50" cy="32" r="9" fill="#FADBD8" stroke="#E74C3C" />
          <circle cx="50" cy="68" r="9" fill="#FADBD8" stroke="#E74C3C" />
          <circle cx="32" cy="50" r="9" fill="#FADBD8" stroke="#E74C3C" />
          <circle cx="68" cy="50" r="9" fill="#FADBD8" stroke="#E74C3C" />
        </svg>
      </div>

      {/* Right Center Ribbon Doodle */}
      <div className="absolute top-[60%] right-[3%] opacity-15 w-16 h-20 animate-wiggle-doodle" style={{ animationDelay: "2s" }}>
        <svg viewBox="0 0 80 120" fill="none" stroke="#D7BDE2" strokeWidth="2" strokeLinecap="round" style={{ filter: "url(#crayon-wobble)" }}>
          <path d="M 40,10 Q 5,30 40,50 Q 75,70 40,90 Q 5,110 30,115" />
        </svg>
      </div>

      {/* Bottom Left Doodle Flower */}
      <div className="absolute bottom-[8%] left-[4%] opacity-20 w-12 h-12 animate-wiggle-doodle" style={{ animationDelay: "4s" }}>
        <svg viewBox="0 0 100 100" fill="none" stroke="#EC7063" strokeWidth="2.5" strokeLinecap="round" style={{ filter: "url(#crayon-wobble)" }}>
          <path d="M 50,50 Q 50,15 25,25 Q 15,50 50,50" fill="#FDEDEC" />
          <path d="M 50,50 Q 85,15 75,25 Q 50,50 50,50" fill="#FDEDEC" />
          <path d="M 50,50 Q 85,85 75,75 Q 50,50 50,50" fill="#FDEDEC" />
          <path d="M 50,50 Q 15,85 25,75 Q 50,50 50,50" fill="#FDEDEC" />
          <circle cx="50" cy="50" r="8" fill="#F9E79F" stroke="#F39C12" />
        </svg>
      </div>
    </div>
  );
}
