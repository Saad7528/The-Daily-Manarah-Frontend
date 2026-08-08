import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Info, Mail, Phone, MapPin, Users, Target } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 shadow-md rounded-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          
          {/* Header Section */}
          <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Info className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">আমাদের সম্পর্কে</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">About Us | ডেইলি মানারাহ্ নিউজ পোর্টাল</p>
            </div>
          </div>

          <div className="space-y-10 text-leading-relaxed">
            {/* Introduction */}
            <section className="bg-slate-50 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-900">
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                &ldquo;ডেইলি মানারাহ&rdquo; (Daily Manarah) হলো একটি তথ্যনির্ভর, অনুসন্ধানী ও সত্য-ভিত্তিক ডিজিটাল সংবাদ মাধ্যম, যার দায়িত্বে রয়েছে মানারাহ ফাউন্ডেশন। ডেইলি মানারাহ্-এর কাজের প্রধান ফোকাস হচ্ছে সমাজ থেকে অপসংক্রান্তি, ভুয়া খবর (Fake News) ও কুতথ্য মোকাবিলা করা, নিরপেক্ষ সংবাদ পরিবেশন এবং সত্য ও নৈতিক সুন্নাহভিত্তিক জীবনবোধ ছড়িয়ে দেওয়া। এটি মানারাহ ফাউন্ডেশনের একটি কল্যাণমুখী ডিজিটাল মিডিয়া প্রজেক্ট, যা তথ্যের সত্যতা যাচাই এবং বস্তুনিষ্ঠ সাংবাদিকতা সেবা নিশ্চিত করে।
              </p>
            </section>

            {/* Our Goal / Target */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50">
                <Target className="w-5 h-5 text-emerald-500" />
                <span>আমাদের লক্ষ্য</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                আমাদের লক্ষ্য কেবল সংবাদ প্রচার নয়; বরং নিরপেক্ষ তথ্য ও গভীর অনুসন্ধানের মাধ্যমে সাধারণ মানুষ এবং তরুণ প্রজন্মের মাঝে সঠিক দ্বীনি চেতনা, সততা ও মূল্যবোধ জাগিয়ে তোলা। পাশাপাশি দেশের সুবিধাবঞ্চিত, অবহেলিত ও সংকটাপন্ন মানুষের বস্তুনিষ্ঠ প্রতিবেদন বিশ্বমঞ্চে তুলে ধরে তাদের কল্যাণে কাজ করা।
              </p>
            </section>

            {/* Editorial Team */}
            <section className="space-y-4 border-t border-slate-150 dark:border-slate-800 pt-6">
              <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900 dark:text-slate-50">
                <Users className="w-5 h-5 text-emerald-500" />
                <span>EDITORIAL BOARD & PUBLISHING</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm bg-slate-50 dark:bg-slate-950/40 p-5 rounded-xl border border-slate-100 dark:border-slate-900/50">
                <div>
                  <span className="font-bold text-slate-400">প্রকাশক:</span>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold mt-1">মানারাহ ফাউন্ডেশন</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400">ব্যবস্থাপনা সম্পাদক:</span>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold mt-1">তোফায়েল ইসলাম</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400">সম্পাদক:</span>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold mt-1">ওছমান গনি ফরহাদ</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400">বার্তা সম্পাদক:</span>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold mt-1">আব্দুল্লাহ Azad</p>
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section className="space-y-4 border-t border-slate-150 dark:border-slate-800 pt-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                যোগাযোগের তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Side Info */}
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400">অফিস কার্যালয়:</span>
                      <p className="text-slate-700 dark:text-slate-200">গড়েয়া রোড, ঠাকুরগাঁও সদর, ঠাকুরগাঁও।</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400">হেল্পলাইন / ফোন:</span>
                      <p className="text-slate-700 dark:text-slate-200">০১৭১৭৩৫১৬৭৪</p>
                    </div>
                  </div>
                </div>

                {/* Right Side Mail Info */}
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400">ইমেইল ঠিকানা:</span>
                      <p className="text-slate-750 dark:text-slate-350">
                        <a href="mailto:manarahfoundation.official@gmail.com" className="hover:underline text-emerald-600 dark:text-emerald-400">manarahfoundation.official@gmail.com</a>
                      </p>
                      <p className="text-slate-750 dark:text-slate-350 mt-1">
                        <a href="mailto:dailymanarah.official@gmail.com" className="hover:underline text-emerald-600 dark:text-emerald-400">dailymanarah.official@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Note */}
            <div className="text-[11px] text-slate-450 dark:text-zinc-500 text-center italic border-t border-slate-100 dark:border-slate-800 pt-6">
              শীঘ্রই জানানো হবে আরও বিস্তারিত...
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
