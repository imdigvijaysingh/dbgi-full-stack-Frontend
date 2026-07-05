import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.DEV ? "http://localhost:5000/api/v1" : "/api/v1",
  baseURL: import.meta.env.DEV ? 'https://dbgi-full-stack-backend.onrender.com/api/v1' : '/api/v1',
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cms_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("cms_token");
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminUsername");

      // Prevent redirect loop if already on login page
      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
