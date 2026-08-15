"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/Providers/ThemeProvider";
import { Logo } from "@/components/Branding/Logo";
import {
  Sun,
  Moon,
  MapPin,
  Search,
  Menu,
  X,
  CloudSun,
  TrendingUp,
  XCircle,
  Award,
  Heart,
  Calendar,
  ChevronDown
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

  // Location Popover states
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedThana, setSelectedThana] = useState("");

  // Date Search Popover states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  // Quick Keyword Search Bar state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Breaking news banner state
  const [showBreaking, setShowBreaking] = useState(true);
  const [breakingNewsOn, setBreakingNewsOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Click outside listener for popovers
  const locationRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

    // Fetch global site settings
    const fetchGlobalSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/settings`);
        if (res.ok) {
          const data = await res.json();
          setBreakingNewsOn(data.breakingNewsOn || false);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      }
    };
    fetchGlobalSettings();
  }, []);

  const handleDateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      router.push(`/archive?date=${selectedDate}`);
      setIsCalendarOpen(false);
    }
  };

  const handleKeywordSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/archive?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLocationSearch = () => {
    if (selectedDivision && selectedDistrict && selectedThana) {
      router.push(`/location/${selectedDistrict.toLowerCase()}/${selectedThana.toLowerCase()}`);
      setIsLocationOpen(false);
    } else if (selectedDivision && selectedDistrict) {
      router.push(`/location/${selectedDistrict.toLowerCase()}`);
      setIsLocationOpen(false);
    }
  };

  return (
    <header className="w-full flex flex-col border-b border-[var(--border-color)] bg-[var(--bg-card)] transition-colors duration-300 relative">

      {/* ➔ 1. TOP BAR (Dates, Weather, Live Marquee Ticker & Theme Toggle) */}
      <div className="w-full bg-[var(--bg-input)]/80 border-b border-[var(--border-color)] text-xs py-2 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Dates & Weather */}
          <div className="flex flex-wrap items-center gap-3 text-[var(--text-secondary)] text-[11px] font-medium">
            <span className="font-semibold text-[var(--text-primary)]">{dates.bn}</span>
            <span className="hidden md:inline text-[var(--border-color)]">|</span>
            <span>{dates.en}</span>
            <span className="hidden md:inline text-[var(--border-color)]">|</span>
            <div className="hidden md:flex items-center gap-1 text-[var(--accent-color)] font-medium">
              <CloudSun size={14} />
              <span>ঢাকা: ৩১°সে. (বজ্রবৃষ্টির সম্ভাবনা)</span>
            </div>
          </div>

          {/* Right Utility: Live Scrolling Ticker + Theme Toggle */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            
            {/* Scrolling Live Ticker */}
            <div className="hidden md:flex items-center gap-2 overflow-hidden w-64 bg-[var(--bg-card)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
              <span className="shrink-0 flex items-center gap-1 font-bold text-[10px] text-red-600 uppercase">
                <TrendingUp size={12} className="animate-pulse" />
                টিকার:
              </span>
              <div className="relative w-full overflow-hidden h-4">
                <div className="absolute flex whitespace-nowrap animate-marquee text-[11px] font-semibold text-[var(--text-primary)] gap-8">
                  <span>সোনার বাজার দর: ২২ ক্যারেট ১,১৮,০০০ টাকা (ভরি)</span>
                  <span>ইউএসডি এক্সচেঞ্জ রেট: ১২০.৫০ টাকা</span>
                  <span>ক্রিকেট স্কোর: বাংলাদেশ ২৮০/৫ (৪৫ ওভার) বনাম পাকিস্তান</span>
                  <span>জ্বালানি তেলের দাম আন্তর্জাতিক বাজারে হ্রাস পেয়েছে</span>
                </div>
              </div>
            </div>

            {/* Clean Theme Switcher */}
            <div className="flex items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-md p-0.5">
              <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded transition ${
                  theme === "light"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                title="লাইট মোড"
              >
                <Sun size={13} />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded transition ${
                  theme === "dark"
                    ? "bg-slate-900 text-amber-400 font-bold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                title="ডার্ক মোড"
              >
                <Moon size={13} />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ➔ 2. LOCATION BAR WIDGET (সারাদেশের খবর) */}
      <div className="hidden md:block w-full py-2 border-b border-[var(--border-color)] text-xs bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
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
              className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-md px-2.5 py-1 outline-none text-xs text-[var(--text-primary)]"
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
              className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-md px-2.5 py-1 outline-none text-xs text-[var(--text-primary)] disabled:opacity-50"
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
              className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-md px-2.5 py-1 outline-none text-xs text-[var(--text-primary)] disabled:opacity-50"
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
              className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-slate-950 font-bold px-3.5 py-1 rounded-md transition disabled:opacity-50 text-xs"
            >
              খুঁজুন
            </button>
          </div>

        </div>
      </div>

      {/* ➔ 3. MAIN BRANDING MASTHEAD */}
      <div className="w-full py-4 md:py-6 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left: Datepicker Calendar Popover Toggle Button */}
          <div className="hidden md:block relative order-2 md:order-1" ref={calendarRef}>
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex items-center gap-2 bg-[var(--bg-input)] hover:bg-[var(--border-color)] border border-[var(--border-color)] rounded-md px-4 py-2 text-xs font-bold text-[var(--text-primary)] transition"
            >
              <Calendar size={14} className="text-amber-500" />
              <span>তারিখ অনুযায়ী আর্কাইভ খবর</span>
            </button>

            {/* Date Selector Popover */}
            {isCalendarOpen && (
              <div className="absolute left-0 mt-2 z-50 bg-[var(--bg-card)] border border-amber-400 rounded-lg p-4 w-72 flex flex-col gap-3 shadow-md">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                  <Calendar size={14} />
                  <span>তারিখ নির্বাচন করুন</span>
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md px-3 py-2 text-xs font-medium outline-none text-[var(--text-primary)] focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleDateSearch}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-md text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Search size={14} />
                  <span>খুঁজুন</span>
                </button>
              </div>
            )}
          </div>

          {/* Center: Brand Logo */}
          <div className="order-1 md:order-2 flex justify-center">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
          </div>

          {/* Right: Action Badges (Donate & E-Paper) */}
          <div className="hidden md:flex items-center gap-2.5 order-3">
            <Link
              href="/donate"
              className="flex items-center gap-1.5 bg-[#e6f4f0] dark:bg-[#0f2d36] text-[#0e3e4d] dark:text-white text-xs font-bold px-4 py-2 rounded-md border border-[#bcdad1] dark:border-[#1a4450] transition hover:bg-[#d6ece6]"
            >
              <Heart size={13} className="shrink-0 text-red-500 fill-red-500" />
              <span>মানারাহ ফাউন্ডেশনে অনুদান দিন</span>
            </Link>
            <Link
              href="/e-paper"
              className="flex items-center gap-1.5 bg-[var(--bg-input)] hover:bg-[var(--border-color)] text-[var(--text-primary)] text-xs font-bold px-4 py-2 rounded-md border border-[var(--border-color)] transition"
            >
              <Award size={14} className="text-amber-500" />
              <span>ই-পেপার সংস্করণ</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ➔ 4. BREAKING NEWS FLASH (When Active) */}
      {breakingNewsOn && showBreaking && (
        <div className="hidden md:block w-full bg-red-50 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/30 py-2.5 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="shrink-0 bg-red-600 text-white font-black px-2 py-0.5 rounded text-[10px] uppercase animate-pulse">
                ব্রেকিং নিউজ:
              </span>
              <span className="font-bold text-red-900 dark:text-red-300 truncate">
                আজ সারাদেশে বজ্রসহ ভারী বৃষ্টিপাতের পূর্বাভাস দিয়েছে আবহাওয়া অধিদপ্তর। সবাইকে সতর্ক থাকার অনুরোধ করা হয়েছে।
              </span>
            </div>
            <button onClick={() => setShowBreaking(false)} className="text-slate-400 hover:text-red-600 transition shrink-0">
              <XCircle size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ➔ 5. STICKY EDITORIAL NAVIGATION BAR */}
      <nav className="w-full sticky top-0 z-45 bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border-color)] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Desktop Categories (Left-aligned & Flush with body grid) */}
          <div className="hidden md:flex items-center gap-1 -ml-3">
            <Link
              href="/"
              className="px-3.5 py-3 text-sm font-bold text-[var(--accent-color)] hover:bg-[var(--bg-primary)] border-b-2 border-[var(--accent-color)]"
            >
              প্রচ্ছদ
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3.5 py-3 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-primary)] transition"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/manarah-foundation"
              className="px-3.5 py-3 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-primary)] transition"
            >
              মানারাহ ফাউন্ডেশন
            </Link>
          </div>

          {/* Desktop Right: Quick Search Input */}
          <div className="hidden md:flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleKeywordSearch} className="flex items-center bg-[var(--bg-input)] border border-[var(--border-color)] rounded-md px-2.5 py-1 text-xs w-60 transition-all">
                <input
                  type="text"
                  placeholder="খবরের শিরোনাম খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent outline-none w-full text-[var(--text-primary)] text-xs"
                />
                <button type="submit" className="text-slate-400 hover:text-[var(--accent-color)]">
                  <Search size={14} />
                </button>
                <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-1 text-slate-400 hover:text-red-500">
                  <X size={14} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2.5 py-1.5 rounded-md hover:bg-[var(--bg-input)] transition"
              >
                <Search size={14} />
                <span className="font-medium">অনুসন্ধান</span>
              </button>
            )}
          </div>

          {/* ➔ Mobile Swiper Category Bar & Actions */}
          <div className="flex md:hidden items-center justify-between py-2 w-full">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5 w-full text-xs font-bold mr-2 select-none">
              <Link
                href="/"
                className="shrink-0 px-3 py-1 bg-amber-500 text-slate-950 rounded-md"
              >
                প্রচ্ছদ
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="shrink-0 px-3 py-1 text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-input)] rounded-md transition"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/manarah-foundation"
                className="shrink-0 px-3 py-1 text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-input)] rounded-md transition"
              >
                মানারাহ ফাউন্ডেশন
              </Link>
            </div>

            {/* Mobile Actions: Calendar, Menu */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="p-1.5 rounded-md border border-[var(--border-color)] hover:bg-[var(--bg-input)] transition text-[var(--text-primary)]"
                title="তারিখ অনুযায়ী সংবাদ"
              >
                {isCalendarOpen ? <X size={16} /> : <Calendar size={16} className="text-amber-500" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 rounded-md border border-[var(--border-color)] hover:bg-[var(--bg-input)] transition text-[var(--text-primary)]"
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

        </div>

        {/* ➔ Mobile Date selector dropdown panel */}
        {isCalendarOpen && (
          <div className="md:hidden w-full bg-[var(--bg-card)] border-t border-[var(--border-color)] p-4 flex justify-center">
            <div className="w-full max-w-sm border border-amber-400 rounded-lg p-4 bg-[var(--bg-card)] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <Calendar size={14} />
                <span>তারিখ নির্বাচন করুন</span>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md px-3.5 py-2 text-xs font-medium outline-none text-[var(--text-primary)] focus:border-amber-500"
              />
              <button
                onClick={handleDateSearch}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-md text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Search size={14} />
                <span>খুঁজুন</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu dropdown drawer */}
        {isMenuOpen && (
          <div className="md:hidden w-full bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-4 flex flex-col gap-2.5 z-50">
            {/* Mobile Keyword Search */}
            <form onSubmit={handleKeywordSearch} className="flex items-center bg-[var(--bg-input)] border border-[var(--border-color)] rounded-md px-3 py-2 text-xs w-full mb-1">
              <input
                type="text"
                placeholder="খবরের শিরোনাম লিখুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-[var(--text-primary)] text-xs"
              />
              <button type="submit" className="text-[var(--accent-color)]">
                <Search size={14} />
              </button>
            </form>

            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[var(--accent-color)] hover:bg-[var(--bg-input)] rounded-md transition"
            >
              প্রচ্ছদ
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] rounded-md transition"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/manarah-foundation"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] rounded-md transition"
            >
              মানারাহ ফাউন্ডেশন
            </Link>
            <Link
              href="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded-md transition flex items-center gap-1.5"
            >
              <Heart size={14} />
              <span>মানারাহ ফাউন্ডেশনে অনুদান দিন</span>
            </Link>
            <Link
              href="/e-paper"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-md transition flex items-center gap-1.5"
            >
              <Award size={14} />
              ই-পেপার সংস্করণ
            </Link>

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] mt-1">
              <span className="text-xs font-semibold text-[var(--text-secondary)]">থিম নির্বাচন:</span>
              <div className="flex items-center bg-[var(--bg-input)] border border-[var(--border-color)] rounded-md p-0.5">
                <button
                  onClick={() => setTheme("light")}
                  className={`px-3 py-1 text-xs rounded transition ${
                    theme === "light"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  লাইট
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`px-3 py-1 text-xs rounded transition ${
                    theme === "dark"
                      ? "bg-slate-900 text-amber-400 font-bold"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  ডার্ক
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Ticker marquee CSS */}
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
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
}
