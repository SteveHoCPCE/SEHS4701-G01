// src/pages/VerificationPage.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../api/authService";

export default function VerificationPage() {
  const navigate = useNavigate();
  const { completeVerification } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  // Focus first input when component mounts
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasted)) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("").trim();

    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call backend to verify OTP
      await authService.verifyEmail({
        email: localStorage.getItem("pendingEmail") || "",
        otpCode,
      });

      setSuccess(true);
      completeVerification(); // Update AuthContext

      // Redirect after success
      setTimeout(() => {
        navigate("/protocol-complete");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired verification code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    alert(
      "Resend OTP feature is not implemented yet.\n\nYou can check your email or database for the latest OTP.",
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        {!success ? (
          <>
            <div className="text-center mb-10">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">🔑</span>
              </div>
              <h2 className="text-3xl font-bold">Email Verification</h2>
              <p className="text-gray-600 mt-3">
                Enter the 6-digit verification code sent to your email
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-6 text-center text-sm">
                {error}
              </div>
            )}

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-4 mb-10">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-14 h-14 text-center text-3xl font-semibold border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:outline-none transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otp.join("").length !== 6}
              className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white font-semibold py-4 rounded-2xl transition-all"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <div className="text-center mt-8">
              <button
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Didn't receive the code? Resend OTP
              </button>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
              <span className="text-6xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold text-green-700 mb-3">
              Verification Successful!
            </h2>
            <p className="text-gray-600">Redirecting you to the next step...</p>
          </div>
        )}
      </div>
    </div>
  );
}
