// src/components/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="content-root">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
