// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
    customerType: "PERSONAL", // Must be "PERSONAL" or "COMPANY"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await authService.register({
        name: formData.name.trim(),
        telephone: formData.telephone.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        customerType: formData.customerType, // Must be PERSONAL or COMPANY
      });

      localStorage.setItem("pendingEmail", formData.email.trim());

      alert(
        "✅ Registration successful!\n\nPlease check your email for the 6-digit code.",
      );
      navigate("/verify", { state: { email: formData.email.trim() } });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
      console.error("Register error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-cyan-500/30 rounded-full px-6 py-2 text-sm mb-6">
            <span className="text-cyan-400">●</span>
            REGISTRATION NODE ACTIVE
          </div>
          <h1 className="text-4xl font-bold mb-3">INITIALIZE CLEARANCE</h1>
          <p className="text-gray-400 text-lg">
            Create your digital identity to access the EV seminar nexus.
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-6 py-4 rounded-2xl mb-8 text-center">
            {error}
          </div>
        )}

        <div className="bg-[#12121a] border border-gray-800 rounded-3xl p-10">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                CUSTOMER TYPE
              </label>
              <select
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white"
              >
                <option value="PERSONAL">PERSONAL (Individual)</option>
                <option value="COMPANY">COMPANY (Corporate)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                TELEPHONE
              </label>
              <input
                type="tel"
                name="telephone"
                placeholder="91234567"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-black font-semibold py-4 rounded-2xl text-lg mt-6"
            >
              {loading ? "PROCESSING..." : "PROCEED TO VERIFICATION →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
