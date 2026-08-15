import React from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Global Public News Header with Mega Menu, Weather, Live Prayer & Currency Widget */}
      <Header />

      {/* Main Public Content Area */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Global Public News Footer with Editorial Info & Quick Links */}
      <Footer />
    </div>
  );
}
