import React from "react";
import "./SummaryStep.css";

const SummaryStep = ({ data }) => {
  return (
    <div className="summary-container">
      <h3>Review Your Information</h3>
      <div className="summary-section">
        <h4>Personal Information</h4>
        <p>
          <strong>First Name:</strong> {data.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {data.lastName}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone}
        </p>
      </div>
      <div className="summary-section">
        <h4>Drink Preferences</h4>
        <p>
          <strong>Category:</strong> {data.drinkCategory || "Not selected"}
        </p>
        <p>
          <strong>Alcoholic Type:</strong>{" "}
          {data.alcoholicType || "Not selected"}
        </p>
        <p>
          <strong>Glass Type:</strong> {data.glassType || "Not selected"}
        </p>
        <p>
          <strong>Ingredient:</strong> {data.drinkIngredient || "Not selected"}
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
