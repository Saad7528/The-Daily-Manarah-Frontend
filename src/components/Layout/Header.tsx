"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/Providers/ThemeProvider";
import { Logo } from "@/components/Branding/Logo";
import {
  Sun,
  Moon,
  Coffee,
  MapPin,
  Search,
  ChevronDown,
  Volume2,
  Menu,
  X,
  CloudSun,
  TrendingUp,
  XCircle,
  Award,
  Heart
} from "lucide-react";

// Mock location data
const locations = {
  Dhaka: {
    Dhaka: ["Mirpur", "Gulshan", "Dhanmondi", "Uttara"],
    Gazipur: ["Sadar", "Kaliakair", "Sreepur"],
    Narayanganj: ["Sadar", "Siddhirganj", "Rupganj"]
  },
  Chattogram: {
    Chattogram: ["Double Mooring", "Panchlaish", "Hathazari"],
    CoxsBazar: ["Sadar", "Ukhiya", "Teknaf"]
  },
  Sylhet: {
    Sylhet: ["Sadar", "Beanibazar", "Golapganj"]
  }
};

const categories = [
  { name: "জাতীয়", slug: "politics" },
  { name: "ফ্যাক্ট-চেক ও গবেষণা", slug: "fact-check-research" },
  { name: "ইসলামিক জীবন", slug: "islamic-life" },
  { name: "মানবসেবা", slug: "humanity-society" },
  { name: "মতামত", slug: "opinion-editorial" },
  { name: "মাল্টিমিডিয়া", slug: "multimedia" }
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Date states
  const [dates, setDates] = useState({ bn: "", en: "" });
  
  // Location states
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedThana, setSelectedThana] = useState("");
  
  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Breaking news banner state
  const [showBreaking, setShowBreaking] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Generate dates on client to avoid hydration mismatch
    const optionsBn: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const optionsEn: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const date = new Date();
    setDates({
      bn: date.toLocaleDateString("bn-BD", optionsBn),
      en: date.toLocaleDateString("en-US", optionsEn)
    });
  }, []);

  // Filter suggestion mock trigger
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const mockSuggestions = [
        "বাংলাদেশে তথ্যপ্রযুক্তির উন্নয়ন",
        "অলিম্পিক গেমসের সর্বশেষ আপডেট",
        "বিশ্ব অর্থনীতিতে মুদ্রাস্ফীতির প্রভাব",
        "সমাজবিজ্ঞানের নতুন দিগন্ত",
        "আজকের সোনার বাজার দর"
      ].filter((item) => item.includes(searchQuery) || searchQuery.split(" ").some(word => item.includes(word)));
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/archive?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
    }
  };

  const handleLocationSearch = () => {
    if (selectedDivision && selectedDistrict && selectedThana) {
      router.push(`/location/${selectedDistrict.toLowerCase()}/${selectedThana.toLowerCase()}`);
    } else if (selectedDivision && selectedDistrict) {
      router.push(`/location/${selectedDistrict.toLowerCase()}`);
    }
  };

  return (
    <header className="w-full flex flex-col border-b border-[var(--border-color)] bg-[var(--bg-card)] transition-colors duration-300 relative">
      
      {/* ➔ FLOATING EYE COMFORT THEME SELECTOR BAR (Bottom Right, Pops Up on Scroll, doesn't eat header space) */}
      <div className="fixed right-4 bottom-24 z-50 flex flex-col bg-[var(--bg-card)]/90 backdrop-blur-md p-1.5 rounded-full border border-[var(--border-color)] shadow-xl gap-2 transition-transform hover:scale-105 duration-200">
        <button
          onClick={() => setTheme("light")}
          className={`p-2 rounded-full transition-all ${
            theme === "light"
              ? "bg-emerald-600 text-white shadow"
              : "text-slate-500 hover:text-slate-700 dark:text-zinc-400"
          }`}
          title="লাইট মোড"
        >
          <Sun size={15} />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 rounded-full transition-all ${
            theme === "dark"
              ? "bg-zinc-950 text-amber-400 shadow border border-zinc-800"
              : "text-slate-400 hover:text-slate-200"
          }`}
          title="AMOLED ডার্ক মোড"
        >
          <Moon size={15} />
        </button>
        <button
          onClick={() => setTheme("sepia")}
          className={`p-2 rounded-full transition-all ${
            theme === "sepia"
              ? "bg-[#f5ecd7] text-amber-900 shadow border border-amber-250"
              : "text-amber-800/60 hover:text-amber-900"
          }`}
          title="সেপিয়া চোখের আরাম মোড"
        >
          <Coffee size={15} />
        </button>
      </div>

      {/* 1. TOP BAR (Dates & Ticker) */}
      <div className="w-full bg-slate-100 dark:bg-zinc-900 sepia:bg-[#ebdcb9] border-b border-[var(--border-color)] text-xs py-2 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Dates & Weather */}
          <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-300 sepia:text-[#705e4c]">
            <span className="font-semibold">{dates.bn}</span>
            <span className="hidden md:inline">|</span>
            <span>{dates.en}</span>
            <span className="hidden md:inline">|</span>
            <div className="flex items-center gap-1 text-emerald-650 dark:text-amber-400 sepia:text-amber-800">
              <CloudSun size={14} />
              <span>ঢাকা: ৩১°সে. (বজ্রবৃষ্টির সম্ভাবনা)</span>
            </div>
          </div>

          {/* Scrolling Ticker (Live Ticker) */}
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-1/3 bg-slate-200/50 dark:bg-zinc-800/50 sepia:bg-[#dfceab]/50 px-2 py-0.5 rounded border border-[var(--border-color)]">
            <span className="shrink-0 flex items-center gap-1 font-bold text-[10px] text-red-500 uppercase">
              <TrendingUp size={12} className="animate-bounce" />
              টিকার:
            </span>
            <div className="relative w-full overflow-hidden h-4">
              <div className="absolute flex whitespace-nowrap animate-marquee text-[11px] font-medium text-slate-700 dark:text-slate-300 sepia:text-[#433422] gap-10">
                <span>সোনার বাজার দর: ২২ ক্যারেট ১,১৮,০০০ টাকা (ভরি)</span>
                <span>ইউএসডি এক্সচেঞ্জ রেট: ১২০.৫০ টাকা</span>
                <span>ক্রিকেট স্কোর: বাংলাদেশ ২৮ো/৫ (৪৫ ওভার) বনাম পাকিস্তান</span>
                <span>জ্বালানি তেলের দাম আন্তর্জাতিক বাজারে হ্রাস পেয়েছে</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ➔ LOCATION BAR WIDGET (Hidden on Mobile View to save fixed screen height) */}
      <div className="hidden md:block w-full py-2 px-4 border-b border-[var(--border-color)] text-xs bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={14} className="text-[var(--accent-color)]" />
            <span className="font-semibold text-slate-700 dark:text-slate-300 sepia:text-[#433422]">সারাদেশের খবর:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Division dropdown */}
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
                setSelectedThana("");
              }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-2 py-1 outline-none text-xs text-slate-700 dark:text-slate-300 sepia:text-[#433422]"
            >
              <option value="">বি विभाग নির্বাচন করুন</option>
              {Object.keys(locations).map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            {/* District dropdown */}
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedThana("");
              }}
              disabled={!selectedDivision}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-2 py-1 outline-none text-xs text-slate-700 dark:text-slate-300 sepia:text-[#433422] disabled:opacity-50"
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {selectedDivision &&
                Object.keys((locations as any)[selectedDivision]).map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
            </select>

            {/* Thana dropdown */}
            <select
              value={selectedThana}
              onChange={(e) => setSelectedThana(e.target.value)}
              disabled={!selectedDistrict}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-2 py-1 outline-none text-xs text-slate-700 dark:text-slate-300 sepia:text-[#433422] disabled:opacity-50"
            >
              <option value="">থানা নির্বাচন করুন</option>
              {selectedDivision &&
                selectedDistrict &&
                (locations as any)[selectedDivision][selectedDistrict].map((thana: string) => (
                  <option key={thana} value={thana}>
                    {thana}
                  </option>
                ))}
            </select>

            <button
              onClick={handleLocationSearch}
              disabled={!selectedDistrict}
              className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-semibold px-3 py-1 rounded transition disabled:opacity-50 text-xs"
            >
              খুঁজুন
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRANDING BAR */}
      <div className="w-full py-4 md:py-5 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* ➔ Search Bar (Hidden on Mobile view, replaced by a neat toggle action) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-full md:w-80 order-2 md:order-1">
          <div className="flex items-center bg-[var(--bg-input)] border border-[var(--border-color)] rounded-full px-3 py-1.5">
            <input
              type="text"
              placeholder="সংবাদ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-primary)] placeholder-slate-400"
            />
            <button type="submit" className="text-slate-400 hover:text-[var(--accent-color)] transition">
              <Search size={16} />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {isSearchFocused && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 overflow-hidden">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSearchQuery(item);
                    router.push(`/archive?search=${encodeURIComponent(item)}`);
                  }}
                  className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800 sepia:hover:bg-[#dfceab] text-sm cursor-pointer border-b border-[var(--border-color)] last:border-0"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Center Logo */}
        <div className="order-1 md:order-2 flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Action badges/epaper (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-2.5 order-3">
          <Link
            href="/donate"
            className="flex items-center gap-1 bg-red-650 hover:bg-red-700 text-white text-[11px] font-bold px-3.5 py-2 rounded-full border border-red-200 dark:border-red-900 transition shadow-sm animate-pulse"
          >
            <Heart size={13} className="shrink-0 text-white" />
            <span>মানারাহ ফাউন্ডেশনে অনুদান দিন</span>
          </Link>
          <Link
            href="/e-paper"
            className="flex items-center gap-1.5 bg-slate-150 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 sepia:bg-[#dfceab] text-[11px] font-bold px-3.5 py-2 rounded-full border border-[var(--border-color)] transition"
          >
            <Award size={14} className="text-amber-500" />
            ই-পেপার সংস্করণ
          </Link>
        </div>
      </div>

      {/* Breaking News Flash */}
      {showBreaking && (
        <div className="w-full bg-red-50 dark:bg-red-950/20 sepia:bg-amber-100 border-y border-red-100 dark:border-red-900/30 py-2.5 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="shrink-0 bg-red-600 text-white font-black px-2 py-0.5 rounded text-[10px] uppercase animate-pulse">
                ব্রেকিং নিউজ:
              </span>
              <span className="font-semibold text-red-850 dark:text-red-300 sepia:text-amber-900 truncate">
                আজ সারাদেশে বজ্রসহ ভারী বৃষ্টিপাতের পূর্বাভাস দিয়েছে আবহাওয়া অধিদপ্তর। সবাইকে নিরাপদ আশ্রয়ে থাকতে বলা হয়েছে।
              </span>
            </div>
            <button onClick={() => setShowBreaking(false)} className="text-slate-400 hover:text-red-600 transition shrink-0">
              <XCircle size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ➔ 3. STICKY MEGA NAVIGATION & HORIZONTAL MOBILE SWIPE BAR (Sticks to top on scroll) */}
      <nav className="w-full sticky top-0 z-45 bg-[var(--bg-card)]/95 backdrop-blur-md border-y border-[var(--border-color)] shadow-xs select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          
          {/* Desktop Links (md:flex) */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-3.5 text-sm font-bold text-[var(--accent-color)] hover:bg-slate-50 dark:hover:bg-zinc-900 sepia:hover:bg-[#dfceab] border-b-2 border-[var(--accent-color)]"
            >
              প্রচ্ছদ
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-4 py-3.5 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-slate-50 dark:hover:bg-zinc-900 sepia:hover:bg-[#dfceab] transition"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about-us"
              className="px-4 py-3.5 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-slate-50 dark:hover:bg-zinc-900 sepia:hover:bg-[#dfceab] transition"
            >
              মানারাহ ফাউন্ডেশন
            </Link>
          </div>

          {/* ➔ Mobile Horizontally Scrollable Category Bar (md:hidden - Allows smooth swiping) */}
          <div className="flex md:hidden items-center justify-between py-2 w-full">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5 w-full text-xs font-bold mr-2 select-none">
              <Link
                href="/"
                className="shrink-0 px-3.5 py-1.5 bg-emerald-655 text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400 rounded-full bg-slate-100"
              >
                প্রচ্ছদ
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="shrink-0 px-3.5 py-1.5 text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-input)] rounded-full transition"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/about-us"
                className="shrink-0 px-3.5 py-1.5 text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-input)] rounded-full transition"
              >
                মানারাহ ফাউন্ডেশন
              </Link>
            </div>

            {/* Mobile Actions: Simple Search Icon Trigger & Hamburger Menu */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-input)] transition text-[var(--text-primary)] shrink-0"
                title="সংবাদ অনুসন্ধান"
              >
                {isMobileSearchOpen ? <X size={16} /> : <Search size={16} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-input)] transition text-[var(--text-primary)] shrink-0"
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* ➔ Mobile Search dropdown overlay toggler */}
        {isMobileSearchOpen && (
          <div className="md:hidden w-full bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-2.5 shadow-md">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="flex items-center bg-[var(--bg-input)] border border-[var(--border-color)] rounded-full px-3 py-1.5">
                <input
                  type="text"
                  placeholder="সংবাদ খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-full text-[var(--text-primary)] placeholder-slate-400"
                />
                <button type="submit" className="text-slate-400">
                  <Search size={14} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile menu dropdown drawer (Backup navigation) */}
        {isMenuOpen && (
          <div className="md:hidden w-full bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-4 flex flex-col gap-2.5 z-50 shadow-lg">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[var(--accent-color)] hover:bg-[var(--bg-input)] rounded transition"
            >
              প্রচ্ছদ
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] rounded transition"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about-us"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] rounded transition"
            >
              মানারাহ ফাউন্ডেশন
            </Link>
            <Link
              href="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition flex items-center gap-1.5"
            >
              <Heart size={14} />
              <span>মানারাহ ফাউন্ডেশনে অনুদান দিন</span>
            </Link>
            <Link
              href="/e-paper"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded transition flex items-center gap-1.5"
            >
              <Award size={14} />
              ই-পেপার সংস্করণ
            </Link>
          </div>
        )}
      </nav>
      
      {/* Ticker marquee CSS style injected in header */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </header>
  );
}
