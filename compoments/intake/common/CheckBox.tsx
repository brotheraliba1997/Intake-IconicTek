"use client";
import React from "react";

function CheckBox({ handleChange, option, optionIndex, index, items }: any) {
  return (
    <>
      <div className="col-lg-6" key={optionIndex}>
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id={`option-${index}-${optionIndex}`}
            value={option?.id}
            onChange={(e) =>
              handleChange(e, items?.id, option?.id, true, true)
            }
          />
          <label
            className="form-check-label"
            htmlFor={`option-${index}-${optionIndex}`}
          >
            {option.title}
          </label>
        </div>
      </div>
    </>
  );
}

export default CheckBox;
