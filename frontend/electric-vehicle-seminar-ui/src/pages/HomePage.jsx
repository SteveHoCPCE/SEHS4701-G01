import { Link } from "react-router-dom";
import {
  Car,
  CalendarCheck,
  ShieldCheck,
  History,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/useAuth";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Membership",
    body: "Register as Personal or Company with email OTP verification to keep your account secure.",
  },
  {
    icon: Car,
    title: "EV Feature Catalog",
    body: "Browse 5+ flagship Chinese electric vehicles with detailed specs, features and pricing.",
  },
  {
    icon: CalendarCheck,
    title: "Seminar Booking",
    body: "Reserve 1–2 seats for upcoming seminars with automatic SUCCESS / WAITLIST handling.",
  },
  {
    icon: History,
    title: "Registration Enquiry",
    body: "Track, filter and cancel your seminar registrations within the past 12 months.",
  },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-kicker">
            <Sparkles size={14} /> ZhongNeng EV · Seminar Platform
          </span>
          <h1>
            Experience the future of electric mobility, one seminar at a time.
          </h1>
          <p className="hero-copy">
            Discover premium Chinese electric vehicles, reserve seats for live
            product seminars, and manage your registrations — all in one
            beautifully simple portal.
          </p>

          <div className="hero-actions">
            {isAuthenticated ? (
              <>
                <Link to="/seminars" className="btn btn-primary">
                  Book a Seminar <ArrowRight size={16} />
                </Link>
                <Link to="/vehicles" className="btn btn-secondary">
                  Browse EV Catalog
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">
                  Create Free Account <ArrowRight size={16} />
                </Link>
                <Link to="/vehicles" className="btn btn-secondary">
                  Explore EVs
                </Link>
              </>
            )}
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>5+</strong>
              <span>Flagship EV models</span>
            </div>
            <div className="hero-stat">
              <strong>7</strong>
              <span>Upcoming seminars</span>
            </div>
            <div className="hero-stat">
              <strong>1–2</strong>
              <span>Seats per booking</span>
            </div>
            <div className="hero-stat">
              <strong>12mo</strong>
              <span>History tracking</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container section" style={{ marginTop: 48 }}>
        <div className="section-header">
          <h2>Everything you need in one place</h2>
          <p>
            Every core function of the project is designed to be fast, obvious
            and stress-free — from signup to seminar enquiry.
          </p>
        </div>
        <div className="grid-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="feature-card">
                <div className="feature-icon">
                  <Icon size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container section" style={{ marginTop: 48 }}>
        <div
          className="card elevated"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <h2>Ready to reserve your seat?</h2>
            <p style={{ marginTop: 6 }}>
              Sign up, verify your email, and pick from our upcoming seminars.
            </p>
          </div>
          {isAuthenticated ? (
            <Link to="/seminars" className="btn btn-primary">
              Book Seminar <ArrowRight size={16} />
            </Link>
          ) : (
            <Link to="/register" className="btn btn-primary">
              Get Started <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
