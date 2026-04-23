import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";

import MainLayout from "./components/layout/MainLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerificationPage from "./pages/VerificationPage";
import SeminarRegistrationPage from "./pages/SeminarRegistrationPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import DashboardPage from "./pages/DashboardPage";
import EVCatalogPage from "./pages/EVCatalogPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegistrationDetailPage from "./pages/RegistrationDetailPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="page-shell centered">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/vehicles" element={<EVCatalogPage />} />
            <Route path="/catalog" element={<Navigate to="/vehicles" replace />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seminars"
              element={
                <ProtectedRoute>
                  <SeminarRegistrationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seminar-register"
              element={<Navigate to="/seminars" replace />}
            />
            <Route
              path="/my-registrations"
              element={
                <ProtectedRoute>
                  <MyRegistrationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-registrations/:id"
              element={
                <ProtectedRoute>
                  <RegistrationDetailPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/verify" element={<VerificationPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
