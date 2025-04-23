import React from "react";
import Formlist from "@/form";

function SELFMANAGEMENT() {
  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.SELFMANAGEMENT?.title}
        </h3>
        {Formlist?.SELFMANAGEMENT?.questions?.map((items, index) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2  w-100">
              {items.type !== "html" && (
                <>
                  <h6
                    className="pb-2"
                    dangerouslySetInnerHTML={{ __html: items.title }}
                  />
                </>
              )}

              <div>
                {(items.type === "text" || items.type === "date") && (
                  <input
                    type={items.type}
                    className="form-control"
                    placeholder="Enter..."
                  />
                )}

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
          </div>
        ))}
      </div>
    </>
  );
}

export default SELFMANAGEMENT;
