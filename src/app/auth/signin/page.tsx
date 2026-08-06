"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, AlertCircle, ArrowLeft } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password reset request states
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          setError("ভুল ইমেইল অথবা পাসওয়ার্ড দেওয়া হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        } else {
          setError(res.error);
        }
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("সার্ভার ত্রুটি ঘটেছে। অনুগ্রহ করে পরে চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleResetRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetSuccess("");
    setResetError("");
    setResetLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/users/reset-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, newPassword: resetNewPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setResetSuccess(data.message || "আবেদনটি সফলভাবে পাঠানো হয়েছে।");
        setResetEmail("");
        setResetNewPassword("");
      } else {
        setResetError(data.error || "আবেদনটি পাঠানো সম্ভব হয়নি।");
      }
    } catch (err) {
      setResetError("সার্ভার সংযোগ করা যায়নি।");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center space-x-2 text-xs text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-200 mb-6 transition"
      >
        <ArrowLeft size={14} />
        <span>মূল পাতায় ফিরে যান</span>
      </Link>

      {/* Card Container */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl shadow-xl p-8 transition-colors duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">প্যানেল সাইন-ইন</h1>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2">
            অনুমোদিত কর্মকর্তা/সাংবাদিকদের জন্য সংরক্ষিত পোর্টাল
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-start space-x-2 bg-red-50 dark:bg-red-950/30 text-red-650 dark:text-red-400 p-3 rounded-lg border border-red-200 dark:border-red-900/50 text-xs">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              অফিসিয়াল ইমেইল
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                placeholder="name@dailymanarah.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                পাসওয়ার্ড
              </label>
              <button
                type="button"
                onClick={() => {
                  setResetSuccess("");
                  setResetError("");
                  setShowResetModal(true);
                }}
                className="text-[10px] font-bold text-slate-400 hover:text-emerald-600 transition"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition shadow-md disabled:opacity-55 disabled:cursor-not-allowed mt-2"
          >
            <LogIn size={15} />
            <span>{loading ? "ভেরিফাই করা হচ্ছে..." : "সাইন-ইন করুন"}</span>
          </button>
        </form>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">পাসওয়ার্ড পরিবর্তনের আবেদন</h3>
              <button
                onClick={() => setShowResetModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 text-xs font-bold"
              >
                বন্ধ করুন [X]
              </button>
            </div>

            {resetSuccess && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3 rounded text-xs border border-emerald-250">
                {resetSuccess}
              </div>
            )}
            {resetError && (
              <div className="bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 p-3 rounded text-xs border border-red-200">
                {resetError}
              </div>
            )}

            <form onSubmit={handleResetRequestSubmit} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-400">অফিসিয়াল ইমেইল:</label>
                <input
                  type="email"
                  required
                  placeholder="name@dailymanarah.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded p-2.5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-400">প্রস্তাবিত নতুন পাসওয়ার্ড:</label>
                <input
                  type="password"
                  required
                  placeholder="নতুন পাসওয়ার্ড দিন..."
                  value={resetNewPassword}
                  onChange={(e) => setResetNewPassword(e.target.value)}
                  className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded p-2.5 outline-none"
                />
              </div>
              <div className="bg-slate-50 dark:bg-zinc-950/50 p-2.5 rounded border border-slate-200/60 dark:border-zinc-800 text-[10px] text-slate-400 leading-relaxed">
                * পাসওয়ার্ড পরিবর্তনের আবেদন জমা দিলে তা ড্যাশবোর্ডে পেন্ডিং রিকুয়েস্ট হিসেবে জমা হবে। অ্যাডমিন অনুমোদন করার পর নতুন পাসওয়ার্ড কার্যকর হবে।
              </div>
              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded text-xs transition disabled:opacity-50"
              >
                {resetLoading ? "আবেদন পাঠানো হচ্ছে..." : "অ্যাডমিনের কাছে আবেদন পাঠান"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center text-xs text-slate-500 dark:text-zinc-400">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mb-2"></div>
          <span>লোড হচ্ছে...</span>
        </div>
      }>
        <SignInForm />
      </Suspense>
    </div>
  );
}
