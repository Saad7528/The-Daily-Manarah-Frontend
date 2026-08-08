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
  Heart,
  Calendar
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

  // Date Search Popover states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  // Breaking news banner state
  const [showBreaking, setShowBreaking] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);

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

  const handleDateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      router.push(`/archive?date=${selectedDate}`);
      setIsCalendarOpen(false);
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
      
      {/* ➔ SLIDING SIDEBAR THEME SELECTOR DRAWER (Floating on the right edge of screen, opens on click, hides default on mobile, doesn't block text reading) */}
      <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center transition-all duration-300 ${isThemeDrawerOpen ? "translate-x-0" : "translate-x-[calc(100%-12px)] md:translate-x-0"}`}>
        
        {/* Toggle pull-out Tab (Hidden on desktop since desktop has enough space, or shown as clean pull-out on mobile) */}
        <button
          onClick={() => setIsThemeDrawerOpen(!isThemeDrawerOpen)}
          className="md:hidden flex items-center justify-center bg-[var(--bg-card)] border-l border-y border-[var(--border-color)] rounded-l-xl p-3 shadow-lg text-[var(--accent-color)] hover:scale-105 transition duration-200"
          title="থিম পরিবর্তন প্যানেল"
        >
          {isThemeDrawerOpen ? (
            <X size={15} />
          ) : theme === "light" ? (
            <Sun size={15} className="text-amber-500 animate-spin-slow" />
          ) : (
            <Moon size={15} className="text-amber-400" />
          )}
        </button>

        {/* Theme select Panel (Fitted with premium rounded shapes and gold border accents) */}
        <div className="bg-[var(--bg-card)] border-l border-y border-[var(--border-color)] rounded-l-2xl p-4 shadow-2xl flex flex-col gap-3 w-32 border-2 border-r-0 border-amber-400">
          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-1 text-center">
            থিম পরিবর্তন
          </span>
          <button
            onClick={() => {
              setTheme("light");
              setIsThemeDrawerOpen(false);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black transition ${
              theme === "light"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-[var(--text-primary)] hover:bg-[var(--bg-input)]"
            }`}
          >
            <Sun size={12} />
            <span>লাইট মোড</span>
          </button>
          <button
            onClick={() => {
              setTheme("dark");
              setIsThemeDrawerOpen(false);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black transition ${
              theme === "dark"
                ? "bg-zinc-950 text-amber-400 border border-zinc-800 shadow"
                : "text-[var(--text-primary)] hover:bg-[var(--bg-input)]"
            }`}
          >
            <Moon size={12} />
            <span>ডার্ক মোড</span>
          </button>
        </div>
      </div>

      {/* 1. TOP BAR (Dates & Ticker) */}
      <div className="w-full bg-[var(--bg-input)] border-b border-[var(--border-color)] text-xs py-2 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Dates & Weather */}
          <div className="flex flex-wrap items-center gap-3 text-[var(--text-secondary)]">
            <span className="font-semibold">{dates.bn}</span>
            <span className="hidden md:inline">|</span>
            <span>{dates.en}</span>
            <span className="hidden md:inline">|</span>
            <div className="flex items-center gap-1 text-[var(--accent-color)]">
              <CloudSun size={14} />
              <span>ঢাকা: ৩১°সে. (বজ্রবৃষ্টির সম্ভাবনা)</span>
            </div>
          </div>

          {/* Scrolling Ticker (Live Ticker) */}
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-1/3 bg-[var(--bg-card)]/50 px-2 py-0.5 rounded border border-[var(--border-color)]">
            <span className="shrink-0 flex items-center gap-1 font-bold text-[10px] text-red-650 uppercase">
              <TrendingUp size={12} className="animate-bounce" />
              টিকার:
            </span>
            <div className="relative w-full overflow-hidden h-4">
              <div className="absolute flex whitespace-nowrap animate-marquee text-[11px] font-bold text-[var(--text-primary)] gap-10">
                <span>সোনার বাজার দর: ২২ ক্যারেট ১,১৮,০০০ টাকা (ভরি)</span>
                <span>ইউএসডি এক্সচেঞ্জ রেট: ১২০.৫০ টাকা</span>
                <span>ক্রিকেট স্কোর: বাংলাদেশ ২৮০/৫ (৪৫ ওভার) বনাম পাকিস্তান</span>
                <span>জ্বালানি তেলের দাম আন্তর্জাতিক বাজারে হ্রাস পেয়েছে</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ➔ LOCATION BAR WIDGET (Hidden on Mobile View to save fixed screen height) */}
      <div className="hidden md:block w-full py-2 px-4 border-b border-[var(--border-color)] text-xs bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <MapPin size={14} className="text-[var(--accent-color)]" />
            <span className="font-semibold text-[var(--text-primary)]">সারাদেশের খবর:</span>
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
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-2 py-1 outline-none text-xs text-[var(--text-primary)]"
            >
              <option value="">বিভাগ নির্বাচন করুন</option>
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
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-2 py-1 outline-none text-xs text-[var(--text-primary)] disabled:opacity-50"
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
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-2 py-1 outline-none text-xs text-[var(--text-primary)] disabled:opacity-50"
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
        
        {/* ➔ Premium Datepicker Calendar Popover Toggle Button (Instead of standard search box) */}
        <div className="hidden md:block relative order-2 md:order-1">
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="flex items-center gap-2 bg-[var(--bg-input)] hover:bg-[var(--border-color)] border border-[var(--border-color)] rounded-full px-5 py-2.5 text-xs font-bold text-[var(--text-primary)] transition"
          >
            <Calendar size={14} className="text-amber-500" />
            <span>তারিখ অনুযায়ী আর্কাইভ খবর</span>
          </button>

          {/* Date Selector Popover (Designed exactly like the User Mockup) */}
          {isCalendarOpen && (
            <div className="absolute left-0 mt-2 z-50 bg-[var(--bg-card)] border-2 border-amber-500 rounded-2xl p-6 shadow-2xl w-72 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
                <Calendar size={14} />
                <span>তারিখ নির্বাচন করুন</span>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-xs font-semibold outline-none text-[var(--text-primary)] focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="button"
                onClick={handleDateSearch}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition"
              >
                <Search size={14} />
                <span>খুঁজুন</span>
              </button>
            </div>
          )}
        </div>

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
            className="flex items-center gap-1 bg-red-655 hover:bg-red-700 text-white text-[11px] font-bold px-3.5 py-2 rounded-full border border-red-200 dark:border-red-900 transition shadow-sm animate-pulse"
          >
            <Heart size={13} className="shrink-0 text-white" />
            <span>মানারাহ ফাউন্ডেশনে অনুদান দিন</span>
          </Link>
          <Link
            href="/e-paper"
            className="flex items-center gap-1.5 bg-[var(--bg-input)] hover:bg-[var(--border-color)] text-[var(--text-primary)] text-[11px] font-bold px-3.5 py-2 rounded-full border border-[var(--border-color)] transition"
          >
            <Award size={14} className="text-amber-500" />
            ই-পেপার সংস্করণ
          </Link>
        </div>
      </div>

      {/* Breaking News Flash */}
      {showBreaking && (
        <div className="w-full bg-red-50 dark:bg-red-950/20 border-y border-red-100 dark:border-red-900/30 py-2.5 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="shrink-0 bg-red-600 text-white font-black px-2 py-0.5 rounded text-[10px] uppercase animate-pulse">
                ব্রেকিং নিউজ:
              </span>
              <span className="font-bold text-red-900 dark:text-red-300 truncate">
                আজ সারাদেশে বজ্রসহ ভারী বৃষ্টিপাতের পূর্বাভাস দিয়েছে আবহাওয়া অধিদপ্তর। সবাইকে নিরাপদ আশ্রয়ে থাকতে বলা হয়েছে।
              </span>
            </div>
            <button onClick={() => setShowBreaking(false)} className="text-slate-400 hover:text-red-600 transition shrink-0">
              <XCircle size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ➔ 3. STICKY MEGA NAVIGATION & HORIZONTAL MOBILE SWIPE BAR */}
      <nav className="w-full sticky top-0 z-45 bg-[var(--bg-card)]/95 backdrop-blur-md border-y border-[var(--border-color)] shadow-xs select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          
          {/* Desktop Links (md:flex) */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-3.5 text-sm font-bold text-[var(--accent-color)] hover:bg-[var(--bg-primary)] border-b-2 border-[var(--accent-color)]"
            >
              প্রচ্ছদ
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-4 py-3.5 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-primary)] transition"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about-us"
              className="px-4 py-3.5 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-primary)] transition"
            >
              মানারাহ ফাউন্ডেশন
            </Link>
          </div>

          {/* ➔ Mobile Horizontally Scrollable Category Bar (md:hidden - Allows smooth swiping) */}
          <div className="flex md:hidden items-center justify-between py-2 w-full">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5 w-full text-xs font-bold mr-2 select-none">
              <Link
                href="/"
                className="shrink-0 px-3.5 py-1.5 bg-amber-500 text-slate-950 rounded-full"
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

            {/* Mobile Actions: Calendar Selector Trigger & Hamburger Menu */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-input)] transition text-[var(--text-primary)] shrink-0 animate-pulse"
                title="তারিখ অনুযায়ী সংবাদ"
              >
                {isCalendarOpen ? <X size={16} /> : <Calendar size={16} className="text-amber-500" />}
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

        {/* ➔ Mobile Date selector dropdown panel */}
        {isCalendarOpen && (
          <div className="md:hidden w-full bg-[var(--bg-card)] border-t border-[var(--border-color)] p-4 shadow-md flex justify-center">
            <div className="w-full max-w-sm border-2 border-amber-500 rounded-2xl p-5 bg-[var(--bg-card)] flex flex-col gap-4">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
                <Calendar size={14} />
                <span>তারিখ নির্বাচন করুন</span>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[var(--bg-primary)] border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none text-[var(--text-primary)] focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={handleDateSearch}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-955 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Search size={14} />
                <span>খুঁজুন</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu dropdown drawer */}
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
