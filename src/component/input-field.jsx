import { useState } from "react";
import styled from "styled-components";

const InputComponent = styled.div`
    .input-text {
        outline: 2px solid transparent;
        outline-offset: 2px;
        padding: 0.7rem 0.75rem;
        border-radius: 0.25rem;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(209, 213, 219);
        width: 100%;
        box-sizing: border-box;
    }

    input, textarea:focus {
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
export function InputField(props) {
  const { field, title, defaultValue, required, placeHolder, inputType = 'text', disabled, handleChange, handleDisable } = props;
  const [error, setError] = useState(undefined);
  const [value, setValue] = useState(defaultValue);

  return (
    <div style={{ width: "100%" }}>
      <InputComponent>
        <label htmlFor={field}>
          {title ?? field}
          {required && <span className="field-required">*</span>}
        </label>
        <div style={{ marginTop: "0.5rem" }}>
          {inputType === 'textarea' ? (
            <textarea
              name={field}
              rows={4}
              id={field}
              disabled={disabled}
              value={value}
              className="input-text"
              placeholder={placeHolder}
              onChange={(event) => {
                setValue(event.target.value)
                handleChange(event.target.value, field);
              }}
            />
          ) : (
            <input
              name={field}
              id={field}
              type={inputType}
              value={value ?? ''}
              disabled={disabled}
              placeholder={placeHolder}
              className="input-text"
              style={{ borderColor: error ? "rgba(239, 68, 68)" : "rgba(209, 213, 219)" }}
              onChange={(event) => {
                let str = event.target.value;
                str = str.trimStart();
                if (required) {
                  if (!str) {
                    setError(true)
                    handleDisable(true)
                  } else {
                    setError(false)
                    handleDisable(false)
                  }
                }
                setValue(event.target.value)
                handleChange(event.target.value, field);
              }}
            />
          )}
        </div>
        {error && (
          <div className="text-error">Title is required</div>
        )}
      </InputComponent>
    </div>
  );
}
