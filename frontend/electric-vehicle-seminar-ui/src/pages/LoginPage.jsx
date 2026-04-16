// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter email and password");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const result = login(email, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Login failed. Please try again.");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20 px-6">
      <div className="w-full max-w-md">
        <div className="bg-[#12121a] border border-gray-800 rounded-3xl p-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              🔐
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-2 text-white">
            SYSTEM LOGIN
          </h1>
          <p className="text-gray-400 text-center mb-10">
            Authenticate to access the EV seminar nexus
          </p>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-2xl mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                NETWORK ADDRESS
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a24] border border-gray-700 focus:border-cyan-400 rounded-2xl px-5 py-4 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                SECURITY KEY
              </label>
              <input
                type="password"
                placeholder="Enter security key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a24] border border-gray-700 focus:border-cyan-400 rounded-2xl px-5 py-4 text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-semibold rounded-2xl text-lg disabled:opacity-70 transition-all"
            >
              {loading ? "AUTHENTICATING..." : "AUTHENTICATE →"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-400">
            Unregistered entity?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Initialize clearance
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
