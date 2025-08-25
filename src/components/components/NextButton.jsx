import React from "react";
import { useTranslation } from "../../contexts/LanguageContext";

const NextButton = ({ onClick }) => {
  const { t } = useTranslation("components");

  return (
    <button onClick={onClick} className="nav-button next-button">
      {t("buttons.next")}
    </button>
  );
};

export default NextButton;
