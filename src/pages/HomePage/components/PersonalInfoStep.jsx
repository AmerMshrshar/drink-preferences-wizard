import React from "react";
import Input from "../../../components/common/Input/Input";

const PersonalInfoStep = ({ data, onFieldChange }) => {
  return (
    <>
      <Input
        label="First Name"
        name="firstName"
        value={data.firstName}
        onChange={onFieldChange}
      />
      <Input
        label="Last Name"
        name="lastName"
        value={data.lastName}
        onChange={onFieldChange}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={data.email}
        onChange={onFieldChange}
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={data.phone}
        onChange={onFieldChange}
      />
    </>
  );
};

export default PersonalInfoStep;
