// src/pages/DashboardPage.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Please log in first.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Manage your EV seminar registrations and explore our latest models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-2xl mb-6 flex items-center gap-3">
                👤 Your Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p className="font-medium text-lg">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium text-lg">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Customer Type</p>
                  <p className="font-medium text-lg">
                    {user.customerType || "PERSONAL"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
              <h3 className="font-semibold text-xl mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/seminar-register")}
                  className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition font-medium"
                >
                  Register for Seminar
                </button>
                <button
                  onClick={() => navigate("/my-registrations")}
                  className="w-full border border-gray-300 py-4 rounded-2xl hover:bg-gray-50 transition font-medium"
                >
                  View My Registrations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
