import React from "react";
import { ShieldCheck, CheckSquare, Scale, BookOpen } from "lucide-react";

export default function FactCheckingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white dark:bg-slate-900 shadow-md rounded-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">ফ্যাক্ট-চেকিং নীতি</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fact-Checking Policy | সর্বশেষ আপডেট: আগস্ট ২০২৬</p>
          </div>
        </div>

        <div className="space-y-8 text-leading-relaxed">
          <section>
            <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
              <CheckSquare className="w-5 h-5 text-emerald-500" />
              <span>১. তথ্যের নিরপেক্ষতা ও সঠিকতা</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              &ldquo;ডেইলি মানারাহ্&rdquo; কোনো ধরনের গুজব, চটকদার ভুয়া খবর বা অপপ্রচারে বিশ্বাসী নয়। আমাদের প্রতিটি তথ্য যাচাই-বাছাই ও একাধিক বিশ্বস্ত উৎস থেকে নিশ্চিত হওয়ার পরই প্রকাশ করা হয়।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
              <Scale className="w-5 h-5 text-emerald-500" />
              <span>২. কোনো পক্ষপাতিত্ব নয়</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              রাজনৈতিক বা ব্যক্তিগত প্রভাবের ঊর্ধ্বে থেকে নিরপেক্ষ ও বস্তুনিষ্ঠ তথ্যের ভিত্তিতে আমাদের ফ্যাক্ট-চেকিং টিম তথ্য উন্মোচন করে।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              <span>৩. প্রাথমিক উৎস</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              আমরা কেবল শুনে বা অনুমান করে নয়, বরং নথিপত্র, বৈজ্ঞানিক প্রমাণ, ডাটাবেজ ও প্রাতিষ্ঠানিক প্রমাণের ওপর ভিত্তি করে সত্যতা নিশ্চিত করি।
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
