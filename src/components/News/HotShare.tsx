"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, MessageCircle, Send } from "lucide-react";

interface HotShareProps {
  title: string;
  summary: string;
  slug: string;
  coverImage?: string;
}

export function HotShare({ title, summary, slug }: HotShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/article/${slug}`;
  const shareText = `${title}\n\n${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      alert("লিঙ্কটি কপি করা সম্ভব হয়নি!");
    }
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(url, "_blank");
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <Share2 size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--text-primary)]">
            প্রতিবেদনটি শেয়ার করুন
          </span>
          <span className="text-[11px] text-[var(--text-secondary)]">
            সোশ্যাল মিডিয়া ও বন্ধুদের সাথে ছড়িয়ে দিন
          </span>
        </div>
      </div>

      {/* Share Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* WhatsApp */}
        <button
          onClick={shareToWhatsApp}
          className="flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white px-3 py-1.5 rounded-full text-xs font-bold transition duration-200 border border-[#25D366]/30"
          title="WhatsApp-এ শেয়ার করুন"
        >
          <MessageCircle size={14} />
          <span>WhatsApp</span>
        </button>

        {/* Facebook */}
        <button
          onClick={shareToFacebook}
          className="flex items-center gap-1.5 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white px-3 py-1.5 rounded-full text-xs font-bold transition duration-200 border border-[#1877F2]/30"
          title="Facebook-এ শেয়ার করুন"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          <span>Facebook</span>
        </button>

        {/* Twitter / X */}
        <button
          onClick={shareToTwitter}
          className="flex items-center gap-1.5 bg-[var(--bg-input)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--bg-card)] px-3 py-1.5 rounded-full text-xs font-bold transition duration-200 border border-[var(--border-color)]"
          title="X (Twitter)-এ শেয়ার করুন"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>X</span>
        </button>

        {/* Telegram */}
        <button
          onClick={shareToTelegram}
          className="flex items-center gap-1.5 bg-[#0088cc]/10 hover:bg-[#0088cc] text-[#0088cc] hover:text-white px-3 py-1.5 rounded-full text-xs font-bold transition duration-200 border border-[#0088cc]/30"
          title="Telegram-এ শেয়ার করুন"
        >
          <Send size={13} />
          <span>Telegram</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 bg-[var(--bg-input)] hover:bg-[var(--border-color)] text-[var(--text-primary)] px-3 py-1.5 rounded-full text-xs font-bold transition border border-[var(--border-color)] shadow-xs"
          title="লিঙ্ক কপি করুন"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">কপি হয়েছে</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>লিঙ্ক কপি</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

