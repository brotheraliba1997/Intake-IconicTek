"use client";
import React, { useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";

function ADMISSIONFORM() {
  const [formData, setFormData] = useState(
    Formlist?.STANDARDRELEASEOFINFORMATION?.questions?.map((itms) => ({
      questionId: itms?.id,
      value: "",
      multipleValue: [],
      type: itms?.type,
    }))
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionId: string | null,
    isMultiple: boolean,
    type: string
  ) => {
    const { value, checked } = e.target;

    const arrayfound = formData?.map((quest: any) => {
      if (quest.questionId === questionId) {
        let multipleValue = quest.multipleValue;
        const optionFound = multipleValue?.find(
          (option: any) => option === optionId
        );
        if (optionFound) {
          multipleValue = multipleValue.filter((val: any) => val !== optionId);
        } else {
          multipleValue.push(optionId);
        }

        if (isMultiple) {
          return { ...quest, multipleValue };
        } else {
          return { ...quest, value };
        }
      } else {
        return quest;
      }
    });

    setFormData(arrayfound);
  };

  const { data, isLoading, error } = useGetMyFormQuery({});
  console.log(data?.data, "datadata");

  const formName = "ADMISSION FORM AND DATA SHEET";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  const question = dataGet?.questions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
    ?.map((items: any) => items?.question);
  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.ADMISSIONFORMANDDATASHEET?.title}
        </h3>
        {question?.map((items: any, index: any) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              {/* <h4 className="card-title">{items.title}</h4> */}

              {items.type !== "html" && (
                <>
                  <div
                    className="pb-2"
                    dangerouslySetInnerHTML={{ __html: items.title }}
                  />
                </>
              )}

              <div>
                {/* {(items.type === "text" || items.type === "date") && (
                  <input
                    type={items.type}
                    className="form-control"
                    placeholder="Enter..."
                  />
                )} */}

                {/* {items.type === "textarea" && (
                  <textarea
                    className="form-control"
                    id=""
                    rows={3}
                    onChange={(e: any) => setValue(e.target.value)}
                  ></textarea>
                )} */}

                {items.type === "text" &&
                  items?.options &&
                  items.options.length > 0 && (
                    <div className="row pb-2">
                      {items.options.map((option, i) => (
                        <div className="col-lg-6" key={i}>
                          <div className="form-check mb-2">
                            <label
                              className="form-check-label pt-3"
                              htmlFor={`option-${index}-${i}`}
                            >
                              {option.title}
                            </label>
                            <input
                              type="text" // input ka type yahan hardcoded 'text' rakhna sahi hoga agar sab text fields hain
                              className="form-control pt-3"
                              id={`option-${index}-${i}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {items.type === "html" && (
                  <>
                    <div
                      className="pb-2"
                      dangerouslySetInnerHTML={{ __html: items.title }}
                    />
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

export default ADMISSIONFORM;
