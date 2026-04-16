// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]); // stores full user data including password

  // Register - save full data including password
  const register = (userData) => {
    const emailLower = userData.email.toLowerCase().trim();

    // Check if email already exists
    if (registeredUsers.some((u) => u.email.toLowerCase() === emailLower)) {
      return { success: false, message: "This email is already registered." };
    }

    setRegisteredUsers((prev) => [...prev, userData]);
    setCurrentUser(userData);
    return { success: true };
  };

  // Login - compare password exactly
  const login = (email, enteredPassword) => {
    const normalizedEmail = email.toLowerCase().trim();

    // Find the registered user
    const foundUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === normalizedEmail,
    );

    if (!foundUser) {
      return {
        success: false,
        message: "This email is not registered. Please register first.",
      };
    }

    // Compare password exactly (case sensitive)
    if (foundUser.password !== enteredPassword) {
      return {
        success: false,
        message: "Incorrect password. Please try again.",
      };
    }

    // Login successful - use real registered data
    setCurrentUser(foundUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
