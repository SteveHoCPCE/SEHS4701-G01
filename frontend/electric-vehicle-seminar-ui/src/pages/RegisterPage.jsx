// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("INDIVIDUAL");

  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
    customerType: "PERSONAL",
    organizationName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData((prev) => ({
      ...prev,
      customerType: tab === "INDIVIDUAL" ? "PERSONAL" : "COMPANY",
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    console.log("🚀 Registration started for email:", formData.email);

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
      const payload = {
        name: formData.name.trim(),
        telephone: formData.telephone.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        customerType: formData.customerType,
      };

      if (activeTab === "CORPORATE" && formData.organizationName.trim()) {
        payload.organizationName = formData.organizationName.trim();
      }

      console.log("📤 Sending payload to backend:", payload);

      await authService.register(payload);

      console.log("✅ Registration API call successful");

      localStorage.setItem("pendingEmail", formData.email.trim());

      setSuccessMsg("Registration successful! Checking your email for OTP...");

      // Small delay before navigating
      setTimeout(() => {
        navigate("/verify", { state: { email: formData.email.trim() } });
      }, 1500);
    } catch (err) {
      console.error("❌ Full registration error:", err);
      console.error("Response data:", err.response?.data);
      console.error("Status code:", err.response?.status);

      const msg =
        err.response?.data?.message || err.message || "Registration failed.";

      // Updated logic: Allow re-registration if previous attempt was not verified
      if (
        msg.toLowerCase().includes("already registered") ||
        msg.toLowerCase().includes("email already exists") ||
        msg.toLowerCase().includes("duplicate") ||
        msg.toLowerCase().includes("already in use")
      ) {
        setError(
          "This email is already registered but not verified. You can register again.",
        );
        // Auto redirect to verification page so user can try OTP again
        setTimeout(() => {
          navigate("/verify", { state: { email: formData.email.trim() } });
        }, 2500);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-cyan-500/30 rounded-full px-6 py-2 text-sm mb-6">
            <span className="text-cyan-400">●</span>
            REGISTRATION NODE ACTIVE
          </div>
          <h1 className="text-4xl font-bold mb-3 text-white">
            INITIALIZE CLEARANCE
          </h1>
          <p className="text-gray-400 text-lg">
            Create your digital identity to access the EV seminar nexus.
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-6 py-4 rounded-2xl mb-8 text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-900/30 border border-green-500 text-green-400 px-6 py-4 rounded-2xl mb-8 text-center">
            {successMsg}
          </div>
        )}

        <div className="bg-[#12121a] border border-gray-800 rounded-3xl p-10">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Entity Classification */}
            <div>
              <label className="block text-sm text-gray-400 mb-3">
                ENTITY CLASSIFICATION *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleTabChange("INDIVIDUAL")}
                  className={`py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all ${
                    activeTab === "INDIVIDUAL"
                      ? "bg-cyan-500 text-black border border-cyan-500"
                      : "bg-[#1a1a2e] border border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  👤 INDIVIDUAL
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("CORPORATE")}
                  className={`py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all ${
                    activeTab === "CORPORATE"
                      ? "bg-cyan-500 text-black border border-cyan-500"
                      : "bg-[#1a1a2e] border border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  🏢 CORPORATE
                </button>
              </div>
            </div>

            {/* Designation + CommLink */}
            <div className="grid grid-cols-2 gap-4">
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
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
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
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Corporate Affiliation */}
            {activeTab === "CORPORATE" && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  CORPORATE AFFILIATION *
                </label>
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Enter organization name"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
                />
              </div>
            )}

            {/* Email */}
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
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
              />
            </div>

            {/* Passwords */}
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
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
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
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-black font-semibold py-4 rounded-2xl text-lg mt-6 transition-all"
            >
              {loading ? "PROCESSING..." : "PROCEED TO VERIFICATION →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
