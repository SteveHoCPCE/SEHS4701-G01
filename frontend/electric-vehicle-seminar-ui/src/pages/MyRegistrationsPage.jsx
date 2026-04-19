// src/pages/MyRegistrationsPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyRegistrationsPage() {
  const { user, registrations = [] } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [localRegistrations, setLocalRegistrations] = useState(registrations);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Sync local state when registrations change from context
  useEffect(() => {
    setLocalRegistrations(registrations);
  }, [registrations]);

  // Filter registrations
  const filteredRegistrations = localRegistrations
    .filter(
      (reg) =>
        reg.seminar.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "All" || reg.status === statusFilter),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleCancel = (registrationId) => {
    if (!confirm("Are you sure you want to cancel this registration?")) return;

    // Update status to Cancelled
    const updated = localRegistrations.map((reg) =>
      reg.id === registrationId ? { ...reg, status: "Cancelled" } : reg,
    );

    // Update local state
    setLocalRegistrations(updated);

    // Save to localStorage
    localStorage.setItem("registrations", JSON.stringify(updated));

    // Show success message (no reload)
    const msg = document.createElement("div");
    msg.className =
      "fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl z-50";
    msg.textContent = "Registration cancelled successfully.";
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
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

        {/* Search & Filter */}
        <div className="bg-white rounded-3xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
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
              className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Waitlisted">Waitlisted</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              className="px-6 py-3 text-gray-500 hover:text-gray-700"
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
                            {reg.seminar}
                          </h3>
                          <span
                            className={`px-5 py-1.5 text-sm font-medium rounded-full ${
                              reg.status === "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : reg.status === "Waitlisted"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {reg.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">
                          Urban mobility solutions with the City Compact model
                        </p>
                      </div>
                    </div>

                    {reg.status !== "Cancelled" && (
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
                        {new Date(reg.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-medium">
                        {new Date(reg.date).toLocaleTimeString([], {
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
                      <p className="font-medium">{reg.seats}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-6">
                    Registered on: {new Date(reg.date).toLocaleString()}
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
