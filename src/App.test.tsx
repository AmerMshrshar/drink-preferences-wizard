import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./i18n/i18n";

jest.mock("./ts/HooksHome/useDrinkApi", () => ({
  useDrinkApi: () => ({
    categories: [],
    alcoholicTypes: [],
    glassTypes: [],
    ingredients: [],
    loading: false,
    error: null,
  }),
}));

test("renders the initial step of the wizard", () => {
  render(
    <MemoryRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>
  );

  const stepTitle = screen.getByText(/Step 1: Personal Information/i);
  expect(stepTitle).toBeInTheDocument();
});
