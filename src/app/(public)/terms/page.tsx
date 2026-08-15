import React from "react";
import { FileText, Copyright, ExternalLink, AlertTriangle } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
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
              <Copyright className="w-5 h-5 text-emerald-500" />
              <span>১. স্বত্ব ও কপিরাইট</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              &ldquo;ডেইলি মানারাহ্&rdquo;-তে প্রকাশিত সকল সংবাদ, অনুসন্ধানী প্রতিবেদন, ভিডিও, ফটোকার্ড এবং গবেষণামূলক কনটেন্টের সর্বস্বত্ব মানারাহ ফাউন্ডেশন কর্তৃক সংরক্ষিত। অনুমতি ব্যতীত বাণিজ্যিক উদ্দেশ্যে আমাদের কোনো তথ্য হুবহু নকল বা চুরি করা সম্পূর্ণ নিষিদ্ধ।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
              <ExternalLink className="w-5 h-5 text-emerald-500" />
              <span>২. ক্রেডিট দেওয়া</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              যেকোনো সংবাদ বা গবেষণা আংশিক উদ্ধৃতি হিসেবে ব্যবহার করতে হলে অবশ্যই &ldquo;ডেইলি মানারাহ্&rdquo; কে মূল উৎস হিসেবে ক্রেডিট দিতে হবে এবং সক্রিয় লিংক (Backlink) যুক্ত করতে হবে।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50 mb-3">
              <AlertTriangle className="w-5 h-5 text-emerald-500" />
              <span>৩. মন্তব্য নীতি</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              আমাদের ওয়েবসাইট বা সোশ্যাল মিডিয়া পেজে উসকানিমূলক, অশালীন, ধর্মীয় অনুভূতিতে আঘাত হানে এমন বা বেআইনি কোনো মন্তব্য করা গ্রহণযোগ্য নয়। কর্তৃপক্ষ যেকোনো অশালীন মন্তব্য মুছে দেওয়ার অধিকার রাখে।
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
