import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  X,
  LogOut,
} from "lucide-react";
import logo from "../../assets/herosection/DevangLogo_bLACK.png";
import { useAuth } from "../../context/AuthContext";
import { useAdminData } from "../../context/AdminDataContext";

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadInquiriesCount, blogsCount } = useAdminData();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Blogs Management",
      path: "/admin/blogs",
      icon: FileText,
      badge: blogsCount > 0 ? blogsCount : null,
    },
    {
      name: "Client Inquiries",
      path: "/admin/inquiries",
      icon: MessageSquare,
      badge: unreadInquiriesCount > 0 ? unreadInquiriesCount : null,
      badgeColor: "bg-[#c59a5b] text-white font-bold",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed bottom-0 top-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200/80 bg-[#ffffff] text-[#111111] font-sans transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Header / Brand */}
        <div className="flex h-20 items-center justify-between border-b border-gray-200/80 px-6 bg-[#ffffff]">
          <NavLink
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Devang Developers"
              className="h-20 w-auto object-contain"
            />
          </NavLink>

          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-[#f8f7f4] text-gray-500 hover:text-[#111111] lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#8a8a8a] mb-3 font-mono">
              Main Menu
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#c59a5b] text-white font-bold shadow-md shadow-[#c59a5b]/20"
                          : "text-[#6b6b6b] hover:bg-[#f8f7f4] hover:text-[#111111]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                              isActive ? "text-white" : "text-[#c59a5b]"
                            }`}
                          />
                          <span>{item.name}</span>
                        </div>

                        {item.badge !== null && item.badge !== undefined && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              isActive
                                ? "bg-white/20 text-white"
                                : item.badgeColor || "bg-[#f5e4cf] text-[#a2793f]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Profile & Logout Footer */}
        <div className="border-t border-gray-200/80 p-4 bg-[#f8f7f4]/80 space-y-3">
          {user && (
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#c59a5b] text-xs font-bold text-white uppercase">
                {user.name ? user.name.charAt(0) : "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#111111] truncate">{user.name}</p>
                <p className="text-[10px] text-[#6b6b6b] truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition-all"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
