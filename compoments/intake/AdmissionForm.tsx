"use client";
import React, { useEffect, useState } from "react";
import { useGetMyFormQuery } from "@/redux/services/form";
import { AnswerData } from "@/types/common";
import { FormQuestions } from "@/types/form-data";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import HtmlRenderer from "./common/HtmlRenderer";

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

  console.log(formData, "formData");

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

  const getComponent = ({ type, items, handleChange, signatureValue }: any) => {
    switch (type) {
      case "html":
        return (
          <div className="col-12 mb-3">
            <HtmlRenderer items={items} />
            <div className="row mt-3">
              {items?.question?.SubQuestion?.map((subQ: any) => (
                <div className="col-md-6 mb-3" key={subQ.id}>
                  <label className="form-label">{subQ.title}</label>
                  <input
                    type={subQ.type}
                    className="form-control"
                    value={
                      formData.find((f) => f.questionId === subQ.id)?.value ||
                      ""
                    }
                    placeholder={`Enter ${subQ.title.split(":")[0]}`}
                    onChange={(e) =>
                      handleChange(e, subQ.id, null, false, subQ.type)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
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

export default ADMISSIONFORM;
