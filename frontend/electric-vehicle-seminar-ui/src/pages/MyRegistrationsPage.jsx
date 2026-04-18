// src/pages/MyRegistrationsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { seminarService } from "../api/seminarService";

export default function MyRegistrationsPage() {
  const { user, cancelRegistration: cancelFromContext } = useAuth();
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch registrations from backend
  useEffect(() => {
    const fetchMyRegistrations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await seminarService.getMyRegistrations();
        setRegistrations(response.data || []);
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
        setError("Failed to load your registrations.");
        setRegistrations([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchMyRegistrations();
  }, [user]);

  const handleCancel = async (registrationId) => {
    if (!registrationId) return;
    if (!window.confirm("Are you sure you want to cancel this registration?"))
      return;

    try {
      await seminarService.cancelRegistration(registrationId);

      // Update UI immediately
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === registrationId ? { ...reg, status: "Cancelled" } : reg,
        ),
      );

      // Also update context if needed
      if (cancelFromContext) cancelFromContext(registrationId);

      alert("Registration cancelled successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel registration.");
    }
  };

  // Filter and search
  const filteredRegistrations = registrations
    .filter((reg) => {
      const matchesSearch =
        (reg.seminar || reg.vehicleModelNumber || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (reg.location || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || reg.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
    );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">
            Please log in to view your registrations.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-3 rounded-xl"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Registrations</h1>
            <p className="text-gray-600 mt-2">Manage your seminar bookings</p>
          </div>
          <button
            onClick={() => navigate("/seminar-register")}
            className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition"
          >
            Register for New Seminar
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search seminars or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Waitlisted">Waitlisted</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-lg">
            Loading your registrations...
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <div className="text-6xl mb-6">📅</div>
            <h3 className="text-2xl font-semibold mb-3">
              No Registrations Found
            </h3>
            <p className="text-gray-600 mb-8">
              You haven't registered for any seminars yet.
            </p>
            <button
              onClick={() => navigate("/seminar-register")}
              className="bg-black text-white px-8 py-3 rounded-2xl hover:bg-gray-900"
            >
              Browse Available Seminars
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl">
                      {reg.seminar || reg.vehicleModelNumber}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {new Date(
                        reg.date || reg.seminarDate,
                      ).toLocaleDateString()}{" "}
                      • {reg.time || ""}
                    </p>
                    <p className="text-gray-600">{reg.location}</p>
                  </div>

                  <div>
                    <span
                      className={`inline-block px-5 py-2 rounded-full text-sm font-medium ${
                        reg.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : reg.status === "Waitlisted"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Seats:</span>
                    <span className="ml-2 font-semibold">{reg.seats || 1}</span>
                  </div>

                  {reg.status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancel(reg.id)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Cancel Registration
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
