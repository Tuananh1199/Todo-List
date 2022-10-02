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
        box-sizing:border-box
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
export function InputFilter(props) {
  const { defaultValue, handleChange } = props;
  let params = new URLSearchParams(window.location.search);
  const [value, setValue] = useState(defaultValue);
  return (
    <div style={{ width: "100%" }}>
      <InputComponent>
        <div style={{ marginTop: "0.5rem" }}>
          <input
            name="filter-title"
            id="filter-title"
            type="text"
            value={value ?? ''}
            placeholder="Enter key search...."
            className="input-text"
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                let str = event.target.value;
                str = str.trimStart();
                str = str.trimEnd();
                setValue(str);
                params.set("title", str);
                let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
                window.history.pushState({ path: newurl }, '', newurl);
                handleChange(str);
              }
            }}
          />
        </div>
      </InputComponent>
    </div>
  );
}
