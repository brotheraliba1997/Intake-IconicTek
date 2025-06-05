"use client";
import React, { useEffect, useState } from "react";
import { useGetMyFormQuery } from "@/redux/services/form";
import { AnswerData } from "@/types/common";
import { FormQuestions } from "@/types/form-data";
import HospitalLogo from "./common/HospitalLogo";
import StepperButtons from "../common/StepperButtons";
import HtmlRenderer from "./common/HtmlRenderer";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAnswersMutation } from "@/redux/services/answer";

const formSchema = z.object({
  answers: z.array(
    z
      .object({
        questionId: z.any(),
        value: z.string().optional(),
        type: z.string(),
        title: z.string().optional(),
        subQuestion: z
          .array(
            z.object({
              value: z.string(),
              id: z.string(),
              type: z.string(),
            })
          )
          .superRefine((subQuestion, ctx) => {
            subQuestion.forEach((items, index) => {
              if (!(items.value && items.value.trim().length > 0)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "value is Required",
                  path: [index, "value"],
                });
              }
            });
          }),
      })
      .superRefine((data, ctx) => {
        if (data.type === "html") {
          return true;
        }
      })
  ),
});

function ADMISSIONFORM({ handleBack, handleNext, currentStep }: any) {
  const {
    control,
    handleSubmit: handleFormSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitted, isDirty },
    register,
  } = useForm({
    defaultValues: {
      answers: [],
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [formData, setFormData] = useState<AnswerData[]>([]);

  const { data, error } = useGetMyFormQuery({});

  const formName = "ADMISSION FORM AND DATA SHEET";

  const dataGet = data?.data?.find((items: any) => items?.title === formName);

  useEffect(() => {
    if (dataGet) {
      // First sort the main questions
      const sortedQuestions = [...(dataGet?.formQuestions || [])].sort(
        (a: any, b: any) => a.arrangement - b.arrangement
      );

      const initialFormData = sortedQuestions.map((items: any, idx: number) => {
        // Sort subquestions if they exist
        const sortedSubQuestions = items?.question?.SubQuestion
          ? [...items.question.SubQuestion].sort(
              (a: any, b: any) => a.arrangement - b.arrangement
            )
          : [];

        return {
          questionId: items?.id,
          value: "",
          multipleValue: [],
          type: items?.question.type,
          title: items?.question?.title,
          subQuestion: sortedSubQuestions.map((sub: any) => ({
            value: "",
            multipleValue: [],
            type: sub?.type,
            id: sub?.id,
          })),
        };
      });

      setValue("answers", initialFormData);
    }
  }, [dataGet, setValue]);
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   questionId: string,
  //   optionId: string | null,
  //   isMultiple: boolean,
  //   type: string
  // ) => {
  //   const { value, checked } = e.target;

  //   setFormData((prevFormData) => {
  //     const newFormData = prevFormData.map((quest) => {
  //       // Check if this is the question we're updating
  //       if (quest.questionId === questionId) {
  //         if (isMultiple && optionId) {
  //           // Handle checkbox updates
  //           let newMultipleValue = [...quest.multipleValue];
  //           if (checked) {
  //             newMultipleValue.push(optionId);
  //           } else {
  //             newMultipleValue = newMultipleValue.filter(
  //               (val) => val !== optionId
  //             );
  //           }
  //           return { ...quest, multipleValue: newMultipleValue };
  //         } else {
  //           // Handle text/date input updates
  //           return { ...quest, value: value };
  //         }
  //       }
  //       return quest;
  //     });

  //     return newFormData;
  //   });
  // };

  console.log(formData, "formData");

  const questions = dataGet?.formQuestions
    ?.slice()
    ?.sort(
      (a: FormQuestions, b: FormQuestions) => a.arrangement - b.arrangement
    );

  const [createAnswersMutation, {isLoading}] = useCreateAnswersMutation();

  const onSubmit = async (data: any) => {
    console.log(data, "valueanswers");

    // const multipleValueFilter = watch()?.answers?.map((multi) => {
    //   if (multi?.multipleValue) {
    //     return {
    //       ...multi,
    //       multipleValue: multi?.multipleValue?.filter(
    //         (fil: any) => fil !== false
    //       ),
    //     };
    //   }
    //   return multi;
    // });

    try {
      const payload = { formId: dataGet?.id, answers: data?.answers };
      const response = await createAnswersMutation(payload).unwrap();
      if (response) {
        handleNext();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getComponent = ({ type, items, index }: any) => {
    switch (type) {
      case "html":
        return (
          <>
            <div className="col-12 mb-3">
              <HtmlRenderer items={items} />
            </div>

            <div className="row mt-3 mb-4">
              {items?.question?.SubQuestion?.map(
                (subQ: any, subIndex: number) => (
                  <div className="col-md-6 mb-3" key={subQ.id}>
                    <label className="form-label">{subQ.title}</label>

                    <Controller
                      name={`answers.${index}.subQuestion.${subIndex}.value`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type={subQ.type}
                          className={`form-control ${
                            errors?.answers?.[index]?.subQuestion?.[subIndex]
                              ?.value
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder={`Enter ${subQ.title?.split(":")[0]}`}
                        />
                      )}
                    />

                    {/* Show validation error if exists */}
                    {errors?.answers?.[index]?.subQuestion?.[subIndex]
                      ?.value && (
                      <div className="invalid-feedback">
                        {
                          errors.answers[index].subQuestion[subIndex].value
                            .message
                        }
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </>
        );

      //  case "text":
      //       case "date":

      //       return(
      //         <div className="row mt-3">
      //   {items?.question?.subQuestion?.map((subQ: any, subIndex: number) => (
      //     <div className="col-md-6 mb-3" key={subQ.id}>
      //       <label className="form-label">{subQ.title}</label>

      //       <Controller
      //         name={`answers.${index}.subQuestion.${subIndex}.value`}
      //         control={control}
      //         defaultValue=""
      //         render={({ field }) => (
      //           <input
      //             {...field}
      //             type={subQ.type}
      //             className={`form-control ${
      //               errors?.answers?.[index]?.subQuestion?.[subIndex]?.value
      //                 ? "is-invalid"
      //                 : ""
      //             }`}
      //             placeholder={`Enter ${subQ.title?.split(":")[0]}`}
      //           />
      //         )}
      //       />

      //       {/* Show validation error if exists */}
      //       {errors?.answers?.[index]?.subQuestion?.[subIndex]?.value && (
      //         <div className="invalid-feedback">
      //           {errors.answers[index].subQuestion[subIndex].value.message}
      //         </div>
      //       )}
      //     </div>
      //   ))}
      // </div>

      //       )

      default:
        return null;
    }
  };

  return (
    <>
      <div className="card px-5 pb-5 pt-3">
        <HospitalLogo />
        <h3 className="card-title text-center">{dataGet?.title}</h3>

        <form onSubmit={handleFormSubmit(onSubmit)}>
          <div className="row  my-5  ">
            {questions
              ?.slice()
              ?.sort((a: any, b: any) => a.arrangement - b.arrangement)
              ?.map((items: any, index: any) => (
                <>
                  {getComponent({
                    type: items?.question?.type,
                    items,
                    index,
                  })}
                </>
              ))}
          </div>

          <StepperButtons
          isLoading={isLoading}
            currentStep={currentStep}
            totalSteps={8}
            onNavigate={(direction) => {
              if (direction === "back") handleBack();
              else if (direction === "next") return;
              else if (direction === "submit") handleFormSubmit(onSubmit)();
            }}
          />
        </form>
      </div>
    </>
  );
}

export default ADMISSIONFORM;
