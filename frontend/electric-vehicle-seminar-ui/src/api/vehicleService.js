import api from "./axiosInstance";

export const vehicleService = {
  getVehicles: async () => api.get("/api/vehicles"),
  getVehicleById: async (vehicleId) => api.get(`/api/vehicles/${vehicleId}`),
};

