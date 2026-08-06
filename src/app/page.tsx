"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { BangladeshMap } from "@/components/News/BangladeshMap";
import { VideoReels } from "@/components/News/VideoReels";
import { TrendingUp, Award, BookOpen, ExternalLink, ShieldCheck, Mail, Play, Camera, Star } from "lucide-react";
import Link from "next/link";

// Premium mock news data matching the categories as fallback
const mockPosts: NewsItem[] = [
  {
    id: "p-1",
    title: "দেশের নতুন অর্থনৈতিক সংস্কার ও তরুণদের জন্য কর্মসংস্থান সৃষ্টি",
    slug: "politics-economic-reform-youth-jobs",
    summary: "দেশের চলমান অর্থনৈতিক সংস্কার নীতির আওতায় তথ্যপ্রযুক্তি খাতে লাখো তরুণের জন্য নতুন কর্মসংস্থান সৃষ্টির প্রতিশ্রুতি দেওয়া হয়েছে। আবহাওয়া ও পলিসি বিশেষজ্ঞরা এটি সাধুবাদ জানিয়েছেন।",
    coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop",
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
    summary: "আসন্ন গেমসে স্বর্ণপদক বিজয়ী এশিয়ান অ্যাথলেটের নতুন রেকর্ড। খেলাধুলা খাতে এই জয় এক ইতিহাস সৃষ্টি করেছে।",
    coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop",
    isVerified: true,
    category: { name: "মাল্টিমিডিয়া", slug: "multimedia" },
    author: { name: "কাজী রায়হান" },
    views: 2450,
    createdAt: new Date(Date.now() - 3600000 * 2)
  },
  {
    id: "p-3",
    title: "কৃত্রিম বুদ্ধিমত্তা ও ভবিষ্যৎ কর্মসংস্থান: একটি গভীর সমাজতাত্ত্বিক विश्लेषण",
    slug: "artificial-intelligence-and-job-future",
    summary: "ইন্টারনেটের প্রভাবে ভুয়া তথ্য ও কৃত্রিম বুদ্ধিমত্তা কীভাবে ভবিষ্যৎ জব মার্কেটকে নিয়ন্ত্রণ করতে যাচ্ছে তা নিয়ে বিশেষ প্রতিবেদন।",
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
    summary: "আন্তর্জাতিক বাজারে স্বর্ণের দাম বাড়ার পরিপ্রেক্ষিতে দেশীয় বাজারে নতুন প্রাইস চার্ট ঘোষণা করেছে বাজুস।",
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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState<NewsItem[]>(mockPosts);

  const getCategoryPosts = (catSlug: string) => {
    return posts.filter(p => 
      p.category.slug === catSlug || 
      p.category.slug.startsWith(catSlug + "-") || 
      (p as any).categorySlug === catSlug
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPosts(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch homepage posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubscribed(false);
    
    if (!email.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "সাবস্ক্রাইব করা সম্ভব হয়নি।");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("সার্ভার ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  // Safe category retrieval
  const politicsPosts = getCategoryPosts("politics");
  const factPosts = getCategoryPosts("fact-check-research");
  const dawahPosts = getCategoryPosts("islamic-life");
  const humanityPosts = getCategoryPosts("humanity-society");
  const opinionPosts = getCategoryPosts("opinion-editorial");
  const multimediaPosts = getCategoryPosts("multimedia");

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col gap-8 flex-grow">
        
        {/* Top bar scroll to map navigation link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] px-5 py-3 rounded-2xl shadow-sm">
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            🔍 নিরপেক্ষ সংবাদ পরিবেশন এবং সত্য ও নৈতিক সুন্নাহভিত্তিক জীবনবোধ ছড়িয়ে দিতে প্রতিশ্রুতিবদ্ধ ডেইলি মানারাহ্।
          </span>
          <button
            onClick={() => {
              const el = document.getElementById("bangladesh-map");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[11px] font-black bg-emerald-50 hover:bg-emerald-100 dark:bg-zinc-850 text-emerald-700 dark:text-emerald-400 border border-emerald-250 px-4 py-1.5 rounded-full shadow-xs transition"
          >
            🗺️ মানচিত্র ভিত্তিক খবর দেখুন ↓
          </button>
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
            
            <HeroGrid posts={posts} />

            {/* ➔ Category Row 1: জাতীয় ও রাজনীতি (White Background) */}
            {politicsPosts.length > 0 && (
              <div className="flex flex-col gap-4 border-b border-[var(--border-color)] pb-8 mt-6">
                <div className="flex items-center justify-between border-b-2 border-amber-500 dark:border-amber-600 pb-2">
                  <h3 className="font-serif font-black text-base md:text-lg text-[var(--text-primary)] tracking-wide">
                    জাতীয় ও রাজনীতি
                  </h3>
                  <Link href="/category/politics" className="text-xs font-bold text-slate-500 hover:text-[var(--accent-color)] transition-colors">
                    সব খবর →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7 flex flex-col gap-3 group">
                    <Link href={`/article/${politicsPosts[0].slug}`} className="relative block overflow-hidden rounded-xl aspect-[16/10] border border-slate-100 dark:border-zinc-800">
                      <img src={politicsPosts[0].coverImage} alt={politicsPosts[0].title} className="w-full h-full object-cover transition duration-500 group-hover:scale-102" />
                    </Link>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(politicsPosts[0].createdAt).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      <Link href={`/article/${politicsPosts[0].slug}`}>
                        <h4 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug">
                          {politicsPosts[0].title}
                        </h4>
                      </Link>
                      {politicsPosts[0].summary && (
                        <p className="text-xs text-slate-550 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {politicsPosts[0].summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-5 flex flex-col gap-4">
                    {politicsPosts.slice(1, 4).map((post) => (
                      <div key={post.id} className="flex gap-3 justify-between items-start pb-3 border-b border-slate-100 dark:border-zinc-850 last:border-0 last:pb-0 group">
                        <div className="flex flex-col gap-1 w-2/3">
                          <span className="text-[9px] font-bold text-slate-450 dark:text-zinc-500">
                            {new Date(post.createdAt).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <Link href={`/article/${post.slug}`}>
                            <h5 className="font-serif font-black text-xs text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug line-clamp-2">
                              {post.title}
                            </h5>
                          </Link>
                        </div>
                        <Link href={`/article/${post.slug}`} className="relative block overflow-hidden rounded-lg w-16 h-16 shrink-0 border border-slate-100 dark:border-zinc-800">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ➔ Category Row 2: ফ্যাক্ট-চেক ও গবেষণা (Alternating Premium Cream/Yellow Background) */}
            {factPosts.length > 0 && (
              <div className="flex flex-col gap-4 bg-amber-50/30 dark:bg-zinc-900/20 p-6 rounded-2xl border border-amber-100/50 dark:border-zinc-800/40 pb-8 mt-6">
                <div className="flex items-center justify-between border-b-2 border-amber-500 dark:border-amber-600 pb-2">
                  <h3 className="font-serif font-black text-base md:text-lg text-[var(--text-primary)] tracking-wide flex items-center gap-1.5">
                    <ShieldCheck size={18} className="text-amber-500" />
                    <span>ফ্যাক্ট-চেক ও গবেষণা</span>
                  </h3>
                  <Link href="/category/fact-check-research" className="text-xs font-bold text-slate-550 hover:text-[var(--accent-color)] transition-colors">
                    সব খবর →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7 flex flex-col gap-3 group">
                    <Link href={`/article/${factPosts[0].slug}`} className="relative block overflow-hidden rounded-xl aspect-[16/10] border border-slate-100 dark:border-zinc-800">
                      <img src={factPosts[0].coverImage} alt={factPosts[0].title} className="w-full h-full object-cover transition duration-500 group-hover:scale-102" />
                    </Link>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(factPosts[0].createdAt).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      <Link href={`/article/${factPosts[0].slug}`}>
                        <h4 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug">
                          {factPosts[0].title}
                        </h4>
                      </Link>
                      {factPosts[0].summary && (
                        <p className="text-xs text-slate-550 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {factPosts[0].summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-5 flex flex-col gap-4">
                    {factPosts.slice(1, 4).map((post) => (
                      <div key={post.id} className="flex gap-3 justify-between items-start pb-3 border-b border-slate-100 dark:border-zinc-850 last:border-0 last:pb-0 group">
                        <div className="flex flex-col gap-1 w-2/3">
                          <span className="text-[9px] font-bold text-slate-450 dark:text-zinc-500">
                            {new Date(post.createdAt).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <Link href={`/article/${post.slug}`}>
                            <h5 className="font-serif font-black text-xs text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug line-clamp-2">
                              {post.title}
                            </h5>
                          </Link>
                        </div>
                        <Link href={`/article/${post.slug}`} className="relative block overflow-hidden rounded-lg w-16 h-16 shrink-0 border border-slate-100 dark:border-zinc-800">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ➔ Category Row 3: Dual Split Column Row (দাওয়াহ ও ইসলামিক জীবন + মানবসেবা ও সমাজ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[var(--border-color)] pb-8 mt-6">
              {/* Left Column Category: দাওয়াহ ও ইসলামিক জীবন */}
              <div>
                <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-2 mb-4">
                  <h3 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)] tracking-wide">
                    দাওয়াহ ও ইসলামিক জীবন
                  </h3>
                  <Link href="/category/islamic-life" className="text-xs font-bold text-slate-500 hover:text-[var(--accent-color)]">
                    সব →
                  </Link>
                </div>
                {dawahPosts.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 group">
                      <Link href={`/article/${dawahPosts[0].slug}`} className="relative block overflow-hidden rounded-xl aspect-[16/10] border border-slate-100 dark:border-zinc-800">
                        <img src={dawahPosts[0].coverImage} alt={dawahPosts[0].title} className="w-full h-full object-cover transition duration-500 group-hover:scale-102" />
                      </Link>
                      <Link href={`/article/${dawahPosts[0].slug}`}>
                        <h4 className="font-serif font-black text-xs md:text-sm text-[var(--text-primary)] hover:text-[var(--accent-color)] leading-snug line-clamp-2">
                          {dawahPosts[0].title}
                        </h4>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      {dawahPosts.slice(1, 3).map(post => (
                        <Link key={post.id} href={`/article/${post.slug}`} className="text-xs font-semibold text-slate-600 dark:text-zinc-350 hover:text-[var(--accent-color)] transition leading-snug block border-t border-slate-105 dark:border-zinc-850 pt-2.5">
                          • {post.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">কোনো পোস্ট পাওয়া যায়নি</p>
                )}
              </div>

              {/* Right Column Category: মানবসেবা ও সমাজ */}
              <div>
                <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-2 mb-4">
                  <h3 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)] tracking-wide">
                    মানবসেবা ও সমাজ
                  </h3>
                  <Link href="/category/humanity-society" className="text-xs font-bold text-slate-500 hover:text-[var(--accent-color)]">
                    সব →
                  </Link>
                </div>
                {humanityPosts.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 group">
                      <Link href={`/article/${humanityPosts[0].slug}`} className="relative block overflow-hidden rounded-xl aspect-[16/10] border border-slate-100 dark:border-zinc-800">
                        <img src={humanityPosts[0].coverImage} alt={humanityPosts[0].title} className="w-full h-full object-cover transition duration-500 group-hover:scale-102" />
                      </Link>
                      <Link href={`/article/${humanityPosts[0].slug}`}>
                        <h4 className="font-serif font-black text-xs md:text-sm text-[var(--text-primary)] hover:text-[var(--accent-color)] leading-snug line-clamp-2">
                          {humanityPosts[0].title}
                        </h4>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      {humanityPosts.slice(1, 3).map(post => (
                        <Link key={post.id} href={`/article/${post.slug}`} className="text-xs font-semibold text-slate-600 dark:text-zinc-350 hover:text-[var(--accent-color)] transition leading-snug block border-t border-slate-105 dark:border-zinc-850 pt-2.5">
                          • {post.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">কোনো পোস্ট পাওয়া যায়নি</p>
                )}
              </div>
            </div>

            {/* ➔ Category Row 4: ভিডিও ও মাল্টিমিডিয়া গ্যালারি (Play button overlays) */}
            {multimediaPosts.length > 0 && (
              <div className="flex flex-col gap-4 bg-slate-950 text-white p-6 rounded-2xl border border-zinc-800 pb-8 mt-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <h3 className="font-serif font-black text-base md:text-lg text-amber-400 tracking-wide flex items-center gap-1.5">
                    <Play size={18} fill="currentColor" />
                    <span>ভিডিও স্টোরি ও মাল্টিমিডিয়া</span>
                  </h3>
                  <Link href="/category/multimedia" className="text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors">
                    সব ভিডিও →
                  </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left: Large Video Card */}
                  <div className="lg:col-span-7 flex flex-col gap-3 group relative justify-between">
                    <Link href={`/article/${multimediaPosts[0].slug}`} className="relative block overflow-hidden rounded-xl aspect-[16/10] border border-zinc-800 w-full">
                      <img src={multimediaPosts[0].coverImage} alt={multimediaPosts[0].title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 hover:bg-black/55 transition flex items-center justify-center">
                        <span className="p-3 bg-red-600 rounded-full text-white shadow-lg animate-pulse hover:scale-105 transition">
                          <Play size={24} fill="currentColor" />
                        </span>
                      </div>
                    </Link>
                    <Link href={`/article/${multimediaPosts[0].slug}`}>
                      <h4 className="font-serif font-black text-sm md:text-base text-zinc-100 hover:text-amber-400 transition-colors leading-snug">
                        {multimediaPosts[0].title}
                      </h4>
                    </Link>
                  </div>

                  {/* Right: 4 Smaller Video Grid (2x2) */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                    {multimediaPosts.slice(1, 5).map((post) => (
                      <div key={post.id} className="flex flex-col gap-1.5 group relative justify-between">
                        <Link href={`/article/${post.slug}`} className="relative block overflow-hidden rounded-lg aspect-[16/9] border border-zinc-850">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="p-1.5 bg-red-650 rounded-full text-white shadow">
                              <Play size={10} fill="currentColor" />
                            </span>
                          </div>
                        </Link>
                        <Link href={`/article/${post.slug}`}>
                          <h5 className="font-serif font-bold text-[10px] text-zinc-200 hover:text-amber-400 transition line-clamp-2 leading-snug">
                            {post.title}
                          </h5>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ➔ Category Row 5: মতামত ও বিশ্লেষণ (White Background) */}
            {opinionPosts.length > 0 && (
              <div className="flex flex-col gap-4 border-b border-[var(--border-color)] pb-8 mt-6">
                <div className="flex items-center justify-between border-b-2 border-amber-500 dark:border-amber-600 pb-2">
                  <h3 className="font-serif font-black text-base md:text-lg text-[var(--text-primary)] tracking-wide">
                    মতামত ও সম্পাদকীয় কলাম
                  </h3>
                  <Link href="/category/opinion-editorial" className="text-xs font-bold text-slate-500 hover:text-[var(--accent-color)] transition-colors">
                    সব খবর →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7 flex flex-col gap-3 group">
                    <Link href={`/article/${opinionPosts[0].slug}`} className="relative block overflow-hidden rounded-xl aspect-[16/10] border border-slate-100 dark:border-zinc-800">
                      <img src={opinionPosts[0].coverImage} alt={opinionPosts[0].title} className="w-full h-full object-cover transition duration-500 group-hover:scale-102" />
                    </Link>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(opinionPosts[0].createdAt).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      <Link href={`/article/${opinionPosts[0].slug}`}>
                        <h4 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug">
                          {opinionPosts[0].title}
                        </h4>
                      </Link>
                      {opinionPosts[0].summary && (
                        <p className="text-xs text-slate-550 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {opinionPosts[0].summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-5 flex flex-col gap-4">
                    {opinionPosts.slice(1, 4).map((post) => (
                      <div key={post.id} className="flex gap-3 justify-between items-start pb-3 border-b border-slate-100 dark:border-zinc-850 last:border-0 last:pb-0 group">
                        <div className="flex flex-col gap-1 w-2/3">
                          <span className="text-[9px] font-bold text-slate-450 dark:text-zinc-500">
                            {new Date(post.createdAt).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <Link href={`/article/${post.slug}`}>
                            <h5 className="font-serif font-black text-xs text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug line-clamp-2">
                              {post.title}
                            </h5>
                          </Link>
                        </div>
                        <Link href={`/article/${post.slug}`} className="relative block overflow-hidden rounded-lg w-16 h-16 shrink-0 border border-slate-100 dark:border-zinc-800">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ➔ Row 6: Photo Gallery / Carousel Grid */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-2">
                <h3 className="font-serif font-black text-base md:text-lg text-[var(--text-primary)] tracking-wide flex items-center gap-1.5">
                  <Camera size={18} className="text-emerald-600" />
                  <span>ফটো গ্যালারি (ছবিতে খবর)</span>
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {posts.slice(5, 9).map((post) => (
                  <div key={post.id} className="flex flex-col bg-[var(--bg-card)] rounded-xl overflow-hidden border border-[var(--border-color)] group shadow-xs">
                    <Link href={`/article/${post.slug}`} className="relative block overflow-hidden aspect-square">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3">
                        <span className="text-[8px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded w-max mb-1">
                          {post.category.name}
                        </span>
                        <h4 className="text-[10px] md:text-[11px] font-bold text-white leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

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

            {/* Newsletter Subscription Card in Sidebar (Fallback) */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="font-serif font-black text-sm text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2 flex items-center space-x-2">
                <Star size={16} className="text-amber-500" />
                <span>মানারাহ্ ফাউন্ডেশন</span>
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ডেইলি মানারাহ্-এর কাজের প্রধান ফোকাস হচ্ছে সমাজ থেকে অপসংস্কৃতি, ভুয়া খবর (Fake News) ও কুতথ্য মোকাবিলা করা।
              </p>
              <Link href="/donate" className="w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 rounded-xl text-xs transition">
                মানারাহ ফাউন্ডেশনে অনুদান দিন
              </Link>
            </div>

            {/* Video reels highlights */}
            <VideoReels />
          </div>

        </div> {/* grid grid-cols-1 lg:grid-cols-12 gap-8 */}

        {/* ➔ Gold Newsletter Subscription Banner at the bottom (Fits side-by-side elements inside) */}
        <div className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex flex-col gap-2 md:w-1/2">
            <h3 className="font-serif font-black text-base md:text-xl flex items-center gap-2">
              <Mail size={22} />
              <span>ডেইলি মানারাহ্ নিউজলেটার</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-900 font-medium">
              সাপ্তাহিক প্রধান খবর, গুরুত্বপূর্ণ ফ্যাক্ট-চেক রিপোর্ট এবং সত্য সংবাদগুলোর নোটিফিকেশন সরাসরি ইনবক্সে পেতে সাবস্ক্রাইব করুন।
            </p>
          </div>
          
          <div className="w-full md:w-1/2 max-w-md">
            {subscribed ? (
              <div className="bg-white/95 text-emerald-700 font-bold p-4 rounded-2xl text-xs border border-emerald-200">
                ✓ ধন্যবাদ! আপনার ইমেইলটি সফলভাবে নিউজলেটারে যুক্ত হয়েছে।
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 bg-white/90 p-2 rounded-2xl shadow-inner w-full">
                <input
                  type="email"
                  required
                  placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-0 rounded px-3 py-2 text-xs w-full outline-none text-slate-900 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs transition shrink-0"
                >
                  {loading ? "..." : "সাবস্ক্রাইব"}
                </button>
              </form>
            )}
            {errorMsg && (
              <p className="text-xs text-red-750 font-bold mt-2">{errorMsg}</p>
            )}
          </div>
        </div>

        {/* Full Width Bottom Map Section */}
        <div id="bangladesh-map" className="w-full border-t border-[var(--border-color)] pt-8 mt-4 scroll-mt-20">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="font-serif font-black text-xl md:text-2xl text-[var(--text-primary)] flex items-center gap-2">
              <Award size={22} className="text-emerald-650 animate-bounce" />
              <span>মানচিত্র ভিত্তিক খবর (ঠাকুরগাঁও ও দেশজুড়ে)</span>
            </h2>
            <p className="text-xs text-slate-550 dark:text-zinc-500">
              নিচের ইন্টারেক্টিভ ম্যাপ থেকে বিভাগ ও জেলা সিলেক্ট করে নির্দিষ্ট অঞ্চলের সংবাদ ফিল্টার করুন।
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-10 shadow-sm">
            <BangladeshMap />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
