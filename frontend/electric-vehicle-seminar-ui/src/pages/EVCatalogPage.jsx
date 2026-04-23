import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Users, ArrowRight } from "lucide-react";
import { vehicleService } from "../api/vehicleService";
import { seminarService } from "../api/seminarService";

// Reliable fallback images (picsum always loads) keyed by vehicle ID
const FALLBACK_IMAGES = {
  1: "https://picsum.photos/seed/byd-seal/1200/675",
  2: "https://picsum.photos/seed/nio-et7/1200/675",
  3: "https://picsum.photos/seed/xpeng-g9/1200/675",
  4: "https://picsum.photos/seed/li-mega/1200/675",
  5: "https://picsum.photos/seed/zeekr-001/1200/675",
};
const GENERIC_FALLBACK = "https://picsum.photos/seed/ev-default/1200/675";

function toFeatureList(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatPrice(price) {
  if (price === undefined || price === null) return "-";
  return `¥${Number(price).toLocaleString()}`;
}

function formatDate(value) {
  if (!value) return "No upcoming seminar";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EVCatalogPage() {
  const [vehicles, setVehicles] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [vehicleResponse, seminarResponse] = await Promise.all([
          vehicleService.getVehicles(),
          seminarService.getUpcomingSeminars(),
        ]);
        setVehicles(vehicleResponse.data || []);
        setSeminars(seminarResponse.data || []);
      } catch {
        setError("Failed to load vehicle information. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const seminarByVehicle = useMemo(() => {
    const map = new Map();
    for (const seminar of seminars) {
      if (!map.has(seminar.vehicleId)) {
        map.set(seminar.vehicleId, seminar);
      }
    }
    return map;
  }, [seminars]);

  if (loading)
    return <div className="page-shell centered">Loading vehicle catalog...</div>;

  return (
    <div className="page-shell">
      <div className="container section">
        <div className="section-header">
          <h1>Electric Vehicle Catalog</h1>
          <p>
            Explore flagship Chinese EVs with detailed features, pricing and
            upcoming product seminars.
          </p>
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <div className="grid-3">
          {vehicles.map((vehicle) => {
            const nextSeminar = seminarByVehicle.get(vehicle.id);
            const fallback = FALLBACK_IMAGES[vehicle.id] || GENERIC_FALLBACK;
            const features = toFeatureList(vehicle.features).slice(0, 4);

            return (
              <article className="vehicle-card" key={vehicle.id}>
                <div className="vehicle-image-wrap">
                  <img
                    src={vehicle.pictureUrl || fallback}
                    alt={vehicle.modelNumber}
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                  <span className="vehicle-price-tag">
                    {formatPrice(vehicle.unitPrice)}
                  </span>
                </div>

                <div className="vehicle-content">
                  <div>
                    <h3>{vehicle.modelNumber}</h3>
                    <p style={{ marginTop: 4, fontSize: 14 }}>
                      {vehicle.description}
                    </p>
                  </div>

                  {features.length > 0 && (
                    <ul className="feature-list">
                      {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  )}

                  <div className="meta-list">
                    <div className="meta-row">
                      <span>
                        <CalendarDays
                          size={13}
                          style={{ verticalAlign: -2, marginRight: 4 }}
                        />
                        Next seminar
                      </span>
                      <strong>{formatDate(nextSeminar?.seminarDate)}</strong>
                    </div>
                    <div className="meta-row">
                      <span>
                        <Users
                          size={13}
                          style={{ verticalAlign: -2, marginRight: 4 }}
                        />
                        Seats available
                      </span>
                      <strong>
                        {nextSeminar
                          ? `${nextSeminar.availableSeats} / ${nextSeminar.maxSeats}`
                          : "—"}
                      </strong>
                    </div>
                  </div>

                  <div className="vehicle-actions">
                    <Link to="/seminars" className="btn btn-primary btn-block">
                      Register seminar <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
