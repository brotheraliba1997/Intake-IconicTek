"use client";
import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import SubquestionChecbox from "./common/Subquestion-Checbox";
import HtmlRenderer from "./common/HtmlRenderer";
import TextInput from "./common/TextInput";
import { useGetMyFormQuery } from "@/redux/services/form";
import ESignature from "../E-Signature/E-signature";
import { useCreateAnswersMutation } from "@/redux/services/answer";
import SignatureCompoment from "../E-Signature/signature";
import HospitalLogo from "./common/HospitalLogo";
import handleChange from "../utlity/handleFormChange";
import StepperButtons from "../common/StepperButtons";

function SELFMANAGEMENT({ handleBack, handleNext, currentStep }: any) {
  const [formData, setFormData] = useState();

  const signatureValue = ({value: val, itemsid:items} :any) => {
    console.log(val, items, "subQuestion");
    setFormData((prev: any) =>
      prev.map((quest: any) => {
        if (Array.isArray(quest.questionId)) {
          if (quest.questionId === items) {
            return { ...quest, signatureLink: val };
          } else {
            return quest;
          }
        }

        //
        if (Array.isArray(quest.subQuestion)) {
          const updateQuestion = quest?.subQuestion?.map((subquest: any) => {
            if (subquest?.id === items) {
              return { ...subquest, signatureLink: val };
            } else {
              return subquest;
            }
          });
          return { ...quest, subQuestion: updateQuestion };
        } else {
          return quest;
        }
      })
    );
  };

  const { data, isLoading, error } = useGetMyFormQuery({});
  const formName = "SELF-MANAGEMENT ASSESSMENT";
  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  console.log(formData, "formData");
  console.log(dataGet, "dataGet");

  useEffect(() => {
    if (dataGet)
      setFormData(
        dataGet?.formQuestions?.map((items: any) => ({
          questionId: items?.id,
          value: "",
          multipleValue: [],
          type: items?.question.type,
          title: items?.question?.title,
          subQuestion: items?.question?.SubQuestion?.map((sub: any) => ({
            value: "",
            multipleValue: [],
            type: sub?.type,
            id: sub?.id,
          })),
        }))
      );
  }, [dataGet]);

  const question = dataGet?.formQuestions;
  const [createAnswersMutation] = useCreateAnswersMutation();
  const handleSubmit = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.preventDefault();
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
                  <div key={sub.id} className="col-lg-6 mb-4">
                    {sub?.type === "Signature" && (
                      <>
                        <h5>{sub?.title}</h5>
                        <SignatureCompoment
                          signatureValue={signatureValue}
                          items={sub.id}
                          label={sub?.title}
                          formData={formData}
                        />
                      </>
                    )}

                    {sub?.type === "date" && (
                      <>
                        <h5>{sub?.title}</h5>
                        <input
                          type="date"
                          className="form-control"
                          required
                          placeholder="Enter..."
                          onChange={(e) =>
                            handleChange(e, formData, setFormData, {
                              questionId: items?.id,
                              optionId: null,
                              isMultiple: false,
                              type: items?.question?.type,
                              subQuestionId: sub?.id,
                            })
                          }
                        />
                      </>
                    )}
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
                    required={true}
                    onChange={(e: any) =>
                      handleChange(e, formData, setFormData, {
                        questionId: items?.id,
                      })
                    }
                  />
                )}
                {type === "date" && (
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={(e: any) =>
                      handleChange(e, formData, setFormData, {
                        questionId: items?.id,
                      })
                    }
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
                          handleChange(e, formData, setFormData, {
                            questionId: items?.id,
                            optionId: optionId,
                            isMultiple: isMultiple,

                            type: "radio",
                            subQuestionId: subquestion?.id,
                          })
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
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />

        <h3 className="card-title text-center">{dataGet?.title}</h3>
        <form onSubmit={handleSubmit}>
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

          <StepperButtons
            currentStep={currentStep}
            totalSteps={8}
            onNavigate={(direction) => {
              if (direction === "back") handleBack();
              else if (direction === "next") return;
              else if (direction === "submit") alert("Form Submitted!");
            }}
          />
        </form>
      </div>
    </>
  );
}

export default SELFMANAGEMENT;
