import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Shield, Lock, Eye, ExternalLink } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-slate-900 shadow-md rounded-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">গোপনীয়তা নীতি</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Privacy Policy | সর্বশেষ আপডেট: আগস্ট ২০২৬</p>
            </div>
          </div>

          <div className="space-y-8 text-leading-relaxed">
            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Lock className="w-5 h-5 text-emerald-500" />
                <span>১. তথ্যের সংগ্রহ</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                &ldquo;ডেইলি মানারাহ্&rdquo; (Daily Manarah) আমাদের পাঠক ও ব্যবহারকারীদের ব্যক্তিগত তথ্যের সুরক্ষাকে সর্বোচ্চ প্রাধান্য দেয়। ওয়েবসাইটে প্রবেশের সময় সাধারণ কুকিজ (Cookies) বা ভিজিটর ডাটা (যেমন: IP এড্রেস, ব্রাউজারের ধরন) কেবল ওয়েবসাইট অভিজ্ঞতা উন্নত করার লক্ষ্যে সংগৃহীত হতে পারে।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>২. তথ্যের সুরক্ষা</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                ব্যবহারকারীর সম্মতি ছাড়া কোনো ব্যক্তিগত তথ্য (নাম, ইমেইল, মোবাইল নম্বর ইত্যাদি) তৃতীয় কোনো পক্ষ বা বাণিজ্যিক প্রতিষ্ঠানে বিক্রি বা হস্তান্তর করা হয় না।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <ExternalLink className="w-5 h-5 text-emerald-500" />
                <span>৩. থার্ড-পার্টি সার্ভিস</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                আমাদের ওয়েবসাইটে গুগল সার্চ, সোশ্যাল মিডিয়া শেয়ার বা অ্যাডসেন্সের মতো থার্ড-পার্টি সার্ভিস ব্যবহৃত হতে পারে, যার নিজস্ব প্রাইভেসি পলিসি প্রযোজ্য হবে।
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
