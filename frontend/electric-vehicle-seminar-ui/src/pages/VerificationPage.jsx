import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, MailCheck, ArrowLeft } from "lucide-react";
import { authService } from "../api/authService";
import { useAuth } from "../context/useAuth";

export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const inputRef = useRef(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const email = useMemo(
    () => location.state?.email || localStorage.getItem("pendingEmail") || "",
    [location.state]
  );

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [email, navigate]);

  async function handleVerify(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit OTP code sent to your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyEmail({ email, otpCode: otp });

      // Auto-login using the token returned from verify-email
      const data = response.data || {};
      if (data.token) {
        login({
          email: data.email,
          name: data.name,
          verified: data.verified ?? true,
          token: data.token,
        });

        setSuccess("Email verified! Taking you to your dashboard...");
        setTimeout(() => navigate("/dashboard", { replace: true }), 700);
      } else {
        // Fallback if backend doesn't return a token (older versions)
        setSuccess("Email verified. Please log in to continue.");
        setTimeout(() => navigate("/login"), 800);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell auth-bg">
      <div className="container narrow">
        <Link to="/register" className="btn btn-ghost btn-sm" style={{ marginBottom: 12 }}>
          <ArrowLeft size={14} /> Back to register
        </Link>

        <div className="card auth-card elevated">
          <div className="feature-icon" style={{ marginBottom: 16 }}>
            <MailCheck size={22} />
          </div>
          <h1>Verify your email</h1>
          <p className="muted" style={{ marginTop: 6 }}>
            We sent a 6-digit verification code to <strong>{email}</strong>.
            Enter it below to activate your account.
          </p>

          {error && <p className="alert alert-error">{error}</p>}
          {success && <p className="alert alert-success">{success}</p>}

          <form onSubmit={handleVerify} className="form-stack">
            <label>
              Verification Code
              <input
                ref={inputRef}
                className="otp-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="••••••"
              />
            </label>

            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={loading}
            >
              <ShieldCheck size={16} />
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>

          <p className="helper-row">
            Didn’t receive a code? <Link to="/register">Register again</Link> to
            resend the OTP. Codes expire after 5 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
