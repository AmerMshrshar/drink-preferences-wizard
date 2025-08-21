import React from 'react';
import './Input.css';

const Input = ({ label, name, value, onChange, type = 'text', placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        // placeholder={placeholder || `Enter ${label}...`}
        className="form-input"
      />
    </div>
  );
};

export default Input;