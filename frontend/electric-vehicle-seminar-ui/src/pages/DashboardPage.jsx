// src/pages/DashboardPage.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-28">
        <p className="text-xl text-gray-600">Please log in first.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Manage your EV seminar registrations and explore our latest models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Your Profile */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-2xl mb-6">Your Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-gray-500 text-sm">Customer Type</p>
                  <p className="font-medium mt-1">Personal</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium mt-1">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Telephone</p>
                  <p className="font-medium mt-1">+852 123 456 78</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate("/catalog")}
                  className="p-6 border border-gray-200 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-2xl mb-3">🚗</div>
                  <p className="font-medium">Browse EVs</p>
                </button>

                <button
                  onClick={() => navigate("/seminar-register")}
                  className="p-6 border border-gray-200 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-2xl mb-3">📅</div>
                  <p className="font-medium">Register Seminar</p>
                </button>

                <button
                  onClick={() => navigate("/my-registrations")}
                  className="p-6 border border-gray-200 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-2xl mb-3">📋</div>
                  <p className="font-medium">My Registrations</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="lg:col-span-4 space-y-8">
            {/* Your Statistics */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-6">Your Statistics</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Registrations</span>
                  <span className="text-2xl font-bold text-blue-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Confirmed</span>
                  <span className="text-2xl font-bold text-green-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Waitlisted</span>
                  <span className="text-2xl font-bold text-amber-600">0</span>
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                <span>✉️</span> Recent Notifications
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm font-medium">
                    Welcome to ZhongNeng EV - Registration Successful
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    4/19/2026, 10:15:02 PM
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm font-medium">
                    Email Verification - ZhongNeng EV
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    4/19/2026, 10:14:50 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Registrations Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Registrations</h2>
            <button
              onClick={() => navigate("/my-registrations")}
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              📅
            </div>
            <p className="text-gray-500">No registrations yet</p>
            <button
              onClick={() => navigate("/seminar-register")}
              className="mt-6 bg-black text-white px-8 py-3 rounded-2xl hover:bg-gray-800"
            >
              Register for a Seminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
