import React from "react";
import Formlist from "@/form";

function StandardRelease() {
  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.STANDARDRELEASEOFINFORMATION?.title}
        </h3>

        <div className="row pt-3">
          {Formlist?.STANDARDRELEASEOFINFORMATION?.questions?.map(
            (items, index) => {
              if (items.type === "text" || items.type === "date") {
                return (
                  <div key={index} className="col-lg-6">
                    {items.type !== "html" && (
                      <div className="pb-2" dangerouslySetInnerHTML={{ __html: items.title }} />
                    )}
                    <input
                      type={items.type}
                      className="form-control"
                      placeholder="Enter..."
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
