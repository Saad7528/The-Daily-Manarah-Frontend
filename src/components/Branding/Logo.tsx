import React from "react";

interface LogoProps {
  className?: string;
  theme?: "light" | "dark" | "sepia";
}

export function Logo({ className = "" }: LogoProps) {
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
          className="font-serif text-lg md:text-xl font-black tracking-wide leading-none text-[var(--text-primary)]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          DAILY MANARAH
        </span>
        <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-sans font-bold text-[var(--text-secondary)] mt-1 uppercase">
        Truth in News, Welfare in Thought
        </span>
      </div>
    </div>
  );
}
