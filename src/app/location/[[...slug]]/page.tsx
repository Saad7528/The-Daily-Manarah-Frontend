"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { HeroGrid, NewsItem } from "@/components/News/HeroGrid";
import { MapPin, Loader2 } from "lucide-react";

const divisionBnNames: Record<string, string> = {
  dhaka: "ঢাকা",
  chattogram: "চট্টগ্রাম",
  sylhet: "সিলেট",
  khulna: "খুলনা",
  barishal: "বরিশাল",
  rajshahi: "রাজশাহী",
  rangpur: "রংপুর",
  mymensingh: "ময়মনসিংহ"
};

export default function LocationPage({ params }: { params: { slug?: string[] } }) {
  const locationPath = params.slug || [];
  const divisionId = locationPath[0] ? locationPath[0].toLowerCase() : "";
  
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Format location titles
  const divisionNameBn = divisionBnNames[divisionId] || (divisionId ? divisionId.charAt(0).toUpperCase() + divisionId.slice(1) : "সারাদেশ");
  const thanaName = locationPath[1]
    ? locationPath[1].charAt(0).toUpperCase() + locationPath[1].slice(1)
    : "";

  const formattedLocation = thanaName 
    ? `${thanaName}, ${divisionNameBn}` 
    : divisionNameBn;

  useEffect(() => {
    async function fetchLocationPosts() {
      if (!divisionId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";
        // Query posts by division
        const res = await fetch(`${backendUrl}/api/posts?division=${divisionId}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch location posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLocationPosts();
  }, [divisionId]);

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

        {loading ? (
          <div className="flex items-center justify-center py-20 text-[var(--accent-color)]">
            <Loader2 size={36} className="animate-spin" />
            <span className="ml-2 font-medium">খবর লোড করা হচ্ছে...</span>
          </div>
        ) : posts.length > 0 ? (
          <HeroGrid posts={posts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
            <span className="text-sm font-bold text-[var(--text-primary)]">দুঃখিত, {formattedLocation} এলাকায় এই মুহূর্তে কোনো প্রকাশিত সংবাদ নেই।</span>
            <span className="text-xs">শীঘ্রই রিপোর্টারদের পাঠানো সংবাদ এই পাতায় প্রদর্শন করা হবে।</span>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
