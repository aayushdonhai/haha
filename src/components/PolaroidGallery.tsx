"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface PolaroidPhoto {
  id: number;
  src: string;
  caption: string;
  rotation: string;
  tapeColor: string;
  tapeRotation: string;
  width: number;
  height: number;
}

const PHOTOS: PolaroidPhoto[] = [
  {
    id: 1,
    src: "/photos/photo1.jpg",
    caption: "My favorite view in the world...",
    rotation: "-rotate-2",
    tapeColor: "bg-[#FDEDEC]/70",
    tapeRotation: "-rotate-6",
    width: 400,
    height: 400,
  },
  {
    id: 2,
    src: "/photos/photo2.jpg",
    caption: "The smile that brightens my darkest days",
    rotation: "rotate-3",
    tapeColor: "bg-[#EBF5FB]/70",
    tapeRotation: "rotate-3",
    width: 400,
    height: 400,
  },
  {
    id: 3,
    src: "/photos/photo3.jpg",
    caption: "Every moment with you is a treasure",
    rotation: "-rotate-3",
    tapeColor: "bg-[#FCF3CF]/70",
    tapeRotation: "-rotate-2",
    width: 400,
    height: 400,
  },
  {
    id: 4,
    src: "/photos/photo4.jpg",
    caption: "Holding you makes everything else vanish",
    rotation: "rotate-2",
    tapeColor: "bg-[#E8F8F5]/70",
    tapeRotation: "rotate-6",
    width: 400,
    height: 400,
  },
  {
    id: 5,
    src: "/photos/photo5.jpg",
    caption: "That silly, precious, perfect laugh",
    rotation: "-rotate-1",
    tapeColor: "bg-[#F4ECF7]/70",
    tapeRotation: "-rotate-4",
    width: 400,
    height: 400,
  },
  {
    id: 6,
    src: "/photos/photo6.jpg",
    caption: "I love you in every single timeline",
    rotation: "rotate-3",
    tapeColor: "bg-[#FDEDEC]/70",
    tapeRotation: "rotate-2",
    width: 400,
    height: 400,
  },
  {
    id: 7,
    src: "/photos/photo7.jpg",
    caption: "Always choosing you. Every single day.",
    rotation: "-rotate-2",
    tapeColor: "bg-[#EBF5FB]/70",
    tapeRotation: "-rotate-5",
    width: 400,
    height: 400,
  },
];

export default function PolaroidGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  return (
    <div className="w-full relative px-4">
      {/* Memories Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto py-4">
        {PHOTOS.map((photo) => (
          <motion.div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className={`cursor-pointer ${photo.rotation} relative hover:z-20 transition-all`}
            whileHover={{ scale: 1.03, rotate: photo.id % 2 === 0 ? "0deg" : "1deg" }}
          >
            {/* Polaroid card */}
            <div
              className="bg-[#FFFFFF] p-4 pb-6 shadow-md border border-zinc-100 flex flex-col items-center select-none"
              style={{ filter: "url(#crayon-wobble)" }}
            >
              {/* Paper Washi Tape decoration */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 border-b border-zinc-200/20 shadow-sm ${photo.tapeColor} ${photo.tapeRotation}`}
              ></div>

              {/* Polaroid Image */}
              <div className="relative w-full aspect-square bg-[#FDFBF7] border border-zinc-200 overflow-hidden flex items-center justify-center">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  unoptimized
                />
              </div>

              {/* Captions */}
              <p className="mt-4 font-handwritten text-2xl text-center text-zinc-700 leading-snug">
                {photo.caption}
              </p>
            </div>

            {/* Doodle Hearts surrounding the polaroids */}
            {photo.id % 3 === 0 && (
              <div className="absolute -bottom-2 -left-2 text-[#EC7063] text-xl opacity-60 w-6 h-6 animate-pulse select-none">
                ❤️
              </div>
            )}
            {photo.id % 4 === 0 && (
              <div className="absolute -top-1 -right-2 text-[#AED6F1] text-xl opacity-60 w-6 h-6 select-none animate-wiggle-doodle">
                ✿
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Expanded Polaroid Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-[#FFFFFF] p-6 pb-8 max-w-md w-full border border-zinc-200 shadow-2xl relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              style={{ filter: "url(#crayon-wobble)" }}
            >
              {/* Paper Washi Tape decoration inside modal */}
              <div
                className={`absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 border-b border-zinc-200/20 shadow-sm ${selectedPhoto.tapeColor} ${selectedPhoto.tapeRotation}`}
              ></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-600 transition-colors p-1 bg-zinc-50 rounded-full"
              >
                <X size={20} />
              </button>

              {/* Full view image */}
              <div className="relative w-full aspect-square bg-[#FDFBF7] border border-zinc-200 overflow-hidden flex items-center justify-center">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Expanded Caption */}
              <p className="mt-6 font-handwritten text-3xl text-center text-zinc-800 px-2 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
