"use client";

import React, { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import {
  Megaphone,
  HeartHandshake,
  GraduationCap,
  Wallet,
  Receipt,
  Award,
  ShieldCheck,
  Sprout,
  BookOpen,
  BookHeart,
  Users,
  HandHeart,
  Globe,
  Info,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function ManarahFoundationPage() {
  // Tabs for objectives
  const [activeObjectiveTab, setActiveObjectiveTab] = useState<"dawah" | "seba" | "shikkha">("dawah");
  
  // Tabs for financial policy
  const [activeFinanceTab, setActiveFinanceTab] = useState<"income" | "expense" | "transparency" | "control">("income");

  const objectiveTabs = [
    { id: "dawah", label: "দাওয়াহ কার্যক্রম", icon: Megaphone },
    { id: "seba", label: "সেবা কার্যক্রম", icon: HeartHandshake },
    { id: "shikkha", label: "শিক্ষা কার্যক্রম", icon: GraduationCap }
  ] as const;

  const financeTabs = [
    { id: "income", label: "আয়ের উৎসসমূহ", icon: Wallet },
    { id: "expense", label: "ব্যয়ের নীতিমালা", icon: Receipt },
    { id: "transparency", label: "স্বচ্ছতা ও জবাবদিহিতা", icon: Award },
    { id: "control", label: "প্রশাসনিক নিয়ন্ত্রণ", icon: ShieldCheck }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header />
      
      {/* Decorative Hero Header */}
      <div className="relative overflow-hidden bg-emerald-900 text-white py-16 px-4 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-950 to-emerald-950 opacity-90"></div>
        <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 shadow-sm">
            <span className="size-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">প্রতিষ্ঠানের পরিচয়</span>
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-amber-400 mb-6 drop-shadow-md">
            মানারাহ ফাউন্ডেশন
          </h1>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-3xl font-medium">
            মানারাহ ফাউন্ডেশন (Manarah Foundation) গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক নিবন্ধিত একটি অরাজনৈতিক, অলাভজনক এবং সম্পূর্ণ দ্বীনি ট্রাস্টি প্রতিষ্ঠান (নিবন্ধন নম্বর: ৩৩০৯/২০২৫)। মানবতার শ্রেষ্ঠ শিক্ষক, শান্তির দূত মহানবী মুহাম্মাদ (সাঃ)-এর সুমহান আদর্শ ও পদাঙ্ক অনুসরণ করে আর্তমানবতার সেবা এবং একটি আদর্শ কল্যাণ-সমাজ বিনির্মাণে আমরা নিরস্তর কাজ করে যাচ্ছি।
          </p>

          <a
            href="https://www.manarahfoundation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-full transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Globe className="w-4 h-4" />
            <span>মূল ওয়েবসাইট ভিজিট করুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-16">
        
        {/* Core Values Section */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
              আমাদের মূল নীতি ও আদর্শ
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-3 font-medium">
              পবিত্র কুরআন এবং আল্লাহর রাসূল মুহাম্মাদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর সুন্নাহ তথা সালাফে সালিহীনের কর্মপদ্ধতিই মানারাহ ফাউন্ডেশনের মূল চালিকাশক্তি।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl shadow-xs transition duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <BookHeart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">কুরআন ও সুন্নাহর অনুসরণ</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                প্রতিটি পদক্ষেপে শরীয়াহর শতভাগ অনুগত্য নিশ্চিত করা।
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl shadow-xs transition duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">উম্মাহর ঐক্য ও সহনশীলতা</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                মুসলমানদের মধ্যে পারস্পরিক ভ্রাতৃত্ববোধ জাগ্রত করা এবং উদার ও ভারসাম্যপূর্ণ চিন্তার প্রসার ঘটানো।
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl shadow-xs transition duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-600 dark:text-amber-450 rounded-xl flex items-center justify-center mb-4">
                <HandHeart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">নিষ্কলুষ মানবসেবা</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                কোনো দুনিয়াবী স্বার্থ ছাড়া কেবল মহান আল্লাহর সন্তুষ্টির জন্য সৃষ্টির সেবা করা।
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl shadow-xs transition duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">আমানতদারিতা ও স্বচ্ছতা</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                দাতাদের প্রতিটি দানকে পবিত্র আমানত হিসেবে গণ্য করা এবং আয়-ব্যয়ের নিখুঁত হিসাব ও অভ্যন্তরীণ নিরীক্ষণ ব্যবস্থা নিশ্চিত করা।
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl shadow-xs transition duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-600 dark:text-amber-450 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">রাজনৈতিক নিরপেক্ষতা ও পেশাদারিত্ব</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                সম্পূর্ণ অরাজনৈতিক ভাবধারা বজায় রেখে প্রাতিষ্ঠানিক সততা ও পেশাদারিত্বের সর্বোচ্চ মান বজায় রাখা।
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl shadow-xs transition duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">টেকসই উন্নয়ন</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                সাময়িক সাহায্যের পাশাপাশি স্থায়ী কর্মসংস্থান সৃষ্টির মাধ্যমে স্থায়ী দারিদ্র্য বিমোচনে অগ্রাধিকার দেওয়া।
              </p>
            </div>

          </div>
        </section>

        {/* Goals & Activities Section (Tabbed Layout) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-serif text-3xl font-extrabold text-slate-900 dark:text-white">
              আমাদের লক্ষ্য ও উদ্দেশ্য
            </h2>
          </div>

          {/* Tabs Nav */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {objectiveTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeObjectiveTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveObjectiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tabs Content */}
          <div className="min-h-[300px]">
            {activeObjectiveTab === "dawah" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-850 pb-4">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">দাওয়াহ কার্যক্রম</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">১</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">মানারাহ পাবলিকেশন</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">সমকালীন ও বিশুদ্ধ ইসলামী সাহিত্য প্রকাশ এবং তা সুলভ মূল্যে মানুষের কাছে পৌঁছে দেওয়া।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">২</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">গ্রন্থাগার ও গবেষণা</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">বিশুদ্ধ ইলম চর্চার জন্য পাঠাগার স্থাপন এবং জ্ঞানভিত্তিক সমাজ গঠনে বিভিন্ন সেমিনার ও মাহফিল আয়োজন।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৩</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">ডিজিটাল দাওয়াহ</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">সোশ্যাল মিডিয়া ও ইন্টারনেটের মাধ্যমে ইসলামের সঠিক বার্তা তরুণ প্রজন্মের কাছে ছড়িয়ে দেওয়া।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৪</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">মসজিদ কেন্দ্রিক দাওয়াহ</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">মসজিদকে কেন্দ্র করে নীতি-নৈতিকতা ও সমাজ সংস্কারের বিভিন্ন কর্মসূচি পালন। ইসলামের সঠিক দৃষ্টিভঙ্গি তুলে ধরার লক্ষ্যে বিভিন্ন মসজিদ, মাদরাসা ও জনসমাগমস্থলে সাপ্তাহিক, মাসিক ও বার্ষিক ভিত্তিতে দ্বীনি হালাকাহ, মুক্ত মতবিনিময় ও বিষয়ভিত্তিক আলোচনা সভার আয়োজন।</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeObjectiveTab === "seba" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-850 pb-4">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">সেবা কার্যক্রম</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">১</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">টেকসই স্বাবলম্বীকরণ</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">সাময়িক সহায়তার পরিবর্তে অভাবী মানুষকে স্থায়ীভাবে স্বাবলম্বী করতে উপার্জনক্ষম উপকরণ (যেমন: গরু, সেলাই মেশিন, ভ্যান বা ক্ষুদ্র ব্যবসার মূলধন) প্রদান করা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">২</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">এতিম প্রতিপালন ও অভিভাবকত্ব</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">এতিম শিশুদের কেবল খাদ্য-বস্ত্র নয়, বরং তারা পূর্ণ বয়স্ক ও সাবলম্বী না হওয়া পর্যন্ত তাদের মানসম্মত শিক্ষা ও সুনাগরিক হিসেবে গড়ে তোলার পূর্ণ অভিভাবকত্ব গ্রহণ।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৩</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">পরিবেশ সুরক্ষা ও বৃক্ষরোপণ</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">সাদাকায়ে জারিয়ার অংশ হিসেবে পরিবেশের ভারসাম্য রক্ষা এবং মানুষের অর্থনৈতিক স্বাবলম্বীকরণের লক্ষ্যে অধিক ফলনশীল ও ফলজ বৃক্ষরোপণ এবং পরিচর্যা কর্মসূচি।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৪</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">রমাদান ও কুরবানী প্রজেক্ট</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">পবিত্র রমজান মাসে অভাবগ্রস্ত পরিবারগুলোর মাঝে ইফতার ও সেহরি সামগ্রী বিতরণ এবং কুরবানীর সময় সচ্ছলদের পক্ষ থেকে কুরবানী আয়োজন করে তার গোশত সুবিধাবঞ্চিতদের মাঝে পৌঁছে দেওয়া।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৫</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">শিক্ষার্থীদের আত্মনির্ভরশীলতা</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">সাধারণ ও মাদরাসা শিক্ষার্থীদের পড়াশোনার পাশাপাশি বিভিন্ন কারিগরি ও বাস্তবমুখী প্রশিক্ষণ প্রদানের মাধ্যমে তাদের আত্মনির্ভরশীল করে তোলা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৬</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">স্বাস্থ্য ও মানবিক সহায়তা</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">দরিদ্র ও দুস্থ মানুষের জরুরি চিকিৎসা সেবা নিশ্চিত করতে আর্থিক অনুদান এবং শারীরিক প্রতিবন্ধীদের জন্য হুইলচেয়ারসহ বিশুদ্ধ পানির জন্য টিউবওয়েল স্থাপন প্রয়োজনীয় সরঞ্জাম প্রদান।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৭</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">সক্ষম প্রজেক্ট (স্বাবলম্বিতা)</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">যাকাতের অর্থের মাধ্যমে স্থায়ী দারিদ্র্য বিমোচন, ক্ষুদ্র ব্যবসার মূলধন দিয়ে স্বাবলম্বী করা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৮</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">পরিবেশবান্ধব শিল্প (EcoManarah)</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">পাটের তৈরি পণ্য উৎপাদন ও রপ্তানির মাধ্যমে স্থানীয় বেকারদের কর্মসংস্থান সৃষ্টি করা।</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeObjectiveTab === "shikkha" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-850 pb-4">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">শিক্ষা কার্যক্রম</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">১</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">বিশুদ্ধ ইসলামী জ্ঞানের প্রসার</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">পবিত্র কুরআন ও সুন্নাহর সঠিক শিক্ষার আলো সমাজের সর্বস্তরে পৌঁছে দেওয়া।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">২</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">যোগ্য দা&#39;য়ী ও আলোচক তৈরি</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">জাতীয় ও আন্তর্জাতিক পর্যায়ে ইসলামের সঠিক বার্তা পৌঁছে দেওয়ার জন্য দক্ষ, প্রাজ্ঞ এবং ভারসাম্যপূর্ণ চিন্তার ইসলামী আলোচক ও দা&#39;য়ী তৈরি করা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৩</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">যুগোপযোগী গবেষণা ও প্রতিষ্ঠান</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">কুরআন-সুন্নাহভিত্তিক যুগোপযোগী শিক্ষা গবেষণাকেন্দ্র স্থাপন এবং মানসম্মত পাঠক্রম প্রণয়নের মাধ্যমে আধুনিক শিক্ষাপ্রতিষ্ঠান প্রতিষ্ঠা ও পরিচালনা করা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৪</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">সমন্বিত শিক্ষা ব্যবস্থা</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">মানারাহ ফাউন্ডেশনের মূল চেতনাকে ধারণ করে স্কুল, কলেজ, বিশ্ববিদ্যালয় এবং কারিগরি বিদ্যালয় প্রতিষ্ঠার মাধ্যমে একটি পূর্ণাঙ্গ শিক্ষা নেটওয়ার্ক গড়ে তোলা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৫</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">কারিগরি প্রশিক্ষণ ও কর্মসংস্থান</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">&#39;মানারাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট&#39;-এর মাধ্যমে বিভিন্ন কারিগরি প্রশিক্ষণ প্রদান করে ২০৩০ সাল নাগাদ প্রতি বছর বিপুল সংখ্যক বেকার তরুণের কর্মসংস্থানের সুযোগ সৃষ্টি করা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৬</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">নারীদের স্বাবলম্বীকরণ</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">অসহায় ও দরিদ্র নারীদের সেলাইসহ বিভিন্ন কারিগরি প্রশিক্ষণ প্রদানের মাধ্যমে তাদের অর্থনৈতিকভাবে স্বাবলম্বী করে তোলা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৭</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">মেধাবী ও অসচ্ছল শিক্ষার্থীদের সহায়তা</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">দরিদ্র ও মেধাবী শিক্ষার্থীদের জন্য নিয়মিত শিক্ষাবৃত্তি প্রদান, প্রয়োজনীয় শিক্ষা উপকরণ সরবরাহ এবং তাদের উচ্চশিক্ষার পথ সুগম করতে সহায়ক কার্যক্রম পরিচালনা।</span>
                    </div>
                  </li>
                  <li className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-850">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">৮</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">প্রতিযোগিতা ও মেধা অন্বেষণ</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">শিক্ষার্থীদের মাঝে সৃজনশীলতা বৃদ্ধির লক্ষ্যে শিক্ষা, সংস্কৃতি এবং নানা সামাজিক ও জীবনমুখী বিষয়ের ওপর নিয়মিত প্রতিযোগিতার আয়োজন করা।</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Financial Policy & Transparency Section (Tabbed Layout) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-extrabold text-slate-900 dark:text-white">
              আয়-ব্যয়ের নীতিমালা ও স্বচ্ছতা
            </h2>
          </div>

          {/* Tabs Nav */}
          <div className="flex flex-wrap justify-center gap-2">
            {financeTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFinanceTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFinanceTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tabs Content */}
          <div className="min-h-[250px] border-t border-slate-100 dark:border-slate-850 pt-8">
            {activeFinanceTab === "income" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">আয়ের উৎসসমূহ</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">সাধারণ দান ও সাদাকাহ:</strong> দেশি ও বিদেশি শুভাকাঙ্ক্ষীদের সাধারণ অনুদান।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">যাকাত ও ফিতরা:</strong> যাকাতের অর্থ সম্পূর্ণ আলাদাভাবে গ্রহণ ও কেবল শরীয়াহ সম্মত খাতে ব্যয় করা।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">সদকায়ে জারিয়াহ:</strong> স্থায়ী প্রকল্প যেমন—টিউবওয়েল স্থাপন, এতিম প্রতিপালন বা মসজিদ নির্মাণে বিশেষ অনুদান।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">প্রাতিষ্ঠানিক আয় (Income Generation):</strong> প্রতিষ্ঠানের স্থায়ী স্থায়িত্ব নিশ্চিত করতে নিজস্ব প্রজেক্ট থেকে অর্জিত লভ্যাংশ।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">সরকারি ও বেসরকারি প্রতিষ্ঠানের অনুদান:</strong> সরকার বা কোনো অনুমোদিত দাতা সংস্থা থেকে প্রাপ্ত প্রকল্প ভিত্তিক সহায়তা।</span>
                  </li>
                </ul>
              </div>
            )}

            {activeFinanceTab === "expense" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">ব্যয়ের নীতিমালা</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">খাতভিত্তিক ব্যয়:</strong> সংগৃহীত অর্থ যে খাতের জন্য নেওয়া হয়েছে (যেমন: শিক্ষা, সেবা বা দাওয়াহ), তা কেবল সেই খাতেই ব্যয় করা হবে।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">যাকাত ব্যবস্থাপনা:</strong> যাকাতের অর্থ প্রশাসনিক বা সাধারণ কাজে ব্যয় না করে সরাসরি শরীয়াহ নির্ধারিত হকদারদের (যেমন: সক্ষম প্রজেক্টের মাধ্যমে) প্রদান করা হবে।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">পরিচালন ব্যয়:</strong> প্রতিষ্ঠানের অফিস ভাড়া, কর্মীদের সম্মানী এবং অন্যান্য প্রশাসনিক ব্যয় সর্বনিম্ন পর্যায়ে রাখার চেষ্টা করা হবে, যাতে দানের সর্বোচ্চ অংশ মানুষের কল্যাণে ব্যয় হয়।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">জরুরি তহবিল:</strong> প্রাকৃতিক দুর্যোগ বা জরুরি মানবিক সহায়তার জন্য আয়ের একটি অংশ সংরক্ষিত রাখা হবে।</span>
                  </li>
                </ul>
              </div>
            )}

            {activeFinanceTab === "transparency" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">স্বচ্ছতা ও জবাবদিহিতা</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">ব্যাংক লেনদেন:</strong> ব্যক্তিগত হাতে কোনো লেনদেন না করে প্রতিষ্ঠানের নামে নির্ধারিত ব্যাংক অ্যাকাউন্টের মাধ্যমে সকল বড় লেনদেন সম্পন্ন করা।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">রশিদ প্রদান:</strong> প্রতিটি দানের বিপরীতে ডিজিটাল বা ম্যানুয়াল রশিদ প্রদান নিশ্চিত করা।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">অডিট বা নিরীক্ষণ:</strong> প্রতি অর্থবছর শেষে নিবন্ধিত অডিটর দ্বারা প্রতিষ্ঠানের আয়-ব্যয়ের হিসাব নিরীক্ষণ (Audit) করা এবং ট্রাস্টি বোর্ডের সভায় তা অনুমোদন করা।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">তথ্য অধিকার:</strong> বিশেষ ক্ষেত্রে দাতা বা সংশ্লিষ্ট কর্তৃপক্ষকে তাদের দেওয়া অর্থের ব্যয় সম্পর্কে বিস্তারিত তথ্য প্রদান করা।</span>
                  </li>
                </ul>
              </div>
            )}

            {activeFinanceTab === "control" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">প্রশাসনিক নিয়ন্ত্রণ</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">চেয়ারম্যান ও ম্যানেজিং ট্রাস্টি:</strong> ট্রাস্ট দলিলের ক্ষমতা অনুযায়ী প্রতিষ্ঠানের সকল আর্থিক সিদ্ধান্ত এবং অনুমোদন চেয়ারম্যান ও ম্যানেজিং ট্রাস্টির প্রত্যক্ষ তত্ত্বাবধানে পরিচালিত হবে।</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-450">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong className="text-slate-900 dark:text-white">দুর্নীতি প্রতিরোধ:</strong> কোনো প্রকার আর্থিক অনিয়ম বা দুর্নীতির ক্ষেত্রে &#39;শূন্য সহনশীলতা&#39; (Zero Tolerance) নীতি অনুসরণ করা হবে।</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 border border-emerald-500/10 bg-emerald-500/5 dark:bg-emerald-950/20 p-5 rounded-2xl text-center shadow-xs">
            <p className="text-sm font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
              আমাদের সকল আয়-ব্যয়ের হিসাব সরকার নির্ধারিত নিয়ম এবং ট্রাস্ট আইন ১৮৮২ অনুযায়ী পরিচালিত হয়।
            </p>
          </div>
        </section>

        {/* Contact Info and address */}
        <section className="bg-slate-100 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
            যোগাযোগের ঠিকানা
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="block text-slate-950 dark:text-slate-200 text-sm">কার্যালয়</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">গড়েয়া রোড (মানারাহ ইসলামিক একাডেমি), ঠাকুরগাঁও, বাংলাদেশ।</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="block text-slate-950 dark:text-slate-200 text-sm">হেল্পলাইন</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm">01717351674</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="block text-slate-950 dark:text-slate-200 text-sm">ইমেইল</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm">manarahfoundation.official@gmail.com</span>
              </div>
            </div>

          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
