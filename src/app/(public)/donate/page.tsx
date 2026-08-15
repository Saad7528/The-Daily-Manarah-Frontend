"use client";

import React, { useState } from "react";
import { Heart, Landmark, Smartphone, ClipboardCheck, Sparkles, ChevronRight } from "lucide-react";

export default function DonatePage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [fundType, setFundType] = useState("general");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleReportDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");
    setErrorMsg("");

    if (!email || !amount || !transactionId || !fundType) {
      setErrorMsg("অনুগ্রহ করে সবকটি ইনপুট ফিল্ড পূরণ করুন।");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: parseFloat(amount),
          transactionId,
          fundType,
        }),
      });

      if (res.ok) {
        setStatusMsg("ধন্যবাদ! আপনার অনুদানের তথ্যটি সফলভাবে জমা নেওয়া হয়েছে। আমাদের টিম এটি ভেরিফাই করবে।");
        setEmail("");
        setAmount("");
        setTransactionId("");
        setFundType("general");
      } else {
        const err = await res.json();
        setErrorMsg(`ত্রুটি: ${err.error || "তথ্য সাবমিট করা সম্ভব হয়নি।"}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("সার্ভার ত্রুটি ঘটেছে। অনুগ্রহ করে পরে চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-12">
        {/* Banner Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold">
            <Heart size={14} className="animate-pulse" />
            <span>মানবতার কল্যাণে আপনার হাত বাড়িয়ে দিন</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif">মানারাহ ফাউন্ডেশনে অনুদান দিন</h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            আপনার সদাকাহ, জাকাত ও অনুদান পৌঁছে যাবে দেশের সুবিধাবঞ্চিত, অবহেলিত ও সংকটাপন্ন মানুষের দোড়গোড়ায়। আমাদের প্রতিটি কল্যাণমুখী প্রজেক্টের সঠিক বাস্তবায়নে অংশ নিন।
          </p>
        </div>

        {/* Welfare Funds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit rounded-xl">
              <Sparkles size={20} />
            </div>
            <h3 className="font-bold text-base">এতিম ও শিক্ষা তহবিল</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              অসহায় এতিম শিশুদের ভরণপোষণ, নৈতিক ও দ্বীনি শিক্ষা এবং মেধা বিকাশে সার্বিক সহায়তা নিশ্চিত করা হয় এই তহবিলের মাধ্যমে।
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 w-fit rounded-xl">
              <Heart size={20} />
            </div>
            <h3 className="font-bold text-base">ত্রাণ ও পুনর্বাসন তহবিল</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              বন্যা, শৈতপ্রবাহ ও প্রাকৃতিক দুর্যোগে আক্রান্ত ক্ষতিগ্রস্ত মানুষের মাঝে খাদ্য, চিকিৎসা এবং গৃহ পুনর্নির্মাণে সহায়তা করা হয়।
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit rounded-xl">
              <Landmark size={20} />
            </div>
            <h3 className="font-bold text-base">সাধারণ জনকল্যাণ তহবিল</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              হতদরিদ্র মানুষের কর্মসংস্থান সৃষ্টি, সুপেয় পানির ব্যবস্থা এবং যেকোনো সাধারণ কল্যাণমূলক কার্যক্রম পরিচালনায় এটি ব্যয় হয়।
            </p>
          </div>
        </div>

        {/* Donation Channels & Feedback Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Payment Methods (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-lg font-serif font-black flex items-center space-x-2">
              <Landmark size={20} className="text-emerald-600" />
              <span>অনুদানের মাধ্যমসমূহ</span>
            </h2>

            {/* Bank Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400">
                <Landmark size={18} />
                <h4 className="font-bold text-sm">ব্যাংক ট্রান্সফার (Bank Transfer)</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl space-y-1">
                  <span className="font-bold text-slate-400 block text-[10px]">ব্যাংকের নাম:</span>
                  <span className="font-bold">ইসলামী ব্যাংক বাংলাদেশ পিএলসি</span>
                  <span className="font-bold text-slate-400 block text-[10px] mt-2">অ্যাকাউন্ট নাম:</span>
                  <span>MANARAH FOUNDATION</span>
                  <span className="font-bold text-slate-400 block text-[10px] mt-2">অ্যাকাউন্ট নম্বর:</span>
                  <span className="font-mono text-emerald-650 font-bold">২০৫০৭৭৭৭৭০০১২৩৪৫৬</span>
                  <span className="font-bold text-slate-400 block text-[10px] mt-2">শাখা:</span>
                  <span>ঠাকুরগাঁও শাখা</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl space-y-1">
                  <span className="font-bold text-slate-400 block text-[10px]">ব্যাংকের নাম:</span>
                  <span className="font-bold">আল-আরাফাহ ইসলামী ব্যাংক পিএলসি</span>
                  <span className="font-bold text-slate-400 block text-[10px] mt-2">অ্যাকাউন্ট নাম:</span>
                  <span>MANARAH FOUNDATION</span>
                  <span className="font-bold text-slate-400 block text-[10px] mt-2">অ্যাকাউন্ট নম্বর:</span>
                  <span className="font-mono text-emerald-650 font-bold">০১২২৩৪৫৬৭৮৯০১</span>
                  <span className="font-bold text-slate-400 block text-[10px] mt-2">শাখা:</span>
                  <span>ঠাকুরগাঁও শাখা</span>
                </div>
              </div>
            </div>

            {/* Mobile Banking Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400">
                <Smartphone size={18} />
                <h4 className="font-bold text-sm">মোবাইল ব্যাংকিং (Mobile Banking)</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-pink-500/5 border border-pink-500/10 p-4 rounded-xl flex flex-col justify-between h-24">
                  <span className="font-bold text-pink-600 text-sm">বিকাশ (bKash)</span>
                  <div>
                    <span className="text-[10px] text-slate-400 block">পার্সোনাল নম্বর:</span>
                    <span className="font-mono font-bold">০১৭১৭৩৫১৬৭৪</span>
                  </div>
                </div>
                <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-xl flex flex-col justify-between h-24">
                  <span className="font-bold text-orange-600 text-sm">নগদ (Nagad)</span>
                  <div>
                    <span className="text-[10px] text-slate-400 block">পার্সোনাল নম্বর:</span>
                    <span className="font-mono font-bold">০১৭১৭৩৫১৬৭৪</span>
                  </div>
                </div>
                <div className="bg-purple-500/5 border border-purple-500/10 p-4 rounded-xl flex flex-col justify-between h-24">
                  <span className="font-bold text-purple-600 text-sm">রকেট (Rocket)</span>
                  <div>
                    <span className="text-[10px] text-slate-400 block">ব্যক্তিগত নম্বর:</span>
                    <span className="font-mono font-bold">০১৭১৭৩৫১৬৭৪-১</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Form (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center space-x-2">
              <ClipboardCheck size={18} className="text-emerald-600" />
              <h4 className="font-serif font-black text-sm text-slate-950 dark:text-slate-50">অনুদানের তথ্য জানান</h4>
            </div>

            {statusMsg && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg border border-emerald-200 text-xs">
                {statusMsg}
              </div>
            )}

            {errorMsg && (
              <div className="bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 p-3 rounded-lg border border-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleReportDonation} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">ইমেইল ঠিকানা</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">অনুদানের পরিমাণ (টাকা)</label>
                <input
                  type="number"
                  required
                  placeholder="৫০০"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">ট্রানজ্যাকশন আইডি (Transaction ID)</label>
                <input
                  type="text"
                  required
                  placeholder="Txn123456789"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition font-mono uppercase"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">তহবিলের ধরণ</label>
                <select
                  value={fundType}
                  onChange={(e) => setFundType(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                >
                  <option value="orphans">এতিম ও শিক্ষা তহবিল</option>
                  <option value="relief">ত্রাণ ও পুনর্বাসন তহবিল</option>
                  <option value="general">সাধারণ জনকল্যাণ তহবিল</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition shadow-md disabled:opacity-50 mt-2"
              >
                {loading ? "জমা দেওয়া হচ্ছে..." : "অনুদানের তথ্য পাঠান"}
              </button>
            </form>
          </div>
        </div>

        {/* Learn More about Manarah Foundation Section */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-12 text-center w-full">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              আমাদের কার্যক্রম ও স্বচ্ছতা সম্পর্কে জানতে চান?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              মানারাহ ফাউন্ডেশন একটি সম্পূর্ণ অরাজনৈতিক, অলাভজনক এবং দ্বীনি ট্রাস্টি প্রতিষ্ঠান। আমাদের লক্ষ্য, উদ্দেশ্য, সেবা কার্যক্রম এবং আয়-ব্যয়ের নীতিমালা সম্পর্কে বিস্তারিত জানুন।
            </p>
            <div className="pt-2">
              <a
                href="/manarah-foundation"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-full transition shadow-md hover:shadow-lg"
              >
                <span>মানারাহ ফাউন্ডেশন সম্পর্কে বিস্তারিত জানুন</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

    </div>
  );
}
