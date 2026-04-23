import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn, Lock } from "lucide-react";
import { authService } from "../api/authService";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const flashMessage = location.state?.message;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authService.login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      const userData = {
        email: response.data.email,
        name: response.data.name,
        verified: response.data.verified,
        token: response.data.token,
      };

      login(userData);

      if (!userData.verified) {
        localStorage.setItem("pendingEmail", userData.email);
        navigate("/verify", {
          state: { email: userData.email },
          replace: true,
        });
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell auth-bg">
      <div className="container narrow">
        <div className="card auth-card elevated">
          <div className="feature-icon" style={{ marginBottom: 16 }}>
            <Lock size={22} />
          </div>
          <h1>Welcome back</h1>
          <p className="muted" style={{ marginTop: 6 }}>
            Sign in to manage your seminars and registration history.
          </p>

          {flashMessage && <p className="alert alert-success">{flashMessage}</p>}
          {error && <p className="alert alert-error">{error}</p>}

          <form onSubmit={handleSubmit} className="form-stack">
            <label>
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>

            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={loading}
            >
              <LogIn size={16} />
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="helper-row">
            New here? <Link to="/register">Create a free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
