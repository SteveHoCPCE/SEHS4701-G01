// src/pages/MyRegistrationsPage.jsx
import { useState } from "react";
// import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MyRegistrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const registrations = [
    {
      id: 1,
      seminar: "ZhongNeng SUV Elite",
      date: "2026-04-18",
      time: "10:00",
      location: "Shanghai Auto Expo Hall",
      seats: 1,
      status: "Success",
      registeredOn: "2026-04-08 10:26:44",
    },
    {
      id: 2,
      seminar: "ZhongNeng Sedan Pro",
      date: "2026-04-15",
      time: "14:00",
      location: "Beijing Innovation Center",
      seats: 1,
      status: "Success",
      registeredOn: "2026-04-08 10:26:34",
    },
  ];

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch = reg.seminar
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || reg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this registration?")) {
      alert(
        `Registration #${id} has been cancelled. A notification email has been sent.`,
      );
      // In real app, you would update state and call API
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              My Seminar Registrations
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage your seminar registrations (Past year history)
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
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
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
                  />
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
              </div>

              <div className="w-full md:w-72">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full py-4 px-5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Success">Success</option>
                  <option value="Wait">Wait</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="bg-black text-white px-8 py-4 rounded-2xl font-medium hover:bg-gray-900 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-xl">Registration History</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredRegistrations.length} registrations found
                </p>
              </div>
            </div>

            {filteredRegistrations.length > 0 ? (
              <div className="divide-y">
                {filteredRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-8 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">🚗</span>
                          <div>
                            <div className="font-semibold text-xl">
                              {reg.seminar}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {reg.date} • {reg.time} • {reg.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
                            {reg.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">
                            {reg.seats} seat{reg.seats > 1 ? "s" : ""}
                          </p>
                        </div>

                        <button
                          onClick={() => handleCancel(reg.id)}
                          className="border border-red-300 hover:bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-sm font-medium transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-4">
                      Registered on: {reg.registeredOn}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-20 text-center text-gray-400">
                No registrations found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
