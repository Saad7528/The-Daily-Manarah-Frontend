"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FilePlus,
  ShieldAlert,
  Users,
  History,
  Sliders,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  FileText,
  Lock,
  X
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export function AdminSidebar({ mobileOpen = false, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveHash(window.location.hash);
      const handleHashChange = () => setActiveHash(window.location.hash);
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  const navItems = [
    {
      label: "ড্যাশবোর্ড ওভারভিউ",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: null,
      sectionId: "",
    },
    {
      label: "নতুন সংবাদ লিখুন",
      href: "/admin/editor",
      icon: FilePlus,
      badge: "AI Tool",
      sectionId: null,
    },
    {
      label: "সংবাদ মডারেশন",
      href: "/admin/dashboard#moderation",
      icon: FileText,
      badge: null,
      sectionId: "moderation",
    },
    {
      label: "টিম ও রোলস (RBAC)",
      href: "/admin/dashboard#team",
      icon: Users,
      badge: null,
      sectionId: "team",
    },
    {
      label: "অডিট ও রিভিশন হিস্ট্রি",
      href: "/admin/dashboard#revisions",
      icon: History,
      badge: null,
      sectionId: "revisions",
    },
    {
      label: "গ্লোবাল সুইচবোর্ড",
      href: "/admin/dashboard#settings",
      icon: Sliders,
      badge: null,
      sectionId: "settings",
    },
  ];

  const handleLinkClick = (href: string) => {
    if (href.includes("#")) {
      setActiveHash("#" + href.split("#")[1]);
    } else if (href === "/admin/dashboard") {
      setActiveHash("");
    }
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.href === "/admin/editor") {
      return pathname.startsWith("/admin/editor");
    }
    if (item.sectionId) {
      return pathname === "/admin/dashboard" && activeHash === `#${item.sectionId}`;
    }
    if (item.href === "/admin/dashboard") {
      return pathname === "/admin/dashboard" && (!activeHash || activeHash === "#overview" || activeHash === "");
    }
    return pathname === item.href;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Aside Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-[var(--bg-card)] border-r border-[var(--border-color)] transition-all duration-300 shadow-xl lg:shadow-none ${
          collapsed ? "lg:w-20" : "lg:w-64"
        } ${mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header / Brand Identity */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-color)]">
          <Link
            href="/admin/dashboard"
            onClick={() => handleLinkClick("/admin/dashboard")}
            className={`flex items-center gap-3 overflow-hidden ${collapsed ? "justify-center w-full" : ""}`}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0e3e4d] dark:bg-emerald-950 border border-amber-400/40 text-amber-400 flex items-center justify-center font-serif font-black text-xl shadow-md">
              ম
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-serif font-black text-base tracking-tight text-[var(--text-primary)] truncate">
                  ডেইলি মানারাহ
                </span>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={10} /> অ্যাডমিন প্যানেল
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Live System Indicator */}
        {!collapsed && (
          <div className="mx-3 mt-3 p-2.5 rounded-xl bg-[#0e3e4d]/5 dark:bg-emerald-950/30 border border-[#0e3e4d]/10 dark:border-emerald-800/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-[var(--text-primary)]">
                সিস্টেম সক্রিয়
              </span>
            </div>
            <span className="text-[9px] bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded font-mono font-bold">
              v2.5
            </span>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
          <div className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 ${collapsed ? "text-center" : ""}`}>
            {collapsed ? "•••" : "প্রধান মেনু"}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all group ${
                  active
                    ? "bg-[#0e3e4d] text-white font-bold shadow-md shadow-[#0e3e4d]/20 dark:bg-emerald-900/60 dark:text-emerald-100 border-l-4 border-amber-400"
                    : "text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 hover:text-[var(--text-primary)] font-medium"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon size={18} className={`shrink-0 transition-transform ${active ? "text-amber-400" : "group-hover:scale-110"}`} />
                
                {!collapsed && (
                  <div className="flex items-center justify-between w-full min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        active
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                          : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}

          <div className={`pt-4 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 ${collapsed ? "text-center" : ""}`}>
            {collapsed ? "•••" : "পাবলিক সাইট"}
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? "লাইভ সাইট দেখুন" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 hover:text-[var(--text-primary)] transition group ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <ExternalLink size={18} className="shrink-0 text-amber-500 group-hover:scale-110 transition-transform" />
            {!collapsed && (
              <div className="flex items-center justify-between w-full">
                <span>লাইভ পোর্টাল দেখুন</span>
                <span className="text-[10px] text-slate-400">নতুন ট্যাব ↗</span>
              </div>
            )}
          </Link>
        </div>

        {/* Sidebar Footer / User Info */}
        <div className="p-3 border-t border-[var(--border-color)]">
          {session?.user && !collapsed && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-[var(--border-color)] mb-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#0e3e4d] text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-400/30">
                  {session.user.name?.[0] || "A"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                    {session.user.name}
                  </span>
                  <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider truncate">
                    {(session.user as any).role || "SUPER_ADMIN"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                title="লগ আউট"
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

          {/* Desktop Collapse / Expand Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
          >
            {collapsed ? <ChevronRight size={18} /> : (
              <span className="flex items-center gap-1.5 text-xs">
                <ChevronLeft size={16} /> সাইডবার ছোট করুন
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
