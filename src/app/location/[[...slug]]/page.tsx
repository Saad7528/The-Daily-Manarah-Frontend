"use client";

import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { MapPin } from "lucide-react";

const allMockPosts: NewsItem[] = [
  {
    id: "p-1",
    title: "ঢাকায় মুষলধারে বৃষ্টি: জলজট ও ট্রাফিক জ্যামে নাকাল নগরবাসী, দুর্ভোগ চরমে",
    slug: "dhaka-heavy-rain-traffic-jam",
    summary: "আজ সকাল থেকেই রাজধানীর বিভিন্ন এলাকায় একটানা বৃষ্টিপাত রেকর্ড করা হয়েছে। মিরপুর, ধানমন্ডি এবং কাওরান বাজারের প্রধান সড়কগুলো পানিতে তলিয়ে যাওয়ায় যানবাহন চলাচল প্রায় বন্ধ হয়ে পড়েছে। আবহাওয়া অফিস আরও ২ দিন বৃষ্টির পূর্বাভাস দিয়েছে।",
    coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop",
    isVerified: true,
    category: { name: "রাজনীতি & জাতীয়", slug: "politics" },
    author: { name: "কাজী রায়হান" },
    views: 4520,
    createdAt: new Date()
  }
];

export default function LocationPage({ params }: { params: { slug?: string[] } }) {
  const locationPath = params.slug || [];
  
  // Format location titles
  const districtName = locationPath[0] 
    ? locationPath[0].charAt(0).toUpperCase() + locationPath[0].slice(1) 
    : "সারাদেশ";
  const thanaName = locationPath[1]
    ? locationPath[1].charAt(0).toUpperCase() + locationPath[1].slice(1)
    : "";

  const formattedLocation = thanaName 
    ? `${thanaName}, ${districtName}` 
    : districtName;

  // Render mock data filtered by location (since we have limited mock data, we fall back to displaying our lead post for Dhaka)
  const isDhakaRelated = districtName.toLowerCase() === "dhaka" || districtName.toLowerCase() === "dhaka";
  const postsToShow = isDhakaRelated ? allMockPosts : [];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col gap-8 flex-grow">
        
        {/* Location Header */}
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
          <MapPin size={20} className="text-[var(--accent-color)]" />
          <h2 className="font-serif font-black text-lg md:text-xl text-[var(--text-primary)]">
            এলাকা ভিত্তিক খবর: {formattedLocation}
          </h2>
        </div>

        {postsToShow.length > 0 ? (
          <HeroGrid posts={postsToShow} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
            <span className="text-sm font-bold">দুঃখিত, {formattedLocation} এলাকায় এই মুহূর্তে কোনো প্রকাশিত সংবাদ নেই।</span>
            <span className="text-xs">শীঘ্রই রিপোর্টারদের পাঠানো সংবাদ এই পাতায় প্রদর্শন করা হবে।</span>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
