// src/pages/MyRegistrationsPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MyRegistrationsPage() {
  const { myRegistrations, cancelRegistration } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRegistrations = myRegistrations.filter((reg) => {
    const matchesSearch = reg.seminar
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || reg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancel = (id, seminarName) => {
    if (
      window.confirm(
        `Are you sure you want to cancel registration for "${seminarName}"?`,
      )
    ) {
      cancelRegistration(id);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">
            My Seminar Registrations
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            View and manage your seminar registrations (Past year history)
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Registrations
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by seminar name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            <div className="w-full lg:w-72">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Waitlisted">Waitlisted</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end gap-3">
              <button className="bg-black text-white px-8 py-4 rounded-2xl font-medium hover:bg-gray-900">
                Search
              </button>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="border border-gray-300 px-6 py-4 rounded-2xl text-gray-600 hover:bg-gray-100"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Registration History
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {filteredRegistrations.length} registration
                {filteredRegistrations.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <button
              onClick={() => navigate("/seminar-register")}
              className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2"
            >
              + Register New Seminar
            </button>
          </div>

          {filteredRegistrations.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="p-8 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">🚗</span>
                        <div>
                          <div className="font-semibold text-xl">
                            {reg.seminar}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {reg.date} • {reg.time} • {reg.location}
                          </div>
                          <div className="text-xs text-gray-500 mt-3">
                            Registered on:{" "}
                            {new Date(reg.registeredOn).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span
                          className={`inline-block px-6 py-2 rounded-full text-sm font-medium ${
                            reg.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : reg.status === "Waitlisted"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {reg.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-2">
                          {reg.seats} seat{reg.seats > 1 ? "s" : ""}
                        </p>
                      </div>

                      {reg.status !== "Cancelled" && (
                        <button
                          onClick={() => handleCancel(reg.id, reg.seminar)}
                          className="border border-red-300 hover:bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-sm font-medium transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-4xl">
                📅
              </div>
              <h3 className="text-2xl font-medium text-gray-800">
                No registrations yet
              </h3>
              <p className="text-gray-600 mt-2 mb-8">
                You haven't registered for any seminars.
              </p>
              <button
                onClick={() => navigate("/seminar-register")}
                className="bg-black hover:bg-gray-900 text-white px-10 py-4 rounded-2xl font-medium"
              >
                Register for a Seminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
