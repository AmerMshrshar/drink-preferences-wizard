import React from "react";
import { useTranslation } from "../../contexts/LanguageContext";

const Select = ({ label, name, value, onChange, options, loading }) => {
  const { t } = useTranslation("common");

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control form-select"
        disabled={loading}
      >
        <option value="">
          {loading ? t("select.loading") : t("select.selectOption", { label })}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
