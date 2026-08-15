"use client";

import React from "react";
import { CheckCircle2, Bookmark } from "lucide-react";

interface QuickSummaryProps {
  summaryPoints?: string[];
}

export function QuickSummary({ summaryPoints }: QuickSummaryProps) {
  const fallbackPoints = [
    "প্রতিবেদনের মূল সারসংক্ষেপ এবং ঘটনার সর্বশেষ অগ্রগতির বিবরণ।",
    "সরাসরি সূত্রের বরাতে খবরের সত্যতা ও ফ্যাক্ট-চেকড নিশ্চয়তা।",
    "সংশ্লিষ্ট বিষয় ও জনগণের ওপর এর সামষ্টিক প্রভাবের সারমর্ম।"
  ];

  const points = summaryPoints && summaryPoints.length > 0 ? summaryPoints : fallbackPoints;

  return (
    <div className="bg-amber-50/40 dark:bg-amber-950/15 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-5 my-2">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-amber-200/60 dark:border-amber-900/30 pb-2.5 mb-3.5">
        <Bookmark size={15} className="text-amber-600 dark:text-amber-400" />
        <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-200">
          এক নজরে মূল বিষয়সমূহ
        </h4>
      </div>

      {/* Bullet list */}
      <ul className="flex flex-col gap-2.5">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--text-primary)] font-medium leading-relaxed">
            <CheckCircle2 size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

