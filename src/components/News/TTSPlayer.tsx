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
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs my-2">
      {/* Player info */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlayPause}
          className="w-10 h-10 rounded-full bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-slate-950 flex items-center justify-center transition shadow-xs shrink-0"
          title={isPlaying ? "পজ করুন" : "শুনুন"}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
        </button>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Volume2 size={14} className="text-amber-500" />
            <span>প্রতিবেদনটি শুনুন (অডিও সংস্করণ)</span>
          </span>
          <span className="text-[11px] text-[var(--text-secondary)]">
            {isPlaying ? "অডিও প্লে হচ্ছে..." : "পড়ার সময় না থাকলে শুনে নিতে পারেন"}
          </span>
        </div>
      </div>

      {/* Waveform visual animation during play */}
      {isPlaying && (
        <div className="hidden md:flex items-end gap-1 h-5 px-3">
          <span className="w-1 bg-[var(--accent-color)] rounded-full animate-pulse h-3" style={{ animationDelay: '0.1s' }} />
          <span className="w-1 bg-[var(--accent-color)] rounded-full animate-pulse h-5" style={{ animationDelay: '0.3s' }} />
          <span className="w-1 bg-[var(--accent-color)] rounded-full animate-pulse h-2" style={{ animationDelay: '0.2s' }} />
          <span className="w-1 bg-[var(--accent-color)] rounded-full animate-pulse h-4" style={{ animationDelay: '0.5s' }} />
          <span className="w-1 bg-[var(--accent-color)] rounded-full animate-pulse h-2" style={{ animationDelay: '0.4s' }} />
        </div>
      )}

      {/* Player Controls */}
      <div className="flex items-center gap-2.5 self-end sm:self-center">
        {/* Speed button selector */}
        <div className="flex bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-0.5 text-[10px] font-bold">
          {[0.8, 1.0, 1.25, 1.5].map((r) => (
            <button
              key={r}
              onClick={() => changeRate(r)}
              className={`px-2 py-1 rounded transition-colors ${
                rate === r
                  ? "bg-[var(--accent-color)] text-slate-950 font-black shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {r}x
            </button>
          ))}
        </div>

        {/* Reset / Stop */}
        <button
          onClick={handleStop}
          className="p-2 bg-[var(--bg-input)] border border-[var(--border-color)] hover:bg-[var(--border-color)] text-[var(--text-secondary)] hover:text-red-500 rounded-lg transition"
          title="পুনরায় শুরু করুন"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}
