import React from 'react';

export default function TextInputCom({
  label,
  name,
  value,
  onChange,
  placeholder,
  error
}) {
  return (
    <div className="myinput">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Enter your ${label?.toLowerCase() || 'value'}`}
        className={`form-input ${error ? 'input-error' : ''}`}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
