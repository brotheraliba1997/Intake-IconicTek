import React from "react";

interface SubquestionCheckboxProps {
  subquestion: any;
  index: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    optionId: string,
    isMultiple: boolean
  ) => void;
}

function SubquestionChecbox({
  subquestion,
  index,
  onChange,
}: SubquestionCheckboxProps) {
  return (
    <div className="col-12 mb-3" key={index}>
      <div className="d-flex align-items-start flex-column flex-md-row gap-3">
        <label className="fw-bold " style={{ minWidth: "600px" }}>
          {subquestion.title}
        </label>

        <div className="d-flex flex-wrap gap-3">
          {subquestion?.options?.map((option: any, j: any) => (
            <div className="form-check" key={j}>
              {" "}
              <input
                className="form-check-input"
                type="radio"
                required
                name={`subquestion-${index}`}
                id={`option-${index}-${j}`}
                onChange={(e) => {
                  console.log("option", option);
                  onChange(e, option.id, option.isMultiple);
                }}
              />
              <label
                className="form-check-label"
                htmlFor={`option-${index}-${j}`}
              >
                {option.title}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubquestionChecbox;
