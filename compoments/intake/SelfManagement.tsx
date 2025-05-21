"use client";
import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import SubquestionChecbox from "./common/Subquestion-Checbox";
import HtmlRenderer from "./common/HtmlRenderer";
import TextInput from "./common/TextInput";
import { useGetMyFormQuery } from "@/redux/services/form";
import ESignature from "../E-Signature/E-signature";
import { useCreateAnswersMutation } from "@/redux/services/answer";

function SELFMANAGEMENT({ handleBack, handleNext, currentStep }: any) {
  const [formData, setFormData] = useState();

  const signatureValue = (val: any, items: any) => {
    setFormData((prev: any) =>
      prev.map((quest: any) => {
        if (Array.isArray(quest.subQuestion)) {
          const updateQuestion = quest?.subQuestion?.map((subquest: any) => {
            if (subquest?.id === items) {
              return { ...subquest, signatureLink: val };
            } else {
              return subquest;
            }
          });
          return { ...quest, subQuestion: updateQuestion };
        }
        return quest;
      })
    );
  };

  const { data, isLoading, error } = useGetMyFormQuery({});
  const formName = "SELF-MANAGEMENT ASSESSMENT";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  console.log(data, "dataGet");

  useEffect(() => {
    if (dataGet)
      setFormData(
        dataGet?.formQuestions?.map((items: any) => ({
          questionId: items?.id,
          value: "",
          multipleValue: [],
          type: items?.question.type,
          subQuestion: items?.question?.SubQuestion?.map((sub: any) => ({
            value: "",
            multipleValue: [],
            type: sub?.type,
            id: sub?.id,
          })),
        }))
      );
  }, [dataGet]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionId: string | null,
    isMultiple: boolean,
    type: string,
    subQuestionId: string
  ) => {
    const { value, checked } = e.target;
    const arrayfound = formData?.map((quest: any) => {
      if (quest.questionId === questionId) {
        let subQuestionFound = quest?.subQuestion?.map((subQues: any) => {
          if (subQues?.id === subQuestionId) {
            let multipleValue = subQues.multipleValue;
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
            return { ...subQues, multipleValue };
          } else {
            return subQues;
          }
        });
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
          return { ...quest, multipleValue, subQuestion: subQuestionFound };
        } else {
          return { ...quest, value, subQuestion: subQuestionFound };
        }
      } else {
        return quest;
      }
    });

    setFormData(arrayfound);
  };

  const question = dataGet?.formQuestions;
  const [createAnswersMutation] = useCreateAnswersMutation();
  const handleSubmit = async () => {
    const payload = { formId: dataGet?.id, answers: formData };

    console.log(payload, "handleSubmit");

    try {
      const response = await createAnswersMutation(payload).unwrap();
      if (response) {
        handleNext();
      }
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getComponent = ({ type, items, handleChange, signatureValue }: any) => {
    switch (type) {
      case "html":
        return (
          <>
            {type === "html" && <HtmlRenderer items={items} />}

            <div className="row mt-5">
              {items?.question?.SubQuestion?.slice()
                ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
                ?.map((sub: any, i: any) => (
                  <div className="d-flex gap-4 mb-5" key={i}>
                    <ESignature
                      signatureValue={signatureValue}
                      items={sub.id}
                    />

                    <input
                      type="date"
                      className="form-control mb-3"
                      placeholder="Enter..."
                      onChange={(e) =>
                        handleChange(
                          e,
                          items?.id,
                          null,
                          false,
                          items?.question?.type,
                          sub?.id
                        )
                      }
                    />
                  </div>
                ))}
            </div>
          </>
        );

      case "text":
      case "date":
        return (
          <>
            {(type === "text" || type === "date") && (
              <div className="col-lg-6 my-3">
                <HtmlRenderer items={items} />
                {type === "text" && (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text..."
                    onChange={(e: any) => handleChange(e, items?.id)}
                  />
                )}
                {type === "date" && (
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e: any) => handleChange(e, items?.id)}
                  />
                )}
              </div>
            )}
          </>
        );

      case "table":
        return (
          <>
            {items?.question?.type === "table" && (
              <div className="my-5">
                {items?.question?.title && (
                  <p className="text-left">{items?.question?.title}</p>
                )}

                {items?.question?.SubQuestion?.map(
                  (subquestion: any, i: number) => (
                    <div key={i} className="mb-3">
                      <SubquestionChecbox
                        subquestion={subquestion}
                        index={i}
                        onChange={(e, optionId, isMultiple) =>
                          handleChange(
                            e,
                            items?.id,
                            optionId,
                            isMultiple,
                            subquestion.type,
                            subquestion?.id
                          )
                        }
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">{dataGet?.title}</h3>

        <div className="row pt-3 ">
          {question
            ?.slice()
            ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
            ?.map((items: any, index: any) => (
              <>
                {getComponent({
                  type: items?.question?.type,
                  items,
                  handleChange,
                  signatureValue,
                })}
              </>
            ))}
        </div>

        <div className="mt-5 d-flex flex-column gap-4">
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
      </div>
    </>
  );
}

export default SELFMANAGEMENT;
