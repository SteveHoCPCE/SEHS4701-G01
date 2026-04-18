// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./components/layout/MainLayout";

// Import all pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import EVCatalogPage from "./pages/EVCatalogPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import SeminarRegistrationPage from "./pages/SeminarRegistrationPage";
import SeminarListPage from "./pages/SeminarListPage";
import SeminarDetailsPage from "./pages/SeminarDetailsPage";
import VerificationPage from "./pages/VerificationPage";
import ProtocolCompletePage from "./pages/ProtocolCompletePage";
import NotFoundPage from "./pages/NotFoundPage"; // Make sure this file exists

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Pages with Navbar and Footer using MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/catalog" element={<EVCatalogPage />} />
            <Route
              path="/seminar-register"
              element={<SeminarRegistrationPage />}
            />
            <Route path="/my-registrations" element={<MyRegistrationsPage />} />
            <Route path="/seminars" element={<SeminarListPage />} />
            <Route
              path="/seminar-details/:id"
              element={<SeminarDetailsPage />}
            />
          </Route>

          {/* Authentication & Flow Pages (without MainLayout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/protocol-complete" element={<ProtocolCompletePage />} />

          {/* 404 Page - Catch all unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
