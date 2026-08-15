"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/Providers/ThemeProvider";
import {
  Menu,
  Search,
  PlusCircle,
  Sun,
  Moon,
  Bell,
  ExternalLink,
  ChevronDown,
  LogOut,
  User,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Derive simple breadcrumb title
  const getPageTitle = () => {
    if (pathname.includes("/admin/editor")) return "সংবাদ এডিটর ও এআই রাইটার";
    if (pathname.includes("/admin/dashboard")) return "ড্যাশবোর্ড ওভারভিউ ও কন্ট্রোল";
    return "অ্যাডমিন ড্যাশবোর্ড";
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 lg:px-8 transition-colors duration-300">
      <div className="h-full flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl text-slate-500 hover:text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-zinc-800 lg:hidden transition"
            aria-label="Toggle Navigation"
          >
            <Menu size={22} />
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span>অ্যাডমিন</span>
              <span>/</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{getPageTitle()}</span>
            </div>
            <h1 className="font-serif font-black text-sm md:text-base text-[var(--text-primary)] hidden sm:block">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="সংবাদ, রিপোর্টার অথবা অ্যাক্টিভিটি খুঁজুন..."
              className="w-full bg-slate-100 dark:bg-zinc-900/60 border border-[var(--border-color)] rounded-full pl-9 pr-12 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-400 transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-[var(--border-color)] px-1.5 py-0.5 rounded text-slate-400">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action, Theme, Notifications & User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Write News Button */}
          <Link
            href="/admin/editor"
            className="flex items-center gap-1.5 bg-[#0e3e4d] hover:bg-[#092731] text-amber-300 dark:bg-emerald-950 dark:hover:bg-emerald-900 border border-amber-400/40 font-bold text-xs px-3.5 py-2 rounded-full shadow-sm transition-all hover:scale-105"
          >
            <PlusCircle size={15} className="text-amber-400" />
            <span className="hidden sm:inline">নতুন সংবাদ</span>
          </Link>

          {/* Theme Switcher Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-zinc-900/80 p-1 rounded-full border border-[var(--border-color)]">
            <button
              onClick={() => setTheme("light")}
              title="লাইট মোড"
              className={`p-1.5 rounded-full transition ${
                theme === "light" ? "bg-white text-amber-500 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => setTheme("dark")}
              title="ডার্ক মোড"
              className={`p-1.5 rounded-full transition ${
                theme === "dark" ? "bg-zinc-800 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Moon size={14} />
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-full text-slate-500 hover:text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </button>

            {notificationsOpen && (
              <div
                className="absolute right-0 mt-2 w-80 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-color)]">
                  <span className="font-serif font-black text-xs text-[var(--text-primary)]">নোটিফিকেশনসমূহ</span>
                  <span className="text-[10px] bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
                    সিস্টেম সক্রিয়
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-[var(--border-color)] flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">সার্ভার ডাটাবেজ সিঙ্কড</p>
                      <p className="text-[10px] text-slate-400">সকল কনটেন্ট ও ইউজার ডাটা প্রস্তুত</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-2.5">
                    <Sparkles size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">এআই বানান চেক সক্রিয়</p>
                      <p className="text-[10px] text-slate-400">এডিটরে বাংলা বানান সংশোধন চালু আছে</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900/80 border border-[var(--border-color)] hover:border-amber-400 transition"
            >
              <div className="w-7 h-7 rounded-full bg-[#0e3e4d] border border-amber-400/40 text-amber-400 font-black text-xs flex items-center justify-center shadow-sm">
                {session?.user?.name?.[0] || "A"}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-[var(--text-primary)] truncate max-w-[100px]">
                  {session?.user?.name || "অ্যাডমিন"}
                </span>
                <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  {(session?.user as any)?.role || "SUPER_ADMIN"}
                </span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="p-3 border-b border-[var(--border-color)] mb-1">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                    {session?.user?.name || "ডেইলি মানারাহ অ্যাডমিন"}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {session?.user?.email || "admin@dailymanarah.com"}
                  </p>
                  <span className="mt-1.5 inline-block text-[9px] font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full uppercase">
                    {(session?.user as any)?.role || "SUPER_ADMIN"}
                  </span>
                </div>

                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-[var(--text-primary)] transition"
                >
                  <User size={15} /> ড্যাশবোর্ড প্রোফাইল
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-[var(--text-primary)] transition"
                >
                  <span className="flex items-center gap-2.5">
                    <ExternalLink size={15} /> লাইভ পোর্টাল
                  </span>
                  <span className="text-[10px] text-slate-400">↗</span>
                </Link>

                <div className="border-t border-[var(--border-color)] my-1"></div>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                >
                  <LogOut size={15} /> লগ আউট
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
