import React from "react";
import Select from "../common/Select";
import { useDrinkApi } from "../../ts/HooksHome/useDrinkApi";

const DrinkPreferencesStep = ({ data, onFieldChange, errors }) => {
  const {
    categories,
    alcoholicTypes,
    glassTypes,
    ingredients,
    loading,
    error,
  } = useDrinkApi();

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
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
      {errors.drinkCategory && (
        <span className="error-text">{errors.drinkCategory}</span>
      )}
      <Select
        label="Alcoholic Types"
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
        label="Glass Types"
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
        label="Drink Ingredient"
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
