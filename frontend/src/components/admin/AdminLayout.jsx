import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminBreadcrumb from "./AdminBreadcrumb";
import { AdminProvider } from "../../context/AdminDataContext";

function AdminLayoutInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8f7f4] text-[#111111] font-sans selection:bg-[#c59a5b] selection:text-white">
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Viewport */}
      <div className="flex flex-1 flex-col h-screen min-w-0 overflow-hidden">
        {/* Header */}
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AdminBreadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <AdminProvider>
      <AdminLayoutInner />
    </AdminProvider>
  );
}