// src/pages/VerificationPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../api/authService";

export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || localStorage.getItem("pendingEmail") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("").trim();

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Sending OTP:", otpCode, "for email:", email);

      await authService.verifyEmail({
        email: email,
        otpCode: otpCode,
      });

      alert("✅ Email verified successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Verification error:", err.response?.data || err);
      setError("Invalid or expired verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    setOtp(pasted.split("").concat(Array(6 - pasted.length).fill("")));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-cyan-500/30 rounded-full px-6 py-2 text-sm mb-6">
            <span className="text-cyan-400">●</span>
            EMAIL VERIFICATION
          </div>
          <h1 className="text-4xl font-bold mb-3 text-white">
            VERIFY YOUR EMAIL
          </h1>
          <p className="text-gray-400">
            We sent a 6-digit code to
            <br />
            <span className="text-cyan-400">{email}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-6 py-4 rounded-2xl mb-8 text-center">
            {error}
          </div>
        )}

        <div className="bg-[#12121a] border border-gray-800 rounded-3xl p-10">
          <div
            className="flex justify-center gap-3 mb-10"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-14 h-14 text-center text-3xl bg-[#1a1a2e] border border-gray-700 rounded-2xl focus:border-cyan-500 focus:outline-none text-white"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || otp.join("").length !== 6}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-black font-semibold py-4 rounded-2xl text-lg transition-all"
          >
            {loading ? "VERIFYING..." : "VERIFY EMAIL"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Didn't receive the code?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Register again
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
