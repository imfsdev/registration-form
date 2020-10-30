import React from "react";

const Select = ({ options, handleSelectChange }) => {
  return (
    <select defaultValue='Please select one' onChange={handleSelectChange}>
      <option>Please select one</option>
      {options &&
        options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default Select;
