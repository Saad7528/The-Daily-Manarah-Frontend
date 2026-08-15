"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Filter, Calendar, Eye, ShieldCheck, X } from "lucide-react";

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

function ArchiveContent() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("search") || "";
  const queryDate = searchParams.get("date") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState(querySearch);
  const [date, setDate] = useState(queryDate);
  const [categorySlug, setCategorySlug] = useState("");
  const [division, setDivision] = useState("");
  const [sort, setSort] = useState("latest");
  const [onlyFactChecks, setOnlyFactChecks] = useState(false);

  // Listen to URL search/date changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setDate(searchParams.get("date") || "");
  }, [searchParams]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/categories`);
        if (res.ok) {
          const data = await res.json();
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
      if (date) queryParams.append("date", date);
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
  }, [categorySlug, division, sort, onlyFactChecks, date]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  // Helper to format English YYYY-MM-DD date to Bengali text
  const formatBengaliDate = (dateVal: string) => {
    if (!dateVal) return "";
    const d = new Date(dateVal);
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    return d.toLocaleDateString("bn-BD", options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Page Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[var(--text-secondary)]">
          <Link href="/" className="hover:text-[var(--accent-color)]">হোম</Link>
          <span>/</span>
          <span className="text-amber-500 font-bold">আর্কাইভ</span>
        </div>

        {/* Outer Golden/Yellow Border Card for Date picker filter as requested */}
        <div className="w-full max-w-xl mx-auto bg-[var(--bg-card)] border border-amber-400/80 rounded-lg p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
            <Calendar size={16} />
            <span>তারিখ নির্বাচন করুন</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md px-3.5 py-2 text-xs font-medium outline-none text-[var(--text-primary)] focus:border-amber-400"
            />
            <button
              type="submit"
              className="sm:w-32 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-4 rounded-md text-xs flex items-center justify-center gap-1.5 transition shrink-0"
            >
              <Search size={14} />
              <span>খুঁজুন</span>
            </button>
          </form>
        </div>

        {/* Selected Date Archive Label - Replicating "🕒 আর্কাইভ: "০৫ আগস্ট, ২০২৬"" */}
        {date && (
          <div className="flex items-center gap-2.5 text-base md:text-lg font-black text-amber-550 border-b border-[var(--border-color)] pb-3 mt-4">
            <span className="text-xl">🕒</span>
            <span>আর্কাইভ: &ldquo;{formatBengaliDate(date)}&rdquo;</span>
            <button
              onClick={() => {
                setDate("");
                setSearch("");
              }}
              className="text-xs text-red-500 hover:text-red-655 font-bold ml-auto flex items-center gap-1 border border-red-200 dark:border-zinc-850 px-3 py-1 rounded-full bg-[var(--bg-card)] transition"
            >
              <X size={12} />
              <span>ফিল্টার মুছুন</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">

          {/* Sidebar Filter Panel (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 space-y-5">

            <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-3 text-[var(--accent-color)]">
              <Filter size={18} />
              <h3 className="font-bold text-sm">ফিল্টার সমূহ</h3>
            </div>

            {/* Keyword Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">সার্চ কি-ওয়ার্ড</label>
              <div className="flex items-center bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-xs">
                <input
                  type="text"
                  placeholder="খবরের শিরোনাম বা বিষয়..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none w-full text-[var(--text-primary)]"
                />
                <button type="submit" className="text-slate-450 hover:text-[var(--accent-color)] transition">
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
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none text-[var(--text-primary)]"
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
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none text-[var(--text-primary)]"
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
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-2.5 outline-none text-[var(--text-primary)]"
              >
                <option value="latest">সর্বশেষ খবর</option>
                <option value="views">সর্বাধিক পঠিত (জনপ্রিয়)</option>
              </select>
            </div>

            {/* Fact Check Toggle */}
            <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold">ফ্যাক্ট-চেক ফিল্টার</span>
                <span className="text-[10px] text-slate-400">শুধুমাত্র সত্যতা যাচাইকৃত খবর</span>
              </div>
              <input
                type="checkbox"
                checked={onlyFactChecks}
                onChange={(e) => setOnlyFactChecks(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--border-color)] text-[var(--accent-color)] focus:ring-[var(--accent-color)] cursor-pointer"
              />
            </div>

          </div>

          {/* Main Content Area (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-xs text-slate-400 gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-color)]"></div>
                <span>লোডিং হচ্ছে...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl py-16 text-center text-xs text-slate-400">
                কোনো সংবাদ পাওয়া যায়নি। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="relative h-44 w-full bg-[var(--bg-primary)]">
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
                        <span className="inline-block bg-[var(--bg-primary)] text-[10px] font-bold text-[var(--text-secondary)] px-2 py-0.5 rounded">
                          {post.category.name}
                        </span>
                        <h4 className="font-serif font-black text-sm md:text-base leading-snug hover:text-[var(--accent-color)] transition cursor-pointer">
                          <Link href={`/article/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="px-5 pb-5 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
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

    </div>
  );
}

export default function ArchivePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-slate-400">
        লোডিং হচ্ছে...
      </div>
    }>
      <ArchiveContent />
    </Suspense>
  );
}
