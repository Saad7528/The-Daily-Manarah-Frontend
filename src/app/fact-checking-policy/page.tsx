import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { CheckSquare, ShieldCheck, Eye, Search, AlertCircle } from "lucide-react";

export default function FactCheckingPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
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
                <span>১. আমাদের অঙ্গীকার</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                &ldquo;দ্য DAILY MANARAH&rdquo; বা &ldquo;দ্য ডেইলি মানারাহ&rdquo; সত্যতা ও সততার ভিত্তিতে সাংবাদিকতা পরিচালনায় অঙ্গীকারবদ্ধ। প্রতিটি সংবাদ প্রকাশের পূর্বে তার তথ্যের সঠিকতা একাধিক বিশ্বস্ত উৎস থেকে যাচাই করা হয়। কোনো প্রকার অতিরঞ্জিত বা মনগড়া তথ্য আমাদের পোর্টালে স্থান পায় না।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Search className="w-5 h-5 text-emerald-500" />
                <span>২. তথ্যের উৎস ও সত্যতা যাচাই</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                আমরা সরাসরি ঘটনার প্রত্যক্ষদর্শী, সরকারি নথি, এবং বিশেষজ্ঞদের মতামতের ওপর ভিত্তি করে সংবাদ পরিবেশন করি। যেকোনো জটিল বা স্পর্শকাতর তথ্যের সত্যতা নিশ্চিত করতে আমরা তথ্যের প্রাথমিক উৎস (primary source) অনুসন্ধান ও যাচাই করি।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Eye className="w-5 h-5 text-emerald-500" />
                <span>৩. নিরপেক্ষতা ও সততা</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                যেকোনো বিতর্কিত বিষয়ে আমরা সংশ্লিষ্ট সকল পক্ষের মতামত ও বক্তব্যকে পক্ষপাতহীনভাবে গুরুত্ব দিয়ে থাকি। কোনো দল, গোষ্ঠী বা মতাদর্শের প্রতি পক্ষপাতিত্ব না করে গণমানুষের প্রকৃত সত্য তুলে ধরাই আমাদের প্রধান উদ্দেশ্য।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <AlertCircle className="w-5 h-5 text-emerald-500" />
                <span>৪. গুজব ও ভুয়া তথ্যের বিরুদ্ধে অবস্থান</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                সামাজিক যোগাযোগমাধ্যম বা ইন্টারনেটে ছড়িয়ে পড়া গুজব এবং বিভ্রান্তিকর খবরের সত্যতা নিরূপণের জন্য আমাদের একটি ডেডিকেটেড ফ্যাক্টচেক টিম নিয়োজিত রয়েছে। আমরা নিয়মিত ভুল তথ্যের পিছনের সঠিক সত্য উদঘাটন করে ফ্যাক্টচেক আর্টিকেলের মাধ্যমে প্রকাশ করি।
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
