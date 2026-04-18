// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout
import MainLayout from "./components/layout/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerificationPage from "./pages/VerificationPage";
import ProtocolCompletePage from "./pages/ProtocolCompletePage";
import SeminarRegistrationPage from "./pages/SeminarRegistrationPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* All pages use MainLayout except minimal ones */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/seminar-register"
              element={<SeminarRegistrationPage />}
            />
            <Route path="/my-registrations" element={<MyRegistrationsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* Minimal pages without full layout */}
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/protocol-complete" element={<ProtocolCompletePage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
