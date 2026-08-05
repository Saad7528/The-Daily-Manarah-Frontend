"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface QuickSummaryProps {
  summaryPoints?: string[];
}

export function QuickSummary({ summaryPoints }: QuickSummaryProps) {
  // If no summary points are supplied, use a beautiful fallback summary generator or simulated loader.
  const fallbackPoints = [
    "প্রতিবেদনের মূল সারসংক্ষেপ এবং ঘটনার সর্বশেষ অগ্রগতির বিবরণ।",
    "সরাসরি সূত্রের বরাতে খবরের সত্যতা ও ফ্যাক্ট-চেকড নিশ্চয়তা।",
    "সংশ্লিষ্ট বিষয় ও জনগণের ওপর এর সামষ্টিক প্রভাবের আলোচনা।"
  ];

  const points = summaryPoints && summaryPoints.length > 0 ? summaryPoints : fallbackPoints;

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-zinc-900/40 dark:to-emerald-950/20 sepia:from-[#fcf6e8] sepia:to-[#ebdcb9] border border-emerald-100 dark:border-emerald-900/30 sepia:border-[#dfceab] rounded-xl p-5 flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-emerald-100/60 dark:border-emerald-900/20 pb-3">
        <Sparkles size={16} className="text-emerald-600 dark:text-amber-400 sepia:text-amber-800" />
        <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-800 dark:text-amber-400 sepia:text-amber-900">
          ৩-বুলেট এআই কুইক সামারি (সংক্ষিপ্তসার)
        </h4>
      </div>

      {/* Bullet list */}
      <ul className="flex flex-col gap-2.5">
        {points.map((point, idx) => (
          <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-slate-700 dark:text-zinc-300 sepia:text-[#433422] leading-relaxed">
            <span className="shrink-0 flex items-center justify-center bg-emerald-600/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-amber-400 w-5 h-5 rounded-full text-[11px] font-bold">
              {idx + 1}
            </span>
            <span className="font-medium">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
