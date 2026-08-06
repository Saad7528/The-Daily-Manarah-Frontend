"use client";

import React, { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { BangladeshMap } from "@/components/News/BangladeshMap";
import { VideoReels } from "@/components/News/VideoReels";
import { TrendingUp, Award, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

// Premium mock news data matching the categories
const mockPosts: NewsItem[] = [
  {
    id: "p-1",
    title: "ঢাকায় মুষলধারে বৃষ্টি: জলজট ও ট্রাফিক জ্যামে নাকাল নগরবাসী, দুর্ভোগ চরমে",
    slug: "dhaka-heavy-rain-traffic-jam",
    summary: "আজ সকাল থেকেই রাজধানীর বিভিন্ন এলাকায় একটানা বৃষ্টিপাত রেকর্ড করা হয়েছে। মিরপুর, ধানমন্ডি এবং কাওরান বাজারের প্রধান সড়কগুলো পানিতে তলিয়ে যাওয়ায় যানবাহন চলাচল প্রায় বন্ধ হয়ে পড়েছে। আবহাওয়া অফিস আরও ২ দিন বৃষ্টির পূর্বাভাস দিয়েছে।",
    coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop",
    isVerified: true,
    category: { name: "জাতীয় ও রাজনীতি", slug: "politics" },
    author: { name: "কাজী রায়হান" },
    views: 4520,
    createdAt: new Date()
  },
  {
    id: "p-2",
    title: "অলিম্পিক গেমসের নতুন স্বর্ণপদক রেকর্ড: ইতিহাস গড়লেন এই এশিয়ান অ্যাথলেট",
    slug: "olympic-new-gold-medal-record",
    coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop",
    isVerified: true,
    category: { name: "মাল্টিমিডিয়া", slug: "multimedia" },
    author: { name: "কাজী রায়হান" },
    views: 2450,
    createdAt: new Date(Date.now() - 3600000 * 2)
  },
  {
    id: "p-3",
    title: "কৃত্রিম বুদ্ধিমত্তা ও ভবিষ্যৎ কর্মসংস্থান: একটি গভীর সমাজতাত্ত্বিক বিশ্লেষণ",
    slug: "artificial-intelligence-and-job-future",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
    isVerified: false,
    category: { name: "ফ্যাক্ট-চেক ও গবেষণা", slug: "fact-check-research" },
    author: { name: "সারাহ তাসনিম" },
    views: 1890,
    createdAt: new Date(Date.now() - 3600000 * 5)
  },
  {
    id: "p-4",
    title: "সোনার বাজারে নতুন রেকর্ড: আন্তর্জাতিক অস্থিরতায় ভরিতে বাড়ল ১৫০০ টাকা",
    slug: "gold-rate-new-record-high",
    coverImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&auto=format&fit=crop",
    isVerified: true,
    category: { name: "মানবসেবা ও সমাজ", slug: "humanity-society" },
    author: { name: "আহমেদ ফয়সাল" },
    views: 980,
    createdAt: new Date(Date.now() - 3600000 * 8)
  },
  {
    id: "p-5",
    title: "প্রযুক্তির আধুনিকায়ন এবং আমাদের নতুন প্রজন্মের সামাজিক অভ্যাস",
    slug: "technology-modernization-and-youth-habits",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
    isVerified: true,
    category: { name: "দাওয়াহ ও ইসলামিক জীবন", slug: "islamic-life" },
    author: { name: "সারাহ তাসনিম" },
    views: 3100,
    createdAt: new Date(Date.now() - 3600000 * 12)
  }
];

// Mock trending posts
const trendingPosts = [
  { id: "t-1", title: "আজকের বাজারে কাঁচামরিচ ও পেঁয়াজের দাম ফের ঊর্ধ্বমুখী", views: "১০.২K" },
  { id: "t-2", title: "মেট্রোরেলের সময়সূচিতে পরিবর্তন: নতুন শিডিউল দেখে নিন", views: "৮.৫K" },
  { id: "t-3", title: "বিশ্ব অর্থনীতি ও বাংলাদেশের রপ্তানি খাতের বর্তমান চ্যালেঞ্জ", views: "৭.১K" }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"trending" | "editors">("trending");

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col gap-8 flex-grow">
        
        {/* AdSense custom banner simulation (CLS-Safe Container) */}
        <div className="cls-safe-ad w-full flex-col p-4 rounded-xl border border-[var(--border-color)] transition bg-[var(--bg-card)]">
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">
            SPONSORED ADVERTISEMENT
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[var(--accent-color)]">The Daily Manarah Premium E-Paper:</span>
            <span className="text-xs text-slate-500">অনলাইনে ঘরে বসেই পড়ুন প্রতিদিনের টাটকা সংবাদপত্র। আজই সাবস্ক্রাইব করুন।</span>
            <Link href="/e-paper" className="text-xs font-bold text-[var(--accent-color)] hover:underline flex items-center gap-0.5 ml-auto">
              পড়ুন <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Home News section split: Main Grid (Left 8 Cols) + Sidebar (Right 4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <Award size={20} className="text-[var(--accent-color)]" />
              <h2 className="font-serif font-black text-lg md:text-xl text-[var(--text-primary)]">
                শীর্ষ সংবাদ ও বিশেষ প্রতিবেদন
              </h2>
            </div>
            
            <HeroGrid posts={mockPosts} />
          </div>

          {/* Sidebar Area (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Tab switch widget (Trending / Editors choice) */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex bg-slate-100 dark:bg-zinc-800 sepia:bg-[#dfceab] p-1 rounded-xl gap-1">
                <button
                  onClick={() => setActiveTab("trending")}
                  className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "trending"
                      ? "bg-[var(--bg-primary)] text-[var(--accent-color)] shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  সর্বাধিক পঠিত (Trending)
                </button>
                <button
                  onClick={() => setActiveTab("editors")}
                  className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "editors"
                      ? "bg-[var(--bg-primary)] text-[var(--accent-color)] shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  সম্পাদকীয় কলাম (Opinion)
                </button>
              </div>

              {/* Tab contents */}
              {activeTab === "trending" ? (
                <div className="flex flex-col gap-3">
                  {trendingPosts.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-950/20 sepia:hover:bg-[#dfceab]/30 transition"
                    >
                      <span className="shrink-0 flex items-center justify-center bg-slate-200 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-black text-sm w-7 h-7 rounded-full">
                        {idx + 1}
                      </span>
                      <div className="flex flex-col gap-1">
                        <Link href="/article/dummy" className="text-xs font-bold hover:text-[var(--accent-color)] text-[var(--text-primary)] transition leading-snug">
                          {item.title}
                        </Link>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                          <TrendingUp size={10} /> {item.views} বার পঠিত
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4 text-xs">
                  {/* Editor Column 1 */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="author" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-500">সারাহ তাসনিম</span>
                      <Link href="/article/dummy" className="font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)]">
                        ডিজিটাল যুগে সমাজবিজ্ঞান শিক্ষার রূপান্তর ও ভবিষ্যৎ
                      </Link>
                    </div>
                  </div>
                  {/* Editor Column 2 */}
                  <div className="flex gap-3 items-start border-t border-[var(--border-color)] pt-3">
                    <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="author" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-500">এম. এ. জলিল</span>
                      <Link href="/article/dummy" className="font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)]">
                        বস্তুনিষ্ঠ সাংবাদিকতা: বর্তমান সময়ের একটি কঠোর পরীক্ষা
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bangladesh Map Filter */}
            <BangladeshMap />

            {/* Video reels highlights */}
            <VideoReels />
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
