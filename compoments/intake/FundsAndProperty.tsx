"use client";
import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import { FormData, FormQuestions, Option } from "@/types/form-data";
import { AnswerData } from "@/types/common";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import HtmlRenderer from "./common/HtmlRenderer";
import handleChange from "../utlity/handleFormChange";

function FUNDSANDPROPERTY({ handleBack, handleNext, currentStep }: any) {
  const { data, isLoading, error } = useGetMyFormQuery({});

  const formName = "FUNDS AND PROPERTY AUTHORIZATION";
  const dataGet: FormData = data?.data?.find(
    (items: any) => items?.title === formName
  );
  const [formData, setFormData] = useState<AnswerData[]>([]);
  useEffect(() => {
    if (dataGet)
      setFormData(
        dataGet?.formQuestions?.map((question: any) => ({
          questionId: question?.id,
          value: "",
          multipleValue: [],
          type: question?.question.type,
        }))
      );
  }, [dataGet]);

  console.log("dataGet", dataGet);

  console.log(formData, "formData");

  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort(
      (a: FormQuestions, b: FormQuestions) => a.arrangement - b.arrangement
    );

  const handleSubmit = async () => {
    const payload = { formId: dataGet?.id, answers: formData };
    // handleNext();
  };

  const getComponent = ({ type, items, handleChange, signatureValue }: any) => {
    switch (type) {
      case "html":
        return (
          <>
            <div className="mt-4 mb-2">
              {type === "html" && <HtmlRenderer items={items} />}
            </div>
          </>
        );

      case "text":
        return (
          <>
            {(type === "text" || type === "date") && (
              <div className="col-lg-12 mt-5">
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
              </div>
            )}
          </>
        );

      case "checkbox":
        return (
          type === "checkbox" &&
          items?.question?.options &&
          items.question.options.length > 0 && (
            <div className="row ">
              {items.question.options.map((option: Option, i: number) => (
                <div className="col-lg-6" key={i}>
                  <div className="form-check mb-2">
                   
                      <input
                        type="radio"
                        className="form-check-input"
                          name={`option`}
                          // id={`option-${i}`}
                          
                        onChange={(e) =>
                          handleChange(e, formData, setFormData, {
                            questionId: items?.id,
                            optionId: option.id,
                            isMultiple: false,
                            type: "radio",
                          })
                        }
                      />
                      <label className="form-check-label ">
                        {option.title}
                      </label>
                   
                  </div>
                </div>
              ))}
            </div>
          )
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
                    // signatureValue,
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

export default FUNDSANDPROPERTY;
