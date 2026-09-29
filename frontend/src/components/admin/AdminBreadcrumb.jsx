import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function AdminBreadcrumb({ customItems }) {
  const location = useLocation();

  const pathNames = {
    admin: "Admin",
    dashboard: "Dashboard Overview",
    blogs: "Blogs Management",
    inquiries: "Client Inquiries",
    create: "Create Blog",
    edit: "Edit Blog",
  };

  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  let currentPath = "";
  const items = customItems || pathSegments.map((segment, index) => {
    currentPath += `/${segment}`;
    const label = pathNames[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    const isLast = index === pathSegments.length - 1;

    return {
      label,
      to: isLast ? null : currentPath,
    };
  });

  return (
    <nav aria-label="Admin Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#6b6b6b] font-sans">
      <Link
        to="/admin/dashboard"
        className="flex items-center gap-1 hover:text-[#c59a5b] transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="font-semibold text-[#111111]">Admin</span>
      </Link>

      {items.map((item, index) => {
        if (item.label.toLowerCase() === "admin" && index === 0) return null;

        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="hover:text-[#c59a5b] transition-colors capitalize font-medium text-[#6b6b6b]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#c59a5b] font-semibold capitalize font-mono">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
