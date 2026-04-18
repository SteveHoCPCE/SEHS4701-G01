// src/pages/VerificationPage.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/layout/Footer";

export default function VerificationPage() {
  const { user, completeVerification } = useAuth(); // ← Added completeVerification
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputRefs = useRef([]);

  const userEmail = user?.email || "your.email@example.com";

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (code.join("").length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);

      // Mark user as verified in AuthContext
      completeVerification(); // ← Important fix

      setShowSuccess(true);

      // Redirect to protocol complete after success animation
      setTimeout(() => {
        navigate("/protocol-complete");
      }, 1800);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20 pb-16">
      <div className="w-full max-w-md px-6">
        <div className="bg-[#12121a] border border-gray-800 rounded-3xl p-10 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.6)]">
              🛡️
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-white mb-2">
            IDENTITY VERIFICATION
          </h1>

          <p className="text-center text-gray-400 mb-10">
            Transmission sent to{" "}
            <span className="text-cyan-400 font-medium">{userEmail}</span>
          </p>

          {/* 6-Digit Inputs */}
          <div className="flex justify-center gap-4 mb-12">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-4xl font-mono bg-[#1a1a24] border border-gray-700 rounded-2xl focus:border-cyan-400 focus:outline-none text-white caret-cyan-400"
              />
            ))}
          </div>

          {/* Demo Code Box */}
          <div className="bg-[#1a1a2e] border border-cyan-500/30 rounded-2xl p-6 mb-10">
            <div className="flex items-center gap-3 text-cyan-400 mb-2">
              <span className="text-xl">⚡</span>
              <span className="text-sm font-medium">INTERCEPTED SIGNAL</span>
            </div>
            <div className="font-mono text-xl text-cyan-300">
              Auth Code: <span className="font-bold text-white">467323</span>
            </div>
            <p className="text-xs text-gray-500 mt-3">Demo code for testing</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="flex-1 py-4 border border-gray-700 text-gray-400 rounded-2xl hover:bg-gray-900 transition-colors font-medium"
            >
              ABORT
            </button>

            <button
              onClick={handleVerify}
              disabled={isVerifying || code.join("").length !== 6}
              className="flex-1 py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-black font-semibold rounded-2xl transition-all disabled:cursor-not-allowed"
            >
              {isVerifying ? "VERIFYING..." : "VERIFY"}
            </button>
          </div>
        </div>
      </div>

      {/* Optional Footer - Remove if using MainLayout */}
      {/* <Footer /> */}
    </div>
  );
}
