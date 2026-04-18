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
    customerType: "PERSONAL",
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
        customerType: formData.customerType,
      });

      localStorage.setItem("pendingEmail", formData.email.trim());

      alert(
        "✅ Registration successful!\n\nPlease check your email for the 6-digit verification code.",
      );
      navigate("/verify");
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        "Registration failed. Please try again.";
      setError(msg);
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
          <form onSubmit={handleRegister} className="space-y-8">
            <div>
              <label className="block text-sm text-gray-400 mb-3">
                ENTITY CLASSIFICATION *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, customerType: "PERSONAL" })
                  }
                  className={`py-4 rounded-2xl border flex items-center justify-center gap-3 transition-all ${
                    formData.customerType === "PERSONAL"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  👤 INDIVIDUAL
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, customerType: "COMPANY" })
                  }
                  className={`py-4 rounded-2xl border flex items-center justify-center gap-3 transition-all ${
                    formData.customerType === "COMPANY"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  🏢 CORPORATE
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                DESIGNATION *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                COMMLINK *
              </label>
              <input
                type="tel"
                name="telephone"
                placeholder="+86 138-0000-0000"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                NETWORK ADDRESS *
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  SECURITY KEY *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  VERIFY KEY *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter security key"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-black font-semibold py-4 rounded-2xl transition-all text-lg mt-6"
            >
              {loading
                ? "PROCESSING CLEARANCE..."
                : "PROCEED TO VERIFICATION →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
