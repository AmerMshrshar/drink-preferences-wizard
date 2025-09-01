import React, { useState } from "react";
import { useLanguage } from "../../i18n/i18n.tsx";
import "../../assets/LanguageSwitcher.css";

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const currentLang = availableLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  return (
    <div className="language-switcher">
      <button
        className="language-switcher-trigger"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch Language"
      >
        <span className="language-flag">{currentLang?.flag}</span>
        <span className="language-code">{currentLang?.code.toUpperCase()}</span>
        <span className={`language-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="language-dropdown-content" role="listbox">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                role="option"
                aria-selected={currentLanguage === language.code}
                className={`language-option ${
                  currentLanguage === language.code ? "active" : ""
                }`}
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className="language-flag">{language.flag}</span>
                <span className="language-name">{language.name}</span>
                {currentLanguage === language.code && (
                  <span className="check-icon">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
