import React from "react";
import Input from "../common/Input";
import { useTranslation } from "../../contexts/LanguageContext";

const PersonalInfoStep = ({ data, onFieldChange, errors }) => {
  const { t } = useTranslation("homepage");

  return (
    <>
      <Input
        label={t("personalInfo.firstName")}
        name="firstName"
        value={data.firstName}
        onChange={onFieldChange}
        required
      />
      {errors.firstName && (
        <span className="error-text">{errors.firstName}</span>
      )}

      <Input
        label={t("personalInfo.lastName")}
        name="lastName"
        value={data.lastName}
        onChange={onFieldChange}
        required
      />
      {errors.lastName && <span className="error-text">{errors.lastName}</span>}

      <Input
        label={t("personalInfo.email")}
        name="email"
        type="email"
        value={data.email}
        onChange={onFieldChange}
        required
      />
      {errors.email && <span className="error-text">{errors.email}</span>}

      <Input
        label={t("personalInfo.phone")}
        name="phone"
        type="tel"
        value={data.phone}
        onChange={onFieldChange}
        required
        numbersOnly={true}
      />
      {errors.phone && <span className="error-text">{errors.phone}</span>}
    </>
  );
};

export default PersonalInfoStep;
