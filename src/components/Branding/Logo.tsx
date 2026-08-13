import React from "react";

interface LogoProps {
  className?: string;
  theme?: "light" | "dark" | "sepia";
}

export function Logo({ className = "", theme }: LogoProps) {
  let textColorClass = "text-[var(--text-primary)]";
  let subtextColorClass = "text-[var(--text-secondary)]";

  if (theme === "dark") {
    textColorClass = "text-[#F5B041]";
    subtextColorClass = "text-slate-400";
  } else if (theme === "sepia") {
    textColorClass = "text-[#433422]";
    subtextColorClass = "text-[#705e4c]";
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Real Circular Logo from /logo.jpg */}
      <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-[var(--border-color)] shadow-xs shrink-0 transition-transform duration-300 hover:scale-105">
        <img
          src="/logo.jpg"
          alt="Daily Manarah Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Typography: Daily Manarah */}
      <div className="flex flex-col">
        <span
          className={`font-serif text-lg md:text-xl font-black tracking-wide leading-none ${textColorClass}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          DAILY MANARAH
        </span>
        <span className={`text-[8px] md:text-[9px] tracking-[0.2em] font-sans font-bold mt-1 uppercase ${subtextColorClass}`}>
          Truth in News, Welfare in Thought
        </span>
      </div>
    </div>
  );
}
