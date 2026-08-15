"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Eye, Calendar, User } from "lucide-react";

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
      <div className="w-full text-center py-10 text-[var(--text-secondary)]">
        কোনো সংবাদ পাওয়া যায়নি।
      </div>
    );
  }

  const leadPost = posts[0];
  const sidePosts = posts.slice(1, 4); // Fetch 3 side posts for the left column stack

  const formatDate = (dateVal: Date | string) => {
    const d = new Date(dateVal);
    return d.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatViews = (views: number) => {
    return views.toLocaleString("bn-BD");
  };

  return (
    <div className="w-full">
      {/* 3-Column Layout topology inside Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Vertical Stack of 3 Mini News Cards (md:col-span-4 or 5) */}
        <div className="md:col-span-4 flex flex-col gap-5">
          {sidePosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-xs hover:shadow-md transition duration-300 group"
            >
              {/* Small Thumbnail Image */}
              <Link href={`/article/${post.slug}`} className="relative block overflow-hidden aspect-[16/9] border-b border-[var(--border-color)]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  {post.category.name}
                </span>
              </Link>

              {/* Text Info */}
              <div className="p-3.5 flex flex-col gap-1.5 justify-between flex-grow">
                <Link href={`/article/${post.slug}`}>
                  <h3 className="font-serif font-black text-xs md:text-sm text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] font-medium">
                  <span>{formatDate(post.createdAt)}</span>
                  <span>{formatViews(post.views)} বার পঠিত</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: The Big Spotlight Headline Story (md:col-span-8) */}
        <div className="md:col-span-8 flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-xs hover:shadow-md transition duration-300 group">
          
          {/* Main Large Image */}
          <Link href={`/article/${leadPost.slug}`} className="relative block overflow-hidden aspect-[16/10]">
            <img
              src={leadPost.coverImage}
              alt={leadPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            {/* Category Tag */}
            <span className="absolute top-4 left-4 bg-[var(--accent-color)] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
              {leadPost.category.name}
            </span>
            {leadPost.isVerified && (
              <span className="absolute top-4 right-4 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm z-10">
                <ShieldCheck size={12} />
                <span>ভেরিফাইড রিপোর্ট</span>
              </span>
            )}
          </Link>

          {/* Details */}
          <div className="p-6 flex flex-col gap-4">
            
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--text-secondary)] font-medium">
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
              <h2 className="font-serif font-black text-lg md:text-xl lg:text-2xl text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors leading-snug">
                {leadPost.title}
              </h2>
            </Link>

            {/* Summary */}
            {leadPost.summary && (
              <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                {leadPost.summary}
              </p>
            )}

            {/* Read More button */}
            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
              <Link
                href={`/article/${leadPost.slug}`}
                className="text-xs font-bold text-[var(--accent-color)] hover:text-[var(--accent-hover)] transition"
              >
                বিস্তারিত পড়ুন →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
