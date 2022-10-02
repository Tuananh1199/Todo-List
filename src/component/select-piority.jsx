import { useState } from 'react';
import Select from 'react-select';

export const DataSelect = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Low', label: 'Low' },
  { value: 'High', label: 'High' },
];

const getValue = (value) => {
  return DataSelect.filter((x) => x.value === value);
};

export const SelectPriority = (props) => {
  const { placeholder, defaultValue, required, disabled, handleChange } = props;
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <label htmlFor="type" style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
        Piority
        {required && <span className="text-red-500 ml-2 font-semibold">*</span>}
      </label>
      <div style={{ marginTop: "0.5rem" }}>
        <Select
          options={DataSelect}
          placeholder={placeholder ?? 'Select...'}
          value={getValue(value)}
          onChange={(e) => {
            setValue(e.value)
            handleChange(e.value, "piority")
          }}
          styles={{ boxSizing: "border-box" }}
          disabled={disabled}
        />
      </div>
    </div >
  );
};
