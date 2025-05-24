import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import { useCreateAnswersMutation } from "@/redux/services/answer";
import HtmlRenderer from "./common/HtmlRenderer";
import Image from "next/image";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import SubquestionChecbox from "./common/Subquestion-Checbox";
import handleChange from "../utlity/handleFormChange";

interface AuthorizationForMedicationProps {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
}

function AuthorizationForMedication({
  handleBack,
  handleNext,
  currentStep,
}: AuthorizationForMedicationProps) {
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
          title: items?.question.title,
        }))
      );
  }, [dataGet]);

  const getComponent = ({ type, items, handleChange, signatureValue }: any) => {
    switch (type) {
      case "html":
        return <>{type === "html" && <HtmlRenderer items={items} />}</>;

      case "text":
      case "date":
        return (
          <>
            {(type === "text" || type === "date") && (
              <div className="col-lg-6 mb-4">
                <HtmlRenderer items={items} />
                {type === "text" && (
                  <input
                    type="text"
                    className="form-control"
                    required
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

      case "checkbox":
        return (
          <>
            {items?.question?.type === "checkbox" && (
              <>
                {items?.question?.options &&
                  items?.question?.options.length > 0 && (
                    <div className="row mb-4">
                      {items?.question.options.map((option: any, i: any) => (
                        <div className="col-lg-6" key={i}>
                          <div className="form-check mb-2">
                            <input
                              required
                              type={option.type}
                              className="form-check-input"
                              onChange={(e) =>
                                handleChange(e, formData, setFormData, {
                                  questionId: items?.id,
                                  optionId: option.id,
                                  isMultiple: option.isMultiple,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              // htmlFor={`option-${index}-${i}`}
                            >
                              {option.title}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </>
            )}
          </>
        );

      default:
        return null;
    }
  };

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

  return (
    <>
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />
        <h3 className="card-title text-center">
          {data?.data?.find((items: any) => items?.title === formName)?.title}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="row  my-5  ">
            {question
              ?.slice()
              ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
              ?.map((items: any, index: any) => (
                <>
                  {getComponent({
                    type: items?.question?.type,
                    items,
                    handleChange,
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

export default AuthorizationForMedication;
