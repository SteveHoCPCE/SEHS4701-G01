// src/api/authService.js
import api from "./axiosInstance";

export const authService = {
  register: (userData) => {
    return api.post("/api/auth/register", userData);
  },

  login: (credentials) => {
    return api.post("/api/auth/login", credentials);
  },

  // Optional: verify email
  verifyEmail: (data) => {
    return api.post("/api/auth/verify-email", data);
  },
};
