"use client";
import React, { useEffect, useState } from "react";
import Formlist from "@/form";
import { useGetMyFormQuery } from "@/redux/services/form";
import CheckBox from "./common/CheckBox";
import HtmlRenderer from "./common/HtmlRenderer";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";

function POLICYORIENTATIONRECEIPT({
  handleBack,
  handleNext,
  currentStep,
}: any) {
  const [formData, setFormData] = useState();

  const { data, isLoading, error } = useGetMyFormQuery({});

  const formName = "Policy Orientation Receipt";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  const question = dataGet?.formQuestions
    ?.slice()
    ?.sort((a: any, b: any) => a.arrangement - b.arrangement);

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
  // const [formData, setFormData] = useState(
  //   Formlist?.STANDARDRELEASEOFINFORMATION?.formQuestions?.map((itms) => ({
  //     questionId: itms?.id,
  //     value: "",
  //     multipleValue: [],
  //     type: itms?.type,
  //   }))
  // );

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

  console.log(question, "datadata");

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
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />
        <h3 className="card-title text-center">{dataGet?.title}</h3>

       

        <StepperButtons
          currentStep={currentStep}
          totalSteps={8}
          onNavigate={(direction) => {
            if (direction === "back") handleBack();
            else if (direction === "next") return;
            else if (direction === "submit") alert("Form Submitted!");
          }}
        />
      </div>
    </>
  );
}

export default POLICYORIENTATIONRECEIPT;
