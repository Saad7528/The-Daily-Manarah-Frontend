import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Shield, Lock, Eye, CheckCircle2 } from "lucide-react";

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
              <h1 className="text-3xl font-extrabold tracking-tight">গোপনীয়তা নীতি</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Privacy Policy | সর্বশেষ আপডেট: আগস্ট ২০২৬</p>
            </div>
          </div>

          <div className="space-y-8 text-leading-relaxed">
            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Lock className="w-5 h-5 text-emerald-500" />
                <span>১. তথ্য সংগ্রহ ও ব্যবহার</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                &ldquo;দ্য DAILY MANARAH&rdquo; আমাদের পাঠকদের গোপনীয়তা রক্ষায় সম্পূর্ণ প্রতিশ্রুতিবদ্ধ। আপনি যখন আমাদের নিউজ পোর্টাল ভিজিট করেন, আমরা আপনার অভিজ্ঞতা উন্নত করতে কিছু মৌলিক তথ্য সংগ্রহ করি। যেমন: ডিভাইস টাইপ, ব্রাউজার ক্যাটাগরি, এবং আইপি অ্যাড্রেস (বেনামে)।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Eye className="w-5 h-5 text-emerald-500" />
                <span>২. কুকিজ ও ট্র্যাকিং</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                আমাদের ওয়েবসাইটে ব্রাউজিং পারফরম্যান্স এবং ব্যবহারকারীর পছন্দ মনে রাখতে আমরা কুকিজ ব্যবহার করি। আপনি চাইলে আপনার ব্রাউজার সেটিংস থেকে কুকিজ নিষ্ক্রিয় করতে পারেন, তবে এতে ওয়েবসাইটের কিছু ফিচারের স্বাভাবিক আচরণ ব্যাহত হতে পারে।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>৩. তথ্য সুরক্ষা</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                আমরা সংগৃহীত কোনো তথ্য তৃতীয় পক্ষের কাছে বিক্রি, বিনিময় বা প্রকাশ করি না। আপনাদের সকল ব্যক্তিগত ডেটা সুরক্ষিত রাখতে আমরা আধুনিক এনক্রিপশন এবং নিরাপদ সার্ভার আর্কিটেকচার ব্যবহার করে থাকি।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>৪. ব্যবহারকারীর অধিকার</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                আমাদের নিউজ পোর্টালে আপনার মন্তব্য বা ডেটা মুছে ফেলতে বা সংশোধন করতে চাইলে আপনি যেকোনো সময় আমাদের সাথে যোগাযোগ করতে পারেন। আমাদের মডারেশন টিম দ্রুত আপনার অনুরোধ পর্যালোচনা করে ব্যবস্থা গ্রহণ করবে।
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
