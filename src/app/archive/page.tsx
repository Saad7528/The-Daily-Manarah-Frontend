"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Search, Filter, Calendar, Eye, ShieldCheck, ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  isVerified: boolean;
  views: number;
  createdAt: string;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
  };
}

export default function ArchivePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [division, setDivision] = useState("");
  const [sort, setSort] = useState("latest");
  const [onlyFactChecks, setOnlyFactChecks] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/categories`);
        if (res.ok) {
          const data = await res.json();
          // Filter to only parent categories (where parentId is null)
          setCategories(data.filter((c: any) => !c.parentId));
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Filtered Posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search.trim()) queryParams.append("search", search);
      if (categorySlug) queryParams.append("categorySlug", categorySlug);
      if (division) queryParams.append("division", division);
      if (sort === "views") queryParams.append("sort", "views");
      if (onlyFactChecks) queryParams.append("isVerified", "true");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts?${queryParams.toString()}`
      );
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [categorySlug, division, sort, onlyFactChecks]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h1 className="text-2xl font-black font-serif tracking-tight">সংবাদ আর্কাইভ ও অনুসন্ধান পোর্টাল</h1>
          <p className="text-xs text-slate-400 mt-1">পুরনো যেকোনো খবর ও ফ্যাক্ট-চেক রিপোর্ট সহজে খুঁজে নিন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filter Panel (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3 text-emerald-600 dark:text-emerald-400">
              <Filter size={18} />
              <h3 className="font-bold text-sm">ফিল্টার সমূহ</h3>
            </div>

            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">সার্চ কি-ওয়ার্ড</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs">
                <input
                  type="text"
                  placeholder="খবরের শিরোনাম বা বিষয়..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none w-full text-slate-800 dark:text-slate-150"
                />
                <button type="submit" className="text-slate-450 hover:text-emerald-650 transition">
                  <Search size={14} />
                </button>
              </div>
            </form>

            {/* Category Select */}
            <div className="flex flex-col gap-1.5 text-xs">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">বিভাগ/ক্যাটাগরি</label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 outline-none"
              >
                <option value="">সকল ক্যাটাগরি</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Division Select */}
            <div className="flex flex-col gap-1.5 text-xs">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">সারাদেশ (বিভাগ)</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 outline-none"
              >
                <option value="">সারাদেশ</option>
                <option value="Dhaka">Dhaka (ঢাকা)</option>
                <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                <option value="Sylhet">Sylhet (সিলেট)</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="flex flex-col gap-1.5 text-xs">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">সর্টিং</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 outline-none"
              >
                <option value="latest">সর্বশেষ খবর</option>
                <option value="views">সর্বাধিক পঠিত (জনপ্রিয়)</option>
              </select>
            </div>

            {/* Fact Check Toggle */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold">ফ্যাক্ট-চেক ফিল্টার</span>
                <span className="text-[10px] text-slate-400">শুধুমাত্র সত্যতা যাচাইকৃত খবর</span>
              </div>
              <input
                type="checkbox"
                checked={onlyFactChecks}
                onChange={(e) => setOnlyFactChecks(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Main Content Area (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-xs text-slate-400 gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-650"></div>
                <span>লোডিং হচ্ছে...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl py-16 text-center text-xs text-slate-400">
                কোনো সংবাদ পাওয়া যায়নি। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-955">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="object-cover h-full w-full"
                        />
                        {post.isVerified && (
                          <div className="absolute top-3 left-3 bg-emerald-600 text-white flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                            <ShieldCheck size={12} />
                            <span>ফ্যাক্ট-চেক ভেরিফাইড</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-5 space-y-3">
                        <span className="inline-block bg-slate-100 dark:bg-zinc-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">
                          {post.category.name}
                        </span>
                        <h4 className="font-serif font-black text-sm md:text-base leading-snug hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer">
                          <Link href={`/article/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Calendar size={12} />
                        <span>{new Date(post.createdAt).toLocaleDateString("bn-BD")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye size={12} />
                        <span>{post.views} বার পঠিত</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
