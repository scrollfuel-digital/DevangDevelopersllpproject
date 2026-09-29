import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  MessageSquare,
  Plus,
  ArrowUpRight,
  ChevronRight,
  Building,
} from "lucide-react";
import { useAdminData } from "../../context/AdminDataContext";

export default function AdminDashboard() {
  const {
    blogs,
    inquiries,
    blogsLoading,
    inquiriesLoading,
    fetchBlogs,
    fetchInquiries,
    searchQuery,
  } = useAdminData();

  useEffect(() => {
    fetchBlogs();
    fetchInquiries();
  }, [fetchBlogs, fetchInquiries]);

  const loading = blogsLoading || inquiriesLoading;

  // ============================================================
  // CALCULATE STATISTICS FROM BLOGS AND INQUIRIES RESPONSES
  // ============================================================
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((blog) => blog.status === "Published").length;
  const draftBlogs = blogs.filter((blog) => blog.status === "Draft").length;

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "New" || !inquiry.isSeen
  ).length;
  const contactedInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "Contacted"
  ).length;
  const resolvedInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "Resolved" || inquiry.isSeen
  ).length;

  const totalViews = blogs.reduce((total, blog) => total + (blog.views || 0), 0);

  const stats = {
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    totalInquiries,
    newInquiries,
    contactedInquiries,
    resolvedInquiries,
    totalViews,
  };

  // ============================================================
  // RECENT DATA
  // ============================================================
  const recentBlogs = blogs.slice(0, 4);
  const recentInquiries = inquiries.slice(0, 5);

  // ============================================================
  // SEARCH FILTER
  // ============================================================
  const filteredInquiries = searchQuery
    ? recentInquiries.filter((inquiry) => {
        const query = searchQuery.toLowerCase();
        return (
          inquiry.name?.toLowerCase().includes(query) ||
          inquiry.email?.toLowerCase().includes(query) ||
          inquiry.projectInterest?.toLowerCase().includes(query)
        );
      })
    : recentInquiries;

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (loading && blogs.length === 0 && inquiries.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm font-medium text-[#8a8a8a]">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans text-[#111111]">
      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-[#c59a5b]/30 bg-gradient-to-r from-white via-[#f8f7f4] to-[#f5e4cf]/30 p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-bold font-serif text-[#111111] tracking-tight">
              Welcome back,{" "}
              <span className="text-[#c59a5b]">
                Administrator
              </span>
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/blogs"
              className="flex items-center gap-2 rounded-2xl bg-[#c59a5b] px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#a2793f] transition-all shadow-lg shadow-[#c59a5b]/20"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Blog</span>
            </Link>

            <Link
              to="/admin/inquiries"
              className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#111111] hover:bg-gray-50 transition-all shadow-xs"
            >
              <MessageSquare className="h-4 w-4 text-[#c59a5b]" />
              <span>
                View Inquiries ({stats.newInquiries} New)
              </span>
            </Link>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#f5e4cf]/40 blur-3xl pointer-events-none" />
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm hover:border-[#c59a5b]/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider font-mono">
              Total Articles
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5e4cf]/60 text-[#a2793f] group-hover:scale-110 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#111111] font-serif">
              {stats.totalBlogs}
            </span>

            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {stats.publishedBlogs} Published
            </span>
          </div>

          <p className="mt-2 text-[11px] text-[#6b6b6b]">
            {stats.draftBlogs} articles saved as drafts
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm hover:border-[#c59a5b]/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider font-mono">
              Client Inquiries
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5e4cf]/60 text-[#a2793f] group-hover:scale-110 transition-transform">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#111111] font-serif">
              {stats.totalInquiries}
            </span>

            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              {stats.newInquiries} Unread
            </span>
          </div>

          <p className="mt-2 text-[11px] text-[#6b6b6b]">
            {stats.contactedInquiries} contacted,{" "}
            {stats.resolvedInquiries} resolved
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT INQUIRIES */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-lg font-bold font-serif text-[#111111] flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#c59a5b]" />
                Recent Property Inquiries
              </h5>

              <p className="text-xs text-[#6b6b6b]">
                Latest leads submitted through website contact form
              </p>
            </div>

            <Link
              to="/admin/inquiries"
              className="text-xs font-bold text-[#c59a5b] hover:underline flex items-center gap-1 font-mono"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            {filteredInquiries.length > 0 ? (
              <div className="overflow-x-auto overflow-y-auto max-h-[310px]">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="sticky top-0 z-10 border-b border-gray-100 bg-[#f8f7f4] text-[11px] font-bold uppercase tracking-wider text-[#8a8a8a] font-mono shadow-xs">
                    <tr>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Project Interest</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredInquiries.map((inq) => (
                      <tr
                        key={inq.id}
                        className="hover:bg-[#f8f7f4]/60 transition-colors"
                      >
                        <td className="p-4 font-semibold text-[#111111]">
                          <p className="text-sm font-bold text-[#111111]">
                            {inq.name || "Unknown"}
                          </p>
                          <p className="text-[11px] font-normal text-[#6b6b6b]">
                            {inq.phone || "No phone"}
                          </p>
                        </td>

                        <td className="p-4 text-[#6b6b6b]">
                          <span className="inline-flex items-center gap-1 font-medium">
                            <Building className="h-3.5 w-3.5 text-[#c59a5b]" />
                            {inq.projectInterest || "General Contact"}
                          </span>
                        </td>

                        <td className="p-4 text-[#6b6b6b] whitespace-nowrap">
                          {inq.createdAt
                            ? new Date(inq.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${
                              inq.status === "New"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : inq.status === "Contacted"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {inq.status || "New"}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <Link
                            to="/admin/inquiries"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#c59a5b] hover:underline"
                          >
                            Details
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#8a8a8a]">
                {searchQuery
                  ? "No inquiries matching search query."
                  : "No inquiries available."}
              </div>
            )}
          </div>
        </div>

        {/* RECENT BLOGS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-lg font-bold font-serif text-[#111111] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#c59a5b]" />
                Recent Articles
              </h5>
              <p className="text-xs text-[#6b6b6b]">
                Latest published content
              </p>
            </div>

            <Link
              to="/admin/blogs"
              className="text-xs font-bold text-[#c59a5b] hover:underline flex items-center gap-1 font-mono"
            >
              <span>Manage</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center gap-3.5 rounded-2xl border border-gray-200/80 bg-white p-3.5 hover:border-[#c59a5b]/40 transition-all group shadow-xs"
                >
                  <img
                    src={blog.coverImage}
                    alt={blog.title || "Blog"}
                    className="h-16 w-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#a2793f] uppercase tracking-wider font-mono truncate">
                        {blog.slug || "Article"}
                      </span>
                    </div>

                    <h5 className="text-xs !font-bold text-[#111111] truncate mt-1 group-hover:text-[#c59a5b] transition-colors">
                      {blog.title || "Untitled Article"}
                    </h5>

                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      {blog.keywords?.length > 0 ? (
                        blog.keywords.map((keyword, index) => (
                          <span
                            key={`${blog.id}-keyword-${index}`}
                            className="text-[9px] !font-semibold px-1.5 py-0.5 rounded bg-[#f5e4cf] text-[#a2793f] uppercase tracking-wide"
                          >
                            {keyword}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                          General
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-xs text-[#8a8a8a]">
                No articles available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}