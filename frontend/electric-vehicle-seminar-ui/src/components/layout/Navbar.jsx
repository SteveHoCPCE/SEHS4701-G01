// src/components/layout/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isMinimalPage = ["/verify", "/protocol-complete"].includes(
    location.pathname,
  );

  if (isMinimalPage) return null;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <div>
              <span className="font-bold text-2xl">ZhongNeng EV</span>
            </div>
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-8">
            <Link
              to="/catalog"
              className="text-gray-700 hover:text-black font-medium"
            >
              EV Catalog
            </Link>
            <Link
              to="/seminar-register"
              className="text-gray-700 hover:text-black font-medium"
            >
              Register Seminar
            </Link>
            <Link
              to="/my-registrations"
              className="text-gray-700 hover:text-black font-medium"
            >
              My Registrations
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-5 py-2 bg-black text-white rounded-xl font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-xl hover:border-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-black text-white rounded-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
