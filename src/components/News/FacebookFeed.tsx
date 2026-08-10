"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Heart, Share2, ChevronLeft, ChevronRight, ThumbsUp, Sparkles } from "lucide-react";

interface FacebookPost {
  id: string;
  text: string;
  image?: string;
  likes: number;
  commentsCount: number;
  shares: number;
  time: string;
  postUrl: string;
}

const mockFacebookPosts: FacebookPost[] = [
  {
    id: "fb_1",
    text: "আলহামদুলিল্লাহ! ঠাকুরগাঁওয়ের প্রত্যন্ত অঞ্চলের বানভাসি ও দুস্থ পরিবারগুলোর মাঝে খাদ্য ও শুকনো রেশন সফলভাবে বিতরণ করা হয়েছে। আপনাদের সকলের সাহায্য-সহযোগিতাই আমাদের এই পথচলার শক্তি। পাশে থাকার জন্য ধন্যবাদ। ❤️",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop",
    likes: 342,
    commentsCount: 28,
    shares: 15,
    time: "৩ ঘণ্টা আগে",
    postUrl: "https://www.facebook.com/manarahfoundation"
  },
  {
    id: "fb_2",
    text: "সচেতনতা বাড়াতে আজকের দিনের বিশেষ নোটিশ: সামাজিক যোগাযোগ মাধ্যমে ছড়ানো যেকোনো খবর শেয়ার করার পূর্বে উৎস যাচাই করে নিন। গুজব ছড়ানো রুখতে সর্বদা সজাগ থাকুন। দ্য ডেইলি মানারাহ্ সত্য অনুসন্ধানে আপনার পাশে। ✊",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop",
    likes: 189,
    commentsCount: 12,
    shares: 9,
    time: "৬ ঘণ্টা আগে",
    postUrl: "https://www.facebook.com/manarahfoundation"
  },
  {
    id: "fb_3",
    text: "আসন্ন শীতকালে সুবিধাবঞ্চিত ও এতিম শিশুদের মাঝে শীতবস্ত্র বিতরণের জন্য আমাদের প্রস্তুতিমূলক কার্যক্রম শুরু হয়েছে। আপনার অব্যবহৃত বা নতুন কম্বল/সোয়েটার দান করে আমাদের এই মানবিক উদ্যোগে শরিক হতে পারেন। বিস্তারিত জানতে ইনবক্স করুন। 🤝",
    image: "https://images.unsplash.com/photo-1469571486090-c5ff07096c68?w=600&auto=format&fit=crop",
    likes: 512,
    commentsCount: 45,
    shares: 32,
    time: "১ দিন আগে",
    postUrl: "https://www.facebook.com/manarahfoundation"
  }
];

export function FacebookFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mockFacebookPosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mockFacebookPosts.length) % mockFacebookPosts.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockFacebookPosts.length);
  };

  const currentPost = mockFacebookPosts[currentIndex];

  return (
    <div 
      className="w-full flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl overflow-hidden mt-6 transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header of the Widget */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-3 bg-[var(--bg-input)]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <span className="font-serif font-black text-xs text-[var(--text-primary)] tracking-wide">
            মানারাহ ফেসবুক পোস্ট
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles size={11} className="text-amber-500 animate-pulse" />
          <span className="text-[9px] font-black text-[var(--text-secondary)] tracking-widest uppercase">
            LIVE FEED
          </span>
        </div>
      </div>

      {/* Slider View Area */}
      <div className="p-4 flex flex-col gap-3 relative min-h-[360px] justify-between">
        
        {/* Post Meta */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[var(--border-color)] overflow-hidden flex items-center justify-center bg-[var(--bg-input)]">
              {/* Fallback to small text logo */}
              <span className="text-[10px] font-black text-amber-500">DM</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[var(--text-primary)] hover:underline cursor-pointer">
                  The Daily Manarah
                </span>
                {/* Verified badge */}
                <span className="flex items-center justify-center w-3 h-3 rounded-full bg-blue-500 text-white">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-1.5 h-1.5">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </span>
              </div>
              <span className="text-[9px] font-semibold text-[var(--text-secondary)]">
                {currentPost.time}
              </span>
            </div>
          </div>

          {/* Post Text */}
          <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-300">
            {currentPost.text}
          </p>
        </div>

        {/* Post Image Attachment */}
        {currentPost.image && (
          <div className="w-full rounded-xl overflow-hidden border border-[var(--border-color)] aspect-[16/10] relative bg-[var(--bg-input)] my-1">
            <img 
              src={currentPost.image} 
              alt="Facebook Feed Image" 
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
        )}

        {/* Reactions Counter Row */}
        <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-3 text-[10px] text-[var(--text-secondary)] font-bold">
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white border border-[var(--bg-card)]">
                <ThumbsUp size={8} />
              </span>
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white border border-[var(--bg-card)]">
                <Heart size={8} />
              </span>
            </div>
            <span>{currentPost.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{currentPost.commentsCount} মন্তব্য</span>
            <span>•</span>
            <span>{currentPost.shares} শেয়ার</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-around border-t border-[var(--border-color)] pt-2.5 mt-1 text-[10px] text-[var(--text-secondary)] font-bold">
          <a 
            href={currentPost.postUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-blue-500 transition py-1 px-2 rounded-lg hover:bg-[var(--bg-input)]"
          >
            <ThumbsUp size={12} />
            <span>লাইক</span>
          </a>
          <a 
            href={currentPost.postUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-green-500 transition py-1 px-2 rounded-lg hover:bg-[var(--bg-input)]"
          >
            <MessageSquare size={12} />
            <span>মন্তব্য</span>
          </a>
          <a 
            href={currentPost.postUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-amber-500 transition py-1 px-2 rounded-lg hover:bg-[var(--bg-input)]"
          >
            <Share2 size={12} />
            <span>শেয়ার</span>
          </a>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between border-t border-[var(--border-color)] px-4 py-2.5 bg-[var(--bg-input)] text-xs">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrev}
            className="p-1 rounded-md border border-[var(--border-color)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] transition"
          >
            <ChevronLeft size={14} />
          </button>
          <div className="flex gap-1.5">
            {mockFacebookPosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition ${
                  idx === currentIndex ? "bg-amber-500 scale-125" : "bg-[var(--border-color)]"
                }`}
              />
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="p-1 rounded-md border border-[var(--border-color)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] transition"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Visit Page Link */}
        <a 
          href="https://www.facebook.com/manarahfoundation" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-black text-amber-500 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wide"
        >
          <span>পেজ ভিজিট করুন</span>
          <ChevronRight size={10} />
        </a>
      </div>
    </div>
  );
}
