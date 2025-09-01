import React from "react";
import { useTranslation } from "../../i18n/i18n.tsx";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button onClick={onClick} className="nav-button back-button">
      {t("buttons_back")}
    </button>
  );
};

export default BackButton;
