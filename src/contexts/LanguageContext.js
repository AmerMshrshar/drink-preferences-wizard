import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "../i18n/i18n-comman/en.json";
import commonAr from "../i18n/i18n-comman/ar.json";
import homepageEn from "../i18n/i18n-components-homepage/en.json";
import homepageAr from "../i18n/i18n-components-homepage/ar.json";
import componentsEn from "../i18n/i18n-components/en.json";
import componentsAr from "../i18n/i18n-components/ar.json";

const LanguageContext = createContext();

const resources = {
  en: {
    common: commonEn,
    homepage: homepageEn,
    components: componentsEn,
  },
  ar: {
    common: commonAr,
    homepage: homepageAr,
    components: componentsAr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "common",
  ns: ["common", "homepage", "components"],
});

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [isRTL, setIsRTL] = useState(currentLanguage === "ar");

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    setIsRTL(language === "ar");
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);

    document.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  };

  useEffect(() => {
    document.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;
  }, [isRTL, currentLanguage]);

  const value = {
    currentLanguage,
    isRTL,
    changeLanguage,
    availableLanguages: [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "ar", name: "العربية", flag: "🇸🇦" },
    ],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const useTranslation = (namespace = "common") => {
  const { currentLanguage, isRTL } = useLanguage();

  const t = (key, options = {}) => {
    return i18n.t(key, { ...options, ns: namespace });
  };

  return { t, currentLanguage, isRTL };
};
