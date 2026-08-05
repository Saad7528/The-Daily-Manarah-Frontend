"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { TTSPlayer } from "@/components/News/TTSPlayer";
import { QuickSummary } from "@/components/News/QuickSummary";
import { HotShare } from "@/components/News/HotShare";
import { ShieldCheck, User, Calendar, MessageSquare, Send, CheckCircle, AlertTriangle } from "lucide-react";

interface Comment {
  authorName: string;
  content: string;
  isApproved: boolean;
  createdAt: Date;
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { authorName: "আব্দুল্লাহ আল নোমান", content: "তথ্যবহুল এবং দারুণ একটি প্রতিবেদন। ধন্যবাদ এডিটর প্যানেলকে।", isApproved: true, createdAt: new Date(Date.now() - 3600000) }
  ]);
  const [commentFeedback, setCommentFeedback] = useState<{ status: "success" | "moderated" | null; msg: string }>({ status: null, msg: "" });

  // Mock post fetch based on slug
  const post = {
    title: params.slug === "dhaka-heavy-rain-traffic-jam" 
      ? "ঢাকায় মুষলধারে বৃষ্টি: জলজট ও ট্রাফিক জ্যামে নাকাল নগরবাসী, দুর্ভোগ চরমে"
      : params.slug === "olympic-new-gold-medal-record"
      ? "অলিম্পিক গেমসের নতুন স্বর্ণপদক রেকর্ড: ইতিহাস গড়লেন এই এশিয়ান অ্যাথলেট"
      : "কৃত্রিম বুদ্ধিমত্তা ও ভবিষ্যৎ কর্মসংস্থান: একটি গভীর সমাজতাত্ত্বিক বিশ্লেষণ",
    summary: "আজ সকাল থেকেই রাজধানীর বিভিন্ন এলাকায় একটানা বৃষ্টিপাত রেকর্ড করা হয়েছে। মিরপুর, ধানমন্ডি এবং কাওরান বাজারের প্রধান সড়কগুলো পানিতে তলিয়ে যাওয়ায় যানবাহন চলাচল প্রায় বন্ধ হয়ে পড়েছে। আবহাওয়া অফিস আরও ২ দিন বৃষ্টির পূর্বাভাস দিয়েছে।",
    coverImage: params.slug === "olympic-new-gold-medal-record"
      ? "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop",
    isVerified: true,
    category: "রাজনীতি & জাতীয়",
    author: "কাজী রায়হান",
    views: 4520,
    createdAt: new Date(),
    contentHtml: `
      <p>আজ সকাল ৭টা থেকে রাজধানীর মিরপুর, খিলক্ষেত, কাওরান বাজার, বাড্ডা ও ধানমন্ডি এলাকায় মাঝারি থেকে ভারী বৃষ্টিপাত শুরু হয়েছে। বৃষ্টিপাতের কারণে ঢাকার নিচু রাস্তাগুলো প্লাবিত হয়ে যাওয়ায় কর্মমুখী মানুষ চরম ভোগান্তির সম্মুখীন হন।</p>
      <p>বিশেষ করে রামপুরা ও মগবাজার এলাকায় রাস্তা খোঁড়াখুঁড়ির কারণে বৃষ্টির পানি জমে কাদামাটির সৃষ্টি হয়েছে। যানবাহন অত্যন্ত ধীরগতিতে চলায় যানজট দীর্ঘ হয়ে বিজয় সরণি ও প্রগতি সরণি পর্যন্ত ছড়িয়ে পড়ে।</p>
      <p>আবহাওয়া অধিদপ্তর এক সতর্কবার্তায় জানিয়েছে, লঘুচাপের কারণে বঙ্গোপসাগর এলাকা উত্তাল রয়েছে। দেশের সমুদ্রবন্দরগুলোতে ৩ নম্বর স্থানীয় সতর্ক সংকেত দেখাতে বলা হয়েছে এবং অভ্যন্তরীণ নদীবন্দরে ঝড়ো হাওয়ার পূর্বাভাস রয়েছে। ভারী বর্ষণ দেশের সিলেট ও চট্টগ্রাম বিভাগের পাহাড়ি অঞ্চলে ভূমিধসের ঝুঁকি বাড়াতে পারে।</p>
    `
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    // Simulated AI Profanity Filter Check
    const profaneKeywords = ["স্প্যাম", "spam", "খারাপ", "গালি", "badword", "ভুয়া"];
    const containsProfanity = profaneKeywords.some(word => 
      commentContent.toLowerCase().includes(word) || commentName.toLowerCase().includes(word)
    );

    if (containsProfanity) {
      setCommentFeedback({
        status: "moderated",
        msg: "⚠️ এআই মন্তব্য ফিল্টার দ্বারা অবরুদ্ধ! আপনার মন্তব্যে নীতিবিরোধী বা আপত্তিকর শব্দ পাওয়ায় এটি অ্যাডমিন পর্যালোচনার তালিকায় পাঠানো হয়েছে।"
      });
      setCommentContent("");
    } else {
      const newComment: Comment = {
        authorName: commentName,
        content: commentContent,
        isApproved: true,
        createdAt: new Date()
      };
      setComments([newComment, ...comments]);
      setCommentFeedback({
        status: "success",
        msg: "✅ আপনার মন্তব্যটি সফলভাবে প্রকাশিত হয়েছে।"
      });
      setCommentName("");
      setCommentContent("");
    }

    setTimeout(() => {
      setCommentFeedback({ status: null, msg: "" });
    }, 5000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-6 flex-grow">
        
        {/* Article Breadcrumbs & Category */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">
          <span className="bg-[var(--accent-color)] text-white font-bold px-2.5 py-0.5 rounded-full">
            {post.category}
          </span>
          <span>•</span>
          <span>জাতীয় সংবাদ</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif font-black text-2xl md:text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight">
          {post.title}
        </h1>

        {/* Metadata Details */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c] border-y border-[var(--border-color)] py-3">
          <div className="flex items-center gap-1">
            <User size={13} />
            <span className="font-semibold text-[var(--text-primary)]">{post.author}</span>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1">
            <Calendar size={13} />
            <span>{new Date().toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          {post.isVerified && (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-amber-400 sepia:text-amber-800 font-bold ml-auto">
              <ShieldCheck size={14} />
              <span>ভেরিফাইড ও সত্যতা পরীক্ষিত</span>
            </div>
          )}
        </div>

        {/* Cover Image with Watermark Overlay */}
        <div className="w-full rounded-2xl overflow-hidden border border-[var(--border-color)] relative aspect-[16/9] bg-slate-100">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Watermark overlay */}
          <div className="absolute bottom-4 right-4 bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded text-[9px] font-black tracking-widest text-white/80 select-none border border-white/10 uppercase">
            THE DAILY MANARAH WATERMARK ACTIVE
          </div>
        </div>

        {/* AI Audio TTS Player */}
        <TTSPlayer text={post.title + " " + post.summary} />

        {/* AI 3-Bullet Summary */}
        <QuickSummary />

        {/* Article Body Content */}
        <article
          className="prose dark:prose-invert max-w-none text-sm md:text-base text-slate-700 dark:text-zinc-300 sepia:text-[#433422] leading-relaxed flex flex-col gap-4"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Hot Social Share */}
        <HotShare title={post.title} summary={post.summary} slug={params.slug} coverImage={post.coverImage} />

        {/* COMMENT SECTION */}
        <div className="flex flex-col gap-4 border-t border-[var(--border-color)] pt-8">
          <h3 className="font-serif font-black text-lg text-[var(--text-primary)] flex items-center gap-2">
            <MessageSquare size={18} className="text-[var(--accent-color)]" />
            পাঠক মন্তব্য ({comments.length})
          </h3>

          {/* Feedback message */}
          {commentFeedback.status && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                commentFeedback.status === "moderated"
                  ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-300"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300"
              }`}
            >
              {commentFeedback.status === "moderated" ? <AlertTriangle size={15} /> : <CheckCircle size={15} />}
              <p className="font-semibold">{commentFeedback.msg}</p>
            </div>
          )}

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] p-4 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="আপনার নাম..."
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs w-full sm:w-1/2 outline-none"
                required
              />
            </div>
            <textarea
              placeholder="আপনার মতামত প্রকাশ করুন... (এআই মডারেশন টেস্ট করতে 'স্প্যাম' শব্দটি টাইপ করুন)"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              rows={3}
              className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs outline-none resize-none"
              required
            />
            <button
              type="submit"
              className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs px-4 py-2 rounded-lg self-end transition flex items-center gap-1.5"
            >
              <Send size={12} />
              মন্তব্য প্রকাশ করুন
            </button>
          </form>

          {/* Comments List */}
          <div className="flex flex-col gap-3">
            {comments.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--text-primary)]">{c.authorName}</span>
                  <span className="text-[10px] text-slate-400">
                    {c.createdAt.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-zinc-400 sepia:text-[#705e4c] mt-1 leading-relaxed">
                  {c.content}
                </p>
              </div>
            ))}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
