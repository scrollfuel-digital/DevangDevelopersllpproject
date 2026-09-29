import axiosClient from "./axiosClient";

/**
 * 2. Fetch All Blogs
 * GET /blogs/fetch-all-blogs
 */
export const fetchAllBlogs = async (options = {}) => {
  const response = await axiosClient.get("/blogs/fetch-all-blogs", options);
  return response.data;
};

/**
 * 3. Fetch Single Blog by ID
 * GET /blogs/fetch-blog/{id}
 */
export const fetchBlogById = async (id, options = {}) => {
  const response = await axiosClient.get(`/blogs/fetch-blog/${id}`, options);
  return response.data;
};

/**
 * 4. Create Blog (Multipart / Form-Data)
 * POST /blogs/create-blog
 * Parts: blog (JSON blob), image (File)
 */
export const createBlogApi = async (blogDto, imageFile, options = {}) => {
  const formData = new FormData();

  const blogBlob = new Blob([JSON.stringify(blogDto)], {
    type: "application/json",
  });
  formData.append("blog", blogBlob);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const response = await axiosClient.post("/blogs/create-blog", formData, {
    ...options,
    headers: {
      "Content-Type": "multipart/form-data",
      ...options.headers,
    },
  });

  return response.data;
};

/**
 * 5. Update Blog by ID (Multipart / Form-Data)
 * PATCH /blogs/update-blog/{id}
 * Parts: blog (JSON blob), image (File, optional)
 */
export const updateBlogApi = async (id, blogDto, imageFile = null, options = {}) => {
  const formData = new FormData();

  const blogBlob = new Blob([JSON.stringify(blogDto)], {
    type: "application/json",
  });
  formData.append("blog", blogBlob);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const response = await axiosClient.patch(`/blogs/update-blog/${id}`, formData, {
    ...options,
    headers: {
      "Content-Type": "multipart/form-data",
      ...options.headers,
    },
  });

  return response.data;
};

/**
 * 6. Delete Blog by ID
 * DELETE /blogs/remove-blog/{id}
 */
export const deleteBlogApi = async (id, options = {}) => {
  const response = await axiosClient.delete(`/blogs/remove-blog/${id}`, options);
  return response.data;
};

/**
 * 7. Search Blogs by Keyword
 * GET /blogs/search-response/{keyword}
 */
export const searchBlogsApi = async (keyword, options = {}) => {
  const response = await axiosClient.get(`/blogs/search-response/${encodeURIComponent(keyword)}`, options);
  return response.data;
};

export default {
  fetchAllBlogs,
  fetchBlogById,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  searchBlogsApi,
};
