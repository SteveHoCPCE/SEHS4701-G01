// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user and registrations from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRegistrations = JSON.parse(
      localStorage.getItem("registrations") || "[]",
    );
    const savedVerified = localStorage.getItem("isVerified") === "true";

    if (savedUser) {
      const enhancedUser = {
        ...JSON.parse(savedUser),
        isVerified: savedVerified, // Keep the saved verified status
      };
      setUser(enhancedUser);
    }

    setRegistrations(savedRegistrations);
    setLoading(false);
  }, []);

  // Login - ONLY use the data from backend (no force verified)
  const login = (userData) => {
    // Removed force isVerified: true
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Save verified status from backend
    if (userData.isVerified !== undefined) {
      localStorage.setItem("isVerified", userData.isVerified.toString());
    }
  };

  const logout = () => {
    setUser(null);
    setRegistrations([]);
    localStorage.removeItem("user");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("registrations");
  };

  // Add new registration
  const addRegistration = (newReg) => {
    const updated = [newReg, ...registrations];
    setRegistrations(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  const value = {
    user,
    registrations,
    loading,
    login,
    logout,
    addRegistration,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
