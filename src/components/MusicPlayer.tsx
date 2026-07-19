"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  isRainy: boolean;
}

export default function MusicPlayer({ isRainy }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.2); // Start at 20%
  const [showAutoPlayPrompt, setShowAutoPlayPrompt] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/glue.mp3");
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Try to autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was prevented. Show the play button prompt.
          setIsPlaying(false);
          setShowAutoPlayPrompt(true);
        });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Sync volume with state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle the Rainy transition - reduce volume when rainy is true
  useEffect(() => {
    if (audioRef.current) {
      if (isRainy) {
        // Drop volume to 10% or half of current volume if smaller
        audioRef.current.volume = isMuted ? 0 : Math.min(0.08, volume);
      } else {
        audioRef.current.volume = isMuted ? 0 : volume;
      }
    }
  }, [isRainy, volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowAutoPlayPrompt(false);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVol = parseFloat(e.target.value);
    setVolume(nextVol);
    if (nextVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <>
      {/* Floating play prompt if autoplay is blocked */}
      {showAutoPlayPrompt && (
        <button
          onClick={togglePlay}
          className="fixed bottom-24 right-6 z-50 flex items-center gap-2 bg-[#FADBD8] border-2 border-[#EC7063] px-4 py-2 rounded-full shadow-lg font-handwritten text-lg font-bold text-[#C0392B] animate-bounce hover:scale-105 transition-transform"
          style={{ filter: "url(#crayon-wobble)" }}
        >
          <Play size={16} fill="#C0392B" />
          <span>Tap to Play Music ♫</span>
        </button>
      )}

      {/* Floating Music Control Bar */}
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#FFFFFF]/90 border-2 border-[#E5E7EB] p-3 rounded-2xl shadow-md transition-all hover:shadow-lg"
        style={{ filter: "url(#crayon-wobble)" }}
      >
        {/* Spinning Vinyl Record Icon */}
        <div
          onClick={togglePlay}
          className={`relative w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center cursor-pointer shadow-inner transition-transform duration-300 hover:scale-105 ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "6s" }}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-1 rounded-full border border-dashed border-zinc-700 opacity-60"></div>
          <div className="absolute inset-2 rounded-full border border-zinc-800"></div>
          <div className="absolute inset-3 rounded-full border border-zinc-900"></div>

          {/* Center Label (Sweet Pink) */}
          <div className="w-5 h-5 rounded-full bg-[#FDEDEC] border border-[#EC7063] flex items-center justify-center z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E74C3C]"></div>
          </div>

          {/* Play/Pause hover indicator */}
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white">
            {isPlaying ? <Pause size={14} /> : <Play size={14} fill="white" />}
          </div>
        </div>

        {/* Mute and Slider Controls */}
        <div className="flex flex-col gap-1 pr-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-zinc-500 font-handwritten select-none">
              {isPlaying ? "Playing 'Glue Song' ♫" : "Music Paused"}
            </span>
            <button
              onClick={toggleMute}
              className="text-[#E74C3C] hover:scale-110 transition-transform"
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          {/* Custom Styled Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1.5 bg-[#FDEDEC] rounded-lg appearance-none cursor-pointer accent-[#EC7063] outline-none"
          />
        </div>
      </div>
    </>
  );
}
