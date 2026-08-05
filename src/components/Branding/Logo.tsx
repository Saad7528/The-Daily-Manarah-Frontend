import React from "react";

interface LogoProps {
  className?: string;
  theme?: "light" | "dark" | "sepia";
}

export function Logo({ className = "", theme }: LogoProps) {
  // We can use CSS variables or Tailwind classes to automatically style based on theme.
  // Slate-900 for light, white/gold for dark, sepia-900/warm-brown for sepia.
  // If a theme is explicitly passed, we use those styles. Otherwise, we default to adaptive classes.
  
  let textColorClass = "text-slate-900 dark:text-amber-50";
  let beaconColorClass = "fill-emerald-600 dark:fill-amber-400";
  let rayColorClass = "stroke-emerald-400 dark:stroke-amber-300";

  if (theme === "light") {
    textColorClass = "text-slate-900";
    beaconColorClass = "fill-emerald-600";
    rayColorClass = "stroke-emerald-400";
  } else if (theme === "dark") {
    textColorClass = "text-white";
    beaconColorClass = "fill-amber-400";
    rayColorClass = "stroke-amber-300";
  } else if (theme === "sepia") {
    textColorClass = "text-amber-950";
    beaconColorClass = "fill-amber-700";
    rayColorClass = "stroke-amber-600";
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon: Modern Minaret / Beacon of Truth */}
      <svg
        width="42"
        height="42"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-all duration-300 transform hover:scale-105"
      >
        {/* Radiating Light Rays */}
        <path
          d="M50 15 V5 M50 85 V95 M15 50 H5 M85 50 H95 M25 25 L15 15 M75 25 L85 15 M25 75 L15 85 M75 75 L85 85"
          strokeWidth="4"
          strokeLinecap="round"
          className={rayColorClass}
          opacity="0.8"
        />
        
        {/* Radiating Glow Rings */}
        <circle cx="50" cy="50" r="16" strokeWidth="2" strokeDasharray="4 4" className={rayColorClass} opacity="0.5" />
        
        {/* Minaret Structure */}
        {/* Base */}
        <path d="M30 80 H70 V85 H30 Z" className={beaconColorClass} />
        {/* Tier 1 */}
        <path d="M35 60 H65 V80 H35 Z" className={beaconColorClass} opacity="0.9" />
        {/* Tier 2 / Balcony */}
        <path d="M38 45 H62 V60 H38 Z" className={beaconColorClass} opacity="0.95" />
        {/* Dome Top */}
        <path d="M42 45 C42 30, 58 30, 58 45 Z" className={beaconColorClass} />
        
        {/* Beacon Light Center */}
        <circle cx="50" cy="40" r="5" fill="#FFFFFF" className="animate-pulse" />
      </svg>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={`font-serif text-xl md:text-2xl font-black tracking-wide leading-none ${textColorClass}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          THE DAILY MANARAH
        </span>
        <span className="text-[9px] md:text-[10px] tracking-[0.25em] font-sans font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase">
          Beacon of Truth & Integrity
        </span>
      </div>
    </div>
  );
}
