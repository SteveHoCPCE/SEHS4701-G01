import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/verify") {
    return null;
  }

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <nav className="main-nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <div className="brand-badge">ZN</div>
          <div>
            <p className="brand-title">ZhongNeng EV</p>
            <p className="brand-subtitle">Seminar Platform</p>
          </div>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            EV Catalog
          </NavLink>
          <NavLink
            to="/seminars"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Seminars
          </NavLink>
          {user && (
            <NavLink
              to="/my-registrations"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              My Registrations
            </NavLink>
          )}
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary btn-sm">
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm"
                type="button"
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
