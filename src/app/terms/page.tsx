import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { FileText, CheckCircle2, AlertTriangle, Copyright, Scale } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-slate-900 shadow-md rounded-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">ব্যবহারের শর্তাবলী</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Terms of Service | সর্বশেষ আপডেট: আগস্ট ২০২৬</p>
            </div>
          </div>

          <div className="space-y-8 text-leading-relaxed">
            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>১. শর্তাবলী গ্রহণ</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                &ldquo;দ্য ডেইলি মানারাহ&rdquo; নিউজ পোর্টাল ব্রাউজ বা ব্যবহার করার মাধ্যমে আপনি আমাদের ব্যবহারের শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে। আপনি যদি এই শর্তাবলীর সাথে একমত না হন, তবে অনুগ্রহ করে আমাদের ওয়েবসাইট ব্যবহার করা থেকে বিরত থাকুন।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Copyright className="w-5 h-5 text-emerald-500" />
                <span>২. মেধা সম্পত্তি ও স্বত্বাধিকার</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                এই ওয়েবসাইটে প্রকাশিত সকল সংবাদ, নিবন্ধ, ছবি, লোগো, ভিডিও এবং ডিজাইন আমাদের নিজস্ব মেধা সম্পদ। আমাদের পূর্বানুমতি ছাড়া যেকোনো প্রকাশনা কপি, রিপ্রোডিউস বা বাণিজ্যিক উদ্দেশ্যে ব্যবহার করা সম্পূর্ণ নিষিদ্ধ এবং আইনত দণ্ডনীয় অপরাধ।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <AlertTriangle className="w-5 h-5 text-emerald-500" />
                <span>৩. ব্যবহারকারীর আচরণ</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                পাঠকদের মন্তব্যের ঘরে কোনো ধরনের উস্কানিমূলক, অশোভন, সাম্প্রদায়িক বিদ্বেষমূলক বা বেআইনি পোস্ট করা যাবে না। আমাদের এআই স্প্যাম ও প্রোফানিটি ফিল্টার এবং মডারেশন প্যানেল দ্বারা প্রতিনিয়ত মন্তব্যগুলো তদারকি করা হয়।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
                <Scale className="w-5 h-5 text-emerald-500" />
                <span>৪. দায়বদ্ধতার সীমাবদ্ধতা</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                আমরা সর্বোচ্চ নির্ভরযোগ্যতা ও সততার সাথে সংবাদ পরিবেশন করতে সচেষ্ট। তবে তৃতীয় পক্ষের কোনো লিংক, বিজ্ঞাপন বা ভুল তথ্যের কারণে প্রত্যক্ষ বা পরোক্ষভাবে ব্যবহারকারীর কোনো ক্ষতি হলে &ldquo;দ্য ডেইলি মানারাহ&rdquo; কর্তৃপক্ষ দায়ী থাকবে না।
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
