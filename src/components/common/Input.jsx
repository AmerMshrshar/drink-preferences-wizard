import React from "react";

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  numbersOnly = false,
}) => {
  const handleChange = (e) => {
    if (numbersOnly) {
      const numericValue = e.target.value.replace(/[^0-9]/g, "");
      e.target.value = numericValue;
    }
    onChange(e);
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className="form-control"
        inputMode={numbersOnly ? "numeric" : "text"}
      />
    </div>
  );
};

export default Input;
