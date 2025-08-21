import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import PersonalInfoStep from './components/PersonalInfoStep';
import DrinkPreferencesStep from './components/DrinkPreferencesStep';
import SummaryStep from './components/SummaryStep';
import NavigationButtons from './components/NavigationButtons';
import './DrinkPreferencesWizard.css';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  drinkCategory: '',
  alcoholicType: '',
  glassType: '',
  drinkIngredient: '',
};

const steps = [
  { title: 'Step 1: Personal Information', component: PersonalInfoStep },
  { title: 'Step 2: Drink Preferences', component: DrinkPreferencesStep },
  { title: 'Step 3: Summary', component: SummaryStep },
];

const DrinkPreferencesWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Card title={steps[currentStep].title}>
      <div className="wizard-progress">
        Step {currentStep + 1} of {steps.length}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <CurrentStepComponent data={formData} onFieldChange={handleFieldChange} />
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