"use client";

// Triggering frontend Vercel redeploy to sync with the now online backend API

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { Award, Loader2 } from "lucide-react";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts?categorySlug=${params.slug}`
        );
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Failed to fetch category posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryPosts();
  }, [params.slug]);

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

        {/* Display loading, posts or fallback */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)] gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-color)]" />
            <span className="text-sm font-semibold">খবর লোড হচ্ছে...</span>
          </div>
        ) : posts.length > 0 ? (
          <HeroGrid posts={posts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <span className="text-sm font-semibold">এই ক্যাটাগরিতে বর্তমানে কোনো প্রকাশিত সংবাদ নেই।</span>
            <span className="text-xs">শীঘ্রই নতুন সংবাদ যোগ করা হবে।</span>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
