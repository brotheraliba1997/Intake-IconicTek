import React from "react";
import Formlist from "@/form";

function ResidencyAgreement() {
  return (
    <div className="card p-5">
      <h3 className="card-title text-center">
        {Formlist?.ResidencyAgreement?.title}
      </h3>
      {Formlist?.ResidencyAgreement?.questions?.map((items, index) => (
        <div
          key={index}
          className="d-flex justify-content-between w-100 align-items-center"
        >
          <div className="d-flex flex-column gap-2 my-2 w-100">
            {items.type !== "html" && (
              <>
                <div dangerouslySetInnerHTML={{ __html: items.title }} />
              </>
            )}

            <div>
              {items.type === "textarea" && (
                <textarea className="form-control" id="" rows={3}></textarea>
              )}

              {(items.type === "text" || items.type === "date") && (
                <>
                  {items?.options && items.options.length > 0 ? (
                    <div className="row">
                      {items.options.map((option: any, i: number) => (
                        <div className="col-lg-12 mb-2" key={i}>
                          {option?.title && (
                            <label className="form-label">{option.title}</label>
                          )}
                          {option?.showCheckbox ? (
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter..."
                            />
                          ) : (
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Enter..."
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={items.type}
                      className="form-control"
                      placeholder="Enter..."
                    />
                  )}
                </>
              )}

              {items.type === "checkbox" &&
                items?.options &&
                items.options.length > 0 && (
                  <div className="row">
                    {items.options.map((option: any, i) => (
                      <div className="col-lg-12" key={i}>
                        <div className="form-check mb-2">
                          {option.showCheckbox ? (
                            <>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`option-${index}-${i}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`option-${index}-${i}`}
                              >
                                {option.title}
                              </label>
                            </>
                          ) : (
                            <p className="fw-bold">{option.title}</p>
                          )}
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
        </div>
      ))}
    </div>
  );
}

export default ResidencyAgreement;
