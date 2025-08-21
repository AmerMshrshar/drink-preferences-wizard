import React from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <main className="main-layout-container">
      <Outlet />
    </main>
  );
};

export default MainLayout;
