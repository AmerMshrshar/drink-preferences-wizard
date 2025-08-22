import React from "react";
import Input from "../common/Input";

const PersonalInfoStep = ({ data, onFieldChange, errors }) => {
  return (
    <>
      <Input
        label="First Name"
        name="firstName"
        value={data.firstName}
        onChange={onFieldChange}
        required
      />
      {errors.firstName && (
        <span className="error-text">{errors.firstName}</span>
      )}{" "}
      <Input
        label="Last Name"
        name="lastName"
        value={data.lastName}
        onChange={onFieldChange}
        required
      />
      {errors.lastName && <span className="error-text">{errors.lastName}</span>}
      <Input
        label="Email"
        name="email"
        type="email"
        value={data.email}
        onChange={onFieldChange}
        required
      />
      {errors.email && <span className="error-text">{errors.email}</span>}
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={data.phone}
        onChange={onFieldChange}
        required
        numbersOnly={true}
      />
      {errors.phone && <span className="error-text">{errors.phone}</span>}
    </>
  );
};

export default PersonalInfoStep;
