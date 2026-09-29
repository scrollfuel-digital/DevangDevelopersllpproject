import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from "react";
import adminService from "../services/adminService";

const AdminDataContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [blogsLoaded, setBlogsLoaded] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsError, setBlogsError] = useState(null);

  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoaded, setInquiriesLoaded] = useState(false);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiriesError, setInquiriesError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const blogsPromiseRef = useRef(null);
  const inquiriesPromiseRef = useRef(null);

  // ============================================================
  // FETCH BLOGS (DEDUPLICATED & CACHED IN-MEMORY)
  // ============================================================
  const fetchBlogs = useCallback(async (force = false) => {
    if (blogsLoaded && !force) {
      return blogs;
    }

    if (blogsPromiseRef.current) {
      return blogsPromiseRef.current;
    }

    setBlogsLoading(true);
    setBlogsError(null);

    blogsPromiseRef.current = adminService
      .getBlogs()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setBlogs(list);
        setBlogsLoaded(true);
        setBlogsLoading(false);
        setBlogsError(null);
        blogsPromiseRef.current = null;
        return list;
      })
      .catch((err) => {
        setBlogsLoading(false);
        setBlogsError(err?.message || "Failed to load blog articles");
        blogsPromiseRef.current = null;
        throw err;
      });

    return blogsPromiseRef.current;
  }, [blogsLoaded, blogs]);

  // ============================================================
  // FETCH INQUIRIES (DEDUPLICATED & CACHED IN-MEMORY)
  // ============================================================
  const fetchInquiries = useCallback(async (force = false) => {
    if (inquiriesLoaded && !force) {
      return inquiries;
    }

    if (inquiriesPromiseRef.current) {
      return inquiriesPromiseRef.current;
    }

    setInquiriesLoading(true);
    setInquiriesError(null);

    inquiriesPromiseRef.current = adminService
      .getInquiries()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setInquiries(list);
        setInquiriesLoaded(true);
        setInquiriesLoading(false);
        setInquiriesError(null);
        inquiriesPromiseRef.current = null;
        return list;
      })
      .catch((err) => {
        setInquiriesLoading(false);
        setInquiriesError(err?.message || "Failed to load client inquiries");
        inquiriesPromiseRef.current = null;
        throw err;
      });

    return inquiriesPromiseRef.current;
  }, [inquiriesLoaded, inquiries]);

  // ============================================================
  // BLOG MUTATIONS (MUTATES ONLY BLOGS CACHE)
  // ============================================================
  const createBlog = useCallback(async (blogData, imageFile) => {
    const newBlog = await adminService.createBlog(blogData, imageFile);
    await fetchBlogs(true);
    return newBlog;
  }, [fetchBlogs]);

  const updateBlog = useCallback(async (id, blogData, imageFile) => {
    const updated = await adminService.updateBlog(id, blogData, imageFile);
    await fetchBlogs(true);
    return updated;
  }, [fetchBlogs]);

  const deleteBlog = useCallback(async (id) => {
    await adminService.deleteBlog(id);
    await fetchBlogs(true);
  }, [fetchBlogs]);

  const toggleBlogStatus = useCallback(async (id) => {
    await adminService.toggleBlogStatus(id);
    await fetchBlogs(true);
  }, [fetchBlogs]);

  // ============================================================
  // INQUIRY MUTATIONS (MUTATES ONLY INQUIRIES CACHE)
  // ============================================================
  const updateInquiryStatus = useCallback(async (id, status, notes) => {
    const updated = await adminService.updateInquiryStatus(id, status, notes);
    await fetchInquiries(true);
    return updated;
  }, [fetchInquiries]);

  const deleteInquiry = useCallback(async (id) => {
    await adminService.deleteInquiry(id);
    await fetchInquiries(true);
  }, [fetchInquiries]);

  // ============================================================
  // COMPUTED COUNTS
  // ============================================================
  const unreadInquiriesCount = useMemo(() => {
    return inquiries.filter((i) => i.status === "New" || !i.isSeen).length;
  }, [inquiries]);

  const blogsCount = useMemo(() => {
    return blogs.length;
  }, [blogs]);

  const value = useMemo(
    () => ({
      blogs,
      blogsLoaded,
      blogsLoading,
      blogsError,
      fetchBlogs,
      createBlog,
      updateBlog,
      deleteBlog,
      toggleBlogStatus,

      inquiries,
      inquiriesLoaded,
      inquiriesLoading,
      inquiriesError,
      fetchInquiries,
      updateInquiryStatus,
      deleteInquiry,

      unreadInquiriesCount,
      blogsCount,

      searchQuery,
      setSearchQuery,
    }),
    [
      blogs,
      blogsLoaded,
      blogsLoading,
      blogsError,
      fetchBlogs,
      createBlog,
      updateBlog,
      deleteBlog,
      toggleBlogStatus,
      inquiries,
      inquiriesLoaded,
      inquiriesLoading,
      inquiriesError,
      fetchInquiries,
      updateInquiryStatus,
      deleteInquiry,
      unreadInquiriesCount,
      blogsCount,
      searchQuery,
    ]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;

};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminProvider");
  }
  return context;
};

export default AdminDataContext;
