import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import { useCreateAnswersMutation } from "@/redux/services/answer";
import HtmlRenderer from "./common/HtmlRenderer";

function AuthorizationForMedication({
  handleBack,
  handleNext,
  currentStep,
}: any) {
  const { data, isLoading, error } = useGetMyFormQuery({});

  const formName = "AUTHORIZATION FOR MEDICATION AND TREATMENT ADMINISTRATION";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);
  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement);

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

  const [createAnswersMutation] = useCreateAnswersMutation();

  const handleSubmit = async () => {
    const payload = { formId: dataGet?.id, answers: formData };

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
          {data?.data?.find((items: any) => items?.title === formName)?.title}
        </h3>

        <div className="row pt-3">
          {question?.map((items: any, index: any) => {
            if (
              items?.question?.type === "text" ||
              items?.question?.type === "date"
            ) {
              return (
                <div key={index} className="col-lg-6 mb-3">
                  {items?.question?.type !== "html" && (
                    <div
                      className="pb-2"
                      dangerouslySetInnerHTML={{
                        __html: items?.question?.title,
                      }}
                    />
                  )}
                  <input
                    type={items?.question?.type}
                    className="form-control"
                    placeholder="Enter..."
                    onChange={(e: any) =>
                      handleChange(
                        e,
                        items?.id,
                        null,
                        false,
                        items?.question?.type
                      )
                    }
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {question?.map((items: any, index: any) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              {items?.question?.type !== "html" &&
                items?.question?.type !== "text" &&
                items?.question?.type !== "date" && (
                  <>
                    <HtmlRenderer items={items} />
                  </>
                )}

              <div>
                {items?.question?.type === "textarea" && (
                  <textarea className="form-control" id="" rows={3}></textarea>
                )}

                {items?.question?.options &&
                  items?.question?.options.length > 0 && (
                    <div className="row">
                      {items?.question.options.map((option: any, i: any) => (
                        <div className="col-lg-6" key={i}>
                          <div className="form-check mb-2">
                            <input
                              type={option.type}
                              className="form-check-input"
                              id={`option-${index}-${i}`}
                              onChange={(e: any) =>
                                handleChange(
                                  e,
                                  items?.id,
                                  option.id,
                                  option.isMultiple,
                                  items?.question?.type
                                )
                              }
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

              {items?.question?.type === "html" && (
                <>
                  <HtmlRenderer items={items} />
                </>
              )}
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between mt-4 pb-5">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 1}
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

export default AuthorizationForMedication;
