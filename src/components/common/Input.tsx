import React from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  numbersOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  numbersOnly = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
