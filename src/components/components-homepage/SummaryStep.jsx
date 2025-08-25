import React from "react";
import { useTranslation } from "../../contexts/LanguageContext";

const SummaryStep = ({ data }) => {
  const { t } = useTranslation("homepage");

  return (
    <div className="summary-container">
      <h3>{t("summary.reviewTitle")}</h3>

      <div className="content-box">
        <h4 className="content-box-title">
          {t("summary.personalInfoSection")}
        </h4>
        <p>
          <strong>{t("summary.labels.firstName")}</strong> {data.firstName}
        </p>
        <p>
          <strong>{t("summary.labels.lastName")}</strong> {data.lastName}
        </p>
        <p>
          <strong>{t("summary.labels.email")}</strong> {data.email}
        </p>
        <p>
          <strong>{t("summary.labels.phone")}</strong> {data.phone}
        </p>
      </div>

      <div className="content-box">
        <h4 className="content-box-title">
          {t("summary.drinkPreferencesSection")}
        </h4>
        <p>
          <strong>{t("summary.labels.category")}</strong>{" "}
          {data.drinkCategory || t("summary.notSelected")}
        </p>
        <p>
          <strong>{t("summary.labels.alcoholicType")}</strong>{" "}
          {data.alcoholicType || t("summary.notSelected")}
        </p>
        <p>
          <strong>{t("summary.labels.glassType")}</strong>{" "}
          {data.glassType || t("summary.notSelected")}
        </p>
        <p>
          <strong>{t("summary.labels.ingredient")}</strong>{" "}
          {data.drinkIngredient || t("summary.notSelected")}
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
