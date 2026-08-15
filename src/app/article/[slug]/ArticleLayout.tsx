"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { TTSPlayer } from "@/components/News/TTSPlayer";
import { QuickSummary } from "@/components/News/QuickSummary";
import { HotShare } from "@/components/News/HotShare";
import {
  ShieldCheck,
  User,
  Calendar,
  Clock,
  Eye,
  MessageSquare,
  Send,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Share2,
  Bookmark,
  Printer,
  ChevronRight,
  TrendingUp,
  Heart,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface Comment {
  authorName: string;
  content: string;
  isApproved: boolean;
  createdAt: string | Date;
}

interface PostItem {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  coverImage: string;
  isVerified?: boolean;
  views?: number;
  createdAt: string | Date;
  category: {
    name: string;
    slug: string;
  };
  author?: {
    name: string;
  };
}

export function ArticleLayout({ initialPost }: { initialPost: any }) {
  const [post, setPost] = useState<any>(initialPost);
  const [loading, setLoading] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<"normal" | "large" | "xlarge">("normal");
  const [readingProgress, setReadingProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState<PostItem[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<PostItem[]>([]);

  // Comment state
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialPost?.comments || []);
  const [commentFeedback, setCommentFeedback] = useState<{ status: "success" | "moderated" | null; msg: string }>({
    status: null,
    msg: ""
  });

  useEffect(() => {
    setPost(initialPost);
    if (initialPost?.comments) {
      setComments(initialPost.comments);
    }
  }, [initialPost]);

  // Scroll reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch related and trending posts for sidebar
  useEffect(() => {
    const fetchSidebarPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts`);
        if (res.ok) {
          const data: PostItem[] = await res.json();
          if (data && data.length > 0) {
            // Filter out current post
            const others = data.filter((p) => p.id !== post?.id);
            setRelatedPosts(others.slice(0, 4));
            setTrendingPosts(
              [...others].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
            );
          }
        }
      } catch (err) {
        console.error("Failed to fetch sidebar posts:", err);
      }
    };
    if (post) {
      fetchSidebarPosts();
    }
  }, [post]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim() || !post) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts/${post.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            authorName: commentName,
            content: commentContent
          })
        }
      );

      if (res.ok) {
        const newComment = await res.json();
        if (newComment.isApproved) {
          setComments([newComment, ...comments]);
          setCommentFeedback({
            status: "success",
            msg: "✅ আপনার মন্তব্যটি সফলভাবে প্রকাশিত হয়েছে।"
          });
        } else {
          setCommentFeedback({
            status: "moderated",
            msg: "⚠️ এআই মন্তব্য ফিল্টার দ্বারা অবরুদ্ধ! আপনার মন্তব্যে নীতিবিরোধী বা আপত্তিকর শব্দ পাওয়ায় এটি অ্যাডমিন পর্যালোচনার তালিকায় পাঠানো হয়েছে।"
          });
        }
        setCommentName("");
        setCommentContent("");
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }

    setTimeout(() => {
      setCommentFeedback({ status: null, msg: "" });
    }, 5000);
  };

  // Font size map for body text
  const fontSizeClass =
    fontSizeLevel === "large"
      ? "text-base md:text-lg leading-loose"
      : fontSizeLevel === "xlarge"
      ? "text-lg md:text-xl leading-loose"
      : "text-sm md:text-base leading-relaxed";

  // Calculate estimated read time in Bengali
  const wordCount = post?.content ? post.content.replace(/<[^>]*>?/gm, "").split(/\s+/).length : 0;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 180));
  const readMinutesBn = readMinutes.toLocaleString("bn-BD");

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-amber-500 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 flex-grow">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 text-[var(--text-secondary)] gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--accent-color)]" />
            <span className="text-sm font-semibold">খবর লোড হচ্ছে...</span>
          </div>
        ) : post ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ──────────────────────────────────────────────────────────
                LEFT: MAIN ARTICLE CONTENT (lg:col-span-8)
            ────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* 1. Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] flex-wrap">
                <Link href="/" className="hover:text-[var(--accent-color)] transition">
                  প্রচ্ছদ
                </Link>
                <ChevronRight size={12} />
                <Link
                  href={`/category/${post.category?.slug || "politics"}`}
                  className="text-[var(--accent-color)] hover:underline font-bold"
                >
                  {post.category?.name || "সংবাদ"}
                </Link>
                <ChevronRight size={12} />
                <span className="truncate max-w-[200px] sm:max-w-sm text-slate-400 dark:text-zinc-500">
                  {post.title}
                </span>
              </div>

              {/* 2. Headline */}
              <h1 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] leading-tight">
                {post.title}
              </h1>

              {/* 3. Summary / Subtitle (if available) */}
              {post.summary && (
                <p className="text-sm md:text-base font-medium text-[var(--text-secondary)] leading-relaxed border-l-3 border-amber-500 pl-4 py-1 bg-amber-50/20 dark:bg-amber-950/10 rounded-r-lg">
                  {post.summary}
                </p>
              )}

              {/* 4. Editorial Metadata Bar & Reader Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 border-y border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                
                {/* Author Info & Date */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] font-bold shrink-0">
                    <User size={18} className="text-amber-500" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-[var(--text-primary)] text-sm">
                      {post.author?.name || "বিশেষ প্রতিনিধি"}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.createdAt).toLocaleDateString("bn-BD", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {readMinutesBn} মিনিট পাঠ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reader Controls: Font Zoom, Bookmark, Print */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Font Size Adjuster Buttons */}
                  <div className="flex items-center bg-[var(--bg-input)] rounded-lg p-1 border border-[var(--border-color)] text-xs font-bold">
                    <button
                      onClick={() => setFontSizeLevel("normal")}
                      className={`px-2 py-0.5 rounded transition ${
                        fontSizeLevel === "normal"
                          ? "bg-[var(--bg-card)] text-[var(--accent-color)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                      title="স্বাভাবিক ফন্ট"
                    >
                      A
                    </button>
                    <button
                      onClick={() => setFontSizeLevel("large")}
                      className={`px-2 py-0.5 rounded text-sm transition ${
                        fontSizeLevel === "large"
                          ? "bg-[var(--bg-card)] text-[var(--accent-color)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                      title="বড় ফন্ট"
                    >
                      A+
                    </button>
                    <button
                      onClick={() => setFontSizeLevel("xlarge")}
                      className={`px-2 py-0.5 rounded text-base transition ${
                        fontSizeLevel === "xlarge"
                          ? "bg-[var(--bg-card)] text-[var(--accent-color)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                      title="অতি বড় ফন্ট"
                    >
                      A++
                    </button>
                  </div>

                  {/* Print Button */}
                  <button
                    onClick={() => typeof window !== "undefined" && window.print()}
                    className="p-2 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-primary)] transition"
                    title="প্রিন্ট করুন"
                  >
                    <Printer size={14} />
                  </button>

                  {/* Fact check badge */}
                  {post.isVerified && (
                    <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span className="hidden sm:inline">ফ্যাক্ট-চেকড</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Cover Image with Watermark Overlay */}
              <div className="w-full rounded-lg overflow-hidden border border-[var(--border-color)] relative aspect-[16/10] bg-[var(--bg-input)] shadow-xs">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-101"
                />
                {post.isWatermarkOn !== false && (
                  <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded text-[9px] font-black tracking-widest text-amber-400 select-none border border-amber-500/30 uppercase">
                    DAILY MANARAH VERIFIED
                  </div>
                )}
              </div>

              {/* 6. AI Audio TTS Player */}
              <TTSPlayer text={post.title + "। " + (post.summary || "") + "। " + post.content} />

              {/* 7. AI 3-Bullet Quick Summary */}
              <QuickSummary />

              {/* 8. Article Body Content */}
              <article
                className={`w-full text-[var(--text-primary)] font-normal transition-all duration-200 flex flex-col gap-6 pt-2 border-b border-[var(--border-color)] pb-8 ${fontSizeClass}`}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* 9. Social Share Strip */}
              <div className="pt-2">
                <HotShare
                  title={post.title}
                  summary={post.summary || ""}
                  slug={post.slug}
                  coverImage={post.coverImage}
                />
              </div>

              {/* 10. COMMENT SECTION */}
              <div className="flex flex-col gap-5 pt-6 border-t border-[var(--border-color)]">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-black text-lg md:text-xl text-[var(--text-primary)] flex items-center gap-2">
                    <MessageSquare size={20} className="text-[var(--accent-color)]" />
                    পাঠক মন্তব্য ({comments.length})
                  </h3>
                  <span className="text-xs text-[var(--text-secondary)]">
                    নম্র ও গঠনমূলক মতামত কাম্য
                  </span>
                </div>

                {/* Feedback message */}
                {commentFeedback.status && (
                  <div
                    className={`p-3.5 rounded-lg text-xs flex items-center gap-2 ${
                      commentFeedback.status === "moderated"
                        ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300 border border-red-200 dark:border-red-900"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
                    }`}
                  >
                    {commentFeedback.status === "moderated" ? (
                      <AlertTriangle size={16} className="shrink-0" />
                    ) : (
                      <CheckCircle size={16} className="shrink-0" />
                    )}
                    <p className="font-semibold">{commentFeedback.msg}</p>
                  </div>
                )}

                {/* Comment Form */}
                <form
                  onSubmit={handleCommentSubmit}
                  className="flex flex-col gap-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-lg shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="আপনার নাম বা পরিচয়..."
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-md px-3.5 py-2 text-xs w-full sm:w-1/2 outline-none text-[var(--text-primary)] font-medium focus:border-amber-500 transition"
                      required
                    />
                  </div>
                  <textarea
                    placeholder="এই প্রতিবেদনের ওপর আপনার মতামত লিখুন..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    rows={3}
                    className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-md px-3.5 py-2 text-xs outline-none resize-none text-[var(--text-primary)] font-medium focus:border-amber-500 transition"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-slate-950 font-bold text-xs px-5 py-2 rounded-md self-end transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Send size={13} />
                    মন্তব্য প্রকাশ করুন
                  </button>
                </form>

                {/* Comments List */}
                <div className="flex flex-col gap-3 pt-2">
                  {comments.length === 0 ? (
                    <p className="text-xs text-[var(--text-secondary)] py-4 text-center">
                      এখনো কোনো মন্তব্য করা হয়নি। আপনার মতামত দিয়ে প্রথম মন্তব্যকারী হোন!
                    </p>
                  ) : (
                    comments.map((c, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-1.5 text-xs shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center text-[10px]">
                              {c.authorName.charAt(0)}
                            </div>
                            <span className="font-bold text-[var(--text-primary)]">
                              {c.authorName}
                            </span>
                          </div>
                          <span className="text-[10px] text-[var(--text-secondary)] font-medium">
                            {new Date(c.createdAt).toLocaleTimeString("bn-BD", {
                              hour: "numeric",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>
                        <p className="text-[var(--text-secondary)] font-normal pl-8 leading-relaxed">
                          {c.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────────
                RIGHT: SIDEBAR WIDGETS (lg:col-span-4)
            ────────────────────────────────────────────────────────── */}
            <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
              
              {/* 1. Trending News Widget */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 shadow-xs flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                  <TrendingUp size={18} className="text-amber-500" />
                  <h3 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)]">
                    সর্বাধিক পঠিত (Trending)
                  </h3>
                </div>

                <div className="flex flex-col divide-y divide-[var(--border-color)]">
                  {trendingPosts.map((trendPost, idx) => (
                    <Link
                      key={trendPost.id}
                      href={`/article/${trendPost.slug}`}
                      className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 group"
                    >
                      <span className="font-serif font-black text-xl text-amber-500 group-hover:scale-110 transition shrink-0 w-6">
                        {(idx + 1).toLocaleString("bn-BD")}
                      </span>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-serif font-bold text-xs text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition leading-snug line-clamp-2">
                          {trendPost.title}
                        </h4>
                        <span className="text-[10px] text-[var(--text-secondary)] flex items-center gap-1 font-medium">
                          <Eye size={10} />
                          {(trendPost.views || 1200).toLocaleString("bn-BD")} বার পঠিত
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 2. Related News in Category */}
              {relatedPosts.length > 0 && (
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 shadow-xs flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                    <h3 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)]">
                      সম্পর্কিত খবর
                    </h3>
                    <Link
                      href={`/category/${post.category?.slug || "politics"}`}
                      className="text-[11px] font-bold text-[var(--accent-color)] hover:underline"
                    >
                      আরও দেখুন →
                    </Link>
                  </div>

                  <div className="flex flex-col gap-3">
                    {relatedPosts.map((relPost) => (
                      <Link
                        key={relPost.id}
                        href={`/article/${relPost.slug}`}
                        className="flex gap-3 items-center group pb-3 border-b border-[var(--border-color)] last:border-0 last:pb-0"
                      >
                        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 border border-[var(--border-color)]">
                          <img
                            src={relPost.coverImage}
                            alt={relPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="font-serif font-bold text-xs text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition line-clamp-2 leading-snug">
                            {relPost.title}
                          </h4>
                          <span className="text-[10px] text-[var(--text-secondary)] font-medium">
                            {new Date(relPost.createdAt).toLocaleDateString("bn-BD", {
                              day: "numeric",
                              month: "short"
                            })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Manarah Foundation Donation CTA */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-lg p-5 shadow-md flex flex-col gap-3 border border-emerald-800/50">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Heart size={20} className="fill-emerald-400" />
                  <h4 className="font-serif font-black text-base">মানারাহ মানবসেবা তহবিল</h4>
                </div>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  অসহায় মানুষের চিকিৎসা ও শিক্ষা সহায়তা প্রদানে মানারাহ ফাউন্ডেশনের সাথে যুক্ত থাকুন।
                </p>
                <Link
                  href="/donate"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-md text-center transition shadow mt-1 flex items-center justify-center gap-1.5"
                >
                  <span>অনুদান দিন</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </aside>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
            <AlertTriangle className="w-14 h-14 text-red-500" />
            <span className="text-lg font-bold text-[var(--text-primary)]">
              দুঃখিত, খবরটি পাওয়া যায়নি।
            </span>
            <span className="text-xs">এটি মুছে ফেলা হয়ে থাকতে পারে অথবা ইউআরএল ভুল রয়েছে।</span>
            <Link
              href="/"
              className="mt-2 px-5 py-2 bg-[var(--accent-color)] text-slate-950 font-bold text-xs rounded-md hover:bg-[var(--accent-hover)] transition"
            >
              প্রচ্ছদে ফিরে যান
            </Link>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────
            BOTTOM: আরও খবর (Read Next 4-Column Grid)
        ────────────────────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <div className="flex flex-col gap-6 pt-10 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between border-b-2 border-amber-500 pb-2">
              <h3 className="font-serif font-black text-base md:text-lg text-[var(--text-primary)] tracking-wide">
                এই বিভাগের আরও সংবাদ
              </h3>
              <Link
                href={`/category/${post?.category?.slug || "politics"}`}
                className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition"
              >
                সব খবর দেখুন →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedPosts.map((relPost) => (
                <Link
                  key={relPost.id}
                  href={`/article/${relPost.slug}`}
                  className="flex flex-col gap-3 group bg-[var(--bg-card)] border border-[var(--border-color)] p-3 rounded-lg shadow-xs hover:shadow-md transition duration-300"
                >
                  <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-[var(--bg-input)]">
                    <img
                      src={relPost.coverImage}
                      alt={relPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 px-1 pb-1">
                    <span className="text-[10px] font-bold text-[var(--text-secondary)]">
                      {new Date(relPost.createdAt).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </span>
                    <h4 className="font-serif font-black text-xs md:text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors leading-snug line-clamp-2">
                      {relPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


