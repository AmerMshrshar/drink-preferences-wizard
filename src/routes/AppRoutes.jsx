import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DrinkPreferencesWizard from "../pages/Home/DrinkPreferencesWizard.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DrinkPreferencesWizard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
