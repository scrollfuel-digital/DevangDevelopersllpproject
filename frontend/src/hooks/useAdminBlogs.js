import { useAdminData } from "../context/AdminDataContext";

export const useAdminBlogs = () => {
  const {
    blogs,
    blogsLoading,
    blogsError,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
  } = useAdminData();

  return {
    blogs,
    loading: blogsLoading,
    error: blogsError,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
  };
};

export default useAdminBlogs;
