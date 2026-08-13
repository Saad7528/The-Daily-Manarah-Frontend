"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Sun,
  Moon,
  EyeOff,
  Settings,
  Eye,
  FileText,
  Users,
  Activity,
  History,
  ShieldAlert,
  Save,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  RefreshCw,
  Trash2,
  Lock
} from "lucide-react";

interface AuditLog {
  id: string;
  postTitle: string;
  editedBy: string;
  role: string;
  time: string;
  action: string;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "EDITOR" | "REPORTER" | "AD_MANAGER";
  isVerified: boolean;
  plainPassword?: string;
}

interface PostItem {
  id: string;
  title: string;
  author: string;
  views: number;
  isHidden: boolean;
  isPinned: boolean;
}

export default function AdminDashboard() {
  const { data: session } = useSession();

  // Global settings toggles
  const [settings, setSettings] = useState({
    watermarkGlobal: true,
    commentAiFilterOn: true,
    shoppingModuleOn: false,
    sponsoredBannersOn: true
  });

  // Real-time Traffic Simulator
  const [activeUsers, setActiveUsers] = useState(142);
  const [trafficHistory, setTrafficHistory] = useState<number[]>([120, 135, 128, 140, 138, 145, 142]);

  // Live Users state & handlers
  const [users, setUsers] = useState<UserItem[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [resetRequests, setResetRequests] = useState<any[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"SUPER_ADMIN" | "EDITOR" | "REPORTER" | "AD_MANAGER">("EDITOR");
  const [userLoading, setUserLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/users`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchResetRequests = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/users/reset-requests`);
      if (res.ok) {
        const data = await res.json();
        setResetRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch reset requests:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/settings`);
      if (res.ok) {
        const data = await res.json();
        setSettings({
          watermarkGlobal: data.watermarkGlobal,
          commentAiFilterOn: data.commentAiFilterOn,
          shoppingModuleOn: data.shoppingModuleOn,
          sponsoredBannersOn: data.sponsoredBannersOn,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts?showHidden=true`);
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          author: p.author?.name || "অজ্ঞাত",
          views: p.views,
          isHidden: p.isHidden,
          isPinned: p.isPinned || false,
        }));
        setPosts(formatted);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRevisions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/revisions`);
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchResetRequests();
    fetchSettings();
    fetchPosts();
    fetchRevisions();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim()) {
      alert("অনুগ্রহ করে সবকটি ইনপুট ফিল্ড পূরণ করুন।");
      return;
    }
    setUserLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      });

      if (res.ok) {
        alert("নতুন টিম মেম্বার সফলভাবে যুক্ত করা হয়েছে! একটি কনফার্মেশন লিঙ্ক ওনার মেইলে পাঠানো হয়েছে।");
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserRole("EDITOR");
        fetchUsers();
      } else {
        const err = await res.json();
        alert(`ত্রুটি: ${err.error || "যুক্ত করা সম্ভব হয়নি"}`);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("সার্ভার ত্রুটি ঘটেছে।");
    } finally {
      setUserLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই টিম মেম্বারকে ডিলিট করতে চান?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/users/${userId}`, {
          method: "DELETE"
        });
        if (res.ok) {
          alert("টিম মেম্বার ডিলিট করা হয়েছে।");
          fetchUsers();
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleRoleChange = async (id: string, newRole: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/users/${id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        alert("টিম মেম্বারের রোল সফলভাবে পরিবর্তন করা হয়েছে!");
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleApproveReset = async (reqId: string) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই পাসওয়ার্ড পরিবর্তনের আবেদনটি অনুমোদন করতে চান?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/users/reset-requests/${reqId}/approve`, {
          method: "POST"
        });
        if (res.ok) {
          alert("আবেদনটি সফলভাবে অনুমোদিত হয়েছে এবং পাসওয়ার্ড আপডেট করা হয়েছে।");
          fetchResetRequests();
          fetchUsers();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRejectReset = async (reqId: string) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই আবেদনটি প্রত্যাখ্যান করতে চান?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/users/reset-requests/${reqId}/reject`, {
          method: "POST"
        });
        if (res.ok) {
          alert("আবেদনটি প্রত্যাখ্যান করা হয়েছে।");
          fetchResetRequests();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [moderationSearchQuery, setModerationSearchQuery] = useState("");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Simulating real-time traffic updates
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor(Math.random() * 13) - 5;
      const nextUsers = Math.max(80, activeUsers + diff);
      setActiveUsers(nextUsers);
      
      setTrafficHistory((prev) => {
        const updated = [...prev.slice(1), nextUsers];
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [activeUsers]);

  const toggleSetting = async (key: keyof typeof settings) => {
    const nextVal = !settings[key];
    const newSettings = { ...settings, [key]: nextVal };
    setSettings(newSettings);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  const handleToggleHidePost = async (id: string, currentlyHidden: boolean) => {
    const nextHidden = !currentlyHidden;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/posts/${id}/hide`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: nextHidden }),
      });
      if (res.ok) {
        alert(nextHidden ? "আর্টিকেলটি গোপন (Hidden) করা হয়েছে।" : "আর্টিকেলটি সফলভাবে প্রকাশিত হয়েছে।");
        fetchPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestoreVersion = async (revId: string, postTitle: string) => {
    if (confirm(`আপনি কি নিশ্চিতভাবে "${postTitle}" এই সংবাদের পূর্ববর্তী সংস্করণটি রিস্টোর করতে চান?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/revisions/${revId}/restore`, {
          method: "POST"
        });
        if (res.ok) {
          alert("সফলভাবে পূর্ববর্তী সংস্করণটি রিস্টোর করা হয়েছে!");
          fetchPosts();
          fetchRevisions();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Convert array of user counts into SVG coordinate path
  const generateSvgPath = () => {
    const width = 500;
    const height = 100;
    const padding = 10;
    const maxVal = Math.max(...trafficHistory, 160);
    const minVal = Math.min(...trafficHistory, 80);
    const range = maxVal - minVal || 1;

    const points = trafficHistory.map((val, idx) => {
      const x = padding + (idx * (width - padding * 2)) / (trafficHistory.length - 1);
      const y = height - padding - ((val - minVal) * (height - padding * 2)) / range;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header Dashboard Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-md">
              <Settings size={24} />
            </div>
            <div>
              <h1 className="font-serif font-black text-2xl md:text-3xl text-[var(--text-primary)]">
                দ্য ডেইলি মানারাহ অ্যাডমিন প্যানেল
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">
                সুপার অ্যাডমিন ড্যাশবোর্ড • গ্লোবাল ফিচার সুইচবোর্ড ও ট্রাফিক অ্যানালিটিক্স
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold text-red-500">
                লাইভ ট্রাফিক মনিটরিং
              </span>
            </div>

            {session?.user && (
              <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-1.5 rounded-full shadow-sm">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-[var(--text-primary)]">{session.user.name}</span>
                  <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">{(session.user as any).role || "অ্যাডমিন"}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold px-3 py-1 rounded-full text-[10px] transition"
                >
                  লগ আউট
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Active users stat */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-400">লাইভ ভিজিটর সংখ্যা</span>
              <span className="text-3xl font-black text-[var(--accent-color)]">{activeUsers}</span>
              <span className="text-[10px] text-emerald-500 flex items-center gap-1 font-semibold">
                <TrendingUp size={10} /> +১২% বৃদ্ধি গত ঘন্টায়
              </span>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-zinc-800 sepia:bg-[#dfceab] text-[var(--accent-color)] rounded-full">
              <Activity size={20} className="animate-pulse" />
            </div>
          </div>

          {/* Published articles */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-400">সর্বমোট সংবাদ প্রকাশিত</span>
              <span className="text-3xl font-black text-[var(--text-primary)]">{posts.length}টি</span>
              <span className="text-[10px] text-slate-500">আজ নতুন ২টি সংবাদ যুক্ত হয়েছে</span>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-zinc-800 sepia:bg-[#dfceab] text-slate-600 dark:text-amber-400 rounded-full">
              <FileText size={20} />
            </div>
          </div>

          {/* Pageviews */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-400">সর্বমোট ভিউ কাউন্ট</span>
              <span className="text-3xl font-black text-[var(--text-primary)]">৯,৫২০ বার</span>
              <span className="text-[10px] text-slate-500">লিড সংবাদের সর্বোচ্চ পঠন</span>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-zinc-800 sepia:bg-[#dfceab] text-slate-600 dark:text-amber-400 rounded-full">
              <Eye size={20} />
            </div>
          </div>

          {/* Admins count */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-400">নিবন্ধিত টিম মেম্বার</span>
              <span className="text-3xl font-black text-[var(--text-primary)]">{users.length} জন</span>
              <span className="text-[10px] text-slate-500">৪টি আলাদা রোল ডিফাইন করা</span>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-zinc-800 sepia:bg-[#dfceab] text-slate-600 dark:text-amber-400 rounded-full">
              <Users size={20} />
            </div>
          </div>
        </div>

        {/* ANALYTICS GRAPH & SWITCHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Real-time Traffic Graph (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h3 className="font-serif font-black text-base text-[var(--text-primary)]">
                লাইভ ট্রাফিক অ্যানালিটিক্স (লাস্ট ২ মিনিট)
              </h3>
              <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 transition">
                <RefreshCw size={14} className="animate-spin" />
              </button>
            </div>

            {/* Sparkline Graph */}
            <div className="w-full bg-slate-50 dark:bg-zinc-950/40 sepia:bg-[#dfceab]/30 p-2 rounded-xl border border-[var(--border-color)]">
              <svg viewBox="0 0 500 100" className="w-full h-32">
                {/* Gridlines */}
                <line x1="10" y1="10" x2="490" y2="10" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="10" y1="50" x2="490" y2="50" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="10" y1="90" x2="490" y2="90" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
                
                {/* SVG path curve */}
                <path
                  d={generateSvgPath()}
                  fill="none"
                  stroke="var(--accent-color)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>১২০ সেকেন্ড আগে</span>
              <span>১০ সেকেন্ড আগে</span>
            </div>
          </div>

          {/* SWITCHBOARD (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-serif font-black text-base text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              গ্লোবাল ফিচার সুইচবোর্ড
            </h3>

            <div className="flex flex-col gap-4 text-sm">
              {/* Toggle 1: Global Watermark */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-xs">ইমেজ ওয়াটারমার্ক</span>
                  <span className="text-[10px] text-slate-400">ছবিতে The Daily Manarah যুক্ত করুন</span>
                </div>
                <button onClick={() => toggleSetting("watermarkGlobal")} className="text-[var(--accent-color)]">
                  {settings.watermarkGlobal ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-400" />}
                </button>
              </div>

              {/* Toggle 2: AI Comments Moderator */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-xs">কমেন্ট এআই ফিল্টার</span>
                  <span className="text-[10px] text-slate-400">গালিগালাজ ও স্প্যাম ফিল্টার হবে</span>
                </div>
                <button onClick={() => toggleSetting("commentAiFilterOn")} className="text-[var(--accent-color)]">
                  {settings.commentAiFilterOn ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-400" />}
                </button>
              </div>

              {/* Toggle 3: E-Commerce Switch */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-xs">শপিং মডিউল</span>
                  <span className="text-[10px] text-slate-400">বিজ্ঞাপনের পাশে স্টোর চালু করুন</span>
                </div>
                <button onClick={() => toggleSetting("shoppingModuleOn")} className="text-[var(--accent-color)]">
                  {settings.shoppingModuleOn ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-400" />}
                </button>
              </div>

              {/* Toggle 4: Sponsored Banners */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-xs">স্পন্সরড ব্যানার</span>
                  <span className="text-[10px] text-slate-400">সাইটে বিজ্ঞাপনগুলো প্রদর্শন হবে</span>
                </div>
                <button onClick={() => toggleSetting("sponsoredBannersOn")} className="text-[var(--accent-color)]">
                  {settings.sponsoredBannersOn ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* POST MODERN MODERATION PANEL & AUDIT LOGS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Post Moderation: Hide/Unhide (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-serif font-black text-base text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              সংবাদ মডারেশন ও গোপন করার প্যানেল (Super Admin)
            </h3>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="সংবাদ খুঁজুন (শিরোনাম বা লেখক)..."
                className="w-full text-xs px-3 py-2 border border-[var(--border-color)] rounded-lg bg-slate-50 dark:bg-zinc-900 focus:outline-none focus:border-[var(--accent-color)] text-[var(--text-primary)]"
                value={moderationSearchQuery}
                onChange={(e) => setModerationSearchQuery(e.target.value)}
              />
            </div>

            {/* Section 1: Published News */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-emerald-600 border-b border-[var(--border-color)] pb-1.5 flex items-center justify-between">
                <span>প্রকাশিত সংবাদ (Published)</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full dark:bg-emerald-950/20">
                  {posts.filter(p => !p.isHidden && (p.title.toLowerCase().includes(moderationSearchQuery.toLowerCase()) || p.author.toLowerCase().includes(moderationSearchQuery.toLowerCase()))).length} টি
                </span>
              </h4>
              <div className="flex flex-col gap-2.5 max-h-[250px] overflow-y-auto pr-1">
                {posts.filter(p => !p.isHidden && (p.title.toLowerCase().includes(moderationSearchQuery.toLowerCase()) || p.author.toLowerCase().includes(moderationSearchQuery.toLowerCase()))).length > 0 ? (
                  posts
                    .filter(p => !p.isHidden && (p.title.toLowerCase().includes(moderationSearchQuery.toLowerCase()) || p.author.toLowerCase().includes(moderationSearchQuery.toLowerCase())))
                    .map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-color)] bg-slate-50 dark:bg-zinc-950/20 sepia:bg-[#dfceab]/30"
                      >
                        <div className="flex flex-col gap-1 w-2/3">
                          <span className="text-xs font-semibold truncate text-[var(--text-primary)]">
                            {post.title}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            লেখক: {post.author} • ভিউ: {post.views}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleHidePost(post.id, post.isHidden)}
                          className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/40 transition"
                        >
                          Hide (গোপন করুন)
                        </button>
                      </div>
                    ))
                ) : (
                  <span className="text-[10px] text-slate-400 py-2">কোনো প্রকাশিত সংবাদ পাওয়া যায়নি।</span>
                )}
              </div>
            </div>

            {/* Section 2: Hidden News */}
            <div className="flex flex-col gap-2 mt-2">
              <h4 className="text-xs font-bold text-red-500 border-b border-[var(--border-color)] pb-1.5 flex items-center justify-between">
                <span>সংগুপ্ত/অপ্রকাশিত সংবাদ (Hidden)</span>
                <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full dark:bg-red-950/20">
                  {posts.filter(p => p.isHidden && (p.title.toLowerCase().includes(moderationSearchQuery.toLowerCase()) || p.author.toLowerCase().includes(moderationSearchQuery.toLowerCase()))).length} টি
                </span>
              </h4>
              <div className="flex flex-col gap-2.5 max-h-[250px] overflow-y-auto pr-1">
                {posts.filter(p => p.isHidden && (p.title.toLowerCase().includes(moderationSearchQuery.toLowerCase()) || p.author.toLowerCase().includes(moderationSearchQuery.toLowerCase()))).length > 0 ? (
                  posts
                    .filter(p => p.isHidden && (p.title.toLowerCase().includes(moderationSearchQuery.toLowerCase()) || p.author.toLowerCase().includes(moderationSearchQuery.toLowerCase())))
                    .map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-color)] bg-slate-100/50 dark:bg-zinc-900/40 sepia:bg-[#dfceab]/15"
                      >
                        <div className="flex flex-col gap-1 w-2/3">
                          <span className="text-xs font-semibold truncate text-[var(--text-primary)]">
                            {post.title}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            লেখক: {post.author} • ভিউ: {post.views}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleHidePost(post.id, post.isHidden)}
                          className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-950/40 transition"
                        >
                          Publish (প্রকাশ করুন)
                        </button>
                      </div>
                    ))
                ) : (
                  <span className="text-[10px] text-slate-400 py-2">কোনো গোপনকৃত সংবাদ নেই।</span>
                )}
              </div>
            </div>
          </div>

          {/* Audit Logs / Revisions (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <History size={18} className="text-emerald-600" />
              <h3 className="font-serif font-black text-base text-[var(--text-primary)]">
                অডিট লগ ও রিভিশন হিস্ট্রি (সংস্করণ নিয়ন্ত্রণ)
              </h3>
            </div>

            <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto">
              {auditLogs.map((log: any) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-3 rounded-lg border border-[var(--border-color)] text-xs"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-[var(--text-primary)]">
                      {log.post?.title || log.title}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      এডিটর: <span className="font-semibold">{log.user?.name || "অজ্ঞাত"} ({(log.user?.role) || "EDITOR"})</span> • {new Date(log.createdAt).toLocaleString("bn-BD")}
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold">
                      অ্যাকশন: সংবাদ কন্টেন্ট এডিট
                    </span>
                  </div>

                  <button
                    onClick={() => handleRestoreVersion(log.id, log.post?.title || log.title)}
                    className="shrink-0 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[var(--text-primary)] font-bold px-2.5 py-1 rounded border border-[var(--border-color)] text-[10px] transition"
                  >
                    রিস্টোর করুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Password Reset Requests Widget */}
        {resetRequests.length > 0 && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <ShieldAlert size={18} className="text-red-500 animate-bounce" />
              <h3 className="font-serif font-black text-base text-[var(--text-primary)]">
                পাসওয়ার্ড পরিবর্তনের পেন্ডিং আবেদনসমূহ ({resetRequests.length})
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {resetRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-4 rounded-xl border border-red-250 dark:border-red-950/40 bg-red-500/5 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-[var(--text-primary)]">{req.userName} ({req.userEmail})</span>
                    <span className="text-slate-500">প্রস্তাবিত নতুন পাসওয়ার্ড: <span className="font-mono font-bold bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs">{req.newPlainPassword}</span></span>
                    <span className="text-[10px] text-slate-400">আবেদনের তারিখ: {new Date(req.createdAt).toLocaleString("bn-BD")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveReset(req.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded text-xs transition"
                    >
                      অনুমোদন দিন
                    </button>
                    <button
                      onClick={() => handleRejectReset(req.id)}
                      className="bg-red-650 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded text-xs transition"
                    >
                      প্রত্যাখ্যান করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROLE MANAGER PANEL */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-1">
            <Lock size={18} className="text-amber-500" />
            <h3 className="font-serif font-black text-base text-[var(--text-primary)]">
              কাস্টম রোল এবং টিম অ্যাক্সেস ক্রিয়েটর (RBAC)
            </h3>
          </div>

          {/* New User Creation Form */}
          <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-slate-50 dark:bg-zinc-950/20 sepia:bg-[#dfceab]/30 rounded-xl border border-[var(--border-color)]">
            <div className="flex flex-col gap-1 text-[11px]">
              <label className="font-bold text-slate-400">নাম:</label>
              <input
                type="text"
                required
                placeholder="নাম লিখুন..."
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded p-2 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              <label className="font-bold text-slate-400">ইমেইল:</label>
              <input
                type="email"
                required
                placeholder="name@dailymanarah.com"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded p-2 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              <label className="font-bold text-slate-400">পাসওয়ার্ড:</label>
              <input
                type="password"
                required
                placeholder="পাসওয়ার্ড..."
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded p-2 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              <label className="font-bold text-slate-400">রোল নির্বাচন:</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as any)}
                className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded p-2 outline-none"
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                <option value="EDITOR">EDITOR</option>
                <option value="REPORTER">REPORTER</option>
                <option value="AD_MANAGER">AD_MANAGER</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={userLoading}
                className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-bold py-2 rounded text-xs transition disabled:opacity-50"
              >
                {userLoading ? "যুক্ত করা হচ্ছে..." : "নতুন ইউজার যুক্ত করুন"}
              </button>
            </div>
          </form>

          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-slate-400">
                  <th className="py-2">নাম</th>
                  <th className="py-2">ইমেইল</th>
                  <th className="py-2">ইমেইল স্ট্যাটাস</th>
                  <th className="py-2 text-right">পাসওয়ার্ড</th>
                  <th className="py-2 text-right">পদক্ষেপ / রোল পরিবর্তন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {users.map((user) => (
                  <tr key={user.id} className="text-[var(--text-primary)]">
                    <td className="py-3 font-semibold">{user.name}</td>
                    <td className="py-3 text-slate-400">{user.email}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        user.isVerified
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse"
                      }`}>
                        {user.isVerified ? "ভেরিফাইড" : "পেন্ডিং (Pending)"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">
                          {visiblePasswords[user.id] ? (user as any).plainPassword : "••••••••"}
                        </span>
                        <button
                          onClick={() => setVisiblePasswords(prev => ({ ...prev, [user.id]: !prev[user.id] }))}
                          className="text-slate-400 hover:text-[var(--accent-color)] transition shrink-0"
                        >
                          {visiblePasswords[user.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-right flex items-center justify-end gap-3">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                        className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-2 py-1 outline-none text-xs"
                      >
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="REPORTER">REPORTER</option>
                        <option value="AD_MANAGER">AD_MANAGER</option>
                      </select>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
