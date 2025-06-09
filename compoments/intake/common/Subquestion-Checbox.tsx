import React from "react";

interface SubquestionCheckboxProps {
  subquestion: any;
  index: number;
  subIndex: number;
  errors: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    optionId: string,
    isMultiple: boolean
  ) => void;
}

function SubquestionChecbox({
  subquestion,
  index,
  subIndex,
  errors,
  onChange,
}: SubquestionCheckboxProps) {
  console.log(errors,subIndex, errors?.answers?.[index]?.subQuestion?.[subIndex], "errorsmil raha hai");
  return (
    <div className="col-12 mb-3" key={index}>
      {" "}
      <div className="d-flex align-items-start flex-column flex-md-row gap-3">
        {" "}
        <label className="fw-bold" style={{ minWidth: "600px" }}>
          {subquestion.title}
        </label>{" "}
        <div className="d-flex flex-wrap gap-3">
          {[...(subquestion?.options || [])]
            .sort((a, b) => {
              const titleA = a.title.trim();
              const titleB = b.title.trim();
              if (titleA === "Yes") return -1;
              if (titleB === "Yes") return 1;
              if (titleA === "No") return -1;
              if (titleB === "No") return 1;
              return 0;
            })
            .map((option: any, j: any) => (
              <div className="form-check" key={j}>
                <input
                  className={`form-check-input ${
                    errors?.answers?.[index]?.subQuestion?.find((items :any) => items?.value?.message === subquestion?.id)
                      ? "is-invalid"
                      : ""
                  }`}
                  type="radio"
                  name={`subquestion-${subquestion.id}`}
                  value={option.id}
                  id={`option-${index}-${j}`}
                  onChange={(e) => {
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
