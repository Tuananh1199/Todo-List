import styled from "styled-components";

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const InputComponent = styled.div`
    .input-text {
        outline: 2px solid transparent;
        outline-offset: 2px;
        padding: 0.7rem 0.7rem;
        border-radius: 0.25rem;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(209, 213, 219);
        width: 100%;
        box-sizing:border-box
    }
    input:focus {
        border-color: rgba(59, 130, 246);
        border-width: 1.5px;
    }

    label {
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    .field-required {
        font-weight: 600;
        margin-left: 0.25rem;
        color: rgba(239, 68, 68);
    }

    .text-error {
      color: rgba(239, 68, 68);
      margin-top: 0.5rem;
      font-size: 0.75rem; 
      line-height: 1rem; 
  }
`

const TODAY = new Date();

export const InputDueDate = (props) => {
  const { field, defaultValue, disabled, handleChange } = props;
  const [dueDate, setDueDate] = useState(defaultValue);
  const [error, setError] = useState(false);

  return (
    <InputComponent>
      <label htmlFor={field}>
        Due Date
      </label>
      <div style={{ marginTop: "0.5rem" }}>
        <DatePicker
          selected={dueDate}
          disabled={disabled}
          dateFormat="d MMMM yyyy"
          onChange={(date) => {
            let dateTime = date.getTime();
            let todayTime = TODAY.getTime();
            if (Math.round(dateTime / 86400000) - Math.round(todayTime / 86400000) >= 0) {
              setDueDate(date)
              handleChange(date, "dueDate")
              setError(false)
            } else {
              setError(true)
            }
          }}
          className="input-text"
        />
      </div>
      {error && (
        <div className="text-error">Do not accept days in the past as due date</div>
      )}
    </InputComponent>
  );
}
