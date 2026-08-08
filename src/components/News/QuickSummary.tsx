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
    <div className="bg-[var(--bg-input)]/60 border border-[var(--border-color)] rounded-xl p-5 flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-[var(--border-color)]/60 pb-3">
        <Sparkles size={16} className="text-[var(--accent-color)]" />
        <h4 className="font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">
          ৩-বুলেট এআই কুইক সামারি (সংক্ষিপ্তসার)
        </h4>
      </div>

      {/* Bullet list */}
      <ul className="flex flex-col gap-2.5">
        {points.map((point, idx) => (
          <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-[var(--text-primary)] font-semibold leading-relaxed">
            <span className="shrink-0 flex items-center justify-center bg-[var(--accent-color)]/20 text-[var(--text-primary)] w-5 h-5 rounded-full text-[11px] font-black">
              {idx + 1}
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
