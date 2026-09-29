import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  ExternalLink,
  ChevronDown,
  LogOut,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAdminData } from "../../context/AdminDataContext";

export default function AdminHeader({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadInquiriesCount } = useAdminData();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md transition-all text-[#111111] shadow-xs">
      {/* Left side: Hamburger Toggle & Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 !bg-[#d19d03] text-[#111111] hover:bg-gray-100 lg:hidden transition-all"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Right side: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Visit Public Site */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 rounded-xl border border-[#c59a5b]/40 bg-[#f5e4cf]/50 px-3.5 py-2 text-xs font-semibold text-[#a2793f] hover:bg-[#c59a5b] hover:text-white transition-all shadow-xs"
        >
          <span>Live Site</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
            }}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-[#f8f7f4] p-1.5 pr-3 text-[#111111] hover:bg-gray-100 transition-all"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59a5b] text-xs font-bold text-white uppercase">
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <span className="hidden text-xs font-semibold text-[#111111] sm:inline-block">
              {user?.name || "Admin"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl z-50">
              <div className="border-b border-gray-100 px-3 py-2.5">
                <p className="text-xs font-bold text-[#111111]">{user?.name || "Devang Admin"}</p>
                <p className="text-[11px] text-[#6b6b6b]">{user?.email || "admin@devangdevelopers.com"}</p>
                <span className="inline-block mt-1 rounded bg-[#f5e4cf] px-1.5 py-0.5 text-[9px] font-bold text-[#a2793f] uppercase">
                  {user?.role || "Administrator"}
                </span>
              </div>
              <div className="mt-1 space-y-1">
                <Link
                  to="/signup"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#6b6b6b] hover:bg-[#f8f7f4] hover:text-[#111111] transition-colors"
                >
                  <UserPlus className="h-4 w-4 text-[#c59a5b]" />
                  Add Administrator
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
