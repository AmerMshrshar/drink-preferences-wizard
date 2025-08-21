import React from "react";
import "./NavigationButtons.css";

const NavigationButtons = ({ currentStep, totalSteps, onNext, onBack }) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="navigation-buttons">
      {!isFirstStep && (
        <button onClick={onBack} className="nav-button back-button">
          Back
        </button>
      )}
      {!isLastStep && (
        <button onClick={onNext} className="nav-button next-button">
          Next
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
