"use client";
import React, { useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";

function POLICYORIENTATIONRECEIPT({
  handleBack,
  handleNext,
  currentStep,
}: any) {
  const [formData, setFormData] = useState(
    Formlist?.STANDARDRELEASEOFINFORMATION?.formQuestions?.map((itms) => ({
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

  const formName = "Policy Orientation Receipt";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
    ?.map((items: any) => items?.question);

  console.log(question, "datadata");

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">{/* {question.title} */}</h3>

        <div className="row pt-3">
          {question?.map((items: any, index) => {
            if (items.type === "text" || items.type === "date") {
              return (
                <div key={index} className="col-lg-6 mb-4">
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
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
        {question?.map((items, index) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              {items.type !== "html" &&
                items.type !== "text" &&
                items.type !== "date" && (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: items.title }} />
                  </>
                )}

              <div className="row">
                {items.type === "textarea" && (
                  <textarea className="form-control" id="" rows={3}></textarea>
                )}

                {items.type === "checkbox" &&
                  items?.options &&
                  items.options.length > 0 && (
                    <div className="row">
                      {items.options.map((option: any, i) => (
                        <div className="col-lg-12" key={i}>
                          <div className="form-check mb-2">
                            {option.show ? (
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
    </>
  );
}

export default POLICYORIENTATIONRECEIPT;
