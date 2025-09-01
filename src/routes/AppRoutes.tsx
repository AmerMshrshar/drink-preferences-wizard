import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import DrinkPreferencesWizard from "../pages/Home/DrinkPreferencesWizard.tsx";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DrinkPreferencesWizard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
