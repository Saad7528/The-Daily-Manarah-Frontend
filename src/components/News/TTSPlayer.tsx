"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, HelpCircle, AlertCircle } from "lucide-react";

interface TTSPlayerProps {
  text: string;
}

export function TTSPlayer({ text }: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setSupported(false);
    }

    return () => {
      // Clean up on unmount
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanText = (htmlText: string) => {
    // Basic text cleaner to remove HTML tags
    return htmlText.replace(/<[^>]*>/g, "").substring(0, 1000); // Read first 1000 characters
  };

  const handlePlayPause = () => {
    if (!supported) return;

    const synth = window.speechSynthesis;

    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      if (synth.paused) {
        synth.resume();
        setIsPlaying(true);
      } else {
        synth.cancel();
        
        const txtToSpeak = cleanText(text);
        const utterance = new SpeechSynthesisUtterance(txtToSpeak);
        
        // Find Bengali voice
        const voices = synth.getVoices();
        const bnVoice = voices.find(
          (v) => v.lang.startsWith("bn") || v.name.includes("Bengali") || v.name.includes("Bangla")
        );
        if (bnVoice) {
          utterance.voice = bnVoice;
        }
        
        utterance.lang = "bn-BD";
        utterance.rate = rate;

        utterance.onend = () => {
          setIsPlaying(false);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const changeRate = (newRate: number) => {
    setRate(newRate);
    if (isPlaying && typeof window !== "undefined") {
      // Restart speech with new rate
      window.speechSynthesis.cancel();
      const txtToSpeak = cleanText(text);
      const utterance = new SpeechSynthesisUtterance(txtToSpeak);
      const voices = window.speechSynthesis.getVoices();
      const bnVoice = voices.find(
        (v) => v.lang.startsWith("bn") || v.name.includes("Bengali") || v.name.includes("Bangla")
      );
      if (bnVoice) utterance.voice = bnVoice;
      utterance.lang = "bn-BD";
      utterance.rate = newRate;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
      {/* Player info */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-emerald-100 dark:bg-zinc-800 sepia:bg-[#dfceab] text-emerald-600 dark:text-amber-400 sepia:text-amber-800 rounded-full shrink-0">
          <Volume2 size={20} className={isPlaying ? "animate-bounce" : ""} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--text-primary)]">
            খবর শুনুন (AI অডিও রিডার)
          </span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">
            {isPlaying ? "অডিও বাজছে..." : "সম্পূর্ণ প্রতিবেদন ভয়েস রিডিং শুনুন"}
          </span>
        </div>
      </div>

      {/* Waveform visual animation during play */}
      {isPlaying && (
        <div className="flex items-end gap-1 h-6 px-4">
          <span className="w-1 bg-[var(--accent-color)] rounded animate-pulse h-4" style={{ animationDelay: '0.1s' }} />
          <span className="w-1 bg-[var(--accent-color)] rounded animate-pulse h-6" style={{ animationDelay: '0.3s' }} />
          <span className="w-1 bg-[var(--accent-color)] rounded animate-pulse h-3" style={{ animationDelay: '0.2s' }} />
          <span className="w-1 bg-[var(--accent-color)] rounded animate-pulse h-5" style={{ animationDelay: '0.5s' }} />
          <span className="w-1 bg-[var(--accent-color)] rounded animate-pulse h-2" style={{ animationDelay: '0.4s' }} />
        </div>
      )}

      {/* Player Actions */}
      <div className="flex items-center gap-3">
        {/* Speed button selector */}
        <div className="flex bg-slate-100 dark:bg-zinc-900 sepia:bg-[#dfceab] border border-[var(--border-color)] rounded-md p-0.5 text-[10px] font-bold">
          {[0.8, 1.0, 1.25, 1.5].map((r) => (
            <button
              key={r}
              onClick={() => changeRate(r)}
              className={`px-2 py-1 rounded transition-colors ${
                rate === r
                  ? "bg-[var(--accent-color)] text-white"
                  : "text-slate-500 dark:text-slate-400 sepia:text-amber-900"
              }`}
            >
              {r}x
            </button>
          ))}
        </div>

        {/* Play control */}
        <button
          onClick={handlePlayPause}
          className="flex items-center gap-1.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-bold py-1.5 px-4 rounded-full text-xs shadow transition-colors"
        >
          {isPlaying ? (
            <>
              <Pause size={14} fill="currentColor" />
              <span>পজ করুন</span>
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" />
              <span>শুনুন</span>
            </>
          )}
        </button>

        {/* Stop reset */}
        <button
          onClick={handleStop}
          className="p-1.5 bg-slate-100 dark:bg-zinc-800 sepia:bg-[#dfceab] border border-[var(--border-color)] hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 hover:text-red-500 rounded-full transition"
          title="বন্ধ করুন"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}
