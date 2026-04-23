import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="brand-badge">ZN</div>
              <div>
                <p className="brand-title">ZhongNeng EV</p>
                <p className="brand-subtitle">Smart mobility experience</p>
              </div>
            </div>
            <p className="muted" style={{ fontSize: 14, maxWidth: 360 }}>
              Discover EV features, register upcoming seminars, and manage your
              bookings in one unified portal.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: 14, marginBottom: 12 }}>Explore</h3>
            <div className="footer-list">
              <Link to="/vehicles">EV Catalog</Link>
              <Link to="/seminars">Upcoming Seminars</Link>
              <Link to="/my-registrations">My Registrations</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 14, marginBottom: 12 }}>Contact</h3>
            <div className="footer-list">
              <span>info@zhongneng-ev.com</span>
              <span>+86 400-888-9999</span>
              <span>Guangzhou, China</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} ZhongNeng Electric Vehicles · SEHS4701
          Group Project
        </div>
      </div>
    </footer>
  );
}
