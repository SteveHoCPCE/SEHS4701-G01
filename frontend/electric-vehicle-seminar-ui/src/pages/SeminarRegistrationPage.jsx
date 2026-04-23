import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, TicketCheck } from "lucide-react";
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

export default function SeminarRegistrationPage() {
  const navigate = useNavigate();
  const [seminars, setSeminars] = useState([]);
  const [selectedSeminarId, setSelectedSeminarId] = useState(null);
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadSeminars = useCallback(async (preserveSelection = true) => {
    setLoading(true);
    setError("");
    try {
      const response = await seminarService.getUpcomingSeminars();
      const list = response.data || [];
      setSeminars(list);
      if (list.length) {
        setSelectedSeminarId((prev) => {
          if (!preserveSelection) {
            return list[0].id;
          }
          return prev ?? list[0].id;
        });
      }
    } catch {
      setError("Failed to load upcoming seminars.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSeminars(false);
  }, [loadSeminars]);

  const selectedSeminar = seminars.find(
    (seminar) => seminar.id === selectedSeminarId
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedSeminar) return;
    setSubmitting(true);
    setMessage("");
    setError("");
    try {
      const response = await seminarService.registerForSeminar(
        selectedSeminar.id,
        { seatsBooked }
      );
      const status = response.data?.status;
      if (status === "WAIT") {
        setMessage(
          "Seminar is full — you have been added to the waitlist. We’ll email you if a seat opens."
        );
      } else {
        setMessage(
          "Registration confirmed! A confirmation email has been sent to your inbox."
        );
      }
      await loadSeminars();
      setTimeout(() => navigate("/my-registrations"), 1100);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return (
      <div className="page-shell centered">Loading upcoming seminars...</div>
    );

  return (
    <div className="page-shell">
      <div className="container section">
        <div className="section-header">
          <h1>Book a seminar</h1>
          <p>
            Reserve 1 or 2 seats for an upcoming seminar. Full seminars
            automatically place you on the waitlist.
          </p>
        </div>

        <div className="split">
          <div className="card">
            <h2>Upcoming seminars</h2>
            <p className="muted" style={{ marginTop: 4, fontSize: 14 }}>
              Showing only future seminars.
            </p>

            {seminars.length === 0 ? (
              <p className="muted" style={{ marginTop: 12 }}>
                No upcoming seminars available.
              </p>
            ) : (
              <div className="seminar-list">
                {seminars.map((seminar) => {
                  const isFull = seminar.availableSeats <= 0;
                  return (
                    <button
                      type="button"
                      key={seminar.id}
                      className={`seminar-item ${
                        selectedSeminarId === seminar.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSeminarId(seminar.id)}
                    >
                      <div>
                        <strong>{seminar.vehicleModelNumber}</strong>
                        <p>{seminar.vehicleDescription}</p>
                      </div>
                      <div className="seminar-meta">
                        <span>
                          <CalendarCheck
                            size={13}
                            style={{ verticalAlign: -2, marginRight: 4 }}
                          />
                          {formatDateTime(seminar.seminarDate)}
                        </span>
                        <span>
                          <strong>{seminar.availableSeats}</strong> / {seminar.maxSeats}{" "}
                          {isFull ? "(waitlist)" : "seats"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="card elevated">
            <h2>Registration details</h2>

            {error && <p className="alert alert-error">{error}</p>}
            {message && <p className="alert alert-success">{message}</p>}

            {selectedSeminar ? (
              <form onSubmit={handleSubmit} className="form-stack">
                <div className="detail-grid" style={{ marginTop: 4 }}>
                  <div className="detail-row">
                    <span>Vehicle</span>
                    <strong>{selectedSeminar.vehicleModelNumber}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Date &amp; Time</span>
                    <strong>{formatDateTime(selectedSeminar.seminarDate)}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Available Seats</span>
                    <strong>
                      {selectedSeminar.availableSeats} / {selectedSeminar.maxSeats}
                    </strong>
                  </div>
                </div>

                <label>
                  Seats to Reserve
                  <select
                    value={seatsBooked}
                    onChange={(e) => setSeatsBooked(Number(e.target.value))}
                  >
                    <option value={1}>1 seat</option>
                    <option value={2}>2 seats</option>
                  </select>
                </label>

                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={submitting}
                >
                  <TicketCheck size={16} />
                  {submitting ? "Submitting..." : "Confirm registration"}
                </button>
                <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                  If the seminar is full, you’ll be added to the waitlist and
                  promoted automatically when a seat opens.
                </p>
              </form>
            ) : (
              <p className="muted">Select a seminar to continue.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
