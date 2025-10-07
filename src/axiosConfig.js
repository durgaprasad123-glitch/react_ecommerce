import axios from "axios";

// Base axios instance for deployed backend
const API = axios.create({
  baseURL: "https://fsd-python-o12d.onrender.com/api/", // ✅ backend deployed URL with /api
  headers: { "Content-Type": "application/json" },
});

// Optional: Add token interceptor if using token-based auth
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;
