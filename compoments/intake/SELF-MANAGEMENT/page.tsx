import React from "react";
import Formlist from "@/form";

function SELFMANAGEMENT() {
  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.SELFMANAGEMENT?.title}
        </h3>

        <div className="row pt-3">
          {Formlist?.SELFMANAGEMENT?.questions?.map((items, index) => {
            if (items.type === "text" || items.type === "date") {
              return (
                <div key={index} className="col-lg-6">
                  {items.type !== "html" && (
                    <div
                      className=""
                      dangerouslySetInnerHTML={{ __html: items.title }}
                    />
                  )}
                  <input
                    type={items.type}
                    className="form-control mb-4"
                    placeholder="Enter..."
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {Formlist?.SELFMANAGEMENT?.questions?.map((items, index) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            
            

              <div>
                
               

                {items.type === "textarea" && (
                  <textarea className="form-control" id="" rows={3}></textarea>
                )}

                {items?.subQuestion && items.subQuestion.length > 0 && (
                  <div className="row">
                    {items.subQuestion.map((subquestion, i) => (
                      <div className="col-12 mb-3" key={i}>
                        <div className="d-flex align-items-start flex-column flex-md-row gap-3">
                          <label
                            className="fw-bold "
                            style={{ minWidth: "600px" }}
                          >
                            {subquestion.title}
                          </label>

                          <div className="d-flex flex-wrap gap-3">
                            {subquestion?.options?.map((option, j) => (
                              <div className="form-check" key={j}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name={`subquestion-${i}`}
                                  id={`option-${i}-${j}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`option-${i}-${j}`}
                                >
                                  {option.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.type === "html" && (
                <>
                  <div dangerouslySetInnerHTML={{ __html: items.title }} />
                </>
              )}
            </div>
        ))}
        </div>
      
    </>
  );
}

export default SELFMANAGEMENT;
