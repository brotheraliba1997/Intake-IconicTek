"use client";
import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";

function FUNDSANDPROPERTY({ handleBack, handleNext, currentStep }: any) {
  const { data, isLoading, error } = useGetMyFormQuery({});
  const formName = "FUNDS AND PROPERTY AUTHORIZATION";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  console.log(dataGet, "dataGet");

  const [formData, setFormData] = useState();
  useEffect(() => {
    if (dataGet)
      setFormData(
        dataGet?.formQuestions?.map((items: any) => ({
          questionId: items?.id,
          value: "",
          multipleValue: [],
          type: items?.question.type,
        }))
      );
  }, [dataGet]);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      questionId: string,
      optionId: string | null,
      isMultiple: boolean,
      type: string
    ) => {
      console.log(isMultiple, "isMultiple");
      const { value, checked } = e.target;
  
      const arrayfound = formData?.map((quest: any) => {
        if (quest?.questionId === questionId) {
          if (isMultiple) {
            let multipleValue = quest.multipleValue;
            const optionFound = multipleValue?.find(
              (option: any) => option === optionId
            );
            if (optionFound) {
              multipleValue = multipleValue.filter(
                (val: any) => val !== optionId
              );
            } else {
              multipleValue.push(optionId);
            }
            return {
              ...quest,
              multipleValue,
            };
          } else {
            return { ...quest, value };
          }
        } else {
          return quest;
        }
      });
  
      setFormData(arrayfound);
    };

  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
    // ?.map((items: any) => items?.question);

  console.log(question, "question");

  const handleSubmit = async () => {
    const payload = { formId: dataGet?.id, answers: formData };

    console.log(payload, "handleSubmit");
        handleNext();
    // try {
    //   const response = await createAnswersMutation(payload).unwrap();
    //   if (response) {
    
    //   }
    //   console.log("Response:", response);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.FUNDSANDPROPERTY?.title}
        </h3>
        {question?.map((items: any, index: any) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              {items?.question?.type !== "html" && (
                <>
                  <div dangerouslySetInnerHTML={{ __html: items?.question?.title }} />
                </>
              )}

              <div>
                {(items?.question.type === "text" || items?.question.type === "date") && (
                  <input
                    type={items.type}
                    className="form-control"
                    placeholder="Enter..."
                  />
                )}
                {items?.question.type === "textarea" && (
                  <textarea className="form-control" id="" rows={3}></textarea>
                )}

                {items?.question?.options && items?.question.options.length > 0 && (
                  <div className="row">
                    {items?.question.options.map((option: any, i) => (
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
              </div>

              {items?.question.type === "html" && (
                <>
                  <div dangerouslySetInnerHTML={{ __html: items?.question.title }} />
                </>
              )}
            </div>
          </div>
        ))}


         <div className="d-flex justify-content-between mt-4 pb-5">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {currentStep <= 8 ? (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Next
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => alert("Form Submitted!")}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default FUNDSANDPROPERTY;
