import React from "react";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  drinkCategory: string;
  alcoholicType: string;
  glassType: string;
  drinkIngredient: string;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export interface StepComponentProps {
  data: FormData;
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors: FormErrors;
}

export interface Step {
  title: string;
  component: React.FC<StepComponentProps>;
}
