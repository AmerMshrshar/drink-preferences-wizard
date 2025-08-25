import React from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}

export default App;
