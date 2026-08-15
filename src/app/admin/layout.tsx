"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { AdminHeader } from "@/components/Admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-300">
      {/* Collapsible / Responsive Admin Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Wrapper shifted on desktop */}
      <div className="flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
        {/* Admin Header with Breadcrumbs & Profile Controls */}
        <AdminHeader onMenuToggle={() => setMobileOpen(true)} />

        {/* Dynamic Admin Page Workspace */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
