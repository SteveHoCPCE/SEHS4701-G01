import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, User, Building2 } from "lucide-react";
import { authService } from "../api/authService";

const defaultForm = {
  name: "",
  telephone: "",
  email: "",
  password: "",
  confirmPassword: "",
  customerType: "PERSONAL",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const normalizedEmail = form.email.trim().toLowerCase();
    try {
      await authService.register({
        name: form.name.trim(),
        telephone: form.telephone.trim(),
        email: normalizedEmail,
        password: form.password,
        customerType: form.customerType,
      });

      localStorage.setItem("pendingEmail", normalizedEmail);
      navigate("/verify", {
        state: { email: normalizedEmail },
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell auth-bg">
      <div className="container narrow">
        <div className="card auth-card elevated">
          <div className="feature-icon" style={{ marginBottom: 16 }}>
            <UserPlus size={22} />
          </div>
          <h1>Create your account</h1>
          <p className="muted" style={{ marginTop: 6 }}>
            Join ZhongNeng EV to register for seminars and manage bookings.
          </p>

          {error && <p className="alert alert-error">{error}</p>}

          <form onSubmit={handleSubmit} className="form-stack">
            <div>
              <label style={{ marginBottom: 6 }}>Customer Type</label>
              <div
                role="radiogroup"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <CustomerTypeOption
                  active={form.customerType === "PERSONAL"}
                  onClick={() => updateField("customerType", "PERSONAL")}
                  icon={<User size={18} />}
                  title="Personal"
                  subtitle="Individual account"
                />
                <CustomerTypeOption
                  active={form.customerType === "COMPANY"}
                  onClick={() => updateField("customerType", "COMPANY")}
                  icon={<Building2 size={18} />}
                  title="Company"
                  subtitle="Business account"
                />
              </div>
            </div>

            <label>
              Name
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
              />
            </label>

            <label>
              Telephone
              <input
                type="tel"
                required
                value={form.telephone}
                onChange={(e) => updateField("telephone", e.target.value)}
                placeholder="91234567"
                autoComplete="tel"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label>
                Password
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                />
              </label>
              <label>
                Confirm
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  placeholder="Repeat password"
                  autoComplete="new-password"
                />
              </label>
            </div>

            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={loading}
            >
              <UserPlus size={16} />
              {loading ? "Creating account..." : "Create Account & Send OTP"}
            </button>
          </form>

          <p className="helper-row">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function CustomerTypeOption({ active, onClick, icon, title, subtitle }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "12px 14px",
        borderRadius: 12,
        border: `1px solid ${active ? "var(--brand)" : "var(--border)"}`,
        background: active ? "rgba(15, 118, 110, 0.06)" : "var(--surface)",
        boxShadow: active ? "0 0 0 3px rgba(15, 118, 110, 0.12)" : "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        transition: "all 0.15s ease",
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          display: "grid",
          placeItems: "center",
          background: active ? "var(--brand)" : "var(--bg-soft)",
          color: active ? "#fff" : "var(--text-soft)",
        }}
      >
        {icon}
      </span>
      <span>
        <strong style={{ display: "block", fontSize: 14 }}>{title}</strong>
        <span style={{ color: "var(--muted)", fontSize: 12 }}>{subtitle}</span>
      </span>
    </button>
  );
}
