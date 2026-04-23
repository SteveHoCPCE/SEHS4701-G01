// src/pages/MyRegistrationsPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { seminarService } from "../api/seminarService";

export default function MyRegistrationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch registrations from Backend Database
  const fetchRegistrations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await seminarService.getMyRegistrations();
      setRegistrations(response.data || []);
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [user]);

  // Filter registrations
  const filteredRegistrations = registrations
    .filter((reg) => {
      const matchesSearch = (reg.seminar || reg.vehicleModelNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || reg.status === statusFilter;

      let matchesDate = true;
      if (dateFilter) {
        const regDate = new Date(reg.seminarDate || reg.date || reg.createdAt)
          .toISOString()
          .split("T")[0];
        matchesDate = regDate === dateFilter;
      }

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date || b.registeredAt) -
        new Date(a.createdAt || a.date || a.registeredAt),
    );

  const handleCancel = async (registrationId) => {
    if (!confirm("Are you sure you want to cancel this registration?")) return;

    try {
      await seminarService.cancelRegistration(registrationId);
      fetchRegistrations(); // Refresh list after cancel
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel registration");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setDateFilter("");
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            My Seminar Registrations
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage your seminar registrations (Past year history)
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="bg-white rounded-3xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Text Search */}
            <input
              type="text"
              placeholder="Search seminars or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            />

            {/* Date Picker */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="SUCCESS">Confirmed</option>
              <option value="WAIT">Waitlisted</option>
              <option value="CANCEL">Cancelled</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-6 py-3 text-gray-500 hover:text-gray-700 whitespace-nowrap"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Registration History */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Registration History</h2>
            <span className="text-gray-500">
              {filteredRegistrations.length} registrations found
            </span>
          </div>

          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📅</div>
              <p className="text-xl text-gray-600">No registrations found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="border border-gray-200 rounded-3xl p-8 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">🚗</div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-xl">
                            {reg.vehicleModelNumber || reg.seminar}
                          </h3>
                          <span
                            className={`px-5 py-1.5 text-sm font-medium rounded-full ${
                              reg.status === "SUCCESS"
                                ? "bg-green-100 text-green-700"
                                : reg.status === "WAIT"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {reg.status === "SUCCESS"
                              ? "Confirmed"
                              : reg.status === "WAIT"
                                ? "Waitlisted"
                                : "Cancelled"}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">
                          Urban mobility solutions with the City Compact model
                        </p>
                      </div>
                    </div>

                    {reg.status !== "CANCEL" && (
                      <button
                        onClick={() => handleCancel(reg.id)}
                        className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                      >
                        ✕ Cancel
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-sm">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">
                        {new Date(
                          reg.seminarDate || reg.date,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-medium">
                        {new Date(
                          reg.seminarDate || reg.date,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium">Guangzhou City Center</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Seats Reserved</p>
                      <p className="font-medium">
                        {reg.seatsBooked || reg.seats}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-6">
                    Registered on:{" "}
                    {new Date(
                      reg.createdAt || reg.registeredAt || reg.date,
                    ).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
