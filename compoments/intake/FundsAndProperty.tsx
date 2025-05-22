"use client";
import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import { FormData, FormQuestions, Option } from "@/types/form-data";
import { AnswerData } from "@/types/common";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";

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
          questionId: question?.questionId,
          value: "",
          multipleValue: [],
          type: question?.question.type,
        }))
      );
  }, [dataGet]);

  console.log("dataGet", dataGet);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionId: string | null,
    isMultiple: boolean,
    type: string
  ) => {
    const { value, checked } = e.target;

    const arrayfound = formData.map((quest: AnswerData) => {
      if (quest.questionId === questionId) {
        if (isMultiple && optionId) {
          let multipleValue = [...quest.multipleValue];

          if (checked) {
            multipleValue.push(optionId);
          } else {
            multipleValue = multipleValue.filter((val) => val !== optionId);
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
    ?.sort(
      (a: FormQuestions, b: FormQuestions) => a.arrangement - b.arrangement
    );

  const handleSubmit = async () => {
    const payload = { formId: dataGet?.id, answers: formData };
    handleNext();
  };

  return (
    <>
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />
        <h3 className="card-title text-center">
          {Formlist?.FUNDSANDPROPERTY?.title}
        </h3>
        {question?.map((items: FormQuestions, index: number) => (
          <div
            key={index}
            className="d-flex justify-content-between w-100 align-items-center"
          >
            <div className="d-flex flex-column gap-2 my-2 w-100">
              {items?.question?.type !== "html" && (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: items?.question?.title }}
                  />
                </>
              )}

              <div>
                {" "}
                {(items?.question.type === "text" ||
                  items?.question.type === "date") && (
                  <input
                    type={items.question.type === "date" ? "date" : "text"}
                    className="form-control"
                    placeholder="Enter..."
                    value={
                      formData.find((q) => q.questionId === items.questionId)
                        ?.value || ""
                    }
                    onChange={(e) => {
                      handleChange(
                        e,
                        items.questionId,
                        null,
                        false,
                        items.question.type
                      );
                    }}
                  />
                )}
                {items?.question.type === "textarea" && (
                  <textarea
                    className="form-control"
                    id=""
                    rows={3}
                    value={
                      formData.find((q) => q.questionId === items.questionId)
                        ?.value || ""
                    }
                    onChange={(e) => {
                      handleChange(
                        e as unknown as React.ChangeEvent<HTMLInputElement>,
                        items.questionId,
                        null,
                        false,
                        items.question.type
                      );
                    }}
                  ></textarea>
                )}
                {items?.question?.options &&
                  items?.question.options.length > 0 && (
                    <div className="row">
                      {items?.question.options.map(
                        (option: Option, i: number) => (
                          <div className="col-lg-12" key={i}>
                            <div className="form-check mb-2">
                              <div>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`option-${index}-${i}`}
                                  checked={
                                    formData
                                      .find(
                                        (q) => q.questionId === items.questionId
                                      )
                                      ?.multipleValue.includes(option.id) ||
                                    false
                                  }
                                  onChange={(e) => {
                                    handleChange(
                                      e,
                                      option.questionId,
                                      option.id,
                                      true,
                                      items.question.type
                                    );
                                  }}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor={`option-${index}-${i}`}
                                >
                                  {option.title}
                                </label>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>

              {items?.question.type === "html" && (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: items?.question.title }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
        <StepperButtons
          currentStep={currentStep}
          totalSteps={8}
          onNavigate={(direction) => {
            if (direction === "back") handleBack();
            else if (direction === "next") handleSubmit();
            else if (direction === "submit") alert("Form Submitted!");
          }}
        />
      </div>
    </>
  );
}

export default FUNDSANDPROPERTY;
