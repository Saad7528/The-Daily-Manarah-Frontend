"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { MapPin, Loader2 } from "lucide-react";
import { BangladeshMap } from "@/components/News/BangladeshMap";

const divisionBnNames: Record<string, string> = {
  dhaka: "ঢাকা",
  chattogram: "চট্টগ্রাম",
  sylhet: "সিলেট",
  khulna: "খুলনা",
  barishal: "বরিশাল",
  rajshahi: "রাজশাহী",
  rangpur: "রংপুর",
  mymensingh: "ময়মনসিংহ"
};

export function LocationLayout({ initialPosts, params }: { initialPosts: NewsItem[]; params: { slug?: string[] } }) {
  const locationPath = params.slug || [];
  const divisionId = locationPath[0] ? locationPath[0].toLowerCase() : "";

  const [posts, setPosts] = useState<NewsItem[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  // Format location titles
  const divisionNameBn = divisionBnNames[divisionId] || (divisionId ? divisionId.charAt(0).toUpperCase() + divisionId.slice(1) : "সারাদেশ");
  const thanaName = locationPath[1]
    ? locationPath[1].charAt(0).toUpperCase() + locationPath[1].slice(1)
    : "";

  const formattedLocation = thanaName
    ? `${thanaName}, ${divisionNameBn}`
    : divisionNameBn;

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 flex-grow">

        {/* Location Header */}
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
          <MapPin size={20} className="text-[var(--accent-color)]" />
          <h2 className="font-serif font-black text-lg md:text-xl text-[var(--text-primary)]">
            এলাকা ভিত্তিক খবর: {formattedLocation}
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-[var(--accent-color)]">
            <Loader2 size={36} className="animate-spin" />
            <span className="ml-2 font-medium">খবর লোড করা হচ্ছে...</span>
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
                      <div key={post.id} className="flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-xs hover:shadow-md transition duration-300 group">
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2 bg-[var(--bg-card)] rounded-lg border border-[var(--border-color)]">
              <span className="text-sm font-bold text-[var(--text-primary)]">দুঃখিত, {formattedLocation} এলাকায় এই মুহূর্তে কোনো প্রকাশিত সংবাদ নেই।</span>
              <span className="text-xs">শীঘ্রই রিপোর্টারদের পাঠানো সংবাদ এই পাতায় প্রদর্শন করা হবে।</span>
            </div>

            <div className="max-w-3xl mx-auto w-full">
              <BangladeshMap />
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
