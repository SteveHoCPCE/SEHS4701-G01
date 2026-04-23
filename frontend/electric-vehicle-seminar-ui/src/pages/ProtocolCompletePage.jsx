// src/pages/ProtocolCompletePage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtocolCompletePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Auto redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-12 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <span className="text-7xl">🎉</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to the Nexus!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your account has been successfully verified.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left">
          <p className="text-sm text-gray-500 mb-3">Account Details</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Type:</span>
              <span className="font-medium">
                {user.customerType || "PERSONAL"}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 mb-8">
          You will be redirected to your dashboard shortly...
        </p>

        <button
          onClick={() => navigate("/dashboard", { replace: true })}
          className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-4 rounded-2xl transition-all"
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
}
