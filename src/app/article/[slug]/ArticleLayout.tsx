"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { TTSPlayer } from "@/components/News/TTSPlayer";
import { QuickSummary } from "@/components/News/QuickSummary";
import { HotShare } from "@/components/News/HotShare";
import { ShieldCheck, User, Calendar, MessageSquare, Send, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

interface Comment {
  authorName: string;
  content: string;
  isApproved: boolean;
  createdAt: string | Date;
}

export function ArticleLayout({ initialPost }: { initialPost: any }) {
  const [post, setPost] = useState<any>(initialPost);
  const [loading, setLoading] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialPost?.comments || []);
  const [commentFeedback, setCommentFeedback] = useState<{ status: "success" | "moderated" | null; msg: string }>({ status: null, msg: "" });

  useEffect(() => {
    setPost(initialPost);
    if (initialPost?.comments) {
      setComments(initialPost.comments);
    }
  }, [initialPost]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim() || !post) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts/${post.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorName: commentName,
            content: commentContent,
          }),
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

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-6 flex-grow justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)] gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-color)]" />
            <span className="text-sm font-semibold">খবর লোড হচ্ছে...</span>
          </div>
        ) : post ? (
          <>
            {/* Article Breadcrumbs & Category */}
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-bold">
              <span className="bg-[var(--accent-color)] text-slate-955 font-bold px-2.5 py-0.5 rounded-full">
                {post.category?.name || "সাধারণ সংবাদ"}
              </span>
              <span>•</span>
              <span>জাতীয় সংবাদ</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-black text-2xl md:text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight">
              {post.title}
            </h1>

            {/* Metadata Details */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)] font-bold border-y border-[var(--border-color)] py-3">
              <div className="flex items-center gap-1">
                <User size={13} />
                <span className="font-semibold text-[var(--text-primary)]">{post.author?.name || "লেখক"}</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <Calendar size={13} />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("bn-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>
              {post.isVerified && (
                <div className="flex items-center gap-1 text-[var(--accent-color)] font-bold ml-auto">
                  <ShieldCheck size={14} />
                  <span>ভেরিফাইড ও সত্যতা পরীক্ষিত</span>
                </div>
              )}
            </div>

            {/* Cover Image with Watermark Overlay */}
            <div className="w-full rounded-2xl overflow-hidden border border-[var(--border-color)] relative aspect-[16/9] bg-[var(--bg-input)]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {post.isWatermarkOn !== false && (
                <div className="absolute bottom-4 right-4 bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded text-[9px] font-black tracking-widest text-white/80 select-none border border-white/10 uppercase">
                  DAILY MANARAH WATERMARK ACTIVE
                </div>
              )}
            </div>

            {/* AI Audio TTS Player */}
            <TTSPlayer text={post.title + " " + (post.summary || "")} />

            {/* AI 3-Bullet Summary */}
            <QuickSummary />

            {/* Article Body Content */}
            <article
              className="max-w-none text-sm md:text-base text-[var(--text-primary)] font-medium leading-relaxed flex flex-col gap-5"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Hot Social Share */}
            <HotShare title={post.title} summary={post.summary || ""} slug={post.slug} coverImage={post.coverImage} />

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
                    className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs w-full sm:w-1/2 outline-none text-[var(--text-primary)] font-semibold"
                    required
                  />
                </div>
                <textarea
                  placeholder="আপনার মতামত প্রকাশ করুন... (এআই মডারেশন টেস্ট করতে 'স্প্যাম' শব্দটি টাইপ করুন)"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={3}
                  className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs outline-none resize-none text-[var(--text-primary)] font-semibold"
                  required
                />
                <button
                  type="submit"
                  className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-slate-955 font-bold text-xs px-4 py-2 rounded-lg self-end transition flex items-center gap-1.5"
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
                      <span className="text-[10px] text-[var(--text-secondary)] font-bold">
                        {new Date(c.createdAt).toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium mt-1 leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <span className="text-base font-bold text-[var(--text-primary)]">দুঃখিত, খবরটি পাওয়া যায়নি।</span>
            <span className="text-xs">এটি মুছে ফেলা হয়ে থাকতে পারে অথবা ইউআরএল ভুল রয়েছে।</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
