import React, { useState } from "react";
import Card from "../../components/common/Card";
import PersonalInfoStep from "../../components/components-homepage/PersonalInfoStep";
import DrinkPreferencesStep from "../../components/components-homepage/DrinkPreferencesStep";
import SummaryStep from "../../components/components-homepage/SummaryStep";
import NavigationButtons from "../../components/components-homepage/NavigationButtons";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  drinkCategory: "",
  alcoholicType: "",
  glassType: "",
  drinkIngredient: "",
};

const steps = [
  { title: "Step 1: Personal Information", component: PersonalInfoStep },
  { title: "Step 2: Drink Preferences", component: DrinkPreferencesStep },
  { title: "Step 3: Summary", component: SummaryStep },
];

const DrinkPreferencesWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
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

  const validateStep = () => {
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
          field: "firstName",
          message: "First name is required.",
        },
        {
          condition: !lastName.trim(),
          field: "lastName",
          message: "Last name is required.",
        },
        {
          condition: !email.trim(),
          field: "email",
          message: "Email is required.",
        },
        {
          condition: email.trim() && !/\S+@\S+\.\S+/.test(email),
          field: "email",
          message: "Email address is invalid.",
        },
        {
          condition: !phone.trim(),
          field: "phone",
          message: "Phone number is required.",
        },
        {
          condition: phone.trim() && !/^\d{8,15}$/.test(phone),
          field: "phone",
          message: "Phone number must be 8-15 digits only.",
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
          field: "drinkCategory",
          message: "Please select a drink category.",
        },
        {
          condition: !alcoholicType,
          field: "alcoholicType",
          message: "Please select an alcoholic type.",
        },
        {
          condition: !glassType,
          field: "glassType",
          message: "Please select a glass type.",
        },
        {
          condition: !drinkIngredient,
          field: "drinkIngredient",
          message: "Please select an ingredient.",
        },
      ];

      const firstError = validations.find((validation) => validation.condition);
      if (firstError) {
        return { [firstError.field]: firstError.message };
      }
    }

    return {};
  };

  return (
    <Card title={steps[currentStep].title}>
      <div className="text-center text-muted text-italic mb-6">
        Step {currentStep + 1} of {steps.length}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <CurrentStepComponent
          data={formData}
          onFieldChange={handleFieldChange}
          errors={errors}
        />
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onBack={handleBack}
        />
      </form>
    </Card>
  );
};

export default DrinkPreferencesWizard;
