"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  FileText,
  ShieldCheck,
  Image as ImageIcon,
  Link2,
  Video,
  Sparkles,
  Check,
  Save,
  HelpCircle,
  AlertCircle,
  Eye
} from "lucide-react";

export default function ContentEditor() {
  const { data: session } = useSession();
  // Post metadata states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoriesList, setCategoriesList] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/categories`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategoriesList(data.map((c: any) => ({ id: c.id, name: c.name })));
          if (data.length > 0) {
            setCategory(data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  
  // Custom badges/toggles
  const [isWatermarkOn, setIsWatermarkOn] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceVideo, setSourceVideo] = useState("");

  // Editor content states
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");

  // AI Spell check state
  const [aiSuggestions, setAiSuggestions] = useState<{ original: string; corrected: string; index: number }[]>([]);
  const [isAiScanning, setIsAiScanning] = useState(false);

  // Auto-save simulator
  useEffect(() => {
    if (content.length > 5 || title.length > 5) {
      setIsSaving(true);
      const timer = setTimeout(() => {
        setIsSaving(false);
        const now = new Date();
        setLastSaved(now.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit", second: "2-digit" }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [content, title]);

  // AI Spellcheck using Gemini backend API
  const handleAiSpellcheck = async () => {
    setIsAiScanning(true);
    setAiSuggestions([]);

    try {
      // Clean HTML tags from content for better spelling scanning
      const cleanText = content.replace(/<[^>]*>/g, "");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/ai/spellcheck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanText })
      });
      
      const data = await response.json();
      if (data.suggestions) {
        const mappedSuggestions = data.suggestions.map((s: any) => ({
          original: s.original,
          corrected: s.fixed,
          reason: s.reason
        }));
        setAiSuggestions(mappedSuggestions);
      }
    } catch (error) {
      console.error("AI Spellcheck failed:", error);
    } finally {
      setIsAiScanning(false);
    }
  };

  const handleFixAllSpelling = () => {
    let correctedContent = content;
    aiSuggestions.forEach((s) => {
      const regex = new RegExp(s.original, "g");
      correctedContent = correctedContent.replace(regex, s.corrected);
    });
    setContent(correctedContent);
    setAiSuggestions([]);
    alert("বানান সংশোধন সফল হয়েছে!");
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("অনুগ্রহ করে খবরের শিরোনাম এবং বিবরণ প্রদান করুন।");
      return;
    }

    if (!session?.user) {
      alert("সংবাদ প্রকাশ করতে আপনাকে অবশ্যই লগইন করতে হবে।");
      return;
    }

    const baseSlug = title
      .toLowerCase()
      .replace(/[^\w\u0980-\u09FF]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const slug = `${baseSlug}-${Date.now()}`;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          content,
          summary: content.substring(0, 150),
          coverImage,
          isWatermarkOn,
          isVerified,
          sourceUrl,
          sourceVideo,
          division,
          district,
          thana,
          categoryId: category,
          authorId: (session.user as any).id,
        })
      });

      if (response.ok) {
        alert(`"${title}" সংবাদটি সফলভাবে দ্য ডেইলি মানারাহ নিউজ পোর্টালে প্রকাশিত হয়েছে!`);
        setTitle("");
        setContent("");
        setCoverImage("");
        setDivision("");
        setDistrict("");
        setThana("");
        setSourceUrl("");
        setSourceVideo("");
      } else {
        const errorData = await response.json();
        alert(`সংবাদ প্রকাশে ত্রুটি: ${errorData.error || "অজ্ঞাত ত্রুটি"}`);
      }
    } catch (error) {
      console.error("Failed to publish post:", error);
      alert("সার্ভার ত্রুটি ঘটেছে। অনুগ্রহ করে পরে চেষ্টা করুন।");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Editor Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[var(--accent-color)] text-white rounded-xl shadow-md">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="font-serif font-black text-2xl md:text-3xl text-[var(--text-primary)]">
                সিনিয়র এডিটর ও রাইটিং প্যানেল
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">
                সংবাদ তৈরি করুন • এআই বানান সংশোধক ও মেটাডাটা এমবেড সেটিংস
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session?.user && (
              <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-1.5 rounded-full shadow-sm">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-[var(--text-primary)]">{session.user.name}</span>
                  <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">{(session.user as any).role || "এডিটর"}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold px-3 py-1 rounded-full text-[10px] transition"
                >
                  লগ আউট
                </button>
              </div>
            )}

            <div className="flex items-center gap-3">
              {/* Draft Saving Status Indicator */}
              <span className="text-[11px] text-slate-400 font-medium">
                {isSaving ? "ড্রাফট সংরক্ষণ হচ্ছে..." : lastSaved ? `স্বয়ংক্রিয়ভাবে সংরক্ষিত: ${lastSaved}` : "ড্রাফট সংরক্ষিত"}
              </span>
              
              <button
                onClick={handlePublish}
                className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs px-5 py-2 rounded-full shadow transition-all"
              >
                সংবাদ প্রকাশ করুন
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT PANEL: Title and Content Canvas (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-4 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-2xl shadow-sm">
            
            {/* Title Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">সংবাদের মূল শিরোনাম:</label>
              <input
                type="text"
                placeholder="এখানে আকর্ষণীয় খবরের শিরোনাম লিখুন..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-base md:text-lg font-serif font-black outline-none focus:border-[var(--accent-color)] text-[var(--text-primary)]"
              />
            </div>

            {/* Block Editor simulation toolbox */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-zinc-900 sepia:bg-[#dfceab] border border-[var(--border-color)] p-1.5 rounded-lg text-xs">
              <button className="px-2.5 py-1 rounded bg-[var(--bg-card)] hover:bg-slate-200 dark:hover:bg-zinc-800 font-bold border border-[var(--border-color)]">H1</button>
              <button className="px-2.5 py-1 rounded bg-[var(--bg-card)] hover:bg-slate-200 dark:hover:bg-zinc-800 font-bold border border-[var(--border-color)]">H2</button>
              <button className="px-2.5 py-1 rounded bg-[var(--bg-card)] hover:bg-slate-200 dark:hover:bg-zinc-800 font-bold border border-[var(--border-color)]">Paragraph</button>
              <button className="px-2.5 py-1 rounded bg-[var(--bg-card)] hover:bg-slate-200 dark:hover:bg-zinc-800 font-bold border border-[var(--border-color)]">Quote</button>
              <span className="text-slate-400">|</span>
              <button className="px-2.5 py-1 rounded bg-[var(--bg-card)] hover:bg-slate-200 dark:hover:bg-zinc-800 font-semibold border border-[var(--border-color)] flex items-center gap-1">
                <ImageIcon size={12} /> ইমেজ যোগ
              </button>
              <button className="px-2.5 py-1 rounded bg-[var(--bg-card)] hover:bg-slate-200 dark:hover:bg-zinc-800 font-semibold border border-[var(--border-color)] flex items-center gap-1">
                <Video size={12} /> ভিডিও লিংক
              </button>
              
              {/* Spellcheck Trigger */}
              <button
                onClick={handleAiSpellcheck}
                className="ml-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-3 py-1 rounded flex items-center gap-1 transition shadow-sm"
              >
                <Sparkles size={12} className={isAiScanning ? "animate-spin" : ""} />
                {isAiScanning ? "স্ক্যান হচ্ছে..." : "এআই বাংলা বানান চেক"}
              </button>
            </div>

            {/* AI Spellchecker suggestions banner */}
            {aiSuggestions.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-900 dark:text-amber-400">বানান ত্রুটি সনাক্ত হয়েছে:</span>
                    <p className="text-slate-600 dark:text-slate-400">
                      আপনার লেখায় {aiSuggestions.length}টি শব্দের অসঙ্গতি পাওয়া গেছে। উদাহরণ:{" "}
                      {aiSuggestions.map((s) => `"${s.original}" ➔ "${s.corrected}"`).join(", ")}।
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleFixAllSpelling}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-1.5 rounded-full transition shadow-sm"
                >
                  সব বানান ঠিক করুন
                </button>
              </div>
            )}

            {/* Tiptap textarea container */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">প্রতিবেদনের মূল কন্টেন্ট (Tiptap Editor Canvas):</label>
              <textarea
                placeholder="এখানে সংবাদের বিস্তারিত প্যারাগ্রাফ লিখুন... (বানান চেকার পরীক্ষা করার জন্য 'নুতন', 'পাখী' অথবা 'ব্যাবহার' টাইপ করুন এবং ওপরে এআই বাংলা বানান চেক বাটনে চাপুন)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--accent-color)] text-[var(--text-primary)] leading-relaxed resize-none font-sans"
              />
            </div>
          </div>

          {/* RIGHT PANEL: Settings, Watermarks and Source Embeds (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Meta & Location Widget */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-2xl shadow-sm flex flex-col gap-4">
              <h3 className="font-serif font-black text-sm text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                সংবাদ সেটিংস ও মেটাডেটা
              </h3>

              {/* Category selector */}
              <div className="flex flex-col gap-1.5 text-xs">
                <label className="font-bold text-slate-400">ক্যাটাগরি নির্বাচন করুন:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-2 text-slate-700 dark:text-slate-300 sepia:text-[#433422] outline-none"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                  {categoriesList.length === 0 && (
                    <>
                      <option value="politics">জাতীয় ও রাজনীতি</option>
                      <option value="fact-check-research">ফ্যাক্ট-চেক ও গবেষণা</option>
                      <option value="islamic-life">দাওয়াহ ও ইসলামিক জীবন</option>
                      <option value="humanity-society">মানবসেবা ও সমাজ</option>
                      <option value="opinion-editorial">মতামত ও বিশ্লেষণ</option>
                      <option value="multimedia">মাল্টিমিডিয়া</option>
                    </>
                  )}
                </select>
              </div>

              {/* Division / District / Thana Inputs */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-400">বিভাগ:</label>
                  <input
                    type="text"
                    placeholder="ঢাকা"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-2 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-400">জেলা:</label>
                  <input
                    type="text"
                    placeholder="ঢাকা"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-2 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-400">থানা:</label>
                  <input
                    type="text"
                    placeholder="মিরপুর"
                    value={thana}
                    onChange={(e) => setThana(e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-2 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Badges & Media Overlay Settings */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-2xl shadow-sm flex flex-col gap-4">
              <h3 className="font-serif font-black text-sm text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                ওয়াটারমার্ক ও ব্যাজ সেটিংস
              </h3>

              {/* Image URL input */}
              <div className="flex flex-col gap-1.5 text-xs">
                <label className="font-bold text-slate-400">কভার ইমেজ ইউআরএল (Cover Image URL):</label>
                <input
                  type="text"
                  placeholder="https://example.com/cover.jpg"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-2 outline-none"
                />
              </div>

              {/* Watermark Toggle */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex flex-col">
                  <span className="font-bold">ইমেজ ওয়াটারমার্ক</span>
                  <span className="text-[10px] text-slate-400">কভার ছবিতে লোগো যুক্ত হবে</span>
                </div>
                <button
                  onClick={() => setIsWatermarkOn(!isWatermarkOn)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition ${
                    isWatermarkOn ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isWatermarkOn ? "Active (সক্রিয়)" : "Inactive"}
                </button>
              </div>

              {/* Fact Checked Badge Toggle */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--border-color)] pt-3">
                <div className="flex flex-col">
                  <span className="font-bold">ভেরিফাইড / ডিরেক্ট রিপোর্ট</span>
                  <span className="text-[10px] text-slate-400">খবরটি সরাসরি সূত্রের হলে সক্রিয় করুন</span>
                </div>
                <button
                  onClick={() => setIsVerified(!isVerified)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition ${
                    isVerified ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isVerified ? "Verified (ভেরিফাইড)" : "Off"}
                </button>
              </div>
            </div>

            {/* Embedded Source URLs */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-2xl shadow-sm flex flex-col gap-4">
              <h3 className="font-serif font-black text-sm text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                সংবাদের মূল সূত্র ও ভিডিও এমবেড
              </h3>

              {/* Source link */}
              <div className="flex flex-col gap-1.5 text-xs">
                <label className="font-bold text-slate-400 flex items-center gap-1">
                  <Link2 size={12} /> সোর্স লিংক (Source URL):
                </label>
                <input
                  type="text"
                  placeholder="https://source-news.com/original-post"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-2 outline-none"
                />
              </div>

              {/* Video embed */}
              <div className="flex flex-col gap-1.5 text-xs border-t border-[var(--border-color)] pt-3">
                <label className="font-bold text-slate-400 flex items-center gap-1">
                  <Video size={12} /> সোর্স ভিডিও এমবেড কোড (YouTube Shorts/Video Link):
                </label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={sourceVideo}
                  onChange={(e) => setSourceVideo(e.target.value)}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-2 outline-none"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
