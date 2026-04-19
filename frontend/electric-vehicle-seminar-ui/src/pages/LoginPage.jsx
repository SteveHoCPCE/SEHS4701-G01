// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ← Important
import { authService } from "../api/authService";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth(); // Get login from context

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", formData.email);

      const response = await authService.login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      // Save to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: response.data.email,
          name: response.data.name || "User",
        }),
      );

      // Update AuthContext
      contextLogin({
        email: response.data.email,
        name: response.data.name || "User",
      });

      console.log("Login successful! Redirecting to dashboard...");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      const serverMsg = err.response?.data?.message;
      setError(serverMsg || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-cyan-500/30 rounded-full px-6 py-2 text-sm mb-6">
            <span className="text-cyan-400">●</span>
            SYSTEM PROTOCOL ACTIVE
          </div>
          <h1 className="text-4xl font-bold mb-3">SYSTEM LOGIN</h1>
          <p className="text-gray-400 text-lg">
            Authenticate to access the EV seminar nexus
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-6 py-4 rounded-2xl mb-8 text-center">
            {error}
          </div>
        )}

        <div className="bg-[#12121a] border border-gray-800 rounded-3xl p-10">
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                NETWORK ADDRESS
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-5 top-4.5 text-gray-500"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                SECURITY KEY
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-5 top-4.5 text-gray-500"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter security key"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:border-cyan-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-4.5 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-700 text-white font-semibold py-4 rounded-2xl transition-all text-lg mt-4 flex items-center justify-center gap-2"
            >
              {loading ? "AUTHENTICATING..." : "AUTHENTICATE →"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            New to the system?{" "}
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
