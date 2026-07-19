"use client";

import React, { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";

// Components
import PaperTexture from "@/components/PaperTexture";
import MusicPlayer from "@/components/MusicPlayer";
import PageLoader from "@/components/PageLoader";
import Chapter1Intro from "@/components/Chapter1Intro";
import PolaroidGallery from "@/components/PolaroidGallery";
import SelfieMirror from "@/components/SelfieMirror";
import RainyApology from "@/components/RainyApology";
import GrowthPlant from "@/components/GrowthPlant";
import ReasonsGrid from "@/components/ReasonsGrid";
import PromiseGarden from "@/components/PromiseGarden";
import HugZone from "@/components/HugZone";
import EndingScreen from "@/components/EndingScreen";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRainy, setIsRainy] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoaded]);

  // GSAP Entrance Animations for Hero section
  useEffect(() => {
    if (!isLoaded) return;

    // Animate Hero text and wobbly doodles
    gsap.from(".gsap-hero-title", {
      y: 60,
      opacity: 0,
      duration: 1.6,
      ease: "power4.out",
      delay: 0.2,
    });

    gsap.from(".gsap-hero-desc", {
      y: 40,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.6,
    });

    gsap.from(".gsap-hero-scroll", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "back.out(2)",
      delay: 1.2,
    });
  }, [isLoaded]);

  return (
    <>
      {/* Page Entry Sketch Loader */}
      <AnimatePresence>
        {!isLoaded && <PageLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {isLoaded && (
        <div
          className={`min-h-screen transition-colors duration-1000 overflow-x-hidden ${isTransformed
              ? "bg-gradient-to-b from-[#FDFBF7] via-[#FFF9F9] to-[#FDEDEC]"
              : "bg-[#FDFBF7]"
            }`}
        >
          {/* Handcrafted texture and wiggling doodles */}
          <PaperTexture />

          {/* Floating Vinyl Soundtrack Control */}
          <MusicPlayer isRainy={isRainy && !isTransformed} />

          {/* Main Content Layout */}
          <main className="relative z-10 w-full flex flex-col items-center">
            {/* HERO SECTION */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-6 relative">
              {/* Taped ribbon title card */}
              <div
                className="bg-[#FFFFFF] p-8 border border-zinc-100 shadow-sm rounded-3xl max-w-lg relative"
                style={{ filter: "url(#crayon-wobble)" }}
              >
                {/* Scrapbook Tape effect */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#FCF3CF]/60 border border-zinc-200/10 rotate-2"></div>

                <h1 className="gsap-hero-title font-handwritten text-6xl sm:text-7xl font-bold text-[#E74C3C] leading-tight select-none">
                  Hello, My Universe
                </h1>
                <p className="gsap-hero-desc mt-6 text-zinc-600 text-base leading-relaxed font-rounded">
                  Even though hundreds of miles separate us and a screen is all we have right now, you are my entire universe. This is a special scrapbook for you, as we count down the days until we finally meet in person this September.
                </p>

                {/* Decorative heart doodles */}
                <div className="absolute bottom-4 left-6 text-xl select-none animate-bounce">❤️</div>
                <div className="absolute top-6 right-6 text-xl select-none animate-wiggle-doodle">✿</div>
              </div>

              {/* Scroll down indicator */}
              <div className="gsap-hero-scroll mt-16 flex flex-col items-center select-none opacity-60">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 font-rounded">
                  Scroll to Open Book
                </span>
                <span className="text-2xl mt-2 animate-bounce">↓</span>
              </div>
            </section>

            {/* CHAPTER 1: Welcome Intro */}
            <section className="w-full py-10 border-t border-dashed border-zinc-200">
              <Chapter1Intro />
            </section>

            {/* CHAPTER 2: Memory polaroids */}
            <section className="w-full py-16 bg-[#FDFBF7]/40 border-t border-dashed border-zinc-200">
              <div className="text-center mb-8 px-4">
                <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-2">
                  Our Screen-to-Screen Moments
                </h2>
                <p className="text-sm text-zinc-500 font-rounded">
                  Even though we've never met in person, these are the moments I hold closest...
                </p>
              </div>
              <PolaroidGallery />
            </section>

            {/* CAMERA SECTION: Look Who's Here */}
            <section className="w-full py-16 border-t border-dashed border-zinc-200">
              <SelfieMirror />
            </section>

            {/* CHAPTER 3: Apology and Rain */}
            <section className="w-full">
              <RainyApology onRainActive={setIsRainy} />
            </section>

            {/* CHAPTER 4: Growth Plant scroll-linked */}
            <section className="w-full border-t border-dashed border-zinc-200">
              <GrowthPlant />
            </section>

            {/* CHAPTER 5: ReasonsStickyNotes */}
            <section className="w-full py-16 border-t border-dashed border-zinc-200">
              <ReasonsGrid />
            </section>

            {/* CHAPTER 6: PromiseGarden */}
            <section className="w-full">
              <PromiseGarden />
            </section>

            {/* CHAPTER 7: Virtual Hug squeeze */}
            <section className="w-full py-16 border-t border-dashed border-zinc-200">
              <HugZone />
            </section>

            {/* FINAL ENDING TRANSFORMATION */}
            <section className="w-full py-16 border-t border-dashed border-zinc-200">
              <EndingScreen
                onTransform={() => setIsTransformed(true)}
                isTransformed={isTransformed}
              />
            </section>
          </main>
        </div>
      )}
    </>
  );
}
