import React from "react";
import Input from "../common/Input.tsx";
import { useTranslation } from "../../i18n/i18n.tsx";
import type { StepComponentProps } from "../../types/wizard.ts";

const PersonalInfoStep: React.FC<StepComponentProps> = ({
  data,
  onFieldChange,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        label={t("personalInfo_firstName")}
        name="firstName"
        value={data.firstName}
        onChange={onFieldChange}
      />
      {errors.firstName && (
        <span className="error-text">{errors.firstName}</span>
      )}

      <Input
        label={t("personalInfo_lastName")}
        name="lastName"
        value={data.lastName}
        onChange={onFieldChange}
      />
      {errors.lastName && <span className="error-text">{errors.lastName}</span>}

      <Input
        label={t("personalInfo_email")}
        name="email"
        type="email"
        value={data.email}
        onChange={onFieldChange}
      />
      {errors.email && <span className="error-text">{errors.email}</span>}

      <Input
        label={t("personalInfo_phone")}
        name="phone"
        type="tel"
        value={data.phone}
        onChange={onFieldChange}
        numbersOnly={true}
      />
      {errors.phone && <span className="error-text">{errors.phone}</span>}
    </>
  );
};

export default PersonalInfoStep;
