// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import EVCatalogPage from "./pages/EVCatalogPage";

// Seminar Pages
import SeminarListPage from "./pages/SeminarListPage";
import SeminarDetailsPage from "./pages/SeminarDetailsPage";
import SeminarRegistrationPage from "./pages/SeminarRegistrationPage";

// Auth Flow Pages
import VerificationPage from "./pages/VerificationPage";
import ProtocolCompletePage from "./pages/ProtocolCompletePage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Verification Flow */}
              <Route path="/verify" element={<VerificationPage />} />
              <Route
                path="/protocol-complete"
                element={<ProtocolCompletePage />}
              />

              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/catalog" element={<EVCatalogPage />} />

              {/* Seminar Routes */}
              <Route path="/seminars" element={<SeminarListPage />} />
              <Route
                path="/seminar-details/:id"
                element={<SeminarDetailsPage />}
              />
              <Route
                path="/seminar-register"
                element={<SeminarRegistrationPage />}
              />

              {/* 404 Fallback */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold mb-4">
                        404 - Page Not Found
                      </h2>
                      <p className="text-gray-600">
                        The page you're looking for doesn't exist.
                      </p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
