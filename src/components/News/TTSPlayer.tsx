"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

interface TTSPlayerProps {
  text: string;
}

export function TTSPlayer({ text }: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [chunks, setChunks] = useState<string[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Keep references to the latest state to avoid closure issues in the event listener
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef<number>(0);
  const rateRef = useRef<number>(1.0);
  const isPlayingRef = useRef<boolean>(false);

  // Sync references with active states
  useEffect(() => {
    chunksRef.current = chunks;
  }, [chunks]);

  useEffect(() => {
    indexRef.current = currentChunkIndex;
  }, [currentChunkIndex]);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Clean HTML text, decode entities, and split into sensible sentences/chunks
  const cleanAndChunkText = (htmlText: string): string[] => {
    const rawText = htmlText
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/&nbsp;/g, " ")
      .replace(/&rsquo;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();

    // Split by sentence terminators (Bengali darsi, English full stop, question mark, exclamation, newline)
    const sentences = rawText.split(/[।\.?!\n]/);
    const result: string[] = [];
    let currentChunk = "";

    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences[i].trim();
      if (!sentence) continue;

      // Add standard Bengali punctuation back
      sentence = sentence + "। ";

      // If a single sentence is extremely long, slice it into smaller sub-chunks
      if (sentence.length > 150) {
        if (currentChunk.trim()) {
          result.push(currentChunk.trim());
          currentChunk = "";
        }

        let remaining = sentence;
        while (remaining.length > 0) {
          const sliceSize = Math.min(150, remaining.length);
          let slice = remaining.substring(0, sliceSize);

          if (remaining.length > 150) {
            const lastSpace = slice.lastIndexOf(" ");
            if (lastSpace > 100) {
              slice = remaining.substring(0, lastSpace);
            }
          }

          result.push(slice.trim());
          remaining = remaining.substring(slice.length).trim();
        }
      } else {
        if ((currentChunk + sentence).length > 150) {
          if (currentChunk.trim()) {
            result.push(currentChunk.trim());
          }
          currentChunk = sentence;
        } else {
          currentChunk += sentence;
        }
      }
    }

    if (currentChunk.trim()) {
      result.push(currentChunk.trim());
    }

    console.log("TTS Prepared Chunks count:", result.length);
    return result;
  };

  // Populate chunks when text changes
  useEffect(() => {
    if (text) {
      setChunks(cleanAndChunkText(text));
    }
  }, [text]);

  // Initialize audio player and static event listeners ONCE on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      const nextIndex = indexRef.current + 1;
      const activeChunks = chunksRef.current;
      const activeRate = rateRef.current;

      if (nextIndex >= activeChunks.length) {
        setIsPlaying(false);
        setCurrentChunkIndex(0);
        audio.src = "";
        return;
      }

      // Set state and play the next chunk
      setCurrentChunkIndex(nextIndex);
      const textChunk = activeChunks[nextIndex];
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";
      const url = `${backendUrl}/api/tts?text=${encodeURIComponent(textChunk)}`;

      audio.src = url;
      audio.playbackRate = activeRate;
      audio.play().catch((err) => {
        console.error("Audio sequential playback failed at index:", nextIndex, err);
        setIsPlaying(false);
      });
    };

    const handleError = (e: any) => {
      console.error("Audio player encountered an error:", e);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  const playChunk = (index: number, rateValue: number) => {
    const activeChunks = chunksRef.current;
    if (index >= activeChunks.length) {
      setIsPlaying(false);
      setCurrentChunkIndex(0);
      if (audioRef.current) {
        audioRef.current.src = "";
      }
      return;
    }

    setCurrentChunkIndex(index);
    const textChunk = activeChunks[index];
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";
    const url = `${backendUrl}/api/tts?text=${encodeURIComponent(textChunk)}`;

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.playbackRate = rateValue;
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed at index:", index, err);
        setIsPlaying(false);
      });
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Resume if already loaded, else start playChunk
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.playbackRate = rate;
        audioRef.current.play().catch((err) => {
          console.error("Failed to resume playback, restarting chunk:", err);
          playChunk(currentChunkIndex, rate);
        });
      } else {
        playChunk(currentChunkIndex, rate);
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setIsPlaying(false);
    setCurrentChunkIndex(0);
  };

  const changeRate = (newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      playChunk(indexRef.current, newRate);
    } else if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
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
