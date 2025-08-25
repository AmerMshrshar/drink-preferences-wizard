import React, { useState } from "react";
import Card from "../../components/common/Card";
import PersonalInfoStep from "../../components/components-homepage/PersonalInfoStep";
import DrinkPreferencesStep from "../../components/components-homepage/DrinkPreferencesStep";
import SummaryStep from "../../components/components-homepage/SummaryStep";
import BackButton from "../../components/components/BackButton";
import NextButton from "../../components/components/NextButton";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useTranslation } from "../../contexts/LanguageContext";
import useDrinkApi from "../../ts/HooksHome/useDrinkApi";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  drinkCategory: string;
  alcoholicType: string;
  glassType: string;
  drinkIngredient: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export interface StepComponentProps {
  data: FormData;
  onFieldChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: FormErrors;
}

interface Step {
  title: string;
  component: FC<StepComponentProps>;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  drinkCategory: "",
  alcoholicType: "",
  glassType: "",
  drinkIngredient: "",
};

const DrinkPreferencesWizard: FC = () => {
  const { t } = useTranslation("homepage");
  const { t: tCommon } = useTranslation("common");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const steps: Step[] = [
    { title: t("steps.step1Title"), component: PersonalInfoStep },
    { title: t("steps.step2Title"), component: DrinkPreferencesStep },
    { title: t("steps.step3Title"), component: SummaryStep },
  ];

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const newErrors = validateStep();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    setErrors({});
  };

  const CurrentStepComponent = steps[currentStep].component;

  const validateStep = (): FormErrors => {
    const {
      firstName,
      lastName,
      email,
      phone,
      drinkCategory,
      alcoholicType,
      glassType,
      drinkIngredient,
    } = formData;

    if (currentStep === 0) {
      const validations = [
        {
          condition: !firstName.trim(),
          field: "firstName" as const,
          message: tCommon("validation.firstNameRequired"),
        },
        {
          condition: !lastName.trim(),
          field: "lastName" as const,
          message: tCommon("validation.lastNameRequired"),
        },
        {
          condition: !email.trim(),
          field: "email" as const,
          message: tCommon("validation.emailRequired"),
        },
        {
          condition: email.trim() && !/\S+@\S+\.\S+/.test(email),
          field: "email" as const,
          message: tCommon("validation.emailInvalid"),
        },
        {
          condition: !phone.trim(),
          field: "phone" as const,
          message: tCommon("validation.phoneRequired"),
        },
        {
          condition: phone.trim() && !/^\d{8,15}$/.test(phone),
          field: "phone" as const,
          message: tCommon("validation.phoneInvalid"),
        },
      ];

      const firstError = validations.find((validation) => validation.condition);
      if (firstError) {
        return { [firstError.field]: firstError.message };
      }
    }

    if (currentStep === 1) {
      const validations = [
        {
          condition: !drinkCategory,
          field: "drinkCategory" as const,
          message: tCommon("validation.drinkCategoryRequired"),
        },
        {
          condition: !alcoholicType,
          field: "alcoholicType" as const,
          message: tCommon("validation.alcoholicTypeRequired"),
        },
        {
          condition: !glassType,
          field: "glassType" as const,
          message: tCommon("validation.glassTypeRequired"),
        },
        {
          condition: !drinkIngredient,
          field: "drinkIngredient" as const,
          message: tCommon("validation.drinkIngredientRequired"),
        },
      ];

      const firstError = validations.find((validation) => validation.condition);
      if (firstError) {
        return { [firstError.field]: firstError.message };
      }
    }

    return {};
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      <div className="language-switcher-fixed">
        <LanguageSwitcher />
      </div>

      <Card title={steps[currentStep].title}>
        <div className="text-center text-muted text-italic mb-6">
          {t("steps.stepIndicator", {
            current: currentStep + 1,
            total: steps.length,
          })}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <CurrentStepComponent
            data={formData}
            onFieldChange={handleFieldChange}
            errors={errors}
          />

          <div className="navigation-buttons">
            {!isFirstStep ? (
              <BackButton onClick={handleBack} />
            ) : (
              <div className="navigation-spacer" aria-hidden="true"></div>
            )}

            {!isLastStep && <NextButton onClick={handleNext} />}
          </div>
        </form>
      </Card>
    </>
  );
};

export default DrinkPreferencesWizard;
