// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../api/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    const savedVerified = localStorage.getItem("isVerified") === "true";
    const savedRegistrations = JSON.parse(
      localStorage.getItem("myRegistrations") || "[]",
    );

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setIsVerified(savedVerified);
      setMyRegistrations(savedRegistrations);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      const userData = response.data;
      const jwtToken = userData.token;

      setUser(userData);
      setToken(jwtToken);
      setIsVerified(true);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("isVerified", "true");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      await authService.register(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const completeVerification = () => {
    setIsVerified(true);
    localStorage.setItem("isVerified", "true");
  };

  const addRegistration = (newRegistration) => {
    const updatedRegistrations = [...myRegistrations, newRegistration];
    setMyRegistrations(updatedRegistrations);
    localStorage.setItem(
      "myRegistrations",
      JSON.stringify(updatedRegistrations),
    );
  };

  const cancelRegistration = (registrationId) => {
    const updated = myRegistrations.map((reg) =>
      reg.id === registrationId || reg.seminarId === registrationId
        ? { ...reg, status: "Cancelled" }
        : reg,
    );
    setMyRegistrations(updated);
    localStorage.setItem("myRegistrations", JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setMyRegistrations([]);
    setIsVerified(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("myRegistrations");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isVerified,
        myRegistrations,
        login,
        register,
        completeVerification,
        addRegistration,
        cancelRegistration,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
