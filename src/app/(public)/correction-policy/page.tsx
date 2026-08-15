import React from "react";
import { RefreshCw, CheckCircle2, History, Mail } from "lucide-react";

export default function CorrectionPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
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
              <span>১. ভুলের দায় স্বীকার</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              আমরা সর্বদা নির্ভুল সংবাদ পরিবেশনের চেষ্টা করি। তবে কোনো সংবাদে অনিচ্ছাকৃত তথ্যগত ভুল বা টাইপিং এরর পরিলক্ষিত হলে, তা আমরা আন্তরিকভাবে স্বীকার করি এবং দ্রুততম সময়ে তা সংশোধন করা হয়।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
              <History className="w-5 h-5 text-emerald-500" />
              <span>২. স্বচ্ছতা নিশ্চিত করা</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              কোনো সংবাদে গুরুত্বপূর্ণ কোনো তথ্য সংশোধন করা হলে রিপোর্টের নিচে বা শেষে &ldquo;সংশোধিত&rdquo; (Correction Note) হিসেবে আপডেট করা তথ্য ও সংশোধনের তারিখ স্পষ্ট উল্লেখ করা হয়, যাতে পাঠকদের মাঝে কোনো বিভ্রান্তি সৃষ্টি না হয়।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
              <Mail className="w-5 h-5 text-emerald-500" />
              <span>৩. ভুল সংশোধনের অনুরোধ</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              আমাদের প্রকাশিত কোনো সংবাদে ভুল তথ্য চোখে পড়লে পাঠক আমাদের অফিশিয়াল ইমেইলে (<a href="mailto:dailymanarah.official@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">dailymanarah.official@gmail.com</a>) প্রমানসহ সংশোধন অনুরোধ পাঠাতে পারেন।
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
