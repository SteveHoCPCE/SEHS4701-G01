import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { seminarService } from "../api/seminarService";

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RegistrationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await seminarService.getRegistrationById(id);
        setRegistration(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load registration details."
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleCancel() {
    if (!window.confirm("Cancel this registration?")) return;
    setCancelling(true);
    try {
      await seminarService.cancelRegistration(id);
      const response = await seminarService.getRegistrationById(id);
      setRegistration(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel.");
    } finally {
      setCancelling(false);
    }
  }

  if (loading)
    return (
      <div className="page-shell centered">Loading registration details...</div>
    );

  if (error) {
    return (
      <div className="page-shell">
        <div className="container narrow">
          <div className="card">
            <p className="alert alert-error">{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/my-registrations")}
            >
              Back to My Registrations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="container narrow">
        <Link
          to="/my-registrations"
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: 12 }}
        >
          <ArrowLeft size={14} /> Back to registrations
        </Link>

        <div className="card elevated detail-grid">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 className="detail-title">
                {registration.vehicleModelNumber}
              </h2>
              <p className="muted">Registration #{registration.id}</p>
            </div>
            <span
              className={`status-chip status-${registration.status?.toLowerCase()}`}
            >
              {registration.status}
            </span>
          </div>

          <div className="detail-row">
            <span>Seminar ID</span>
            <strong>#{registration.seminarId}</strong>
          </div>
          <div className="detail-row">
            <span>Seminar Date</span>
            <strong>{formatDateTime(registration.seminarDate)}</strong>
          </div>
          <div className="detail-row">
            <span>Seats Booked</span>
            <strong>{registration.seatsBooked}</strong>
          </div>
          <div className="detail-row">
            <span>Created</span>
            <strong>{formatDateTime(registration.createdAt)}</strong>
          </div>
          <div className="detail-row">
            <span>Last Updated</span>
            <strong>{formatDateTime(registration.updatedAt)}</strong>
          </div>

          <div className="actions-inline" style={{ marginTop: 8 }}>
            {registration.status !== "CANCEL" && (
              <button
                className="btn btn-danger"
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? "Cancelling..." : "Cancel registration"}
              </button>
            )}
            <Link className="btn btn-secondary" to="/my-registrations">
              Back to list
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
