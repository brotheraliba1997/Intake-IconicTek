import React from "react";
import Formlist from "@/form";

function AuthorizationForMedication() {
  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.ADMISSIONFORM?.title}
        </h3>
        {Formlist?.ADMISSIONFORM?.questions?.map((items, index) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              <h4 className="card-title">{items.title}</h4>

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

                {items?.options && items.options.length > 0 && (
                  <div className="row">
                    {items.options.map((option, i) => (
                      <div className="col-lg-6" key={i}>
                        <div className="form-check mb-2">
                          <input
                            type={option.type}
                            className="form-check-input"
                            id={`option-${index}-${i}`}
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
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex flex-column gap-4 my-4">
          <p>
            {Formlist?.ADMISSIONFORM?.summary &&
              Formlist?.ADMISSIONFORM?.summary}
          </p>
          <ul>
            {Formlist?.ADMISSIONFORM?.description &&
              Formlist?.ADMISSIONFORM?.description.length > 0 &&
              Formlist?.ADMISSIONFORM.description.map((option, i) => (
                <li key={i}>{option.point}</li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AuthorizationForMedication;
