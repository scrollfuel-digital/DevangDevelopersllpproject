import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useAuth();

  // 1. Show loading indicator while verifying existing session
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4]">
        <div className="text-sm font-medium text-[#8a8a8a] animate-pulse">
          Verifying session...
        </div>
      </div>
    );
  }

  // 2. Guard protected admin routes ONLY AFTER session verification completes
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

