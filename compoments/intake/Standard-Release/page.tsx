import React, { useState } from "react";
import Formlist from "@/form";

function StandardRelease() {
  const [getValue, setValue] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionId: string | null,
    isMultiple: boolean,
    type: string, // for 'checkbox', 'radio', etc.
    
  ) => {
    const { value, checked } = e.target;
  
    setValue((prev: any[]) => {
      const existing = prev.find(item => item.questionId === questionId);
  
      // For checkbox (multiple values)
      if (isMultiple) {
        if (existing) {
          const current = Array.isArray(existing.multipleValue) ? existing.multipleValue : [];
  
          // Handle adding/removing values for checkboxes
          const updatedMultiple = checked
            ? [...current, value]
            : current.filter((v: string) => v !== value);
  
          return prev.map(item =>
            item.questionId === questionId
              ? {
                  ...item,
                  multipleValue: updatedMultiple.length > 0 ? updatedMultiple : null, // Store as array or null if empty
                  value: null,
                  
                  type,
                }
              : item
          );
        } else {
          return [
            ...prev,
            {
              questionId,
              
              value: null,
              multipleValue: [value],
              type,
            },
          ];
        }
      }
  
      // For single value input (radio, text)
      if (existing) {
        return prev.map(item =>
          item.questionId === questionId
            ? {
                ...item,
                value,
                multipleValue: null,
                
                type,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            questionId,
            value,
            multipleValue: null,
            type,
          },
        ];
      }
    });
  };
  
  
  
  
  
  
  

  console.log(getValue, "getValue");
  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.STANDARDRELEASEOFINFORMATION?.title}
        </h3>

        <div className="row pt-3">
          {Formlist?.STANDARDRELEASEOFINFORMATION?.questions?.map(
            (items, index: any) => {
              if (items.type === "text" || items.type === "date") {
                return (
                  <div key={index} className="col-lg-6">
                    {items.type !== "html" && (
                      <div
                        className="pb-2"
                        dangerouslySetInnerHTML={{ __html: items.title }}
                      />
                    )}
                    <input
                      type={items.type}
                      className="form-control"
                      placeholder="Enter..."
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                );
              }

              return null;
            }
          )}
        </div>

        {Formlist?.STANDARDRELEASEOFINFORMATION?.questions?.map(
          (items, index) => (
            <>
              <div
                key={index}
                className="d-flex justify-content-between w-100 align-items-center"
              >
                <div className="d-flex flex-column gap-2 my-2 w-100">
                  {items.type !== "html" &&
                    items.type !== "text" &&
                    items.type !== "date" && (
                      <>
                        <div
                          dangerouslySetInnerHTML={{ __html: items.title }}
                        />
                      </>
                    )}

                  {items.type === "textarea" && (
                    <textarea
                      className="form-control mb-2"
                      id=""
                      rows={3}
                      onChange={(e: any) => handleChange(e, index)}
                    ></textarea>
                  )}

                  {items?.options && items.options.length > 0 && (
                    <div className="row">
                      {items.options.map((option, i) => (
                        <div className="col-lg-6" key={i}>
                          <div className="form-check mb-2">
                            <input
                              type={option.type}
                              className="form-check-input"
                              id={`option-${index}-${i}`}
                              value={i}
                              onChange={(e) =>
                                handleChange(e, "6810fab4e790acc27183cc94", null, true, "checkbox")
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`option-${index}-${i}`}
                            >
                              {option.title}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {items.type === "html" && (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: items.title }} />
                    </>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}

export default StandardRelease;
