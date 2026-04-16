// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [entityType, setEntityType] = useState("individual");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProceed = () => {
    // Validation
    if (!formData.fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!formData.phone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    if (!formData.email.trim()) {
      alert("Please enter your email address");
      return;
    }
    if (entityType === "corporate" && !formData.organization.trim()) {
      alert("Please enter your organization name");
      return;
    }
    if (!formData.password) {
      alert("Please enter a password");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Create user data
    const userData = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      type: entityType === "individual" ? "Personal" : "Corporate",
      organization:
        entityType === "corporate" ? formData.organization.trim() : "",
      password: formData.password, // Save real password for login check
    };

    const result = register(userData);

    if (result.success) {
      alert("Registration successful! Proceeding to verification...");
      navigate("/verify");
    } else {
      alert(result.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="bg-[#12121a] border border-gray-800 rounded-3xl p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-emerald-500/10 text-emerald-400 text-xs px-4 py-1.5 rounded-full mb-4">
              REGISTRATION NODE ACTIVE
            </div>
            <h1 className="text-4xl font-bold mb-2">INITIALIZE CLEARANCE</h1>
            <p className="text-gray-400">
              Create your digital identity to access the EV seminar nexus.
            </p>
          </div>

          {/* Entity Type Toggle */}
          <div className="flex gap-3 mb-10">
            <button
              onClick={() => setEntityType("individual")}
              className={`flex-1 py-4 rounded-2xl font-medium transition-all ${
                entityType === "individual"
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,245,255,0.6)]"
                  : "bg-gray-900 border border-gray-700 hover:bg-gray-800"
              }`}
            >
              👤 INDIVIDUAL
            </button>
            <button
              onClick={() => setEntityType("corporate")}
              className={`flex-1 py-4 rounded-2xl font-medium transition-all ${
                entityType === "corporate"
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,245,255,0.6)]"
                  : "bg-gray-900 border border-gray-700 hover:bg-gray-800"
              }`}
            >
              🏢 CORPORATE
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <input
              name="fullName"
              type="text"
              placeholder="Enter full name *"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-[#1a1a24] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500"
            />

            <input
              name="phone"
              type="tel"
              placeholder="+86 138-0000-0000 *"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#1a1a24] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500"
            />

            {entityType === "corporate" && (
              <input
                name="organization"
                type="text"
                placeholder="Enter organization name *"
                value={formData.organization}
                onChange={handleChange}
                className="w-full bg-[#1a1a24] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500"
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="your.email@example.com *"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1a1a24] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500"
            />

            <div className="grid grid-cols-2 gap-6">
              <input
                name="password"
                type="password"
                placeholder="Password (min 6 chars) *"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#1a1a24] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500"
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password *"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#1a1a24] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500"
              />
            </div>
          </div>

          <button
            onClick={handleProceed}
            className="w-full mt-10 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-4 rounded-2xl text-lg transition-all"
          >
            PROCEED TO VERIFICATION →
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            One-time 6-digit code will be sent to your email for verification
          </p>
        </div>
      </div>
    </div>
  );
}
