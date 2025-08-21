import React from "react";
import "./Select.css";

const Select = ({ label, name, value, onChange, options, loading }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
        disabled={loading}
      >
        <option value="">{loading ? "Loading..." : `Select ${label}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
