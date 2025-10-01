import axios from "axios";

const API = axios.create({
  baseURL: "https://fsd-python-o12d.onrender.com/", // your deployed backend
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // keep commented unless using session cookies
});

export default API;
