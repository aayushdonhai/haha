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
  { id: 1, frontDoodle: "👀", bgColor: "bg-[#FDEDEC]", reason: "The beautiful, bright way your eyes shine when you look at me." },
  { id: 2, frontDoodle: "🤝", bgColor: "bg-[#EBF5FB]", reason: "How you hold my hand tightly as if you never want to let go." },
  { id: 3, frontDoodle: "🤍", bgColor: "bg-[#FEF9E7]", reason: "Your pure, kind, and compassionate soul that inspires me daily." },
  { id: 4, frontDoodle: "✨", bgColor: "bg-[#E8F8F5]", reason: "How you make even the simplest rainy days feel magical." },
  { id: 5, frontDoodle: "💤", bgColor: "bg-[#F4ECF7]", reason: "The quiet, peaceful way you look when you're sleeping soundly." },
  { id: 6, frontDoodle: "🗣️", bgColor: "bg-[#FDEDEC]", reason: "Listening to you speak passionately about what you love." },
  { id: 7, frontDoodle: "🫂", bgColor: "bg-[#EBF5FB]", reason: "Your warm hugs that instantly make all my worries disappear." },
  { id: 8, frontDoodle: "😂", bgColor: "bg-[#FEF9E7]", reason: "Your silly sense of humor and the cute face you make when laughing." },
  { id: 9, frontDoodle: "🌱", bgColor: "bg-[#E8F8F5]", reason: "How you believe in my potential, encouraging me to grow." },
  { id: 10, frontDoodle: "🎨", bgColor: "bg-[#F4ECF7]", reason: "Your unique creativity and how you appreciate tiny beauties." },
  { id: 11, frontDoodle: "🧸", bgColor: "bg-[#FDEDEC]", reason: "Your playful, cute, and child-like warmth that brings me peace." },
  { id: 12, frontDoodle: "👂", bgColor: "bg-[#EBF5FB]", reason: "How patiently you listen, making me feel fully understood." },
  { id: 13, frontDoodle: "💭", bgColor: "bg-[#FEF9E7]", reason: "The sweet, unexpected little messages you send me randomly." },
  { id: 14, frontDoodle: "🌸", bgColor: "bg-[#E8F8F5]", reason: "Your natural beauty, especially when you are makeup-free." },
  { id: 15, frontDoodle: "🧁", bgColor: "bg-[#F4ECF7]", reason: "Your thoughtfulness and how you remember small details about us." },
  { id: 16, frontDoodle: "🛡️", bgColor: "bg-[#FDEDEC]", reason: "The sense of absolute safety and comfort I feel in your presence." },
  { id: 17, frontDoodle: "☀️", bgColor: "bg-[#EBF5FB]", reason: "Your bright energy that lifts me up whenever I feel heavy." },
  { id: 18, frontDoodle: "🍕", bgColor: "bg-[#FEF9E7]", reason: "How sharing a simple meal with you turns into my favorite memory." },
  { id: 19, frontDoodle: "🎸", bgColor: "bg-[#E8F8F5]", reason: "Your cute habits and little gestures that make you uniquely you." },
  { id: 20, frontDoodle: "♾️", bgColor: "bg-[#F4ECF7]", reason: "Because you are my universe, and I want to choose you every day." },
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
