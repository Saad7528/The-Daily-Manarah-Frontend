import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RefreshCw, FileText, CheckCircle2, History, MessageSquareShare } from "lucide-react";

export default function CorrectionPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-slate-900 shadow-md rounded-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <RefreshCw className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">সংশোধন নীতি</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Correction Policy | সর্বশেষ আপডেট: আগস্ট ২০২৬</p>
            </div>
          </div>

          <div className="space-y-8 text-leading-relaxed">
            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>১. ভুল স্বীকার ও সংশোধন অঙ্গীকার</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                সংবাদ প্রকাশ করার পরও যদি কোনো অসাবধানতাবশত ভুল তথ্য আমাদের দৃষ্টিগোচর হয়, তবে তা দ্রুত স্বীকার করা এবং তা অবিলম্বে সংশোধন করা আমাদের অন্যতম মৌলিক নীতি। আমরা সংবাদের বিশ্বাসযোগ্যতা ও নির্ভুলতা ধরে রাখতে সর্বোচ্চ গুরুত্ব দেই।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <FileText className="w-5 h-5 text-emerald-500" />
                <span>২. সংশোধনের প্রক্রিয়া</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                যেকোনো গুরুতর তথ্যগত ভুল ধরা পড়ার সাথে সাথে আমাদের এডিটর প্যানেল তথ্যটি পুনরায় যাচাই করে সঠিক তথ্য দিয়ে নিবন্ধটি আপডেট করে। ভুলটি সাধারণ ব্যাকরণগত বা বানানজনিত হলে তা সরাসরি এডিট করা হয় এবং তথ্যগত হলে সেটির নিচে নোট যুক্ত করা হয়।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <History className="w-5 h-5 text-emerald-500" />
                <span>৩. পরিবর্তনের ইতিহাস প্রকাশ (Transparency)</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                গুরুতর সংশোধনের ক্ষেত্রে আমরা সংবাদের নীচে একটি স্পষ্টভাবে দৃশ্যমান নোট যুক্ত করি, যেখানে উল্লেখ থাকে মূল সংবাদে কী ভুল ছিল এবং কখন ও কেন তা সংশোধন করা হয়েছে। এছাড়া ব্যাকএন্ড অডিট লগের সাহায্যে আমরা প্রতিটি সংবাদের পূর্বের রিভিশন হিস্ট্রি সংরক্ষণ করি।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <MessageSquareShare className="w-5 h-5 text-emerald-500" />
                <span>৪. ভুল সংশোধনের অনুরোধ</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                আমাদের কোনো সংবাদ বা ফিচারে যদি আপনার কাছে কোনো ভুল তথ্য প্রতীয়মান হয়, তবে আমাদের সাথে যোগাযোগ পেজে সরাসরি মেইল করতে পারেন। আমাদের টিম আপনার প্রেরিত প্রমাণের সত্যতা সাপেক্ষে সংবাদটি অতি দ্রুত সংশোধন করবে।
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
