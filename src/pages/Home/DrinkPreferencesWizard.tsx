import React, { useState } from "react";
import Card from "../../components/common/Card";
import PersonalInfoStep from "../../components/components-homepage/PersonalInfoStep";
import DrinkPreferencesStep from "../../components/components-homepage/DrinkPreferencesStep";
import SummaryStep from "../../components/components-homepage/SummaryStep";
import BackButton from "../../components/components/BackButton";
import NextButton from "../../components/components/NextButton";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useTranslation, useLanguage } from "../../contexts/LanguageContext";

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
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors: FormErrors;
}

interface Step {
  title: string;
  component: React.FC<StepComponentProps>;
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

const DrinkPreferencesWizard: React.FC = () => {
  const { t } = useTranslation("homepage");
  const { t: tCommon } = useTranslation("common");
  const { isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const steps: Step[] = [
    { title: t("steps.step1Title"), component: PersonalInfoStep },
    { title: t("steps.step2Title"), component: DrinkPreferencesStep },
    { title: t("steps.step3Title"), component: SummaryStep },
  ];

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const getTransform = () => {
    const percentage = currentStep * (100 / 3);
    const offset = currentStep * 0.5;

    if (isRTL) {
      return `translateX(calc(${percentage}% - ${offset}rem))`;
    } else {
      return `translateX(calc(-${percentage}% + ${offset}rem))`;
    }
  };

  return (
    <>
      <div className="language-switcher-fixed">
        <LanguageSwitcher />
      </div>

      <div className="wizard-container">
        <div className="wizard-progress">
          <div className="progress-line">
            <div
              className="progress-fill"
              style={{ height: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-steps">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`progress-step ${
                  index <= currentStep ? "active" : ""
                }`}
              >
                <div className="step-circle">
                  <span>{index + 1}</span>
                </div>
                <div className="step-label">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="wizard-cards-container">
          <div
            className="wizard-cards-wrapper"
            style={{
              transform: getTransform(),
            }}
          >
            {steps.map((step, index) => {
              const StepComponent = step.component;
              return (
                <div
                  key={index}
                  className={`wizard-card-wrapper ${
                    index === currentStep ? "active" : ""
                  }`}
                >
                  <Card title={step.title}>
                    <div className="text-center text-muted text-italic mb-6">
                      {t("steps.stepIndicator", {
                        current: index + 1,
                        total: steps.length,
                      })}
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <StepComponent
                        data={formData}
                        onFieldChange={handleFieldChange}
                        errors={errors}
                      />

                      <div className="navigation-buttons">
                        {!isFirstStep && index === currentStep ? (
                          <BackButton onClick={handleBack} />
                        ) : (
                          <div
                            className="navigation-spacer"
                            aria-hidden="true"
                          ></div>
                        )}

                        {!isLastStep && index === currentStep && (
                          <NextButton onClick={handleNext} />
                        )}
                      </div>
                    </form>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="wizard-navigation-dots">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`nav-dot ${index === currentStep ? "active" : ""}`}
              onClick={() => {
                if (index < currentStep) {
                  setCurrentStep(index);
                  setErrors({});
                }
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DrinkPreferencesWizard;
