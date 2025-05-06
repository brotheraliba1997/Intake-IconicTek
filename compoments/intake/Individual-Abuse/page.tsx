import React, { useState } from "react";
import Formlist from "@/form";

function IndividualAbuse() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (e: any, option: any, index: any) => {
    const isChecked = e.target.checked;

    if (option.title === "Other:") {
      if (isChecked) {
        setSelectedValues((prev: any) => {
          const alreadyExists = prev.some(
            (item: any) => item.index === index && item.title === option.title
          );
          if (!alreadyExists) {
            return [...prev, { index, title: option.title }];
          }
          return prev;
        });
      } else {
        setSelectedValues((prev) =>
          prev.filter((item: any) => !(item.index === index && item.title === option.title)
          )
        );
      }
    }

    // Yahan aap aur bhi update kar sakte ho, jaise form state etc.
  };

  console.log(selectedValues, "selectedValues");

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.IndividualAbuse?.title}
        </h3>
        {Formlist?.IndividualAbuse?.questions?.map((items, index) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              {/* <h4 className="card-title">{items.title}</h4> */}

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
                          <div className="col-lg-6 " key={i}>
                            {option?.title && (
                              <label className="form-label">
                                {option.title}
                              </label>
                            )}
                            {option?.show ? (
                              <input
                                type={items?.type}
                                className="form-control mb-3"
                                placeholder="Enter..."
                              />
                            ) : (
                              <input
                                type="date"
                                className="form-control mb-3"
                                placeholder="Enter..."
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <input
                        type={items.type}
                        className="form-control mb-3"
                        placeholder="Enter..."
                      />
                    )}
                  </>
                )}

                {items.type === "checkbox" &&
                  items?.options &&
                  items.options.length > 0 && (
                    <div className="row">
                      {items.options.map((option: any, i: number) => {
                        const matched = selectedValues?.find(
                          (item: any) =>
                            item.index === index && item.title === option.title
                        );

                        return (
                          <div className="col-lg-12" key={i}>
                            <div className="form-check mb-2">
                              {option.show ? (
                                <>
                                  <input
                                    type="checkbox"
                                    value={option.title}
                                    className="form-check-input"
                                    id={`option-${index}-${i}`}
                                    onChange={(e) =>
                                      handleCheckboxChange(e, option, index)
                                    }
                                  />

                                  {matched && (
                                    <textarea
                                      className="form-control mb-2"
                                      placeholder={`Details for question ${
                                        matched.index + 1
                                      }`}
                                      rows="3"
                                    ></textarea>
                                  )}

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
                        );
                      })}
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
    </>
  );
}

export default IndividualAbuse;
