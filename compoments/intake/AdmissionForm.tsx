"use client";
import React, { useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import TextInput from "./common/TextInput";
import HtmlRenderer from "./common/HtmlRenderer";

function ADMISSIONFORM({ handleBack, handleNext, currentStep }: any) {
  const [formData, setFormData] = useState(
    Formlist?.STANDARDRELEASEOFINFORMATION?.questions?.map((itms) => ({
      questionId: itms?.id,
      value: "",
      multipleValue: [],
      type: itms?.type,
    }))
  );

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

  const { data, isLoading, error } = useGetMyFormQuery({});

  

  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  const question = dataGet?.questions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
    ?.map((items: any) => items?.question);

  console.log(question, "datadata");

  return (
    <>
      <div className="card p-5">
        <h3 className="card-title text-center">
          {Formlist?.ADMISSIONFORMANDDATASHEET?.title}
        </h3>

        <div className="mb-5">
          {question?.map((items: any, index: number) => (
            <div
              key={index}
              className="d-flex justify-content-between w-100 align-items-center"
            >
              <div className="d-flex flex-column gap-2  w-100">
                <h5 className="card-title  mt-5 mb-3">{items.title}:</h5>

                {/* Example: If you want to display subQuestions */}
                {items?.SubQuestion && items.SubQuestion.length > 0 && (
                  <div className="row">
                    {items.SubQuestion.map((option: any, i) => (
                      <div className="col-lg-6" key={i}>
                        <div className="form-check mb-4">
                          <label
                            className="form-check-label"
                            htmlFor={`option-${index}-${i}`}
                          >
                            {option.title}
                          </label>

                          <input
                            type={option.type}
                            className="form-control"
                            id={`option-${index}-${i}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ADMISSIONFORM;
