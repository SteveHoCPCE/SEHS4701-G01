import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page-shell auth-bg">
      <div className="container narrow" style={{ textAlign: "center" }}>
        <div className="card elevated" style={{ padding: 48 }}>
          <h1
            style={{
              fontSize: 72,
              color: "var(--brand)",
              marginBottom: 8,
              fontWeight: 800,
            }}
          >
            404
          </h1>
          <h2 style={{ marginBottom: 12 }}>Page not found</h2>
          <p style={{ marginBottom: 24 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
