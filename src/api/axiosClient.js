import axios from "axios";

// Use env variable with correct name
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

console.log("API Base URL:", BASE_URL); // Debug log

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 
    "Content-Type": "application/json" 
  },
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✓ Token attached to request"); // Debug log
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("✓ Response received:", response.status);
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      console.error("❌ CORS Error - Backend not responding or CORS not configured");
      console.error("   Make sure backend is running on http://localhost:8081");
      console.error("   Backend must allow CORS for http://localhost:5174");
    } else {
      console.error("Response error:", error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default api;
