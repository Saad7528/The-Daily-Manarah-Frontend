"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Map, MapPin, Navigation } from "lucide-react";

interface DivisionPath {
  id: string;
  name: string;
  bnName: string;
  path: string;
  color: string;
}

// Stylized coordinate approximations for Bangladesh divisions (to keep the SVG clean, lightweight, and modern)
const divisions: DivisionPath[] = [
  {
    id: "rangpur",
    name: "Rangpur",
    bnName: "রংপুর",
    path: "M35,10 L50,12 L52,28 L35,24 Z",
    color: "fill-red-500/20 hover:fill-red-500/40 stroke-red-500"
  },
  {
    id: "rajshahi",
    name: "Rajshahi",
    bnName: "রাজশাহী",
    path: "M20,25 L35,24 L45,35 L38,50 L20,40 Z",
    color: "fill-orange-500/20 hover:fill-orange-500/40 stroke-orange-500"
  },
  {
    id: "mymensingh",
    name: "Mymensingh",
    bnName: "ময়মনসিংহ",
    path: "M50,12 L68,15 L66,28 L52,28 Z",
    color: "fill-blue-500/20 hover:fill-blue-500/40 stroke-blue-500"
  },
  {
    id: "dhaka",
    name: "Dhaka",
    bnName: "ঢাকা",
    path: "M38,50 L45,35 L66,28 L64,48 L56,60 L45,62 Z",
    color: "fill-emerald-500/20 hover:fill-emerald-500/40 stroke-emerald-500"
  },
  {
    id: "sylhet",
    name: "Sylhet",
    bnName: "সিলেট",
    path: "M68,15 L85,18 L88,38 L66,28 Z",
    color: "fill-indigo-500/20 hover:fill-indigo-500/40 stroke-indigo-500"
  },
  {
    id: "khulna",
    name: "Khulna",
    bnName: "খুলনা",
    path: "M20,40 L38,50 L45,62 L42,85 L22,80 Z",
    color: "fill-purple-500/20 hover:fill-purple-500/40 stroke-purple-500"
  },
  {
    id: "barishal",
    name: "Barishal",
    bnName: "বরিশাল",
    path: "M42,85 L45,62 L56,60 L58,82 Z",
    color: "fill-teal-500/20 hover:fill-teal-500/40 stroke-teal-500"
  },
  {
    id: "chattogram",
    name: "Chattogram",
    bnName: "চট্টগ্রাম",
    path: "M56,60 L64,48 L88,38 L95,65 L75,95 L65,92 L58,82 Z",
    color: "fill-amber-500/20 hover:fill-amber-500/40 stroke-amber-500"
  }
];

export function BangladeshMap() {
  const router = useRouter();
  const [hoveredDiv, setHoveredDiv] = useState<DivisionPath | null>(null);

  const handleDivisionClick = (div: DivisionPath) => {
    router.push(`/location/${div.id}`);
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
        <Map size={18} className="text-[var(--accent-color)]" />
        <h3 className="font-serif font-black text-base text-[var(--text-primary)]">
          মানচিত্রে দেশজুড়ে সংবাদ
        </h3>
      </div>

      <p className="text-xs text-slate-500 dark:text-zinc-500 sepia:text-[#705e4c]">
        নিচের মানচিত্র থেকে আপনার কাঙ্ক্ষিত বিভাগে ক্লিক করে ওই এলাকার সর্বশেষ সব খবর এক নজরে দেখে নিন।
      </p>

      {/* SVG Interactive Map Area */}
      <div className="relative flex justify-center py-4 bg-slate-50/50 dark:bg-zinc-950/20 sepia:bg-[#dfceab]/30 rounded-xl border border-[var(--border-color)] overflow-hidden">
        
        {/* Tooltip Overlay */}
        {hoveredDiv && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1.5 shadow-md z-10 transition-all duration-300">
            <MapPin size={10} className="text-amber-400" />
            <span>{hoveredDiv.bnName} বিভাগ</span>
          </div>
        )}

        <svg
          width="280"
          height="320"
          viewBox="10 5 90 95"
          className="transition-all duration-500"
        >
          {/* Render Divisions */}
          {divisions.map((div) => (
            <path
              key={div.id}
              d={div.path}
              className={`cursor-pointer transition-all duration-300 stroke-[1.5px] stroke-linejoin-round ${div.color}`}
              onClick={() => handleDivisionClick(div)}
              onMouseEnter={() => setHoveredDiv(div)}
              onMouseLeave={() => setHoveredDiv(null)}
            />
          ))}

          {/* Division Text Labels */}
          {divisions.map((div) => {
            // Approx centers to display text
            let x = 50, y = 50;
            if (div.id === "rangpur") { x = 41; y = 18; }
            else if (div.id === "rajshahi") { x = 28; y = 34; }
            else if (div.id === "mymensingh") { x = 58; y = 20; }
            else if (div.id === "dhaka") { x = 52; y = 47; }
            else if (div.id === "sylhet") { x = 75; y = 28; }
            else if (div.id === "khulna") { x = 32; y = 62; }
            else if (div.id === "barishal") { x = 48; y = 72; }
            else if (div.id === "chattogram") { x = 72; y = 68; }

            return (
              <text
                key={`label-${div.id}`}
                x={x}
                y={y}
                className="pointer-events-none fill-slate-800 dark:fill-slate-200 sepia:fill-[#433422] font-semibold text-[3.5px] text-anchor-middle text-center"
                textAnchor="middle"
              >
                {div.bnName}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Quick Links List */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-2">
        {divisions.map((div) => (
          <button
            key={div.id}
            onClick={() => handleDivisionClick(div)}
            className="flex items-center gap-1.5 hover:text-[var(--accent-color)] text-slate-700 dark:text-slate-400 sepia:text-[#433422] font-medium text-left border-l border-[var(--border-color)] pl-2"
          >
            <Navigation size={10} className="text-slate-400 rotate-45" />
            <span>{div.bnName} বিভাগ</span>
          </button>
        ))}
      </div>
    </div>
  );
}
