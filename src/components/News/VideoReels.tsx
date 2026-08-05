"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Share2, Video, Heart } from "lucide-react";

interface ReelItem {
  id: string;
  title: string;
  videoUrl: string;
  views: string;
  likes: number;
}

const mockReels: ReelItem[] = [
  {
    id: "reel-1",
    title: "ঢাকায় রেকর্ড পরিমাণ বৃষ্টিপাত: ডুবেছে অধিকাংশ রাস্তাঘাট, জানুন সর্বশেষ আপডেট।",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-rain-on-a-window-sill-of-a-building-11603-large.mp4",
    views: "২৫ হাজার",
    likes: 1250
  },
  {
    id: "reel-2",
    title: "বাংলাদেশ অলিম্পিক গেমসের উদ্বোধনী অনুষ্ঠান এবং আমাদের অ্যাথলেটদের প্রস্তুতি কেমন ছিল?",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-web-developer-working-on-his-code-40050-large.mp4",
    views: "১২ হাজার",
    likes: 840
  },
  {
    id: "reel-3",
    title: "কৃত্রিম বুদ্ধিমত্তার নতুন জয়যাত্রা: আমাদের দৈনন্দিন জীবনে কতটা প্রভাব ফেলছে চ্যাটজিপিটি?",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-digital-falling-numbers-33431-large.mp4",
    views: "১৮ হাজার",
    likes: 1020
  }
];

export function VideoReels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState<boolean[]>(mockReels.map(() => true));
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlayPause = (idx: number) => {
    const video = videoRefs.current[idx];
    if (video) {
      if (playing[idx]) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
      const newPlaying = [...playing];
      newPlaying[idx] = !playing[idx];
      setPlaying(newPlaying);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const index = Math.round(scrollPosition / 420); // Height of container is 420px
    if (index !== activeIndex && index >= 0 && index < mockReels.length) {
      // Pause previous video
      const prevVideo = videoRefs.current[activeIndex];
      if (prevVideo) {
        prevVideo.pause();
      }
      // Play new video
      const nextVideo = videoRefs.current[index];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }

      // Update playing states
      const newPlaying = [...playing];
      newPlaying[activeIndex] = false;
      newPlaying[index] = true;
      setPlaying(newPlaying);
      setActiveIndex(index);
    }
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: "The Daily Manarah Reel",
        text: title,
        url: window.location.href
      });
    } else {
      alert("ভিডিও লিঙ্কটি কপি করা হয়েছে!");
    }
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
        <Video size={18} className="text-red-500 animate-pulse" />
        <h3 className="font-serif font-black text-base text-[var(--text-primary)]">
          মানারাহ শর্ট ভিডিও / রিলস
        </h3>
      </div>

      {/* Reel viewport */}
      <div
        className="w-full max-w-[280px] h-[420px] mx-auto rounded-2xl overflow-hidden bg-black relative snap-y snap-mandatory overflow-y-scroll scroll-smooth"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none" }}
      >
        {mockReels.map((reel, idx) => (
          <div
            key={reel.id}
            className="w-full h-[420px] flex-shrink-0 snap-start relative flex items-center justify-center bg-zinc-950"
          >
            {/* HTML5 Video */}
            <video
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={reel.videoUrl}
              loop
              muted={muted}
              playsInline
              autoPlay={idx === 0}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handlePlayPause(idx)}
            />

            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Sound Toggle */}
            <button
              onClick={() => setMuted(!muted)}
              className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition"
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Video Controls (Center Play/Pause Indicator) */}
            {!playing[idx] && (
              <button
                onClick={() => handlePlayPause(idx)}
                className="absolute inset-0 flex items-center justify-center text-white/80 hover:text-white"
              >
                <Play size={48} className="bg-black/30 p-3 rounded-full backdrop-blur-sm" />
              </button>
            )}

            {/* Side Action Buttons */}
            <div className="absolute right-4 bottom-16 flex flex-col gap-4 text-white z-10">
              <button className="flex flex-col items-center gap-1 group">
                <Heart size={20} className="text-red-500 fill-red-500 group-hover:scale-110 transition" />
                <span className="text-[10px] font-bold">{reel.likes}</span>
              </button>
              <button
                onClick={() => handleShare(reel.title)}
                className="flex flex-col items-center gap-1 hover:text-emerald-400 transition"
              >
                <Share2 size={20} />
                <span className="text-[10px] font-bold">শেয়ার</span>
              </button>
            </div>

            {/* Bottom Title & Views */}
            <div className="absolute left-4 right-16 bottom-4 text-white z-10 flex flex-col gap-1 pointer-events-none">
              <p className="text-[11px] font-semibold text-slate-300">
                {reel.views} বার দেখা হয়েছে
              </p>
              <h4 className="text-xs font-bold leading-relaxed line-clamp-2 drop-shadow">
                {reel.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
