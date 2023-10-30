import React, { useState } from 'react';

function Dropdown({ label, options, onChange }) {
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select
        name={label}
        id={label}
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          onChange(e);
        }}
      >
        <option value="" disabled hidden>
          Select a {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default Dropdown;
