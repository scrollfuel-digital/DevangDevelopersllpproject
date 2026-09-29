import axios from "axios";

// ============================================
// API BASE URL NORMALIZATION (No duplicate /api/api)
// ============================================

const rawBaseURL =
  import.meta.env.VITE_API_URL ||
  "https://devangdevelopersllpbackend.onrender.com/api";

const cleanBaseURL = rawBaseURL.endsWith("/")
  ? rawBaseURL.slice(0, -1)
  : rawBaseURL;

const baseURL = cleanBaseURL.endsWith("/api")
  ? cleanBaseURL
  : `${cleanBaseURL}/api`;

// ============================================
// IN-MEMORY TOKEN MANAGEMENT (NO LOCAL/SESSION STORAGE)
// ============================================

let memoryAuthToken = null;

export const setAxiosAuthToken = (token) => {
  memoryAuthToken = token;
};

export const getAxiosAuthToken = () => memoryAuthToken;

// ============================================
// AXIOS CLIENT INSTANCE
// ============================================

const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});


// ============================================
// REQUEST INTERCEPTOR: ATTACH BEARER TOKEN IF PRESENT
// ============================================

axiosClient.interceptors.request.use(
  (config) => {
    if (memoryAuthToken && typeof memoryAuthToken === "string" && memoryAuthToken.trim() !== "") {
      config.headers.Authorization = `Bearer ${memoryAuthToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR: HANDLE 401 & 403
// ============================================

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn("🔐 401 Unauthorized: Session invalid or missing credentials.");
    } else if (status === 403) {
      console.warn("⛔ 403 Forbidden: Authenticated request lacking permission.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;