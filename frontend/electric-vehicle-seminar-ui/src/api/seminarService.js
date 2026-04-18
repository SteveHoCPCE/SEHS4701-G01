// src/api/seminarService.js
import api from "./axiosInstance";

export const seminarService = {
  /**
   * Get list of upcoming seminars
   */
  getUpcomingSeminars: async () => {
    return api.get("/api/seminars/upcoming");
  },

  /**
   * Register for a seminar
   * @param {number} seminarId
   * @param {object} data { seatsBooked: 1 or 2 }
   */
  registerForSeminar: async (seminarId, data) => {
    return api.post(`/api/seminars/${seminarId}/register`, data);
  },

  /**
   * Get user's registration history
   */
  getMyRegistrations: async () => {
    return api.get("/api/registrations/history");
  },

  /**
   * Cancel a registration
   */
  cancelRegistration: async (registrationId) => {
    return api.put(`/api/registrations/${registrationId}/cancel`);
  },

  /**
   * Get single seminar by ID (if needed later)
   */
  getSeminarById: async (seminarId) => {
    return api.get(`/api/seminars/${seminarId}`);
  },
};
