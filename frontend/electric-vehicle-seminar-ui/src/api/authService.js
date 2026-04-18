// src/api/authService.js
import api from "./axiosInstance";

export const authService = {
  // Register new user
  register: (userData) => {
    return api.post("/api/auth/register", userData);
  },

  // Verify email with OTP
  verifyEmail: (data) => {
    return api.post("/api/auth/verify-email", data);
  },

  // Login user
  login: (credentials) => {
    return api.post("/api/auth/login", credentials);
  },

  // Get current user profile (protected)
  getProfile: () => {
    return api.get("/api/users/profile");
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
