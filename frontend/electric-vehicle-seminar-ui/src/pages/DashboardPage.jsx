import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus, ClipboardList, ArrowRight } from "lucide-react";
import { customerService } from "../api/customerService";
import { seminarService } from "../api/seminarService";
import { useAuth } from "../context/useAuth";

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [profileResponse, registrationResponse] = await Promise.all([
          customerService.getCustomerProfile(),
          seminarService.getMyRegistrations(),
        ]);
        setProfile(profileResponse.data);
        setRegistrations(registrationResponse.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = useMemo(
    () => ({
      total: registrations.length,
      success: registrations.filter((i) => i.status === "SUCCESS").length,
      wait: registrations.filter((i) => i.status === "WAIT").length,
      cancel: registrations.filter((i) => i.status === "CANCEL").length,
    }),
    [registrations]
  );

  if (loading)
    return <div className="page-shell centered">Loading dashboard...</div>;

  return (
    <div className="page-shell">
      <div className="container section">
        <div className="section-header">
          <h1>Welcome back, {user?.name || profile?.name || "there"}</h1>
          <p>
            Your profile, seminar history and quick actions — all in one place.
          </p>
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <div className="stats-grid">
          <div className="stat-box">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="stat-box accent-success">
            <span>Success</span>
            <strong>{stats.success}</strong>
          </div>
          <div className="stat-box accent-wait">
            <span>Waitlist</span>
            <strong>{stats.wait}</strong>
          </div>
          <div className="stat-box accent-cancel">
            <span>Cancelled</span>
            <strong>{stats.cancel}</strong>
          </div>
        </div>

        <div className="split">
          <div className="card">
            <h2>Profile</h2>
            {profile ? (
              <div className="detail-grid" style={{ marginTop: 12 }}>
                <div className="detail-row">
                  <span>Name</span>
                  <strong>{profile.name}</strong>
                </div>
                <div className="detail-row">
                  <span>Email</span>
                  <strong>{profile.email}</strong>
                </div>
                <div className="detail-row">
                  <span>Telephone</span>
                  <strong>{profile.telephone}</strong>
                </div>
                <div className="detail-row">
                  <span>Customer Type</span>
                  <strong>{profile.customerType}</strong>
                </div>
                <div className="detail-row">
                  <span>Email Verified</span>
                  <strong>
                    <span
                      className={`status-chip ${
                        profile.emailVerified ? "status-success" : "status-wait"
                      }`}
                    >
                      {profile.emailVerified ? "Verified" : "Pending"}
                    </span>
                  </strong>
                </div>
                <div className="detail-row">
                  <span>Member Since</span>
                  <strong>{formatDate(profile.createdAt)}</strong>
                </div>
              </div>
            ) : (
              <p className="muted">Profile not available.</p>
            )}
          </div>

          <div className="card">
            <h2>Quick actions</h2>
            <p className="muted" style={{ marginTop: 4, fontSize: 14 }}>
              Jump back into your seminar workflow.
            </p>
            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              <Link to="/seminars" className="btn btn-primary btn-block">
                <CalendarPlus size={16} />
                Book a new seminar
              </Link>
              <Link to="/my-registrations" className="btn btn-secondary btn-block">
                <ClipboardList size={16} />
                View all registrations
              </Link>
              <Link to="/vehicles" className="btn btn-ghost btn-block">
                Browse EV catalog <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="table-head">
            <h2>Recent registrations</h2>
            <Link to="/my-registrations">View all →</Link>
          </div>
          {registrations.length === 0 ? (
            <p className="muted">
              No registrations yet.{" "}
              <Link to="/seminars" style={{ color: "var(--brand)", fontWeight: 600 }}>
                Book your first seminar
              </Link>
              .
            </p>
          ) : (
            <div className="table-card" style={{ padding: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vehicle</th>
                    <th>Seminar Date</th>
                    <th>Seats</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>
                      <td>
                        <strong>{item.vehicleModelNumber}</strong>
                      </td>
                      <td>{formatDate(item.seminarDate)}</td>
                      <td>{item.seatsBooked}</td>
                      <td>
                        <span
                          className={`status-chip status-${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
