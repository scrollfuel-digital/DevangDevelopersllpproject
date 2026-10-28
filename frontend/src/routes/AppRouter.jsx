import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

// Auth Provider
import { AuthProvider } from "../context/AuthContext";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

// Public Pages
import Aboutus from "../pages/About";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Hero from "../pages/Hero";

// Public Layout Components
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

// Auth Pages & Protected Route
import Login from "../pages/admin/Login";
import Signup from "../pages/admin/Signup";
import ProtectedRoute from "../components/admin/ProtectedRoute";

// Admin Layout & Pages
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminInquiries from "../pages/admin/AdminInquiries";

// Public Layout Wrapper
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const AppRouter = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC WEBSITE ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/project" element={<Project />} />
          <Route path="/gallery" element={<Navigate to="/project" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* AUTHENTICATION ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ADMIN DASHBOARD ROUTES */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="inquiries" element={<AdminInquiries />} />
          </Route>
        </Route>

        {/* FALLBACK ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
