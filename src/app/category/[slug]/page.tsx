"use client";

import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { Award } from "lucide-react";

const allMockPosts: NewsItem[] = [
  {
    id: "p-1",
    title: "ঢাকায় মুষলধারে বৃষ্টি: জলজট ও ট্রাফিক জ্যামে নাকাল নগরবাসী, দুর্ভোগ চরমে",
    slug: "dhaka-heavy-rain-traffic-jam",
    summary: "আজ সকাল থেকেই রাজধানীর বিভিন্ন এলাকায় একটানা বৃষ্টিপাত রেকর্ড করা হয়েছে। মিরপুর, ধানমন্ডি এবং কাওরান বাজারের প্রধান সড়কগুলো পানিতে তলিয়ে যাওয়ায় যানবাহন চলাচল প্রায় বন্ধ হয়ে পড়েছে। আবহাওয়া অফিস আরও ২ দিন বৃষ্টির পূর্বাভাস দিয়েছে।",
    coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop",
    isVerified: true,
    category: { name: "রাজনীতি & জাতীয়", slug: "politics" },
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
    category: { name: "খেলাধুলা", slug: "sports" },
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
    category: { name: "সমাজবিজ্ঞান", slug: "sociology" },
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
    category: { name: "বিশ্ব সংবাদ", slug: "international" },
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
    category: { name: "প্রুক্তি", slug: "technology" },
    author: { name: "সারাহ তাসনিম" },
    views: 3100,
    createdAt: new Date(Date.now() - 3600000 * 12)
  }
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Filter posts by active category slug
  const filteredPosts = allMockPosts.filter((post) => post.category.slug === params.slug);

  const categoryName = 
    params.slug === "politics" ? "জাতীয় ও রাজনীতি" :
    params.slug === "fact-check-research" ? "ফ্যাক্ট-চেক ও গবেষণা" :
    params.slug === "islamic-life" ? "দাওয়াহ ও ইসলামিক জীবন" :
    params.slug === "humanity-society" ? "মানবসেবা ও সমাজ" :
    params.slug === "opinion-editorial" ? "মতামত ও বিশ্লেষণ" :
    params.slug === "multimedia" ? "মাল্টিমিডিয়া" : "খবর";

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col gap-8 flex-grow">
        
        {/* Category Header */}
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
          <Award size={20} className="text-[var(--accent-color)]" />
          <h2 className="font-serif font-black text-lg md:text-xl text-[var(--text-primary)]">
            বিভাগ: {categoryName}
          </h2>
        </div>

        {/* Display filtered posts or fallback */}
        {filteredPosts.length > 0 ? (
          <HeroGrid posts={filteredPosts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <span className="text-sm">এই ক্যাটাগরিতে বর্তমানে কোনো প্রকাশিত সংবাদ নেই।</span>
            <span className="text-xs">শীঘ্রই নতুন সংবাদ যোগ করা হবে।</span>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
