"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, MessageSquare, Send, Info } from "lucide-react";

interface HotShareProps {
  title: string;
  summary: string;
  slug: string;
  coverImage: string;
}

export function HotShare({ title, summary, slug, coverImage }: HotShareProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/article/${slug}?utm_source=hotshare`;
  const hotTitle = `🔥 ব্রেকিং: ${title}`;
  
  // Format summary into 2 lines
  const shareSummary = summary ? (summary.length > 120 ? summary.substring(0, 117) + "..." : summary) : "";
  
  const sharePayload = `${hotTitle}\n\n📝 ${shareSummary}\n\n👉 পড়তে এখানে ক্লিক করুন: ${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sharePayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("লিঙ্কটি কপি করা সম্ভব হয়নি!");
    }
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(sharePayload)}`;
    window.open(url, "_blank");
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(hotTitle + "\n\n" + shareSummary)}`;
    window.open(url, "_blank");
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 size={16} className="text-[var(--accent-color)]" />
          <h4 className="font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">
            ওয়ান-ক্লিক হট সোশ্যাল শেয়ার
          </h4>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold text-[var(--accent-color)] hover:underline"
        >
          {isOpen ? "বন্ধ করুন" : "শেয়ার অপশন"}
        </button>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">
        সোশ্যাল মিডিয়ায় আকর্ষণীয় খবরটি ওজি কার্ড, সংক্ষিপ্ত সারসংক্ষেপ এবং সোর্স লিঙ্কের ট্র্যাকিং সুবিধাসহ শেয়ার করুন।
      </p>

      {/* Share Box Area */}
      {isOpen && (
        <div className="flex flex-col gap-4 border-t border-[var(--border-color)] pt-4 transition-all duration-300">
          
          {/* Card Preview Simulation */}
          <div className="border border-[var(--border-color)] rounded-lg overflow-hidden bg-slate-900 text-white p-4 relative aspect-[1.91/1] flex flex-col justify-between">
            {/* Background image mockup with low opacity */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
              style={{ backgroundImage: `url(${coverImage})` }}
            />
            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
            
            {/* Header Brand */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-2">
              <span className="text-[10px] font-black tracking-widest font-serif text-amber-400">
                DAILY MANARAH
              </span>
              <span className="text-[8px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                HOT NEWS
              </span>
            </div>

            {/* Title & summary inside card */}
            <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
              <h5 className="font-serif font-black text-sm text-white leading-tight line-clamp-2">
                {title}
              </h5>
              <p className="text-[9px] text-slate-300 line-clamp-2 leading-relaxed">
                {summary}
              </p>
            </div>
            
            {/* Footer watermark branding info */}
            <div className="relative z-10 flex items-center justify-between text-[7px] text-slate-400 pt-2 border-t border-white/10 mt-2">
              <span>Verified Report / Fact-Checked</span>
              <span>www.dailymanarah.com</span>
            </div>
          </div>

          {/* Social Broadcast Buttons */}
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={shareToWhatsApp}
                className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm"
              >
                <MessageSquare size={13} />
                WhatsApp
              </button>
              <button
                onClick={shareToTelegram}
                className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm"
              >
                <Send size={13} />
                Telegram
              </button>
              <button
                onClick={shareToFacebook}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </button>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-slate-100 dark:hover:bg-zinc-800 sepia:hover:bg-[#dfceab] text-[var(--text-primary)] px-3.5 py-1.5 rounded-full text-xs font-bold transition"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-500" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>পেলোড কপি</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
