import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import { AnswerData } from "@/types/common";
import ESignature from "../E-Signature/E-signature";

function IndividualAbuse({ handleBack, handleNext, currentStep }: any) {
  const [formData, setFormData] = useState<AnswerData[]>([]);

  const formName = "Individual Abuse";
  const { data, isLoading, error } = useGetMyFormQuery({});

  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  useEffect(() => {
    if (dataGet)
      setFormData(
        dataGet?.formQuestions?.map((question: any) => ({
          questionId: question?.questionId,
          value: "",
          multipleValue: [],
          type: question?.question.type,
        }))
      );
  }, [dataGet]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // console.log("formData", formData);

  const handleCheckboxChange = (
    e: any,
    option: any,
    index: any,
    questionId: string
  ) => {
    const isChecked = e.target.checked;

    // Update formData for checkbox values
    setFormData((prev: AnswerData[]) => {
      return prev.map((item) => {
        if (item.questionId === questionId) {
          let multipleValue = [...(item.multipleValue || [])];
          if (isChecked) {
            multipleValue.push(option.title);
          } else {
            multipleValue = multipleValue.filter((val) => val !== option.title);
          }
          return { ...item, multipleValue };
        }
        return item;
      });
    });

    // Handle "Other:" option UI state
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
          prev.filter(
            (item: any) =>
              !(item.index === index && item.title === option.title)
          )
        );
      }
    }
  };

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
        if (isMultiple) {
          let multipleValue = quest.multipleValue || [];
          const optionIndex = multipleValue.findIndex(
            (option: any) => option.optionId === optionId
          );
          if (optionIndex !== -1) {
            // Update existing value
            multipleValue = multipleValue.map((val, index) =>
              index === optionIndex ? { ...val, value: value } : val
            );
          } else {
            // Add new value
            multipleValue.push({ optionId: optionId, value: value });
          }
          return { ...quest, multipleValue, value: "" };
        } else {
          return { ...quest, value, multipleValue: [] };
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
    ?.map((items: any) => items?.question);

  const signatureValue = (val: any, items: any) => {
    setFormData((prev: any) =>
      prev.map((quest: any) =>
        quest.questionId === items ? { ...quest, signatureLink: val } : quest
      )
    );
  };

  console.log("form", formData);

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.IndividualAbuse?.title}
        </h3>
        {question?.map((items: any, index: any) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              <div>
                {items?.SubQuestion && items.SubQuestion.length > 0 && (
                  <div className="row">
                    {items.SubQuestion.map((sub: any, i: number) => (
                      <div className="col-lg-6" key={i}>
                        {sub?.title && (
                          <label className="form-label">{sub.title}</label>
                        )}

                        {sub?.type === "Signature" ? (
                          <ESignature
                            signatureValue={signatureValue}
                            items={items?.id}
                          />
                        ) : (
                          <input
                            type={sub?.type || "text"}
                            className="form-control"
                            placeholder="Enter..."
                            value={
                              formData
                                .find((item) => item.questionId === items?.id)
                                ?.multipleValue.find(
                                  (val) => val.optionId === sub?.id
                                )?.value || ""
                            }
                            onChange={(e: any) =>
                              handleChange(
                                e,
                                items?.id,
                                sub?.id,
                                true,
                                sub?.type || "text"
                              )
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
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
                        const isChecked = formData
                          .find((item) => item.questionId === items.id)
                          ?.multipleValue?.includes(option.title);

                        return (
                          <div className="col-lg-12" key={i}>
                            <div className="form-check mb-2">
                              {option.show ? (
                                <>
                                  <input
                                    type="checkbox"
                                    value={option.title}
                                    checked={isChecked || false}
                                    className="form-check-input"
                                    id={`option-${index}-${i}`}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        e,
                                        option,
                                        index,
                                        items.id
                                      )
                                    }
                                  />

                                  {matched && (
                                    <textarea
                                      className="form-control mb-2"
                                      placeholder={`Details for question ${
                                        matched.index + 1
                                      }`}
                                      value={
                                        formData.find(
                                          (item) => item.questionId === items.id
                                        )?.value || ""
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e as any,
                                          items.id,
                                          null,
                                          false,
                                          "textarea"
                                        )
                                      }
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
        <div className="d-flex justify-content-between mt-4 pb-5">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {currentStep <= 8 ? (
            <button className="btn btn-primary" onClick={handleNext}>
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

export default IndividualAbuse;
