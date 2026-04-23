// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EVCatalogPage from "../pages/EVCatalogPage";
// import SeminarListPage from '../pages/SeminarListPage';   // we'll add later

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/catalog" element={<EVCatalogPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div className="text-white p-10 text-center">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default AppRouter;
