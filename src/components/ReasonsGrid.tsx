"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ReasonCard {
  id: number;
  frontDoodle: string;
  bgColor: string;
  reason: string;
}

const REASONS: ReasonCard[] = [
  { id: 1, frontDoodle: "👀", bgColor: "bg-[#FDEDEC]", reason: "The beautiful way your face lights up on my screen during our calls." },
  { id: 2, frontDoodle: "🤝", bgColor: "bg-[#EBF5FB]", reason: "How we talk about holding hands for real, and how much I long for that." },
  { id: 3, frontDoodle: "🤍", bgColor: "bg-[#FEF9E7]", reason: "Your pure, kind soul that makes me feel close even when we're miles apart." },
  { id: 4, frontDoodle: "✨", bgColor: "bg-[#E8F8F5]", reason: "How you make my phone lighting up with your name the best part of my day." },
  { id: 5, frontDoodle: "💤", bgColor: "bg-[#F4ECF7]", reason: "The late-night calls where we fall asleep talking to each other." },
  { id: 6, frontDoodle: "🗣️", bgColor: "bg-[#FDEDEC]", reason: "Your sweet voice notes that I play on repeat whenever I miss you too much." },
  { id: 7, frontDoodle: "🫂", bgColor: "bg-[#EBF5FB]", reason: "How you comfort my heart and make me feel warm from thousands of miles away." },
  { id: 8, frontDoodle: "😂", bgColor: "bg-[#FEF9E7]", reason: "Your silly jokes that make me laugh out loud alone in my room." },
  { id: 9, frontDoodle: "🌱", bgColor: "bg-[#E8F8F5]", reason: "How you believe in my growth and support me through a screen." },
  { id: 10, frontDoodle: "🎨", bgColor: "bg-[#F4ECF7]", reason: "Sharing drawings, songs, and the tiny details of our separate days." },
  { id: 11, frontDoodle: "🧸", bgColor: "bg-[#FDEDEC]", reason: "Your sweet, playful texts that make the distance feel a bit shorter." },
  { id: 12, frontDoodle: "👂", bgColor: "bg-[#EBF5FB]", reason: "How patiently you listen to me rambly talk, making me feel fully valued." },
  { id: 13, frontDoodle: "💭", bgColor: "bg-[#FEF9E7]", reason: "How you are always in my thoughts, no matter what I'm doing in my day." },
  { id: 14, frontDoodle: "🌸", bgColor: "bg-[#E8F8F5]", reason: "Your natural beauty in the random, candid selfies you send me." },
  { id: 15, frontDoodle: "🧁", bgColor: "bg-[#F4ECF7]", reason: "How you remember timezone differences and count the hours with me." },
  { id: 16, frontDoodle: "🛡️", bgColor: "bg-[#FDEDEC]", reason: "The absolute safety and comfort I feel just hearing your voice." },
  { id: 17, frontDoodle: "☀️", bgColor: "bg-[#EBF5FB]", reason: "Your bright, happy texts that cheer me up on my heavy days." },
  { id: 18, frontDoodle: "🍕", bgColor: "bg-[#FEF9E7]", reason: "Our virtual food dates where we eat 'together' while staring at our screens." },
  { id: 19, frontDoodle: "📅", bgColor: "bg-[#E8F8F5]", reason: "Our shared countdown to September, planning every single detail." },
  { id: 20, frontDoodle: "♾️", bgColor: "bg-[#F4ECF7]", reason: "Because you are my universe, and I can't wait to start our real-life story." },
];

export default function ReasonsGrid() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full relative px-4 bg-[#FDFBF7] py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-2">
          20 Reasons I Love You
        </h2>
        <p className="text-sm text-zinc-500 font-rounded select-none">
          Tap each note to uncover a reason...
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {REASONS.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          const rotationAngle = (card.id % 3) * 2 - 2; // slight offset rotations for scrapbook effect

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="h-44 w-full cursor-pointer perspective-1000 select-none"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            >
              {/* Card Inner Flipping Structure */}
              <div
                className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* CARD FRONT */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden ${card.bgColor} border border-zinc-200/50 rounded-2xl p-4 flex flex-col justify-between shadow-sm`}
                  style={{ filter: "url(#crayon-wobble)" }}
                >
                  {/* Adhesive tape effect at the top */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/40 border border-zinc-200/20 rotate-1"></div>

                  <span className="text-xs font-bold text-zinc-400 font-rounded uppercase tracking-wider">
                    Reason #{card.id}
                  </span>
                  <span className="text-4xl my-auto text-center">{card.frontDoodle}</span>
                  <span className="text-xs text-center font-handwritten text-zinc-500 font-semibold">
                    Tap to reveal
                  </span>
                </div>

                {/* CARD BACK */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col justify-center shadow-md`}
                  style={{ filter: "url(#crayon-wobble)" }}
                >
                  <p className="font-handwritten text-xl text-[#78281F] text-center leading-relaxed font-semibold">
                    {card.reason}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra style variables for custom 3D card flips */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
