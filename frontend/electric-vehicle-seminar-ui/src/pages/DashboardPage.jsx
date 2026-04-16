// src/pages/DashboardPage.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Please login first
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen pt-24 pb-16 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-gray-400 mt-3 text-lg">
            Manage your EV seminar registrations and explore our latest models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Profile */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-3">
                👤 Your Profile
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-gray-500 text-sm">Customer Type</p>
                  <p className="font-medium mt-2 text-lg">
                    {user.type || "Personal"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium mt-2 text-lg">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Telephone</p>
                  <p className="font-medium mt-2 text-lg">
                    {user.phone || "+852 1234 5678"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <h3 className="font-semibold text-xl mb-6">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-6">
                <button
                  onClick={() => navigate("/catalog")}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-cyan-400 p-8 rounded-3xl text-center transition-all flex flex-col items-center gap-3"
                >
                  🚗 Browse EVs
                </button>
                <button
                  onClick={() => navigate("/seminar-register")}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-cyan-400 p-8 rounded-3xl text-center transition-all flex flex-col items-center gap-3"
                >
                  📅 Register Seminar
                </button>
                <button
                  onClick={() => navigate("/my-registrations")}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-cyan-400 p-8 rounded-3xl text-center transition-all flex flex-col items-center gap-3"
                >
                  📋 My Registrations
                </button>
              </div>
            </div>

            {/* My Registrations */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <div className="flex justify-between mb-6">
                <h3 className="font-semibold text-xl">My Registrations</h3>
                <button className="text-cyan-400 text-sm">View All</button>
              </div>
              <div className="text-center py-16 text-gray-500">
                No registrations yet
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <h3 className="font-semibold text-xl mb-6">Your Statistics</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400">Total Registrations</span>
                  <span className="text-4xl font-bold text-white">1</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-gray-400">Confirmed</span>
                  <span className="text-4xl font-bold text-emerald-400">1</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-gray-400">Waitlisted</span>
                  <span className="text-4xl font-bold text-amber-400">0</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <h3 className="font-semibold text-xl mb-6">
                Recent Notifications
              </h3>
              <div className="space-y-5">
                <div className="bg-gray-800 p-5 rounded-2xl">
                  <p className="font-medium">Seminar Registration Confirmed</p>
                  <p className="text-xs text-gray-500 mt-1">
                    4/10/2026, 12:33:14 AM
                  </p>
                </div>
                <div className="bg-gray-800 p-5 rounded-2xl">
                  <p className="font-medium">Welcome to ZhongNeng EV</p>
                  <p className="text-xs text-gray-500 mt-1">
                    4/8/2026, 10:25:36 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
