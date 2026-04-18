// src/api/customerService.js
import api from "./axiosInstance";

export const customerService = {
  // Example: Get user profile (you can also use authService.getProfile)
  getCustomerProfile: () => {
    return api.get("/api/users/profile");
  },
};
