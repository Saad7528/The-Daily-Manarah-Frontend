"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Branding/Logo";
import {
  Send,
  Smartphone,
  ShieldCheck,
  Mail,
  Phone,
  Bookmark,
  Map,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [pwaPrompt, setPwaPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if app is installable (PWA support)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (pwaPrompt) {
      pwaPrompt.prompt();
      const { outcome } = await pwaPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstallable(false);
      }
      setPwaPrompt(null);
    } else {
      // Simulate installation mock
      alert("দ্য ডেইলি মানারাহ PWA অ্যাপ্লিকেশনটি আপনার ডিভাইসের হোম স্ক্রিনে যুক্ত করা হয়েছে!");
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 dark:bg-black dark:text-zinc-400 sepia:bg-[#ebdcb9] sepia:text-[#433422] border-t border-[var(--border-color)] transition-colors duration-300">
      {/* Top Footer 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Logo & Contact */}
        <div className="flex flex-col gap-4">
          <Logo theme="dark" className="sepia:text-[#433422]" />
          <p className="text-xs leading-relaxed text-slate-400 dark:text-zinc-500 sepia:text-[#705e4c]">
            দ্য ডেইলি মানারাহ হলো সত্য ও সততার প্রতীক। আমরা বস্তুনিষ্ঠ সাংবাদিকতা এবং সঠিক সংবাদের মাধ্যমে সুস্থ সমাজ নির্মাণে দৃঢ় প্রতিজ্ঞ।
          </p>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-emerald-500" />
              <span>editorial@dailymanarah.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-emerald-500" />
              <span>+৮৮০ ২-৯৮৭৬৫৪৩</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-zinc-600 sepia:text-[#705e4c] mt-2">
              ট্রেড লাইসেন্স নং: TRAD/DNCC/025482/2026
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-sm text-white dark:text-zinc-200 sepia:text-[#433422] border-b border-slate-800 sepia:border-[#dfceab] pb-2 uppercase tracking-wider">
            খবরের বিভাগসমূহ
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-xs">
            <li>
              <Link href="/category/politics" className="hover:text-emerald-400 transition">রাজনীতি</Link>
            </li>
            <li>
              <Link href="/category/sociology" className="hover:text-emerald-400 transition">সমাজবিজ্ঞান</Link>
            </li>
            <li>
              <Link href="/category/sports" className="hover:text-emerald-400 transition">খেলাধুলা</Link>
            </li>
            <li>
              <Link href="/category/technology" className="hover:text-emerald-400 transition">প্রযুক্তি</Link>
            </li>
            <li>
              <Link href="/category/opinion" className="hover:text-emerald-400 transition">মতামত</Link>
            </li>
            <li>
              <Link href="/category/international" className="hover:text-emerald-400 transition">আন্তর্জাতিক</Link>
            </li>
            <li>
              <Link href="/e-paper" className="hover:text-emerald-400 transition font-bold text-amber-500">ই-পেপার</Link>
            </li>
            <li>
              <Link href="/fact-check" className="hover:text-emerald-400 transition">ফ্যাক্ট-চেক</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Location news & Fact check guarantee */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-sm text-white dark:text-zinc-200 sepia:text-[#433422] border-b border-slate-800 sepia:border-[#dfceab] pb-2 uppercase tracking-wider">
            সততা ও নিশ্চয়তা
          </h4>
          <p className="text-xs text-slate-400 dark:text-zinc-500 sepia:text-[#705e4c]">
            আমরা প্রতিটি সংবাদের উৎস এবং সত্যতা সূক্ষ্মভাবে যাচাই করে থাকি। গুজব ও অসত্য সংবাদের বিরুদ্ধে আমাদের জিরো টলারেন্স নীতি রয়েছে।
          </p>
          {/* Fact check guarantee badge */}
          <div className="flex items-center gap-3 bg-slate-800/50 dark:bg-zinc-900/50 sepia:bg-[#dfceab]/60 p-3 rounded-lg border border-slate-800 sepia:border-[#dfceab]">
            <ShieldCheck size={28} className="text-emerald-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200 dark:text-zinc-300 sepia:text-[#433422]">১০০% ফ্যাক্ট-চেকড সংবাদ</span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">প্রতিটি প্রতিবেদন তথ্যনির্ভর</span>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter & PWA install */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-sm text-white dark:text-zinc-200 sepia:text-[#433422] border-b border-slate-800 sepia:border-[#dfceab] pb-2 uppercase tracking-wider">
            যুক্ত থাকুন আমাদের সাথে
          </h4>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-slate-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sepia:bg-[#dfceab] rounded-full transition text-slate-400 hover:text-white sepia:text-[#433422]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-slate-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sepia:bg-[#dfceab] rounded-full transition text-slate-400 hover:text-white sepia:text-[#433422]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-slate-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sepia:bg-[#dfceab] rounded-full transition text-slate-400 hover:text-white sepia:text-[#433422]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <label className="text-[11px] text-slate-400 dark:text-zinc-500 sepia:text-[#705e4c]">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন:</label>
            <div className="flex items-center bg-slate-800 dark:bg-zinc-900 sepia:bg-[#dfceab] rounded overflow-hidden border border-slate-700 sepia:border-[#dfceab]">
              <input
                type="email"
                placeholder="আপনার ইমেইল..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-xs px-3 py-2 w-full text-white sepia:text-[#433422] placeholder-slate-500"
                required
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 transition">
                <Send size={14} />
              </button>
            </div>
            {subscribed && (
              <span className="text-[10px] text-emerald-500 font-semibold">ধন্যবাদ! আপনি সফলভাবে নিউজলেটারে যুক্ত হয়েছেন।</span>
            )}
          </form>

          {/* PWA Install Button */}
          <button
            onClick={handleInstallPWA}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-xs transition shadow-md"
          >
            <Smartphone size={15} />
            মোবাইল অ্যাপ ইনস্টল করুন
          </button>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="w-full bg-slate-950 dark:bg-black/90 sepia:bg-[#dfceab] border-t border-slate-800 sepia:border-[#dfceab]/60 py-4 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-zinc-600 sepia:text-[#705e4c]">
          <span>
            কপিরাইট © {new Date().getFullYear()} দ্য ডেইলি মানারাহ নিউজ পোর্টাল। সর্বস্বত্ব সংরক্ষিত।
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:underline">গোপনীয়তা নীতি</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">ব্যবহারের শর্তাবলী</Link>
            <span>•</span>
            <Link href="/fact-checking-policy" className="hover:underline">ফ্যাক্ট-চেকিং নীতি</Link>
            <span>•</span>
            <Link href="/correction-policy" className="hover:underline">সংশোধন নীতি</Link>
            <span>•</span>
            <Link href="/editorial-team" className="hover:underline">সম্পাদকীয় প্যানেল</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
