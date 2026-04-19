// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]); // ← Added
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
        isVerified: savedVerified,
      };
      setUser(enhancedUser);
    }

    setRegistrations(savedRegistrations); // ← Added
    setLoading(false);
  }, []);

  // Login - Force verified status (your original function)
  const login = (userData) => {
    const enhancedUser = { ...userData, isVerified: true };
    setUser(enhancedUser);
    localStorage.setItem("user", JSON.stringify(enhancedUser));
    localStorage.setItem("isVerified", "true");
  };

  const logout = () => {
    setUser(null);
    setRegistrations([]); // ← Added
    localStorage.removeItem("user");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("registrations"); // ← Added
  };

  // Add new registration (used by SeminarRegistrationPage)
  const addRegistration = (newReg) => {
    // ← Added
    const updated = [newReg, ...registrations];
    setRegistrations(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  const value = {
    user,
    registrations, // ← Added
    loading,
    login,
    logout,
    addRegistration, // ← Added
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
