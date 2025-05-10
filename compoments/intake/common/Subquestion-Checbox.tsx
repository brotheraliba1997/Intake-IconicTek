import React from "react";

function SubquestionChecbox({ subquestion, index }: any) {
  return (
    <div className="col-12 mb-3" key={index}>
      <div className="d-flex align-items-start flex-column flex-md-row gap-3">
        <label className="fw-bold " style={{ minWidth: "600px" }}>
          {subquestion.title}
        </label>

        <div className="d-flex flex-wrap gap-3">
          {subquestion?.options?.map((option: any, j: any) => (
            <div className="form-check" key={j}>
              <input
                className="form-check-input"
                type="checkbox"
                name={`subquestion-${index}`}
                id={`option-${index}-${j}`}
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
