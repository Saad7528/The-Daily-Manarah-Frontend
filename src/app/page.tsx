"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { BangladeshMap } from "@/components/News/BangladeshMap";
import { VideoReels } from "@/components/News/VideoReels";
import { TrendingUp, Award, BookOpen, ExternalLink, ShieldCheck, Mail } from "lucide-react";
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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState<NewsItem[]>(mockPosts);

  const categoriesToRender = [
    { name: "জাতীয় ও রাজনীতি", slug: "politics" },
    { name: "ফ্যাক্ট-চেক ও গবেষণা", slug: "fact-check-research" },
    { name: "দাওয়াহ ও ইসলামিক জীবন", slug: "islamic-life" },
    { name: "মানবসেবা ও সমাজ", slug: "humanity-society" },
    { name: "মতামত ও বিশ্লেষণ", slug: "opinion-editorial" },
    { name: "মাল্টিমিডিয়া", slug: "multimedia" }
  ];

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

        {/* Top bar scroll to map navigation link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] px-5 py-3 rounded-2xl shadow-sm">
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            খবরের সত্যতা যাচাই এবং সমাজ সেবায় দ্য ডেইলি মানারাহ
          </span>
          <button
            onClick={() => {
              const el = document.getElementById("bangladesh-map");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[11px] font-black bg-emerald-50 hover:bg-emerald-100 dark:bg-zinc-800 text-emerald-700 dark:text-emerald-400 border border-emerald-250 px-4 py-1.5 rounded-full shadow-xs transition"
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

            {/* Category-wise news sections rendered dynamically */}
            <div className="flex flex-col gap-10 mt-6">
              {categoriesToRender.map((item) => {
                const catPosts = getCategoryPosts(item.slug);
                if (catPosts.length === 0) return null;
                const lead = catPosts[0];
                const list = catPosts.slice(1, 4);

                return (
                  <div key={item.slug} className="flex flex-col gap-4 border-b border-[var(--border-color)] pb-8 last:border-0 last:pb-0">
                    {/* Category Header with thick bottom border */}
                    <div className="flex items-center justify-between border-b-2 border-amber-500 dark:border-amber-600 pb-2">
                      <h3 className="font-serif font-black text-base md:text-lg text-[var(--text-primary)] tracking-wide">
                        {item.name}
                      </h3>
                      <Link href={`/category/${item.slug}`} className="text-xs font-bold text-slate-500 hover:text-[var(--accent-color)] transition-colors">
                        সব খবর →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left: Lead Post */}
                      <div className="md:col-span-7 flex flex-col gap-3 group">
                        <Link href={`/article/${lead.slug}`} className="relative block overflow-hidden rounded-xl aspect-[16/10] border border-slate-100 dark:border-zinc-800">
                          <img
                            src={lead.coverImage}
                            alt={lead.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          />
                        </Link>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-bold text-slate-400">
                            {new Date(lead.createdAt).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <Link href={`/article/${lead.slug}`}>
                            <h4 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug">
                              {lead.title}
                            </h4>
                          </Link>
                          {lead.summary && (
                            <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                              {lead.summary}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: List of posts */}
                      <div className="md:col-span-5 flex flex-col gap-4">
                        {list.map((post) => (
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
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
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

            {/* Map Removed from sidebar and placed as full width bottom layout */}

            {/* Newsletter Subscription Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="font-serif font-black text-sm text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2 flex items-center space-x-2">
                <Mail size={16} className="text-emerald-600" />
                <span>নিউজলেটার সাবস্ক্রিপশন</span>
              </h3>
              <p className="text-[11px] text-slate-450 dark:text-zinc-500 leading-relaxed">
                ডেইলি মানারাহর প্রধান ও সত্যতা যাচাইকৃত খবরগুলোর সাপ্তাহিক ইমেইল নোটিফিকেশন পেতে আপনার ইমেইলটি দিয়ে সাবস্ক্রাইব করুন।
              </p>
              
              {subscribed && (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-2.5 rounded border border-emerald-250 text-[10px]">
                  ধন্যবাদ! আপনি নিউজলেটারে যুক্ত হয়েছেন।
                </div>
              )}
              {errorMsg && (
                <div className="bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 p-2.5 rounded border border-red-200 text-[10px]">
                  {errorMsg}
                </div>
              )}

              {!subscribed && (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded px-2.5 py-1.5 text-xs w-full outline-none focus:ring-1 focus:ring-emerald-550 focus:border-emerald-600 transition"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded text-xs transition disabled:opacity-50"
                  >
                    {loading ? "..." : "যুক্ত হন"}
                  </button>
                </form>
              )}
            </div>

            {/* Video reels highlights */}
            <VideoReels />
          </div>

        </div> {/* grid grid-cols-1 lg:grid-cols-12 gap-8 */}

        {/* Full Width Bottom Map Section */}
        <div id="bangladesh-map" className="w-full border-t border-[var(--border-color)] pt-8 mt-4 scroll-mt-20">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="font-serif font-black text-xl md:text-2xl text-[var(--text-primary)] flex items-center gap-2">
              <Award size={22} className="text-emerald-650" />
              <span>মানচিত্র ভিত্তিক খবর (ঠাকুরগাঁও ও দেশজুড়ে)</span>
            </h2>
            <p className="text-xs text-slate-500">
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
