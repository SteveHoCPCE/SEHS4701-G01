// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [myRegistrations, setMyRegistrations] = useState([]);

  // Load data from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedVerified = localStorage.getItem("isVerified") === "true";
    const savedRegistrations = JSON.parse(
      localStorage.getItem("myRegistrations") || "[]",
    );

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsVerified(savedVerified);
    setMyRegistrations(savedRegistrations);
  }, []);

  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = savedUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));

      const alreadyVerified = localStorage.getItem("isVerified") === "true";
      setIsVerified(alreadyVerified);

      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === userData.email)) {
      return { success: false, message: "User already exists" };
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // New users start unverified
    setIsVerified(false);
    localStorage.setItem("isVerified", "false");

    return { success: true };
  };

  const completeVerification = () => {
    setIsVerified(true);
    localStorage.setItem("isVerified", "true");
  };

  // ==================== REGISTRATION MANAGEMENT ====================
  const addRegistration = (data) => {
    const newRegistration = {
      id: Date.now(),
      seminar: data.seminar,
      date: data.date,
      time: data.time,
      location: data.location,
      seats: data.seats || 1,
      registeredOn: new Date().toISOString(),
      status: data.status || "Confirmed", // This line is crucial
    };

    const updated = [...myRegistrations, newRegistration];
    setMyRegistrations(updated);
    localStorage.setItem("myRegistrations", JSON.stringify(updated));

    return newRegistration;
  };

  const cancelRegistration = (id) => {
    const updated = myRegistrations.map((reg) =>
      reg.id === id ? { ...reg, status: "Cancelled" } : reg,
    );

    setMyRegistrations(updated);
    localStorage.setItem("myRegistrations", JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    setIsVerified(false);
    setMyRegistrations([]);
    localStorage.removeItem("user");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("myRegistrations");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
