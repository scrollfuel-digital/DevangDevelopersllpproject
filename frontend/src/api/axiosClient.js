import axios from "axios";

// Read backend API base URL from environment variables
const rawBaseURL = import.meta.env.VITE_API_URL || "https://devangdevelopersllpbackend.onrender.com/api";
const cleanBaseURL = rawBaseURL.endsWith("/") ? rawBaseURL.slice(0, -1) : rawBaseURL;
const baseURL = cleanBaseURL.endsWith("/api") ? cleanBaseURL : `${cleanBaseURL}/api`;

const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for consistent error propagation
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;
