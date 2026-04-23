import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { seminarService } from "../api/seminarService";

function oneYearAgoDate() {
  const now = new Date();
  now.setFullYear(now.getFullYear() - 1);
  return now;
}

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

export default function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");

  async function loadRegistrations() {
    setLoading(true);
    setError("");
    try {
      const response = await seminarService.getMyRegistrations();
      setRegistrations(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load registrations."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function handleCancel(registrationId) {
    const confirmed = window.confirm("Cancel this registration?");
    if (!confirmed) return;
    try {
      await seminarService.cancelRegistration(registrationId);
      await loadRegistrations();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to cancel registration."
      );
    }
  }

  const filtered = useMemo(() => {
    const oneYearAgo = oneYearAgoDate();
    return registrations.filter((item) => {
      const createdAt = new Date(item.createdAt);
      const withinOneYear = createdAt >= oneYearAgo;
      const statusMatch = status === "ALL" || item.status === status;
      const keywordMatch =
        !keyword ||
        item.vehicleModelNumber?.toLowerCase().includes(keyword.toLowerCase()) ||
        String(item.id).includes(keyword);
      return withinOneYear && statusMatch && keywordMatch;
    });
  }, [registrations, status, keyword]);

  if (loading)
    return <div className="page-shell centered">Loading registrations...</div>;

  return (
    <div className="page-shell">
      <div className="container section">
        <div className="section-header">
          <h1>My registrations</h1>
          <p>
            View, search and cancel your seminar registrations from the past 12
            months.
          </p>
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <div className="card" style={{ padding: 0 }}>
          <div className="filter-row">
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
                }}
              />
              <input
                type="text"
                placeholder="Search by model or registration ID"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="ALL">All statuses</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="WAIT">WAIT</option>
              <option value="CANCEL">CANCEL</option>
            </select>
          </div>
        </div>

        <div className="card table-card">
          {filtered.length === 0 ? (
            <p
              className="muted"
              style={{ padding: 24, textAlign: "center" }}
            >
              No registrations found. Try adjusting the filters or{" "}
              <Link to="/seminars" style={{ color: "var(--brand)" }}>
                book a seminar
              </Link>
              .
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Seminar Date</th>
                  <th>Seats</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
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
                    <td>
                      <div
                        className="actions-inline"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <Link
                          className="btn btn-secondary btn-sm"
                          to={`/my-registrations/${item.id}`}
                        >
                          Details
                        </Link>
                        {item.status !== "CANCEL" && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCancel(item.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
