import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import adminService from "../../services/adminService";
import { useAdminData } from "../../context/AdminDataContext";

export default function AdminBlogs() {
  const {
    blogs,
    blogsLoading,
    blogsError,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
    searchQuery: globalSearch,
  } = useAdminData();

  const [localSearch, setLocalSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Real Estate",
    author: "Devang Admin",
    coverImage: "",
    excerpt: "",
    content: "",
    tags: "",
    status: "Published",
  });

  const [imageFile, setImageFile] = useState(null);

  // Delete Confirm State
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const openCreateModal = () => {
    const currentUser = adminService.getCurrentUser();
    setEditingBlog(null);
    setImageFile(null);
    setFormData({
      title: "",
      slug: "",
      category: "Real Estate",
      author: currentUser?.name || "Devang Admin",
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      excerpt: "",
      content: "",
      tags: "Luxury, Architecture",
      status: "Published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setImageFile(null);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "Real Estate",
      author: blog.author || "Devang Admin",
      coverImage: blog.coverImage || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      status: blog.status || "Published",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingBlog) {
      await updateBlog(editingBlog.id, formData, imageFile);
    } else {
      await createBlog(formData, imageFile);
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = async (id) => {
    await toggleBlogStatus(id);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteBlog(deleteId);
      setDeleteId(null);
    }
  };

  const categories = ["All", ...new Set(blogs.map((b) => b.category).filter(Boolean))];
  const activeSearch = (localSearch || globalSearch || "").toLowerCase();

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(activeSearch) ||
      blog.category.toLowerCase().includes(activeSearch) ||
      blog.author.toLowerCase().includes(activeSearch);

    const matchesStatus = statusFilter === "All" || blog.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || blog.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-[#111111] font-sans">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <h3 className="text-2xl font-bold font-serif text-[#111111] flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#c59a5b]" />
            Blogs Management
          </h3>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-2xl bg-[#c59a5b] px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#a2793f] transition-all shadow-lg shadow-[#c59a5b]/20 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Blog</span>
        </button>
      </div>

      {/* Error Alert */}
      {blogsError && (
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs text-red-700">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <div>
            <p className="font-bold">API Connection Error</p>
            <p>{blogsError}</p>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by title, author, or keyword..."
            className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-[#f8f7f4] p-1">
            {["All", "Published", "Draft"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? "bg-[#c59a5b] text-white font-bold"
                    : "text-[#6b6b6b] hover:text-[#111111]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-[#f8f7f4] px-3 py-2 text-xs font-medium text-[#111111] focus:border-[#c59a5b] focus:bg-white focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Cards Grid */}
      {blogsLoading && blogs.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
          <div className="text-sm font-medium text-[#8a8a8a] animate-pulse">
            Loading articles...
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[560px] pr-1 pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-[300px]">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col rounded-2xl border border-gray-200/80 bg-white overflow-hidden hover:border-[#c59a5b]/50 transition-all shadow-sm group"
              >
                {/* Image Preview */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={blog.coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-5 space-y-3">
                  <h4 className="text-base font-bold font-serif text-[#111111] line-clamp-2 leading-snug group-hover:text-[#c59a5b] transition-colors">
                    {blog.title}
                  </h4>
                  <p className="!text-lg text-[#6b6b6b] line-clamp-2 leading-relaxed">
                    {blog.excerpt || "No excerpt provided."}
                  </p>

                  {/* Tags */}
                  {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-[#f8f7f4] border border-gray-100 px-2 py-0.5 text-[10px] text-[#6b6b6b]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta details & Actions */}
                  <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-[#6b6b6b]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(blog)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-[#f8f7f4] text-[#111111] hover:bg-[#c59a5b] hover:text-white transition-all"
                        title="Edit Blog"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(blog.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                        title="Delete Blog"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!blogsLoading && !blogsError && filteredBlogs.length === 0 && (
        <div className="rounded-2xl border border-gray-200/80 bg-white p-12 text-center shadow-xs">
          <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-base font-bold font-serif text-[#111111]">No articles found</h3>
          <p className="text-xs text-[#6b6b6b] mt-1">
            Try adjusting your search criteria or create a new blog post.
          </p>
        </div>
      )}


      {/* CREATE / EDIT BLOG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-[#c59a5b]/30 bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold font-serif text-[#111111] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#c59a5b]" />
                {editingBlog ? "Edit Article" : "Create New Article"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-[#111111]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-[#111111]">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Modern Interior Architecture Trends"
                    className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#111111]">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Architecture"
                    className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#111111]">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#111111]">Publishing Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                  >
                    <option value="Published">Published (Public)</option>
                    <option value="Draft">Draft (Private)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#111111]">Upload Banner Image (File)</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-2 text-xs text-[#111111] focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#111111]">Cover Image URL</label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#111111]">Short Excerpt</label>
                <textarea
                  rows="2"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary..."
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#111111]">Article Content (HTML / Markdown)</label>
                <textarea
                  rows="6"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full article content..."
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#111111]">Keywords / Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="architecture, design, interior"
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-gray-200 bg-[#f8f7f4] px-5 py-2.5 font-bold text-[#6b6b6b] hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#c59a5b] px-6 py-2.5 font-bold text-white hover:bg-[#a2793f] transition-all shadow-lg"
                >
                  {editingBlog ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#111111]">Delete Blog Article</h3>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Are you sure you want to permanently delete this article from backend database? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-xl border border-gray-200 bg-[#f8f7f4] px-4 py-2 text-xs font-bold text-[#6b6b6b] hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-700 transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
