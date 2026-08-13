"use client";

// Triggering frontend Vercel redeploy to sync with the now online backend API

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { Award, Loader2 } from "lucide-react";

export function CategoryLayout({ initialPosts, slug }: { initialPosts: NewsItem[]; slug: string }) {
  const [posts, setPosts] = useState<NewsItem[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const categoryName = 
    slug === "politics" ? "জাতীয় ও রাজনীতি" :
    slug === "fact-check-research" ? "ফ্যাক্ট-চেক ও গবেষণা" :
    slug === "islamic-life" ? "দাওয়াহ ও ইসলামিক জীবন" :
    slug === "humanity-society" ? "মানবসেবা ও সমাজ" :
    slug === "opinion-editorial" ? "মতামত ও বিশ্লেষণ" :
    slug === "multimedia" ? "মাল্টিমিডিয়া" : "খবর";

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
          <div className="flex flex-col gap-10 w-full">
            {/* Featured Hero Grid */}
            <HeroGrid posts={posts} />

            {/* Other News Grid */}
            {posts.length > 4 && (
              <div className="flex flex-col gap-6 pt-6 border-t border-[var(--border-color)]">
                <h3 className="font-serif font-black text-lg md:text-xl text-[var(--text-primary)]">
                  অন্যান্য সংবাদ (Other News)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {posts.slice(4).map((post) => {
                    const formatDate = (dateVal: Date | string) => {
                      const d = new Date(dateVal);
                      return d.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" });
                    };
                    const formatViews = (views: number) => {
                      return views.toLocaleString("bn-BD");
                    };
                    return (
                      <div key={post.id} className="flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
                        <Link href={`/article/${post.slug}`} className="relative block overflow-hidden aspect-[16/9] border-b border-[var(--border-color)]">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                            {post.category.name}
                          </span>
                        </Link>
                        <div className="p-4 flex flex-col gap-2 justify-between flex-grow">
                          <Link href={`/article/${post.slug}`}>
                            <h4 className="font-serif font-black text-sm text-[var(--text-primary)] hover:text-[var(--accent-color)] leading-snug line-clamp-2">
                              {post.title}
                            </h4>
                          </Link>
                          {post.summary && (
                            <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                              {post.summary}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] font-medium pt-2 border-t border-slate-100 dark:border-zinc-800">
                            <span>{formatDate(post.createdAt)}</span>
                            <span>{formatViews(post.views)} বার পঠিত</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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
