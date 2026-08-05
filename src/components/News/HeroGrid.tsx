"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, MessageCircle, Eye, Calendar, User } from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  coverImage: string;
  isVerified: boolean;
  category: { name: string; slug: string };
  author: { name: string };
  views: number;
  createdAt: Date | string;
}

interface HeroGridProps {
  posts: NewsItem[];
}

export function HeroGrid({ posts }: HeroGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full text-center py-10 text-slate-500">
        কোনো সংবাদ পাওয়া যায়নি।
      </div>
    );
  }

  const leadPost = posts[0];
  const secondaryPosts = posts.slice(1, 5);

  const formatDate = (dateVal: Date | string) => {
    const d = new Date(dateVal);
    return d.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatViews = (views: number) => {
    return views.toLocaleString("bn-BD");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Grid Layout: 1 Lead Column + 4 Secondary Cards Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Large Lead Story (lg:col-span-7 or 8) */}
        <div className="lg:col-span-7 flex flex-col bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 group">
          <Link href={`/article/${leadPost.slug}`} className="relative block overflow-hidden aspect-[16/10]">
            <img
              src={leadPost.coverImage}
              alt={leadPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Category Tag */}
            <span className="absolute top-4 left-4 bg-[var(--accent-color)] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
              {leadPost.category.name}
            </span>
            {leadPost.isVerified && (
              <span className="absolute top-4 right-4 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm z-10 border border-emerald-500/20">
                <ShieldCheck size={12} />
                ভেরিফাইড রিপোর্ট
              </span>
            )}
          </Link>

          <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
            <div className="flex flex-col gap-2">
              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {leadPost.author.name}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(leadPost.createdAt)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {formatViews(leadPost.views)} বার পঠিত
                </span>
              </div>

              {/* Title */}
              <Link href={`/article/${leadPost.slug}`}>
                <h2 className="font-serif font-black text-xl md:text-2xl lg:text-3xl text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug">
                  {leadPost.title}
                </h2>
              </Link>

              {/* Summary */}
              {leadPost.summary && (
                <p className="text-sm text-slate-600 dark:text-zinc-400 sepia:text-[#705e4c] leading-relaxed line-clamp-3">
                  {leadPost.summary}
                </p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <Link
                href={`/article/${leadPost.slug}`}
                className="text-xs font-bold text-[var(--accent-color)] hover:underline inline-flex items-center gap-1"
              >
                বিস্তারিত পড়ুন →
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 Secondary Featured Stories (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondaryPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col bg-[var(--bg-card)] rounded-xl overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <Link href={`/article/${post.slug}`} className="relative block overflow-hidden aspect-[16/10]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {post.category.name}
                  </span>
                  {post.isVerified && (
                    <span className="absolute top-2 right-2 bg-emerald-600/90 text-white p-0.5 rounded-full" title="ভেরিফাইড রিপোর্ট">
                      <ShieldCheck size={12} />
                    </span>
                  )}
                </Link>

                <div className="p-4 flex flex-col gap-2 flex-grow justify-between">
                  <div className="flex flex-col gap-1.5">
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <span>{formatViews(post.views)} ভিউ</span>
                    </div>
                    {/* Title */}
                    <Link href={`/article/${post.slug}`}>
                      <h3 className="font-serif font-bold text-sm text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug line-clamp-3">
                        {post.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[var(--border-color)]">
                    <Link
                      href={`/article/${post.slug}`}
                      className="text-[11px] font-bold text-[var(--accent-color)] hover:underline"
                    >
                      পড়ুন →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
