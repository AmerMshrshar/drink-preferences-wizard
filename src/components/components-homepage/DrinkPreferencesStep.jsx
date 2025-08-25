import React from "react";
import Select from "../common/Select";
import { useDrinkApi } from "../../ts/HooksHome/useDrinkApi.ts";
import { useTranslation } from "../../contexts/LanguageContext";

const DrinkPreferencesStep = ({ data, onFieldChange, errors }) => {
  const { t } = useTranslation("homepage");
  const {
    categories,
    alcoholicTypes,
    glassTypes,
    ingredients,
    loading,
    error,
  } = useDrinkApi();

  if (error) {
    return <p className="alert alert-danger">{t("drinkPreferences.error")}</p>;
  }

  return (
    <>
      <Select
        label={t("drinkPreferences.drinkCategory")}
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
        label={t("drinkPreferences.alcoholicTypes")}
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
        label={t("drinkPreferences.glassTypes")}
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
        label={t("drinkPreferences.drinkIngredient")}
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
