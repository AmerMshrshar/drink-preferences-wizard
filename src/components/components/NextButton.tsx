import React from "react";
import { useTranslation } from "../../i18n/i18n.tsx";

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button onClick={onClick} className="nav-button next-button">
      {t("buttons_next")}
    </button>
  );
};

export default NextButton;
