import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px" }}>
        {/* The content of the current route will be rendered here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
