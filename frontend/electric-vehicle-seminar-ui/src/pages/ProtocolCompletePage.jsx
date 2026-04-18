// src/pages/ProtocolCompletePage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtocolCompletePage() {
  const { user, isVerified } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already verified, go directly to dashboard
    if (isVerified) {
      navigate("/dashboard", { replace: true });
      return;
    }

    // Mark as verified
    // (We already call this from VerificationPage, but double protection)
    // completeVerification();   // optional

    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate, isVerified]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Please login first
      </div>
    );
  }

  const displayName = user?.name || "User";
  const displayEmail = user?.email || "your.email@example.com";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
      <div className="w-full max-w-md px-6">
        <div className="bg-[#12121a] border border-cyan-500/30 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />

          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(0,245,255,0.6)]">
            <span className="text-6xl">✅</span>
          </div>

          <h1 className="text-4xl font-bold text-cyan-400 tracking-tight mb-3">
            PROTOCOL COMPLETE
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-12">
            Clearance granted. Your identity profile has been successfully
            integrated into the nexus.
          </p>

          <div className="bg-[#1a1a24] rounded-2xl p-7 mb-12 text-left border border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <p className="text-sm text-gray-500">ID</p>
                <p className="font-semibold text-white">{displayName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-xl">
                ✉️
              </div>
              <div>
                <p className="text-sm text-gray-500">NETWORK ADDRESS</p>
                <p className="font-medium text-cyan-300">{displayEmail}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold py-5 rounded-2xl text-lg shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all active:scale-95"
          >
            ENTER NEXUS →
          </button>

          <p className="text-xs text-gray-500 mt-8">
            Redirecting to dashboard automatically...
          </p>
        </div>
      </div>
    </div>
  );
}
