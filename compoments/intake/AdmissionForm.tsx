"use client";
import React, { useEffect, useState } from "react";
import { useGetMyFormQuery } from "@/redux/services/form";
import { AnswerData } from "@/types/common";
import { FormQuestions } from "@/types/form-data";

function ADMISSIONFORM({ handleBack, handleNext, currentStep }: any) {
  const [formData, setFormData] = useState<AnswerData[]>([]);
  const { data, isLoading, error } = useGetMyFormQuery({});
  const formName = "ADMISSION FORM AND DATA SHEET";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  useEffect(() => {
    if (dataGet) {
      const initialFormData: AnswerData[] = [];

      dataGet.formQuestions.forEach((question: any) => {
        // Add main question if it's not HTML type
        if (question?.question.type !== "html") {
          initialFormData.push({
            questionId: question?.questionId,
            value: "",
            multipleValue: [],
            type: question?.question.type,
          });
        }

        // Add sub questions if they exist
        if (question?.question?.SubQuestion?.length > 0) {
          question.question.SubQuestion.forEach((subQ: any) => {
            initialFormData.push({
              questionId: subQ.id, // Use subQ.id consistently
              value: "",
              multipleValue: [],
              type: subQ.type,
            });
          });
        }
      });

      console.log("Initial form data:", initialFormData);
      setFormData(initialFormData);
    }
  }, [dataGet]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionId: string | null,
    isMultiple: boolean,
    type: string
  ) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      const newFormData = prevFormData.map((quest) => {
        // Check if this is the question we're updating
        if (quest.questionId === questionId) {
          if (isMultiple && optionId) {
            // Handle checkbox updates
            let newMultipleValue = [...quest.multipleValue];
            if (checked) {
              newMultipleValue.push(optionId);
            } else {
              newMultipleValue = newMultipleValue.filter(
                (val) => val !== optionId
              );
            }
            return { ...quest, multipleValue: newMultipleValue };
          } else {
            // Handle text/date input updates
            return { ...quest, value: value };
          }
        }
        return quest;
      });

      return newFormData;
    });
  };

  console.log(formData, "formData")

  const questions = dataGet?.formQuestions
    ?.slice()
    ?.sort(
      (a: FormQuestions, b: FormQuestions) => a.arrangement - b.arrangement
    );

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
        <h3 className="card-title text-center">{dataGet?.title}</h3>
        {questions?.map((items: FormQuestions, index: number) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              {items?.question.type === "html" && (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: items?.question.title }}
                  />
                  <div className="row">
                    {items.question?.SubQuestion?.map(
                      (subQuest: any, index: number) => {
                        if (
                          subQuest.type === "text" ||
                          subQuest.type === "date"
                        ) {
                          return (
                            <div key={index} className="col-md-6 mb-3">
                              <label className="form-label">
                                {subQuest.title}
                              </label>
                              <input
                                type={
                                  subQuest.type === "date" ? "date" : "text"
                                }
                                className="form-control"
                                placeholder="Enter..."
                                value={
                                  formData.find(
                                    (q) => q.questionId === subQuest.id
                                  )?.value || ""
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e,
                                    subQuest.id,
                                    null,
                                    false,
                                    subQuest.type
                                  );
                                }}
                              />
                            </div>
                          );
                        }
                        return null;
                      }
                    )}
                  </div>
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

export default ADMISSIONFORM;
