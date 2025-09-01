import React from "react";
import Select from "../common/Select.tsx";
import { useDrinkApi } from "../../ts/HooksHome/useDrinkApi.ts";
import { useTranslation } from "../../i18n/i18n.tsx";
import type { StepComponentProps } from "../../types/wizard.ts";

const DrinkPreferencesStep: React.FC<StepComponentProps> = ({
  data,
  onFieldChange,
  errors,
}) => {
  const { t } = useTranslation();
  const {
    categories,
    alcoholicTypes,
    glassTypes,
    ingredients,
    loading,
    error,
  } = useDrinkApi();

  if (error) {
    return <p className="alert alert-danger">{t("drinkPreferences_error")}</p>;
  }

  return (
    <>
      <Select
        label={t("drinkPreferences_drinkCategory")}
        name="drinkCategory"
        value={data.drinkCategory}
        onChange={onFieldChange}
        options={categories}
        loading={loading}
      />
      {errors.drinkCategory && (
        <span className="error-text">{errors.drinkCategory}</span>
      )}

      <Select
        label={t("drinkPreferences_alcoholicTypes")}
        name="alcoholicType"
        value={data.alcoholicType}
        onChange={onFieldChange}
        options={alcoholicTypes}
        loading={loading}
      />
      {errors.alcoholicType && (
        <span className="error-text">{errors.alcoholicType}</span>
      )}

      <Select
        label={t("drinkPreferences_glassTypes")}
        name="glassType"
        value={data.glassType}
        onChange={onFieldChange}
        options={glassTypes}
        loading={loading}
      />
      {errors.glassType && (
        <span className="error-text">{errors.glassType}</span>
      )}

      <Select
        label={t("drinkPreferences_drinkIngredient")}
        name="drinkIngredient"
        value={data.drinkIngredient}
        onChange={onFieldChange}
        options={ingredients}
        loading={loading}
      />
      {errors.drinkIngredient && (
        <span className="error-text">{errors.drinkIngredient}</span>
      )}
    </>
  );
};

export default DrinkPreferencesStep;
