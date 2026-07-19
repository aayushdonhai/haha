"use client";

import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SelfieMirror() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied">("prompt");
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Look who's here...",
    "The prettiest girl in my universe. ❤️",
    "I can't wait to see this beautiful smile in person this September.",
  ];

  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 480 }, height: { ideal: 480 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPermissionState("granted");
      setTextIndex(0);
    } catch (err) {
      console.error("Camera access denied or unavailable", err);
      setPermissionState("denied");
    }
  };

  // Animate overlay text sequentially when camera is granted
  useEffect(() => {
    if (permissionState !== "granted") return;

    const intervals = [
      setTimeout(() => setTextIndex(1), 2500),
      setTimeout(() => setTextIndex(2), 5500),
      setTimeout(() => setTextIndex(3), 9000),
    ];

    return () => {
      intervals.forEach((timer) => clearTimeout(timer));
    };
  }, [permissionState]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <AnimatePresence mode="wait">
        {permissionState === "prompt" && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full bg-[#FFFFFF]/90 border-2 border-dashed border-[#AED6F1] rounded-3xl p-8 text-center flex flex-col items-center"
            style={{ filter: "url(#crayon-wobble)" }}
          >
            {/* Illustrated Camera Frame */}
            <div className="w-20 h-20 bg-[#EBF5FB] text-[#3498DB] rounded-full flex items-center justify-center mb-6">
              <Camera size={36} style={{ filter: "url(#crayon-wobble)" }} />
            </div>
            <h3 className="font-handwritten text-3xl font-bold text-[#2C3E50] mb-2">
              A Special Mirror for You
            </h3>
            <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
              This section needs front camera permission to show you something really pretty. Don't worry, your feed is completely private and processed locally on your device.
            </p>
            <div className="flex gap-4">
              <button
                onClick={startCamera}
                className="bg-[#AED6F1] hover:bg-[#85C1E9] text-[#2C3E50] font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all"
                style={{ filter: "url(#crayon-wobble)" }}
              >
                Open Camera
              </button>
              <button
                onClick={() => setPermissionState("denied")}
                className="bg-[#F2F4F4] hover:bg-[#E5E8E8] text-zinc-500 font-semibold text-sm px-5 py-2.5 rounded-full transition-all"
              >
                No, Thanks
              </button>
            </div>
          </motion.div>
        )}

        {permissionState === "granted" && (
          <motion.div
            key="granted"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
          >
            {/* Camera Container Frame */}
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-8 border-[#FADBD8] shadow-md flex items-center justify-center bg-black">
              {/* Webcam Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />

              {/* Doodle/Floral Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Flowers framing the webcam */}
                <div className="absolute -top-3 -left-3 w-10 h-10 text-[#EC7063]">
                  <Sparkles className="w-full h-full fill-[#FADBD8] animate-pulse" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 text-[#AED6F1]">
                  <Heart className="w-full h-full fill-[#EBF5FB] animate-ping" style={{ animationDuration: "3s" }} />
                </div>

                {/* Floating camera hearts */}
                <div className="absolute inset-0 z-10">
                  <motion.div
                    className="absolute bottom-2 left-6 text-[#EC7063] opacity-60"
                    animate={{ y: [-10, -50], x: [0, -10], opacity: [0.6, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ❤️
                  </motion.div>
                  <motion.div
                    className="absolute bottom-6 right-8 text-[#EC7063] opacity-60"
                    animate={{ y: [-10, -60], x: [0, 15], opacity: [0.6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    ❤️
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Sequential Overlays text */}
            <div className="mt-8 h-20 text-center flex flex-col justify-center px-4">
              <AnimatePresence mode="wait">
                {textIndex > 0 && textIndex <= texts.length && (
                  <motion.p
                    key={textIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6 }}
                    className="font-handwritten text-3xl font-semibold text-[#E74C3C] leading-snug"
                  >
                    {texts[textIndex - 1]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {permissionState === "denied" && (
          <motion.div
            key="denied"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#FFFFFF]/90 border-2 border-[#FDEDEC] rounded-3xl p-8 text-center flex flex-col items-center relative overflow-hidden"
            style={{ filter: "url(#crayon-wobble)" }}
          >
            {/* Soft pink tape decoration at the top */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#FADBD8]/60 -rotate-3 border border-[#F5B7B1]/40"></div>

            {/* Illustrated mirror frame */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              {/* Hand Drawn Mirror SVG */}
              <svg viewBox="0 0 100 120" className="w-full h-full fill-none stroke-[#85C1E9] stroke-2" style={{ filter: "url(#crayon-wobble)" }}>
                {/* Mirror Oval */}
                <ellipse cx="50" cy="50" rx="35" ry="45" fill="#EBF5FB" strokeWidth="2.5" />
                {/* Mirror reflection lines */}
                <path d="M 40,25 Q 50,20 60,25" opacity="0.3" />
                <path d="M 30,50 Q 50,45 70,50" opacity="0.3" />
                {/* Flowers around Mirror base */}
                <circle cx="20" cy="88" r="7" fill="#FADBD8" stroke="#E74C3C" />
                <circle cx="15" cy="80" r="5" fill="#FCF3CF" stroke="#F1C40F" />
                <circle cx="80" cy="88" r="7" fill="#D5F5E3" stroke="#2ECC71" />
                {/* Mirror stand handle */}
                <path d="M 50,95 L 50,115" strokeWidth="3" />
                <path d="M 35,115 L 65,115" strokeWidth="3" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <CameraOff size={24} className="text-[#3498DB]/40" />
              </div>
            </div>

            {/* Handwritten Note card */}
            <div className="bg-[#FEF9E7] border border-[#F9E79F] p-4 rounded-xl shadow-inner font-handwritten text-2xl text-[#78281F] w-full rotate-1 leading-relaxed">
              "Even without the camera, I know exactly who I'm thinking about."
            </div>

            <button
              onClick={startCamera}
              className="mt-6 text-xs font-semibold uppercase text-[#3498DB] tracking-wider hover:underline"
            >
              Try camera again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
