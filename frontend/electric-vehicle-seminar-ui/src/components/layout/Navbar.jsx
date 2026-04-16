// src/components/layout/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Car, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // These pages should show ONLY the logo (no other links or buttons)
  const isMinimalPage = ["/verify", "/protocol-complete"].includes(
    location.pathname,
  );

  const handleLogout = () => {
    logout();
    alert("You have been logged out successfully.");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo - Always visible */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-2xl text-gray-900">
                ZhongNeng EV
              </div>
              <div className="text-xs text-gray-500 -mt-1">
                Seminar Registration System
              </div>
            </div>
          </Link>

          {/* Show full navigation only when NOT on minimal pages */}
          {!isMinimalPage && (
            <div className="flex items-center gap-8">
              <Link
                to="/catalog"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                EV Catalog
              </Link>

              {user ? (
                // Logged In
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/seminar-register"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Register Seminar
                  </Link>
                  <Link
                    to="/my-registrations"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    My Registrations
                  </Link>

                  <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-sm">👤</span>
                      <span className="font-medium">{user.name}</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                // Logged Out
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-black hover:bg-gray-900 text-white font-semibold rounded-xl transition-all"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
