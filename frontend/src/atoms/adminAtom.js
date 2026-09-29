import "../utils/recoilPolyfill";
import { atom } from "recoil";
import adminService from "../services/adminService";

// 1. Auth Recoil Atom
export const adminAuthState = atom({
  key: "adminAuthState",
  default: {
    user: adminService.getCurrentUser(),
    token: sessionStorage.getItem("admin_token") || null,
    isAuthenticated: adminService.isAuthenticated(),
    loading: false,
    error: null,
  },
});

// 2. Blogs Recoil Atom (in-memory state)
export const adminBlogsState = atom({
  key: "adminBlogsState",
  default: {
    list: [],
    localSearch: "",
    statusFilter: "All",
    categoryFilter: "All",
    selectedBlog: null,
    loading: false,
    error: null,
  },
});

// 3. Inquiries Recoil Atom (in-memory state)
export const adminInquiriesState = atom({
  key: "adminInquiriesState",
  default: {
    list: [],
    localSearch: "",
    statusFilter: "All",
    selectedInquiry: null,
    loading: false,
    error: null,
    pageNo: 0,
    size: 10,
    totalPages: 1,
  },
});
