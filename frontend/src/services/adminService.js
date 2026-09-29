// Admin Service: Bridges Backend APIs with Session Storage & In-Memory State

import { loginAdmin } from "../api/authApi";
import {
  fetchAllBlogs,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
} from "../api/blogApi";
import {
  getAvailableContacts,
  markContactAsSeen,
  deleteContact,
} from "../api/contactApi";

const SESSION_STORAGE_KEY = "admin_session";
const SECURITY_LOGS_KEY = "admin_security_attempts";

const SESSION_DURATION_MS = 4 * 60 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

// Cleanup routine: Purge obsolete admin keys from localStorage
const cleanupObsoleteLocalStorage = () => {
  try {
    const obsoleteKeys = [
      "token",
      "devang_auth_token_v1",
      "devang_admin_session_v1",
      "devang_admin_blogs",
      "devang_admin_blogs_v1",
      "devang_admin_inquiries",
      "devang_admin_inquiries_v1",
      "devang_admin_users_v1",
      "blogs",
      "inquiries",
      "admin_blogs",
      "admin_inquiries",
      "user",
      "current_user",
    ];

    obsoleteKeys.forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    // Ignore storage errors
  }
};

// Run cleanup immediately on module load
cleanupObsoleteLocalStorage();

// In-memory initial fallbacks
let IN_MEMORY_USERS = [
  {
    id: "user-1",
    name: "Devang Admin",
    email: "admin@gmail.com",
    password: "pass@123",
    role: "Administrator",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "user-2",
    name: "Devang Admin",
    email: "admin@devangdevelopers.com",
    password: "Admin@Devang2026!",
    role: "Administrator",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

let IN_MEMORY_BLOGS = [
  {
    id: "c56a4180-65aa-42ec-a945-5fd21dec0538",
    title: "Modern Interior Architecture Trends",
    slug: "modern-interior-architecture-trends",
    category: "Architecture",
    author: "Devang Editorial",
    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Exploring modern interior architecture trends in luxury residential projects.",
    content:
      "<p>Blog post content exploring modern architecture trends...</p>",
    tags: ["architecture", "design", "interior"],
    status: "Published",
    views: 1240,
    createdAt: "2026-09-25T10:00:00.000Z",
    updatedAt: "2026-09-25T10:00:00.000Z",
  },
  {
    id: "blog-2",
    title:
      "Key Factors to Consider Before Investing in Commercial Real Estate",
    slug: "commercial-real-estate-investment-factors",
    category: "Investment Guide",
    author: "Ritesh Mehta",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "A comprehensive guide on evaluating location, tenant profiles, lease structures, and cap rates for maximum ROI.",
    content:
      "Investing in commercial real estate offers steady cash flow and capital appreciation, provided you conduct rigorous due diligence.",
    tags: ["Commercial", "Investment", "ROI"],
    status: "Published",
    views: 890,
    createdAt: "2026-02-28T14:20:00.000Z",
    updatedAt: "2026-02-28T14:20:00.000Z",
  },
];

let IN_MEMORY_INQUIRIES = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    projectInterest: "Residential Blueprint Enquiry",
    message:
      "I would like to inquire about residential project blueprints.",
    status: "New",
    isSeen: false,
    notes: "",
    createdAt: "2026-09-25T11:00:00.000Z",
  },
  {
    id: "inq-102",
    name: "Priya Nair",
    email: "priya.nair@techcorp.io",
    phone: "+91 98200 11223",
    projectInterest: "Commercial Park Block B",
    message:
      "Looking for office space of around 4,500 sq. ft for our tech firm.",
    status: "Contacted",
    isSeen: true,
    notes: "Spoke on phone on March 24. Emailed brochure & floor plan.",
    createdAt: "2026-03-23T16:10:00.000Z",
  },
];

const sanitizeInput = (str) => {
  if (typeof str !== "string") return str;

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
};

const generateSecureToken = () => {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    const array = new Uint8Array(24);
    window.crypto.getRandomValues(array);

    return Array.from(
      array,
      (b) => b.toString(16).padStart(2, "0")
    ).join("");
  }

  return `sec_tok_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;
};

let inFlightBlogs = null;
let inFlightInquiries = null;

export const adminService = {
  sanitize: sanitizeInput,

  validatePasswordStrength: (password) => {
    if (!password || password.length < 8) {
      return {
        valid: false,
        message: "Password must be at least 8 characters long",
      };
    }

    return { valid: true };
  },

  checkLockoutStatus: (email) => {
    try {
      const logs = JSON.parse(
        sessionStorage.getItem(SECURITY_LOGS_KEY) || "{}"
      );

      const record = logs[email.toLowerCase()];

      if (!record) {
        return { isLocked: false };
      }

      if (record.attempts >= MAX_FAILED_ATTEMPTS) {
        const timePassed = Date.now() - record.lastAttempt;

        if (timePassed < LOCKOUT_DURATION_MS) {
          const remainingMinutes = Math.ceil(
            (LOCKOUT_DURATION_MS - timePassed) / (60 * 1000)
          );

          return {
            isLocked: true,
            remainingMinutes,
            message: `Security Lockout: Account temporarily locked for ${remainingMinutes} more minute(s).`,
          };
        } else {
          delete logs[email.toLowerCase()];

          sessionStorage.setItem(
            SECURITY_LOGS_KEY,
            JSON.stringify(logs)
          );
        }
      }

      return { isLocked: false };
    } catch (e) {
      return { isLocked: false };
    }
  },

  recordLoginAttempt: (email, isSuccess) => {
    try {
      const key = email.toLowerCase();

      const logs = JSON.parse(
        sessionStorage.getItem(SECURITY_LOGS_KEY) || "{}"
      );

      if (isSuccess) {
        delete logs[key];
      } else {
        const prev = logs[key] || {
          attempts: 0,
          lastAttempt: 0,
        };

        logs[key] = {
          attempts: prev.attempts + 1,
          lastAttempt: Date.now(),
        };
      }

      sessionStorage.setItem(
        SECURITY_LOGS_KEY,
        JSON.stringify(logs)
      );
    } catch (e) { }
  },

  getUsers: () => {
    return IN_MEMORY_USERS;
  },

  login: async (
    email,
    password,
    turnstileToken = "0.default_token"
  ) => {
    const cleanEmail = sanitizeInput(email).toLowerCase();

    const lockout =
      adminService.checkLockoutStatus(cleanEmail);

    if (lockout.isLocked) {
      return {
        success: false,
        message: lockout.message,
      };
    }

    try {
      const backendRes = await loginAdmin(
        cleanEmail,
        password,
        turnstileToken
      );

      const token =
        backendRes?.token ||
        backendRes?.jwtToken ||
        backendRes?.accessToken ||
        backendRes?.jwt ||
        backendRes?.data?.token;

      if (backendRes?.success && !token) {
        return {
          success: false,
          token: null,
          message:
            "Authentication token was not received. Please try again.",
        };
      }

      if (
        token &&
        typeof token === "string" &&
        token.trim() !== ""
      ) {
        adminService.recordLoginAttempt(
          cleanEmail,
          true
        );

        const session = {
          user: {
            id: "admin-api-user",
            name: "Devang Administrator",
            email: cleanEmail,
            role: "Administrator",
          },
          authToken: token,
          createdAt: Date.now(),
          expiresAt:
            Date.now() + SESSION_DURATION_MS,
        };

        sessionStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify(session)
        );

        sessionStorage.setItem(
          "admin_token",
          token
        );

        cleanupObsoleteLocalStorage();

        return {
          success: true,
          token,
          user: session.user,
        };
      }
    } catch (apiErr) {
      console.warn(
        "Backend auth API call notice:",
        apiErr
      );
    }

    const users = adminService.getUsers();

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail &&
        u.password === password
    );

    if (!user) {
      adminService.recordLoginAttempt(
        cleanEmail,
        false
      );

      return {
        success: false,
        token: null,
        message:
          "Invalid credentials. Please check your email and password.",
      };
    }

    adminService.recordLoginAttempt(
      cleanEmail,
      true
    );

    const token = generateSecureToken();

    const session = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      authToken: token,
      createdAt: Date.now(),
      expiresAt:
        Date.now() + SESSION_DURATION_MS,
    };

    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify(session)
    );

    sessionStorage.setItem(
      "admin_token",
      token
    );

    cleanupObsoleteLocalStorage();

    return {
      success: true,
      token,
      user: session.user,
    };
  },

  signup: (userData) => {
    const cleanName = sanitizeInput(
      userData.name
    );

    const cleanEmail = sanitizeInput(
      userData.email
    ).toLowerCase();

    const passVal =
      adminService.validatePasswordStrength(
        userData.password
      );

    if (!passVal.valid) {
      return {
        success: false,
        message: passVal.message,
      };
    }

    const users = adminService.getUsers();

    const existing = users.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail
    );

    if (existing) {
      return {
        success: false,
        message:
          "An account with this email is already registered.",
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: cleanName || "Admin User",
      email: cleanEmail,
      password: userData.password,
      role:
        sanitizeInput(userData.role) ||
        "Administrator",
      createdAt: new Date().toISOString(),
    };

    IN_MEMORY_USERS.push(newUser);

    return {
      success: true,
      message:
        "Registration successful. Please login with your credentials.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  },

  logout: () => {
    sessionStorage.removeItem(
      SESSION_STORAGE_KEY
    );

    sessionStorage.removeItem("admin_token");

    cleanupObsoleteLocalStorage();

    return true;
  },

  getCurrentUser: () => {
    try {
      const sessionData =
        sessionStorage.getItem(
          SESSION_STORAGE_KEY
        );

      if (!sessionData) return null;

      const session =
        JSON.parse(sessionData);

      if (
        !session.expiresAt ||
        Date.now() > session.expiresAt
      ) {
        sessionStorage.removeItem(
          SESSION_STORAGE_KEY
        );

        sessionStorage.removeItem(
          "admin_token"
        );

        return null;
      }

      return session.user;
    } catch (e) {
      return null;
    }
  },

  isAuthenticated: () => {
    const user =
      adminService.getCurrentUser();

    const token =
      sessionStorage.getItem("admin_token");

    return !!user && !!token;
  },

  // GET /api/blogs/fetch-all-blogs
  getBlogs: async (options = {}) => {
    if (inFlightBlogs) {
      return inFlightBlogs;
    }

    inFlightBlogs = (async () => {
      try {
        const rawRes =
          await fetchAllBlogs(options);

        const blogArray =
          Array.isArray(rawRes)
            ? rawRes
            : Array.isArray(rawRes?.blogs)
              ? rawRes.blogs
              : Array.isArray(rawRes?.content)
                ? rawRes.content
                : Array.isArray(rawRes?.data)
                  ? rawRes.data
                  : Array.isArray(
                    rawRes?.data?.blogs
                  )
                    ? rawRes.data.blogs
                    : Array.isArray(
                      rawRes?.data?.content
                    )
                      ? rawRes.data.content
                      : [];

        if (blogArray.length > 0) {
          const mapped = blogArray.map((b) => ({
            id:
              b.id ||
              b._id ||
              `blog-${Math.random()
                .toString(36)
                .substr(2, 9)}`,

            title:
              b.title || "Untitled Article",

            slug:
              b.slug ||
              (b.title
                ? b.title
                  .toLowerCase()
                  .replace(
                    /[^a-z0-9]+/g,
                    "-"
                  )
                : "article"),

            keywords:
              Array.isArray(b.keywords)
                ? b.keywords
                : typeof b.keywords ===
                  "string"
                  ? b.keywords
                    .split(",")
                    .map((k) =>
                      k.trim()
                    )
                  : [],

            category:
              b.category ||
              b.keywords?.[0] ||
              "Real Estate",

            author:
              b.author ||
              "Devang Editorial",

            coverImage:
              b.coverImage ||
              b.imageUrl ||
              b.image ||
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",

            excerpt:
              b.excerpt ||
              (b.content
                ? b.content
                  .replace(
                    /<[^>]*>?/gm,
                    ""
                  )
                  .substring(0, 150) +
                "..."
                : ""),

            content: b.content || "",

            tags:
              Array.isArray(b.tags)
                ? b.tags
                : Array.isArray(b.keywords)
                  ? b.keywords
                  : typeof b.keywords ===
                    "string"
                    ? b.keywords
                      .split(",")
                      .map((k) =>
                        k.trim()
                      )
                    : [],

            status:
              b.status || "Published",

            views:
              b.views ||
              b.viewsCount ||
              0,

            createdAt:
              b.createdAt ||
              new Date().toISOString(),

            updatedAt:
              b.updatedAt ||
              new Date().toISOString(),
          }));

          IN_MEMORY_BLOGS = mapped;

          return mapped;
        }
      } catch (err) {
        if (
          err.name === "CanceledError" ||
          err.name === "AbortError"
        ) {
          throw err;
        }

        if (
          err.response?.status === 401
        ) {
          throw err;
        }

        console.warn(
          "Backend blog API notice:",
          err?.message || err
        );
      }

      return IN_MEMORY_BLOGS;
    })().finally(() => {
      inFlightBlogs = null;
    });

    return inFlightBlogs;
  },

  // POST /api/blogs/create-blog
  createBlog: async (
    blogData,
    imageFile = null,
    options = {}
  ) => {
    const blogDto = {
      title: sanitizeInput(
        blogData.title
      ),

      slug:
        sanitizeInput(blogData.slug) ||
        blogData.title
          ?.toLowerCase()
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /(^-|-$)+/g,
            ""),

      content:
        blogData.content ||
        blogData.excerpt ||
        "",

      keywords:
        Array.isArray(blogData.tags)
          ? blogData.tags
          : typeof blogData.tags ===
            "string"
            ? blogData.tags
              .split(",")
              .map((t) => t.trim())
            : ["RealEstate"],
    };

    try {
      const createdApiBlog =
        await createBlogApi(
          blogDto,
          imageFile,
          options
        );

      if (createdApiBlog?.id) {
        return createdApiBlog;
      }
    } catch (err) {
      if (
        err.response?.status === 401
      ) {
        throw err;
      }

      console.warn(
        "Backend blog create API fallback",
        err
      );
    }

    const currentUser =
      adminService.getCurrentUser();

    const newBlog = {
      id: `blog-${Date.now()}`,
      title:
        blogDto.title ||
        "Untitled Blog",

      slug:
        blogDto.slug ||
        `blog-${Date.now()}`,

      category:
        blogData.category ||
        "Real Estate",

      author:
        blogData.author ||
        currentUser?.name ||
        "Devang Admin",

      coverImage:
        blogData.coverImage ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",

      excerpt:
        sanitizeInput(
          blogData.excerpt
        ) || "",

      content:
        blogData.content || "",

      tags: blogDto.keywords,

      status:
        sanitizeInput(
          blogData.status
        ) || "Published",

      views: 0,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    IN_MEMORY_BLOGS = [
      newBlog,
      ...IN_MEMORY_BLOGS,
    ];

    return newBlog;
  },

  // PATCH /api/blogs/update-blog/{id}
  updateBlog: async (
    id,
    updateData,
    imageFile = null,
    options = {}
  ) => {
    const blogDto = {
      title: sanitizeInput(
        updateData.title
      ),

      slug: sanitizeInput(
        updateData.slug
      ),

      content:
        updateData.content ||
        updateData.excerpt,

      keywords:
        Array.isArray(updateData.tags)
          ? updateData.tags
          : typeof updateData.tags ===
            "string"
            ? updateData.tags
              .split(",")
              .map((t) => t.trim())
            : [],
    };

    try {
      const updatedApiBlog =
        await updateBlogApi(
          id,
          blogDto,
          imageFile,
          options
        );

      if (updatedApiBlog?.id) {
        return updatedApiBlog;
      }
    } catch (err) {
      if (
        err.response?.status === 401
      ) {
        throw err;
      }

      console.warn(
        "Backend blog update API fallback",
        err
      );
    }

    const index =
      IN_MEMORY_BLOGS.findIndex(
        (b) => b.id === id
      );

    if (index === -1) return null;

    const existing =
      IN_MEMORY_BLOGS[index];

    const updated = {
      ...existing,
      ...updateData,
      title:
        sanitizeInput(
          updateData.title
        ) || existing.title,

      slug:
        sanitizeInput(
          updateData.slug
        ) || existing.slug,

      updatedAt:
        new Date().toISOString(),
    };

    IN_MEMORY_BLOGS[index] =
      updated;

    return updated;
  },

  // DELETE /api/blogs/remove-blog/{id}
  deleteBlog: async (
    id,
    options = {}
  ) => {
    try {
      await deleteBlogApi(
        id,
        options
      );
    } catch (err) {
      if (
        err.response?.status === 401
      ) {
        throw err;
      }

      console.warn(
        "Backend blog delete API fallback",
        err
      );
    }

    IN_MEMORY_BLOGS =
      IN_MEMORY_BLOGS.filter(
        (b) => b.id !== id
      );

    return true;
  },

  toggleBlogStatus: async (
    id,
    options = {}
  ) => {
    const blog =
      IN_MEMORY_BLOGS.find(
        (b) => b.id === id
      );

    if (!blog) return null;

    const newStatus =
      blog.status === "Published"
        ? "Draft"
        : "Published";

    return adminService.updateBlog(
      id,
      { status: newStatus },
      null,
      options
    );
  },

  // GET /api/contact/available-contacts
  getInquiries: async (
    options = {}
  ) => {
    if (inFlightInquiries) {
      return inFlightInquiries;
    }

    inFlightInquiries =
      (async () => {
        try {
          const rawRes =
            await getAvailableContacts(
              0,
              10,
              "createdAt",
              "desc",
              options
            );

          const inquiryArray =
            Array.isArray(rawRes)
              ? rawRes
              : Array.isArray(
                rawRes?.content
              )
                ? rawRes.content
                : Array.isArray(
                  rawRes?.data
                )
                  ? rawRes.data
                  : Array.isArray(
                    rawRes?.contacts
                  )
                    ? rawRes.contacts
                    : Array.isArray(
                      rawRes?.items
                    )
                      ? rawRes.items
                      : Array.isArray(
                        rawRes?.data?.content
                      )
                        ? rawRes.data.content
                        : Array.isArray(
                          rawRes?.data?.contacts
                        )
                          ? rawRes.data.contacts
                          : [];

          if (
            inquiryArray.length > 0
          ) {
            const mapped =
              inquiryArray.map((c) => ({
                id:
                  c.id ||
                  c._id ||
                  `inq-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,

                name:
                  c.name ||
                  c.fullName ||
                  c.clientName ||
                  "Anonymous Client",

                email:
                  c.email ||
                  "No email",

                phone:
                  c.phoneNo ||
                  c.phone ||
                  c.mobile ||
                  "No phone",

                projectInterest:
                  c.projectInterest ||
                  c.project ||
                  (c.formType ===
                    "ENQUIRY"
                    ? "Property Enquiry"
                    : "General Contact"),

                message:
                  c.message ||
                  c.comments ||
                  "",

                status:
                  c.status ||
                  (c.isSeen
                    ? "Resolved"
                    : "New"),

                isSeen:
                  c.isSeen ??
                  (c.status ===
                    "Resolved" ||
                    c.status ===
                    "Contacted"),

                notes:
                  c.notes || "",

                createdAt:
                  c.createdAt ||
                  new Date().toISOString(),
              }));

            IN_MEMORY_INQUIRIES =
              mapped;

            return mapped;
          }
        } catch (err) {
          if (
            err.name ===
            "CanceledError" ||
            err.name ===
            "AbortError"
          ) {
            throw err;
          }

          if (
            err.response?.status ===
            401
          ) {
            throw err;
          }

          console.warn(
            "Backend contact API notice:",
            err?.message || err
          );
        }

        return IN_MEMORY_INQUIRIES;
      })().finally(() => {
        inFlightInquiries = null;
      });

    return inFlightInquiries;
  },

  // PATCH /api/contact/seen-contact/{id}
  updateInquiryStatus: async (
    id,
    status,
    notes = null,
    options = {}
  ) => {
    try {
      await markContactAsSeen(
        id,
        options
      );
    } catch (err) {
      if (
        err.response?.status === 401
      ) {
        throw err;
      }

      if (
        err.response?.status === 403 ||
        err.status === 403
      ) {
        console.warn(
          "403 Forbidden on seen-contact API. Updating in-memory status."
        );
      } else {
        console.warn(
          "Backend mark contact seen API fallback",
          err
        );
      }
    }

    const index =
      IN_MEMORY_INQUIRIES.findIndex(
        (i) => i.id === id
      );

    if (index === -1) return null;

    IN_MEMORY_INQUIRIES[index].status =
      sanitizeInput(status);

    IN_MEMORY_INQUIRIES[index].isSeen =
      true;

    if (notes !== null) {
      IN_MEMORY_INQUIRIES[index].notes =
        sanitizeInput(notes);
    }

    return IN_MEMORY_INQUIRIES[index];
  },

  // POST /api/contact/connect-request
  // IMPORTANT:
  // This function NO LONGER calls the backend.
  // The backend request is handled only by useContact().
  addInquiry: async (inquiryData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,

      name:
        sanitizeInput(
          inquiryData.name
        ) || "Anonymous",

      email:
        sanitizeInput(
          inquiryData.email
        ) || "",

      phone:
        sanitizeInput(
          inquiryData.phone
        ) ||
        sanitizeInput(
          inquiryData.phoneNo
        ) ||
        "",

      projectInterest:
        sanitizeInput(
          inquiryData.projectInterest
        ) || "General Inquiry",

      message:
        sanitizeInput(
          inquiryData.message
        ) || "",

      status: "New",

      isSeen: false,

      notes: "",

      createdAt:
        new Date().toISOString(),
    };

    IN_MEMORY_INQUIRIES = [
      newInquiry,
      ...IN_MEMORY_INQUIRIES,
    ];

    return newInquiry;
  },

  // DELETE /api/contact/remove-contact/{id}
  deleteInquiry: async (
    id,
    options = {}
  ) => {
    try {
      await deleteContact(
        id,
        options
      );
    } catch (err) {
      if (
        err.response?.status === 401
      ) {
        throw err;
      }

      if (
        err.response?.status === 403 ||
        err.status === 403
      ) {
        console.warn(
          "403 Forbidden on remove-contact API. Removing from in-memory list."
        );
      } else {
        console.warn(
          "Backend delete contact API fallback",
          err
        );
      }
    }

    IN_MEMORY_INQUIRIES =
      IN_MEMORY_INQUIRIES.filter(
        (i) => i.id !== id
      );

    return true;
  },
};

export default adminService;