"use client";

import React from "react";

export function FacebookFeed() {
  return (
    <div className="w-full flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl overflow-hidden mt-6 transition-colors duration-300">
      {/* Header of the Widget */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-3 bg-[var(--bg-input)]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <span className="font-serif font-black text-xs text-[var(--text-primary)] tracking-wide">
            ডেইলি মানারাহ ফেসবুক ফিড
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-black text-[var(--text-secondary)] tracking-widest uppercase">
            LIVE TIMELINE
          </span>
        </div>
      </div>

      {/* Facebook Page Plugin Iframe */}
      <div className="w-full h-[500px] bg-white">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDailyManarah&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="100%"
          height="100%"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Daily Manarah Facebook Page Feed"
        />
      </div>
    </div>
  );
}
