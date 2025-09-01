import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import i18n from "i18next";
import {
  initReactI18next,
  useTranslation as useI18nextTranslation,
} from "react-i18next";

import enTranslations from "./en.json";
import arTranslations from "./ar.json";

interface LanguageContextType {
  currentLanguage: string;
  isRTL: boolean;
  changeLanguage: (language: string) => void;
  availableLanguages: { code: string; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const resources = {
  en: { translation: enTranslations },
  ar: { translation: arTranslations },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "translation",
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );
  const [isRTL, setIsRTL] = useState<boolean>(currentLanguage === "ar");

  const changeLanguage = (language: string) => {
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

  const value: LanguageContextType = {
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

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const useTranslation = () => {
  return useI18nextTranslation();
};
