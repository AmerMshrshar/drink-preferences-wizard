import React from "react";
import { useTranslation } from "../../i18n/i18n.tsx";
import { StepComponentProps } from "../../types/wizard.ts";

const SummaryStep: React.FC<StepComponentProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="summary-container">
      <h3>{t("summary_reviewTitle")}</h3>

      <div className="content-box">
        <h4 className="content-box-title">
          {t("summary_personalInfoSection")}
        </h4>
        <p>
          <strong>{t("summary_labels_firstName")}</strong> {data.firstName}
        </p>
        <p>
          <strong>{t("summary_labels_lastName")}</strong> {data.lastName}
        </p>
        <p>
          <strong>{t("summary_labels_email")}</strong> {data.email}
        </p>
        <p>
          <strong>{t("summary_labels_phone")}</strong> {data.phone}
        </p>
      </div>

      <div className="content-box">
        <h4 className="content-box-title">
          {t("summary_drinkPreferencesSection")}
        </h4>
        <p>
          <strong>{t("summary_labels_category")}</strong>{" "}
          {data.drinkCategory || t("summary_notSelected")}
        </p>
        <p>
          <strong>{t("summary_labels_alcoholicType")}</strong>{" "}
          {data.alcoholicType || t("summary_notSelected")}
        </p>
        <p>
          <strong>{t("summary_labels_glassType")}</strong>{" "}
          {data.glassType || t("summary_notSelected")}
        </p>
        <p>
          <strong>{t("summary_labels_ingredient")}</strong>{" "}
          {data.drinkIngredient || t("summary_notSelected")}
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
