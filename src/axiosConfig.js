import axios from "axios";

// Base axios instance
const API = axios.create({
  baseURL: "https://fsd-python-o12d.onrender.com/api/", // deployed backend
  headers: { "Content-Type": "application/json" },
});

// If you need token auth, add an interceptor
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token"); // store token on login
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export default API;
