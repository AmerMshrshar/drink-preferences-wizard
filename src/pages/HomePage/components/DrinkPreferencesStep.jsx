import React from "react";
import Select from "../../../components/common/Select/Select";
import { useDrinkApi } from "../hooks/useDrinkApi";

const DrinkPreferencesStep = ({ data, onFieldChange }) => {
  const {
    categories,
    alcoholicTypes,
    glassTypes,
    ingredients,
    loading,
    error,
  } = useDrinkApi();

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <Select
        label="Drink Category"
        name="drinkCategory"
        value={data.drinkCategory}
        onChange={onFieldChange}
        options={categories}
        loading={loading}
      />
      <Select
        label="Alcoholic Types"
        name="alcoholicType"
        value={data.alcoholicType}
        onChange={onFieldChange}
        options={alcoholicTypes}
        loading={loading}
      />
      <Select
        label="Glass Types"
        name="glassType"
        value={data.glassType}
        onChange={onFieldChange}
        options={glassTypes}
        loading={loading}
      />
      <Select
        label="Drink Ingredient"
        name="drinkIngredient"
        value={data.drinkIngredient}
        onChange={onFieldChange}
        options={ingredients}
        loading={loading}
      />
    </>
  );
};

export default DrinkPreferencesStep;
