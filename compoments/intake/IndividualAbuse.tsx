import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import { AnswerData } from "@/types/common";
import ESignature from "../E-Signature/E-signature";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import HtmlRenderer from "./common/HtmlRenderer";
import handleChange from "../utlity/handleFormChange";

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
  const questions = dataGet?.formQuestions;

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

  const getComponent = ({ type, items, handleChange, signatureValue }: any) => {
    switch (type) {
      case "html":
        return <>{<HtmlRenderer items={items} />}</>;
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
                    required
                    className="form-control"
                    placeholder="Enter text..."
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
                      {items?.question.options.map((option: any, i: any) => {
                        console.log("option", option);
                        return (
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
                              <label className="form-check-label">
                                {option.title}
                              </label>
                            </div>
                          </div>
                        );
                      })}
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

  return (
    <>
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />{" "}
        <h3 className="card-title text-center">
          {data?.data?.find((items: any) => items?.title === formName)?.title}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="row  my-5  ">
            {questions
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

export default IndividualAbuse;
